const { config } = require("../../config");

// The live site the API always builds its absolute links against.
const LIVE_HOST = "join4join.xyz";

/**
 * Point an API-returned link at config.url while keeping its path.
 *
 * The API returns absolute links on the live site
 * (https://join4join.xyz/dashboard/... or /transfer/...). When URL is set to a
 * local address in .env.development, this swaps the origin so the link opens
 * the site you're actually running (e.g. http://localhost:5173/...).
 *
 * No-op in production (config.url stays the live site) and for links on any
 * other host — payment-provider links (Mollie, NOWPayments, ...) pass through
 * untouched.
 *
 * @param {string} link - absolute URL returned by the API
 * @returns {string}
 */
function localizeLink(link) {
    if (typeof link !== "string") return link;
    try {
        const url = new URL(link);
        if (url.host !== LIVE_HOST) return link; // only rewrite our own site links

        const base = new URL(config.url);
        if (base.host === LIVE_HOST) return link; // nothing to do in production

        url.protocol = base.protocol;
        url.host = base.host; // host includes the port (e.g. localhost:5173)
        return url.toString();
    } catch {
        return link; // not a parseable absolute URL — leave as-is
    }
}

module.exports = { localizeLink };
