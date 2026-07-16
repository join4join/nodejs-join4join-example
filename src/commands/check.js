const { MessageFlags } = require("discord.js");
const { build, error } = require("../utils/embeds");

module.exports = {
    name: "check",
    descriptionKey: "commands.check",
    dmPermission: false,

    async execute(interaction, ctx) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const res = await ctx.api.check(interaction.user.id, interaction.guildId);
        if (!res?.success) {
            return interaction.editReply({ embeds: [error(ctx, res?.message || ctx.t("common.error"))] });
        }

        const embed = build(ctx, {
            title: ctx.t("check.title"),
            description: res.data.check ? ctx.t("check.canLeave") : ctx.t("check.mustWait"),
        });
        await interaction.editReply({ embeds: [embed] });
    },
};
