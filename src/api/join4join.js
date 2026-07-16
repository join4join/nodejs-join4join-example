const request = require("./request");

/**
 * Typed wrappers around every Join4Join API endpoint.
 *
 * Every method returns the raw API payload:
 *   { success: true, data: {...} }   on success
 *   { success: false, message: "..." } on a handled error
 *
 * Users are created and affiliated to your API key automatically the first
 * time they appear in any call — you never have to call `createUser` yourself.
 * Full reference: https://join4join.xyz/documentation
 */
const api = {
    /** Explicitly create + affiliate a user. Optional (auto-created otherwise). */
    createUser: (userId) =>
        request("user/create", { method: "POST", body: { user_id: userId } }),

    /** Get a user's balance and last transactions. */
    getUser: (userId) =>
        request("user/get", { method: "POST", body: { user_id: userId } }),

    /** List guild IDs the user can join to farm coins. */
    farm: (userId) =>
        request("join4join/farm", { method: "POST", body: { user_id: userId } }),

    /** Get Join4Join information about a guild (ad status, invite, progress...). */
    info: (guildId) =>
        request("join4join/info", { method: "POST", body: { guild_id: guildId } }),

    /**
     * Buy an advertising campaign.
     * @param {string} userId
     * @param {number|string} coins - members to buy (min 3)
     * @param {string} invite - full invite, e.g. "https://discord.gg/abc"
     * @param {"true"|"false"} [filterAccount="false"] - alt-account filter
     * @param {"all"|"en"|"fr"|"tr"} [filterLanguage="all"] - target language
     */
    buy: (userId, coins, invite, filterAccount = "false", filterLanguage = "all") =>
        request("join4join/buy", {
            method: "POST",
            body: {
                user_id: userId,
                coins,
                invite,
                filter_account: filterAccount,
                filter_language: filterLanguage,
            },
        }),

    /** Transfer coins between two users. */
    pay: (donatorId, receiverId, coins) =>
        request("join4join/pay", {
            method: "POST",
            body: { user_donator: donatorId, user_receiver: receiverId, coins },
        }),

    /** Claim the daily reward for a user. */
    daily: (userId) =>
        request("join4join/daily", { method: "POST", body: { user_id: userId } }),

    /** Check whether a user can leave a guild without losing coins. */
    check: (userId, guildId) =>
        request("join4join/check", {
            method: "POST",
            body: { user_id: userId, guild_id: guildId },
        }),

    /** List every guild the user can currently leave without penalty. */
    checkAll: (userId) =>
        request("join4join/check/all", { method: "POST", body: { user_id: userId } }),

    /**
     * Get YOUR developer stats (affiliation revenue + API usage).
     * Uses your API key, so it always reports the key owner — not a given user.
     */
    stats: () => request("developer/stats", { method: "POST" }),
};

module.exports = api;
