const { build, error } = require("../utils/embeds");

module.exports = {
    name: "info",
    descriptionKey: "commands.info",
    dmPermission: false,

    async execute(interaction, ctx) {
        await interaction.deferReply();

        const res = await ctx.api.info(interaction.guildId);
        if (!res?.success) {
            return interaction.editReply({ embeds: [error(ctx, res?.message || ctx.t("common.error"))] });
        }

        const data = res.data;
        let description;
        if (data.ad === "yes") {
            const total = Number(data.invitation_request) || 0;
            const done = total - (Number(data.invitation_update) || 0);

            // Show the ad's filters so nothing is hidden.
            const alts = ctx.t(data.filter_alts ? "common.on" : "common.off");
            const langKey =
                { all: "buy.langAll", en: "buy.langEn", fr: "buy.langFr", tr: "buy.langTr" }[data.filter_lang] ||
                "buy.langAll";
            const lang = ctx.t(langKey);

            description = ctx.t("info.adRunning", { done, total, alts, lang });
        } else {
            description = ctx.t("info.noAd", { url: ctx.config.url });
        }

        const embed = build(ctx, { title: ctx.t("info.title"), description });
        await interaction.editReply({ embeds: [embed] });
    },
};
