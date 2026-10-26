import { fail } from "@sveltejs/kit";
import { validate_turnstile_form } from "$lib/turnstile";

export const actions = {
    default: async ({ request, platform, getClientAddress }) => {
        if (!platform) {
            return fail(500, { message: "Something went wrong but it's not your fault :(", error: true });
        }

        const data = await request.formData();
        const email = data.get("create-email")?.toString();
        const consent = data.get("consent");
        if (!email) {
            return fail(400, { message: "Missing email", error: true });
        }
        if (!consent) {
            return fail(400, { message: "You must agree to the fair use rules and privacy policy >:(", error: true });
        }

        if (!(await validate_turnstile_form(data, getClientAddress))) {
            return fail(403, { message: "Please verify your humanity :]", error: true });
        }

        try {
            await platform.env.ALIAS_MANAGER.create_alias({ real_address: email });
            return { message: "Check your inbox for your new alias and verification link :)", error: false };
        } catch (error) {
            return fail(500, { message: `${error}`, error: true });
        }
    },
};
