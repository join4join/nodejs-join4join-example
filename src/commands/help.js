const { build } = require("../utils/embeds");

module.exports = {
    name: "help",
    descriptionKey: "commands.help",
    dmPermission: true,

    async execute(interaction, ctx) {
        // Build the command list straight from what's loaded, so it stays
        // in sync automatically when you add or remove a command.
        const list = [...ctx.client.commands.values()]
            .map((cmd) => `\`/${cmd.name}\` - ${ctx.t(cmd.descriptionKey)}`)
            .join("\n");

        const links = ctx.t("help.links", {
            url: ctx.config.url,
            support: ctx.config.supportUrl,
            invite: ctx.config.botInviteLink,
        });

        const embed = build(ctx, {
            title: ctx.t("help.title"),
            description: `${ctx.t("help.intro")}\n\n${list}\n\n${links}`,
        });

        await interaction.reply({ embeds: [embed] });
    },
};
