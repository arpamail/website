<script lang="ts">
    import { enhance } from "$app/forms";
    import { PUBLIC_TURNSTILE_SITE_KEY } from "$env/static/public";
    import { Turnstile } from "svelte-turnstile";

    let email = $state("");
    let token = $state("");
    let passed_captcha = $state(false);
    let submit_enabled = $derived(email.length > 0 && token.length > 0 && passed_captcha);

    const { form } = $props();
</script>

<h2>Data protection & privacy</h2>
<p>
    ArpaMail only aims to hide the email addresses of users from each other and therefore preserve anonymity. We make
    no guarantee of the security or privacy of the email <em>content</em> itself.
    <br />
    <a
        href="https://www.computerweekly.com/news/366619707/France-pushes-for-law-enforcement-access-to-Signal-WhatsApp-and-encrypted-email"
        >Law enforcement</a
    >, <a href="https://www.congress.gov/crs-product/IF11451">government agencies</a>, and others still have the means
    to access email traffic. We recommend adding your own end-to-end encryption (e.g. PGP) for sensitive communications
    and added privacy.
</p>
<h3>Third-party data processors</h3>
<p>
    We use <a href="https://contiguity.com/">Contiguity</a> as a data processor to receive and send emails, therefore
    their
    <a href="https://contiguity.com/privacy">privacy policy</a> applies.
</p>
<p>
    User data is stored in encrypted databases managed by <a href="https://www.cloudflare.com/privacypolicy/"
        >Cloudflare</a
    >. The databases are hosted in European Union jurisdictions and are therefore subject to GDPR regulations.
</p>
<h3>Stored data</h3>
<p>We store the minimum amount of data necessary to provide the service:</p>
<ul>
    <li>Your real email address</li>
    <li>Your alias email address</li>
    <li>A randomly generated token to authenticate verification and deletion requests</li>
    <li><code>Message-ID</code>s of emails sent through the service</li>
    <ul>
        <li>These are used to facilitate proper threading of replies in email clients.</li>
        <li>The original <code>Message-ID</code>s are replaced with aliased ones during forwarding.</li>
    </ul>
</ul>
<p>This data is stored for the length of time specified on <a href="/#limitations">this page</a>.</p>
<p>
    Emails themselves are never stored by the service, and are only processed for the purpose of forwarding to the
    final recipient.
</p>
<h3>Analytics</h3>
<p>
    This website uses <a href="https://rybbit.com/" target="_blank">Rybbit</a> for private and anonymous analytics.
</p>
<h3>Your rights</h3>
<p>
    If you would like to receive a copy of your personal data stored by ArpaMail, want to object to your data being
    processed, or have questions, please email us at <a href="mailto:support@b.4.1.5.0.7.4.0.1.0.0.2.ip6.arpa"
        >support@b.4.1.5.0.7.4.0.1.0.0.2.ip6.arpa</a
    >.
</p>
<h3 id="remove-alias"><a href="#remove-alias">Want to remove your email and alias from the system?</a></h3>
<div>
    <p>No problem!</p>
    <form method="post" class="flex flex-col gap-4 my-4" use:enhance>
        <input
            type="email"
            id="delete-email"
            name="delete-email"
            placeholder="email@example.com"
            required
            bind:value={email}
        />
        <input
            type="text"
            id="delete-token"
            name="delete-token"
            placeholder="token"
            autocomplete="off"
            required
            bind:value={token}
        />
        <Turnstile
            siteKey={PUBLIC_TURNSTILE_SITE_KEY}
            theme={"dark"}
            size={"flexible"}
            on:callback={() => (passed_captcha = true)}
        />
        <button type="submit" class="font-bold" disabled={!submit_enabled}>Remove my email & alias</button>
    </form>
    <span class={[form?.error && "text-red-400"]}>{form?.message}</span>
</div>
