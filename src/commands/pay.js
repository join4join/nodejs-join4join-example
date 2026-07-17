const { MessageFlags } = require("discord.js");
const { build, error } = require("../utils/embeds");
const { localizeLink } = require("../utils/links");

module.exports = {
    name: "pay",
    descriptionKey: "commands.pay",
    dmPermission: false,

    options(builder, { d, loc }) {
        builder
            .addUserOption((o) =>
                o
                    .setName("user")
                    .setDescription(d("pay.optUser"))
                    .setDescriptionLocalizations(loc("pay.optUser"))
                    .setRequired(true)
            )
            .addIntegerOption((o) =>
                o
                    .setName("amount")
                    .setDescription(d("pay.optAmount"))
                    .setDescriptionLocalizations(loc("pay.optAmount"))
                    .setMinValue(1)
                    .setRequired(true)
            );
    },

    async execute(interaction, ctx) {
        await interaction.deferReply();

        const target = interaction.options.getUser("user");
        const amount = interaction.options.getInteger("amount");

        if (target.id === interaction.user.id) {
            return interaction.editReply({ embeds: [error(ctx, ctx.t("pay.cannotSelf"))] });
        }
        if (target.bot) {
            return interaction.editReply({ embeds: [error(ctx, ctx.t("pay.cannotBot"))] });
        }
        if (!Number.isInteger(amount) || amount <= 0) {
            return interaction.editReply({ embeds: [error(ctx, ctx.t("pay.invalidCoins"))] });
        }

        const res = await ctx.api.pay(interaction.user.id, target.id, amount);
        if (!res?.success) {
            return interaction.editReply({ embeds: [error(ctx, res?.message || ctx.t("common.error"))] });
        }

        // A "/transfer/" link means YOU (the sender) must confirm the transfer
        // on the website. That link is personal, so this message stays private
        // even though the rest of /pay is public. Otherwise the coins were sent
        // directly and everyone can see it.
        const needsConfirmation = typeof res.link === "string" && res.link.includes("/transfer/");

        if (needsConfirmation) {
            const embed = build(ctx, {
                title: ctx.t("pay.successTitle"),
                description: ctx.t("pay.confirm", { user: target.toString(), link: localizeLink(res.link), coins: amount }),
            });
            // Replace the public "thinking" reply with an ephemeral confirmation.
            await interaction.deleteReply();
            return interaction.followUp({ embeds: [embed], flags: MessageFlags.Ephemeral });
        }

        const embed = build(ctx, {
            title: ctx.t("pay.successTitle"),
            description: ctx.t("pay.sentDirect", { user: target.toString(), coins: amount }),
        });
        await interaction.editReply({ embeds: [embed] });
    },
};
