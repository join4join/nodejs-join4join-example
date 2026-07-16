const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

const COMMANDS_DIR = path.join(__dirname, "..", "commands");

/**
 * Load every command file into client.commands.
 * Each command must export at least { name, descriptionKey, execute }.
 */
module.exports = function loadCommands(client) {
    const files = fs.readdirSync(COMMANDS_DIR).filter((f) => f.endsWith(".js"));

    for (const file of files) {
        const command = require(path.join(COMMANDS_DIR, file));

        if (!command.name || typeof command.name !== "string") {
            logger.warn(`Command "${file}" is missing a "name" — skipped.`);
            continue;
        }
        if (typeof command.execute !== "function") {
            logger.warn(`Command "${command.name}" has no execute() — skipped.`);
            continue;
        }

        client.commands.set(command.name, command);
    }

    logger.info(`Loaded ${client.commands.size} commands.`);
};
