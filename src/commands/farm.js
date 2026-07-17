const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { build, error } = require("../utils/embeds");

const MAX_SERVERS = 5;

function truncate(text, max) {
    return text && text.length > max ? `${text.slice(0, max - 1)}…` : text || "";
}

/**
 * Build the farm view (embed + buttons) for a user.
 * Exported so the "Refresh" button can rebuild the exact same view.
 * @returns {Promise<{embeds: import('discord.js').EmbedBuilder[], components: ActionRowBuilder[]}>}
 */
async function buildFarmView(ctx, userId) {
    const res = await ctx.api.farm(userId);
    if (!res?.success) {
        return { embeds: [error(ctx, res?.message || ctx.t("common.error"))], components: [] };
    }

    const ids = Array.isArray(res.data) ? res.data.slice(0, MAX_SERVERS) : [];

    // Resolve the guilds in parallel and keep only the ones we can actually join.
    const guilds = (await Promise.all(ids.map((id) => ctx.api.info(id))))
        .filter((r) => r?.success && typeof r.data?.invite === "string" && r.data.invite.startsWith("http"))
        .map((r) => r.data);

    if (guilds.length === 0) {
        const embed = build(ctx, { title: ctx.t("farm.title"), description: ctx.t("farm.none", { url: ctx.config.url }) });
        return { embeds: [embed], components: [] };
    }

    const lines = guilds.map((g, i) => {
        const total = Number(g.invitation_request) || 0;
        const done = total - (Number(g.invitation_update) || 0);
        return `**${i + 1}.** \`${truncate(g.name || "Server", 60)}\` - ${ctx.t("farm.progress", { done, total })}`;
    });

    const embed = build(ctx, {
        title: ctx.t("farm.title"),
        description: `${ctx.t("farm.intro", { url: ctx.config.url })}\n\n${lines.join("\n")}`,
    });

    // One "Join" button per server (Discord allows up to 5 buttons per row).
    const joinRow = new ActionRowBuilder().addComponents(
        guilds.map((g, i) =>
            new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(g.invite)
                .setLabel(truncate(`#${i + 1} ${g.name || "Server"}`, 72))
        )
    );

    const actionRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`${ctx.config.url}/claim`)
            .setLabel(ctx.t("farm.claimButton"))
            .setEmoji("💰"),
        new ButtonBuilder()
            .setStyle(ButtonStyle.Primary)
            .setCustomId("farm_refresh")
            .setLabel(ctx.t("farm.refreshButton"))
            .setEmoji("🔄")
    );

    return { embeds: [embed], components: [joinRow, actionRow] };
}

module.exports = {
    name: "farm",
    descriptionKey: "commands.farm",
    dmPermission: true,

    async execute(interaction, ctx) {
        await interaction.deferReply();
        const view = await buildFarmView(ctx, interaction.user.id);
        await interaction.editReply(view);
    },

    // Reused by the "Refresh" button handler.
    buildFarmView,
};
