const { build, error } = require("../utils/embeds");

module.exports = {
    name: "daily",
    descriptionKey: "commands.daily",
    dmPermission: true,

    async execute(interaction, ctx) {
        await interaction.deferReply();

        const res = await ctx.api.daily(interaction.user.id);
        if (!res?.success || !res.data) {
            return interaction.editReply({ embeds: [error(ctx, res?.message || ctx.t("common.error"))] });
        }

        let description;
        if (res.data.ready) {
            description = ctx.t("daily.claimed", { amount: res.data.amount ?? 0 });
        } else {
            const remaining = Math.max(0, Number(res.data.remaining_time) || 0);
            const hours = Math.floor(remaining / 3600000);
            const minutes = Math.floor((remaining % 3600000) / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            description = ctx.t("daily.wait", { hours, minutes, seconds });
        }

        const embed = build(ctx, { title: ctx.t("daily.title"), description });
        await interaction.editReply({ embeds: [embed] });
    },
};
