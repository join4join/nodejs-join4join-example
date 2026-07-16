const { MessageFlags } = require("discord.js");
const { build, error } = require("../utils/embeds");
const { localizeLink } = require("../utils/links");

// Accepts discord.gg / discord.com/invite / discordapp.com links and captures the code.
const INVITE_REGEX = /discord(?:app)?\.(?:com|gg)\/(?:invite\/)?([a-zA-Z0-9-]{2,32})/;

module.exports = {
    name: "buy",
    descriptionKey: "commands.buy",
    dmPermission: true,

    options(builder, { d, loc }) {
        builder
            .addStringOption((o) =>
                o
                    .setName("invite")
                    .setDescription(d("buy.optInvite"))
                    .setDescriptionLocalizations(loc("buy.optInvite"))
                    .setRequired(true)
            )
            .addIntegerOption((o) =>
                o
                    .setName("members")
                    .setDescription(d("buy.optMembers"))
                    .setDescriptionLocalizations(loc("buy.optMembers"))
                    .setMinValue(3)
                    .setRequired(true)
            )
            .addStringOption((o) =>
                o
                    .setName("language")
                    .setDescription(d("buy.optLanguage"))
                    .setDescriptionLocalizations(loc("buy.optLanguage"))
                    .addChoices(
                        { name: d("buy.langAll"), name_localizations: loc("buy.langAll"), value: "all" },
                        { name: d("buy.langEn"), name_localizations: loc("buy.langEn"), value: "en" },
                        { name: d("buy.langFr"), name_localizations: loc("buy.langFr"), value: "fr" },
                        { name: d("buy.langTr"), name_localizations: loc("buy.langTr"), value: "tr" }
                    )
                    .setRequired(false)
            )
            .addBooleanOption((o) =>
                o
                    .setName("filter_alts")
                    .setDescription(d("buy.optFilter"))
                    .setDescriptionLocalizations(loc("buy.optFilter"))
                    .setRequired(false)
            );
    },

    async execute(interaction, ctx) {
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

        const inviteInput = interaction.options.getString("invite");
        const members = interaction.options.getInteger("members");
        const language = interaction.options.getString("language") || "all";
        const filterAlts = interaction.options.getBoolean("filter_alts") || false;

        const match = INVITE_REGEX.exec(inviteInput);
        if (!match) {
            return interaction.editReply({ embeds: [error(ctx, ctx.t("buy.invalidInvite"))] });
        }
        if (members < 3) {
            return interaction.editReply({ embeds: [error(ctx, ctx.t("buy.minCoins"))] });
        }

        // Normalize to discord.gg/<code> so the API resolves it reliably.
        const invite = `https://discord.gg/${match[1]}`;
        const filterAccount = filterAlts ? "true" : "false";

        const res = await ctx.api.buy(interaction.user.id, members, invite, filterAccount, language);
        if (res?.success && res.link) {
            // A "/purchase/" link still needs to be confirmed to launch the ad;
            // any other link (e.g. a "/manage/" one) means it went live directly.
            const pending = res.link.includes("/purchase/");
            const embed = build(ctx, {
                title: ctx.t(pending ? "buy.successTitle" : "buy.liveTitle"),
                description: ctx.t(pending ? "buy.success" : "buy.live", { link: localizeLink(res.link) }),
            });
            return interaction.editReply({ embeds: [embed] });
        }

        return interaction.editReply({ embeds: [error(ctx, res?.message || ctx.t("common.error"))] });
    },
};
