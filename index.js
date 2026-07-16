const { Client, GatewayIntentBits, Collection } = require("discord.js");

const { config, validate } = require("./config");
const logger = require("./src/utils/logger");
const loadCommands = require("./src/loaders/loadCommands");
const loadEvents = require("./src/loaders/loadEvents");

// Stop early with a clear message if the .env file is incomplete.
validate();

const client = new Client({
    // Slash commands only need the Guilds intent — nothing privileged.
    intents: [GatewayIntentBits.Guilds],
});

// Command registry, filled by the loader and read by the interaction handler.
client.commands = new Collection();
client.config = config;

async function main() {
    loadCommands(client);
    loadEvents(client);

    await client.login(config.token);
}

// Surface async problems instead of letting the process die silently.
process.on("unhandledRejection", (reason) => logger.error("Unhandled rejection:", reason));
process.on("uncaughtException", (error) => logger.error("Uncaught exception:", error));

main().catch((error) => {
    logger.error("Failed to start the bot:", error);
    process.exit(1);
});
