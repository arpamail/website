<script lang="ts">
    import { enhance } from "$app/forms";
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { Turnstile } from "svelte-turnstile";

    const { form } = $props();

    let email = $state("");
    let consented = $state(false);
    let passed_captcha = $state(false);
    let submit_enabled = $derived(email.length > 0 && consented && passed_captcha);
    let copied = $state(false);

    const copy_alias = async () => {
        if (!form?.alias_address) {
            return;
        }
        try {
            await navigator.clipboard.writeText(form.alias_address);
            setTimeout(() => (copied = false), 1000);
            copied = true;
        } catch (error) {
            console.error("Failed to copy text: ", error);
        }
    };
</script>

<h2 id="about"><a href="#about">What is this?</a></h2>
<p>
    Do you want a free, anonymous email address that forwards to your real inbox? Do you want to reply anonymously
    without exposing your real address? Just need a whole bunch of disposable emails to protect your privacy and avoid
    spam?
</p>
<p>
    <strong>ArpaMail</strong> has you covered, and you don't even need an account!
</p>
<p>
    But ArpaMail isn't just another disposable email service. It makes email communication anonymous in <strong
        >both directions</strong
    >.
</p>
<ul>
    <li>When you send an email to an ArpaMail alias, the recipient never sees your real address.</li>
    <li>You can reply to an email sent to your ArpaMail alias without exposing your real address.</li>
</ul>
<!-- <p>ArpaMail aliases are persistent as long as you use them, and can only be deleted by you.</p> -->

<h2 id="comparison"><a href="#comparison">How is this different from other email aliasing or masking services?</a></h2>
<div class="overflow-scroll max-w-full">
    <table>
        <thead>
            <tr>
                <th></th>
                <th>ArpaMail</th>
                <th>Müllmail</th>
                <th>Firefox<br />Relay</th>
                <th>SimpleLogin</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Forward to your<br />real inbox</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
            </tr>
            <tr>
                <td>Reply anonymously</td>
                <td>✅</td>
                <td>❌</td>
                <td>💸<sup><a href="#table-footnote-1">*</a></sup></td>
                <td>✅</td>
            </tr>
            <tr>
                <td>Bypass most alias filters</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
            </tr>
            <tr>
                <td>Persistent aliases</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
                <td>✅</td>
            </tr>
            <tr>
                <td>Alias limit</td>
                <td>100<sup><a href="#table-footnote-2">†</a></sup></td>
                <td>-</td>
                <td>5</td>
                <td>10</td>
            </tr>
            <tr>
                <td>Account-less</td>
                <td>✅</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
            </tr>
            <tr>
                <td>Open-source</td>
                <td>✅</td>
                <td>❌</td>
                <td>✅</td>
                <td>✅</td>
            </tr>
            <tr>
                <td>Free to use</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
            </tr>
            <tr>
                <td>Cool <code>.arpa</code> domain</td>
                <td>✅</td>
                <td>❌</td>
                <td>❌</td>
                <td>❌</td>
            </tr>
        </tbody>
    </table>
    <small>
        <ul class="list-none">
            <li>
                <sup id="table-footnote-1">*</sup>
                Requires purchasing Firefox Relay Premium.
            </li>
            <li>
                <sup id="table-footnote-2">†</sup>
                Contact us if you need more aliases.
            </li>
        </ul>
    </small>
</div>

<h2 id="terms"><a href="#terms">Fair use terms</a></h2>
<p>Before you get too excited, there are unfortunately some boring details to get out of the way.</p>
<p>
    <strong>Please read these sections carefully before using the service.</strong>
</p>
<ol>
    <li>Respect the law.</li>
    <li>Respect other people and their privacy.</li>
    <li>Don't use this service for anything illegal or malicious. This includes but is not limited to:</li>
    <ul>
        <li>Sending spam or unsolicited emails</li>
        <li>Phishing or scamming</li>
        <li>Distributing malware or harmful content</li>
        <li>Piracy and trademark or copyright infringement</li>
        <li>Fraud, deception, or counterfeiting</li>
    </ul>
    <li>Don't abuse our infrastructure. This includes spamming emails, API requests, etc.</li>
    <li>
        Send reports to <a href="mailto:abuse@b.4.1.5.0.7.4.0.1.0.0.2.ip6.arpa">
            abuse@b.4.1.5.0.7.4.0.1.0.0.2.ip6.arpa
        </a>
    </li>
    <li>By using the service, you agree to follow these terms.</li>
    <li>Violation of these terms will result in your email being blacklisted by the service.</li>
</ol>

<h2 id="limitations"><a href="#limitations">Limitations</a></h2>
<p>You should also be aware of the following limitations:</p>
<ul>
    <li>You must verify your alias address before you can use it.</li>
    <li>Aliases automatically expire after <strong>30 days</strong> of inactivity (sending and receiving).</li>
    <li>There is a rate-limit of 2 emails per minute.</li>
    <li><code>Reply-To</code> headers are ignored.</li>
</ul>
<p>
    These features are <strong>not supported yet</strong>, but are planned for the future:
</p>
<ul>
    <li>Carbon-copy (CC) and blind carbon-copy (BCC)</li>
    <li>HTML emails &ndash; they are currently converted into plain text</li>
    <li>Attachments</li>
</ul>
<p>
    Need higher limits, longer-living aliases, or have a feature request? We'd love to hear from you at <a
        href="mailto:support@b.4.1.5.0.7.4.0.1.0.0.2.ip6.arpa">support@b.4.1.5.0.7.4.0.1.0.0.2.ip6.arpa</a
    >!
</p>

<h2 id="privacy"><a href="#privacy">Data protection & privacy</a></h2>
<p>
    You can learn what data we store, and delete your information, on the <a href="/privacy">privacy page</a>.
</p>

<h2 id="get-your-alias"><a href="#get-your-alias">Get your email alias</a></h2>
<div>
    <p>
        Alright, enough mumbo jumbo! Go ahead and create an email alias below. We'll send you instructions to verify
        your address.
    </p>
    <form method="post" class="flex flex-col gap-4 my-4" use:enhance>
        <input
            type="email"
            id="create-email"
            name="create-email"
            placeholder="email@example.com"
            required
            bind:value={email}
        />

        <label for="consent">
            <input type="checkbox" id="consent" name="consent" required bind:checked={consented} />
            I have read and agree to the fair use terms, and consent to the processing of my data as described in the
            <a href="/privacy">privacy policy</a>.
        </label>
        <Turnstile
            siteKey={PUBLIC_TURNSTILE_SITE_KEY}
            theme={"dark"}
            size={"flexible"}
            on:callback={() => (passed_captcha = true)}
        />
        <button type="submit" class="font-bold" disabled={!submit_enabled}>Create my email alias!</button>
    </form>
</div>

<div>
    <div class="flex flex-col gap-2">
        <button
            class={[
                "font-bold text-sm border-2 border-dashed p-4 text-center border-accent",
                form?.alias_address ? "text-accent-light cursor-pointer" : "text-zinc-400",
            ]}
            onclick={copy_alias}
        >
            {form?.alias_address || "Your alias will appear here..."}
        </button>
        <div class="flex">
            <span class={[form?.error ? "text-red-400" : "text-zinc-400"]}>
                {form?.message ? form.message : copied ? "Copied!" : form?.alias_address ? "Click to copy" : ""}
            </span>
            <span class="text-zinc-400 ml-auto">
                {form?.remaining_aliases !== undefined ? `Remaining aliases: ${form.remaining_aliases}` : ""}
            </span>
        </div>
    </div>
</div>
