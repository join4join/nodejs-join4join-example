module.exports = {
    common: {
        error: "Something went wrong. Please try again in a moment.",
        noPermission: "You don't have permission to use this command.",
        guildOnly: "This command can only be used inside a server.",
        on: "✅ Yes",
        off: "❌ No",
    },

    // Slash-command descriptions (shown in the Discord command picker).
    commands: {
        help: "Show the list of available commands.",
        invite: "Get the useful Join4Join links.",
        balance: "Check your coin balance and recent transactions.",
        daily: "Claim your daily coins every 24h.",
        farm: "Get servers to join and earn coins.",
        info: "Get Join4Join information about this server.",
        check: "Check if you can leave this server without losing coins.",
        buy: "Spend your coins to advertise your server.",
        pay: "Send coins to a friend.",
        stats: "See your developer earnings & affiliation stats.",
    },

    help: {
        title: "Help",
        intro: "Here are all the available commands:",
        links: "[Website]({url}) • [Support]({support}) • [Add the bot]({invite})",
    },

    invite: {
        title: "Useful links",
        description:
            "> [Add the bot]({invite})\n" +
            "> [Join4Join website]({url})\n" +
            "> [Support server]({support})",
    },

    balance: {
        title: "Balance",
        coins: "You have **{coins}** coins.\n> Earn more on [join4join.xyz]({url})",
        transactionsTitle: "Recent transactions",
        noTransactions: "No recent transactions.",
    },

    daily: {
        title: "Daily reward",
        claimed: "**You claimed your {amount} daily coins!**\n> Come back in 24h for more.",
        wait: "**You already claimed your daily reward.**\n> Come back in **{hours}h {minutes}m {seconds}s**.",
    },

    farm: {
        title: "Farm",
        intro:
            "**Join the servers below to earn coins.**\n" +
            "Spend them on [join4join.xyz]({url}) to grow your own server.\n" +
            "⚠️ Leaving a server within **4 days** deducts **2 coins** from your balance.\n" +
            "When you're done, click **Claim my coins**.",
        progress: "Progress: {done}/{total}",
        none: "**No server to farm right now.** 🎉\n> You joined everything available, check back later!",
        claimButton: "Claim my coins",
        refreshButton: "Refresh",
    },

    info: {
        title: "Server info",
        adRunning:
            "**An ad is currently running on this server.**\n" +
            "> Progress: **{done}/{total}** members\n" +
            "> Alt-account filter: **{alts}**\n" +
            "> Language filter: **{lang}**",
        noAd:
            "**No ad is running on this server right now.**\n" +
            "> Start one on [join4join.xyz]({url}) or with the `/buy` command.",
    },

    check: {
        title: "Check",
        canLeave: "✅ **You can leave this server without losing coins.**",
        mustWait: "⏳ **Please wait 4 days before leaving this server**, or you'll lose coins.",
    },

    buy: {
        optInvite: "The invite link of the server to advertise",
        optMembers: "How many members to buy (minimum 3)",
        optLanguage: "Only show your ad to users of this language",
        optFilter: "Filter out alt accounts (costs a bit more)",
        langAll: "🌍 All languages",
        langEn: "🇬🇧 English",
        langFr: "🇫🇷 French",
        langTr: "🇹🇷 Turkish",
        invalidInvite: "Please provide a valid Discord invite (e.g. https://discord.gg/xxxxxxx).",
        invalidCoins: "The amount of members must be a whole number.",
        minCoins: "You need to buy at least **3** members.",
        notEnough: "You don't have enough coins. Your balance: **{coins}**.",
        successTitle: "Ad ready",
        success: "✅ Your ad is ready!\n> Click **[here]({link})** to launch it.",
        liveTitle: "Ad launched",
        live: "✅ Your ad is now live!\n> Manage it **[here]({link})**.",
    },

    pay: {
        optUser: "The friend you want to send coins to",
        optAmount: "How many coins to send",
        cannotSelf: "You can't send coins to yourself.",
        cannotBot: "You can't send coins to a bot.",
        invalidCoins: "The amount of coins must be a whole number greater than 0.",
        notEnough: "You don't have enough coins. Your balance: **{coins}**.",
        successTitle: "Transfer",
        sentDirect: "✅ You sent **{coins}** coins to {user}.",
        confirm: "✅ Almost done! **[Confirm your transfer here]({link})** to send **{coins}** coins to {user}.\n> You (the sender) log in and confirm it yourself. The coins come from **your** balance.",
    },

    stats: {
        title: "Developer stats",
        intro: "Here's how your bot is performing.\nYou earn **0.10 coins** every time one of your users farms a server.",
        balance: "💰 Balance",
        affiliatedUsers: "👥 Affiliated users",
        affiliatedUsers30d: "+{count} this month",
        farms: "🌱 Farms by your users",
        earned: "🪙 Affiliation earned",
        apiRequests: "📡 API requests",
        apiRequests30d: "{count} this month",
        coins: "**{value}** coins",
    },
};
