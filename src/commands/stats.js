const { MessageFlags } = require("discord.js");
const { build, error } = require("../utils/embeds");

module.exports = {
    name: "stats",
    descriptionKey: "commands.stats",
    dmPermission: true,
    // Exposes YOUR earnings, so it's restricted to the IDs listed in OWNER (.env).
    ownerOnly: true,

    async execute(interaction, ctx) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const res = await ctx.api.stats();
        if (!res?.success || !res.data) {
            return interaction.editReply({ embeds: [error(ctx, res?.message || ctx.t("common.error"))] });
        }

        const d = res.data;
        const embed = build(ctx, {
            title: ctx.t("stats.title"),
            description: ctx.t("stats.intro"),
            fields: [
                { name: ctx.t("stats.balance"), value: ctx.t("stats.coins", { value: d.balance }), inline: true },
                {
                    name: ctx.t("stats.affiliatedUsers"),
                    value: `**${d.affiliated_users}**\n${ctx.t("stats.affiliatedUsers30d", { count: d.affiliated_users_30d })}`,
                    inline: true,
                },
                { name: ctx.t("stats.farms"), value: `**${d.affiliation_farms}**`, inline: true },
                { name: ctx.t("stats.earned"), value: ctx.t("stats.coins", { value: d.affiliation_earned }), inline: true },
                {
                    name: ctx.t("stats.apiRequests"),
                    value: `**${d.api_requests_total}**\n${ctx.t("stats.apiRequests30d", { count: d.api_requests_30d })}`,
                    inline: true,
                },
            ],
        });
        await interaction.editReply({ embeds: [embed] });
    },
};
