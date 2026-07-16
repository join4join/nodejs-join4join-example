const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const { config } = require("../../config");
const { t } = require("../i18n");
const logger = require("../utils/logger");

// Discord localization codes we provide translations for.
const DESCRIPTION_LOCALES = { fr: "fr", tr: "tr" };

// Helper passed to each command's options() builder so option descriptions and
// choice names are translated too. `d` = English default, `loc` = localizations.
const i18n = {
    d: (key, vars) => t("en", key, vars),
    loc: (key, vars) => {
        const out = {};
        for (const [lang, code] of Object.entries(DESCRIPTION_LOCALES)) {
            out[code] = t(lang, key, vars);
        }
        return out;
    },
};

/**
 * Turn a loaded command into a Discord slash-command payload, with the
 * description (and any options) localized into every language we support.
 */
function toSlashCommand(command) {
    const builder = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(i18n.d(command.descriptionKey))
        .setDescriptionLocalizations(i18n.loc(command.descriptionKey))
        .setDMPermission(command.dmPermission ?? false);

    if (command.defaultMemberPermissions != null) {
        builder.setDefaultMemberPermissions(command.defaultMemberPermissions);
    }

    // Commands with parameters add them here (e.g. /pay user amount).
    if (typeof command.options === "function") command.options(builder, i18n);

    return builder.toJSON();
}

/**
 * Register all slash commands with Discord.
 * If GUILD_ID is set, registers to that guild (instant, ideal for dev);
 * otherwise registers globally (can take up to 1h to appear).
 */
async function deployCommands(client) {
    const commands = [...client.commands.values()].map(toSlashCommand);
    const rest = new REST({ version: "10" }).setToken(config.token);

    if (config.guildId) {
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, config.guildId),
            { body: commands }
        );
        logger.ready(`Registered ${commands.length} slash commands on guild ${config.guildId}.`);
    } else {
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        logger.ready(`Registered ${commands.length} global slash commands (up to 1h to appear).`);
    }
}

module.exports = deployCommands;
