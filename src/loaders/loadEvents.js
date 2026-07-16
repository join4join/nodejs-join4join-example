const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

const EVENTS_DIR = path.join(__dirname, "..", "events");

/**
 * Load every event file and bind it to the client.
 * Each event exports { name, once?, execute(client, ...args) }.
 */
module.exports = function loadEvents(client) {
    const files = fs.readdirSync(EVENTS_DIR).filter((f) => f.endsWith(".js"));

    for (const file of files) {
        const event = require(path.join(EVENTS_DIR, file));

        if (!event.name || typeof event.execute !== "function") {
            logger.warn(`Event "${file}" is malformed — skipped.`);
            continue;
        }

        const handler = (...args) => event.execute(client, ...args);
        if (event.once) client.once(event.name, handler);
        else client.on(event.name, handler);
    }

    logger.info(`Loaded ${files.length} events.`);
};
