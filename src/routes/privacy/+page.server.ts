import { fail } from "@sveltejs/kit";
import { validate_turnstile_form } from "$lib/turnstile";

export const actions = {
    default: async ({ request, platform, getClientAddress }) => {
        if (!platform) {
            return fail(500, { message: "Something went wrong and it's not your fault :(", error: true });
        }

        const data = await request.formData();
        const email = data.get("delete-email")?.toString();
        const token = data.get("delete-token")?.toString();
        if (!email || !token) {
            return fail(400, { message: "Missing email or token", error: true });
        }

        if (!(await validate_turnstile_form(data, getClientAddress))) {
            return fail(403, { message: "Please verify your humanity :]", error: true });
        }

        try {
            await platform.env.ALIAS_MANAGER.delete_address(email, token);
            return { message: "Successfully deleted your email and alias :)", error: false };
        } catch (error) {
            return fail(401, { message: "Incorrect email or token", error: true });
        }
    },
};
