import { TURNSTILE_SECRET_KEY } from "$env/static/private";

export const validate_turnstile = async (
    token: string,
    remote_ip: string,
): Promise<{ success: boolean; "error-codes": string[] }> => {
    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                secret: TURNSTILE_SECRET_KEY,
                response: token,
                remoteip: remote_ip,
            }),
        });

        return await response.json();
    } catch (error) {
        console.error("Turnstile validation error:", error);
        return {
            success: false,
            "error-codes": ["internal-error"],
        };
    }
};

export const validate_turnstile_form = async (data: FormData, getClientAddress: () => string): Promise<boolean> => {
    const turnstile_token = data.get("cf-turnstile-response");
    const { success } = turnstile_token
        ? await validate_turnstile(turnstile_token.toString(), getClientAddress())
        : { success: false };
    return success;
};
