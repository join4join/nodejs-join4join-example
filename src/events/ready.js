const { Events, ActivityType } = require("discord.js");
const deployCommands = require("../loaders/deployCommands");
const logger = require("../utils/logger");

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {
        logger.ready(`${client.user.tag} is online!`);

        client.user.setPresence({
            status: "online",
            activities: [{ name: "join4join.xyz | /help", type: ActivityType.Watching }],
        });

        // Register slash commands with Discord on every startup.
        try {
            await deployCommands(client);
        } catch (err) {
            logger.error("Failed to register slash commands:", err);
        }

        logger.info("Need help? Join the support server: https://join4join.xyz/support");
        logger.info("Host this bot for free: https://bot-hosting.net");
    },
};
