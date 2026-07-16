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
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

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

        // A "/transfer/" link means YOU — the sender who ran the command — must
        // confirm the transfer on the website (you authorize spending your own
        // coins). Otherwise the coins were sent directly. The recipient never
        // has to do anything.
        const needsConfirmation = typeof res.link === "string" && res.link.includes("/transfer/");
        const description = needsConfirmation
            ? ctx.t("pay.confirm", { user: target.toString(), link: localizeLink(res.link), coins: amount })
            : ctx.t("pay.sentDirect", { user: target.toString(), coins: amount });

        const embed = build(ctx, { title: ctx.t("pay.successTitle"), description });
        await interaction.editReply({ embeds: [embed] });
    },
};
