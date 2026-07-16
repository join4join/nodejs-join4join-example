const { build } = require("../utils/embeds");

module.exports = {
    name: "invite",
    descriptionKey: "commands.invite",
    dmPermission: true,

    async execute(interaction, ctx) {
        const embed = build(ctx, {
            title: ctx.t("invite.title"),
            description: ctx.t("invite.description", {
                url: ctx.config.url,
                support: ctx.config.supportUrl,
                invite: ctx.config.botInviteLink,
            }),
        });

        await interaction.reply({ embeds: [embed] });
    },
};
