const { MessageFlags } = require("discord.js");
const { build, error } = require("../utils/embeds");

module.exports = {
    name: "balance",
    descriptionKey: "commands.balance",
    dmPermission: true,

    async execute(interaction, ctx) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const res = await ctx.api.getUser(interaction.user.id);
        if (!res?.success) {
            return interaction.editReply({ embeds: [error(ctx, res?.message || ctx.t("common.error"))] });
        }

        const transactions = (res.data.transactions || [])
            .slice(0, 5)
            .map((entry) => entry.history)
            .filter(Boolean)
            .join("\n");

        const embed = build(ctx, {
            title: ctx.t("balance.title"),
            description: ctx.t("balance.coins", { coins: res.data.coins, url: ctx.config.url }),
            fields: [
                {
                    name: ctx.t("balance.transactionsTitle"),
                    value: transactions || ctx.t("balance.noTransactions"),
                },
            ],
        });
        await interaction.editReply({ embeds: [embed] });
    },
};
