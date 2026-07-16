const dotenv = require("dotenv");

// Load environment-specific file first (.env.production / .env.development),
// then fall back to a plain .env for anything not already defined.
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });
dotenv.config();

/** Parse a comma-separated list of Discord IDs into a clean array. */
function idList(value) {
    return (value || "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);
}

/**
 * Keep only a valid "#rrggbb" hex color, otherwise fall back to the default.
 * Guards against garbage values (e.g. npm injects COLOR=1) crashing setColor.
 */
function hexColor(value, fallback) {
    return /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
}

const config = {
    env,

    // Discord
    token: process.env.TOKEN,
    botInviteLink: process.env.BOT_INVITE_LINK || "https://join4join.xyz",
    guildId: process.env.GUILD_ID || null,
    admins: idList(process.env.ADMIN),
    owners: idList(process.env.OWNER),

    // Join4Join API
    apiKey: process.env.API_KEY,
    apiUrl: (process.env.API_URL || "https://join4join.xyz").replace(/\/+$/, ""),

    // Branding. `url` doubles as the public site base: absolute links the API
    // returns (see utils/links.js) are rewritten to this origin, so in dev
    // (URL=http://localhost:5173) the /buy and /pay links open the local site.
    url: process.env.URL || "https://join4join.xyz",
    supportUrl: process.env.SUPPORT_URL || "https://join4join.xyz/support",
    footer: process.env.FOOTER || "join4join.xyz",
    // Not "COLOR": npm injects COLOR=1 into scripts, which would shadow it.
    color: hexColor(process.env.EMBED_COLOR, "#e84e4b"),
};

/**
 * Fail fast with a readable message instead of a cryptic crash later on
 * if the person who forked the bot forgot to fill in the .env file.
 */
function validate() {
    const missing = [];
    if (!config.token || config.token === "YOUR_BOT_TOKEN") missing.push("TOKEN");
    if (!config.apiKey || config.apiKey === "YOUR_API_KEY") missing.push("API_KEY");

    if (missing.length) {
        console.error(
            `\n❌ Missing required configuration: ${missing.join(", ")}\n` +
            `   Copy ".env.example" to ".env" and fill in the values.\n` +
            `   Get your API key at https://join4join.xyz/dashboard/settings?developer\n`
        );
        process.exit(1);
    }
}

module.exports = { config, validate };
