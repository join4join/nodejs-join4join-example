const { Events, MessageFlags } = require("discord.js");
const { config } = require("../../config");
const { t, resolveLocale } = require("../i18n");
const api = require("../api/join4join");
const { error } = require("../utils/embeds");
const logger = require("../utils/logger");
const farmCommand = require("../commands/farm");

/**
 * Build the context object every command/handler receives.
 * `t` is already bound to the user's Discord language.
 */
function buildContext(client, interaction) {
    const locale = resolveLocale(interaction.locale);
    return {
        client,
        config,
        api,
        locale,
        t: (key, vars) => t(locale, key, vars),
    };
}

/** Send an error embed no matter what state the interaction is in. */
async function safeError(interaction, ctx) {
    const payload = { embeds: [error(ctx, ctx.t("common.error"))] };
    try {
        if (interaction.deferred || interaction.replied) await interaction.editReply(payload);
        else await interaction.reply({ ...payload, flags: MessageFlags.Ephemeral });
    } catch (err) {
        logger.error("Failed to deliver error message:", err);
    }
}

async function handleCommand(client, interaction) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    const ctx = buildContext(client, interaction);

    // Optional admin/owner gates (configured via the ADMIN / OWNER env vars).
    const denied =
        (command.adminOnly && !config.admins.includes(interaction.user.id)) ||
        (command.ownerOnly && !config.owners.includes(interaction.user.id));
    if (denied) {
        return interaction.reply({
            embeds: [error(ctx, ctx.t("common.noPermission"))],
            flags: MessageFlags.Ephemeral,
        });
    }

    try {
        await command.execute(interaction, ctx);
    } catch (err) {
        logger.error(`Error while running /${interaction.commandName}:`, err);
        await safeError(interaction, ctx);
    }
}

async function handleComponent(client, interaction) {
    // "Refresh" button on the /farm message → rebuild the same view.
    if (interaction.isButton() && interaction.customId === "farm_refresh") {
        const ctx = buildContext(client, interaction);
        try {
            await interaction.deferUpdate();
            const view = await farmCommand.buildFarmView(ctx, interaction.user.id);
            await interaction.editReply(view);
        } catch (err) {
            logger.error("Error while refreshing farm view:", err);
            await safeError(interaction, ctx);
        }
    }
}

module.exports = {
    name: Events.InteractionCreate,

    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) return handleCommand(client, interaction);
        if (interaction.isMessageComponent()) return handleComponent(client, interaction);
    },
};
