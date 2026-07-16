const { EmbedBuilder } = require("discord.js");

// Central place for the bot's visual identity. Every reply goes through here,
// so restyling the whole bot is a one-file change.

/**
 * Build a branded embed.
 * @param {object} ctx - command context ({ client, config, locale, t })
 * @param {object} opts
 * @param {string} [opts.title] - shown after "Join4Join | "
 * @param {string} [opts.description]
 * @param {import('discord.js').APIEmbedField[]} [opts.fields]
 * @param {string} [opts.color] - overrides the brand color
 * @param {string} [opts.image]
 * @param {boolean} [opts.thumbnail=true] - show the bot avatar
 */
function build(ctx, opts = {}) {
    const embed = new EmbedBuilder()
        .setColor(opts.color || ctx.config.color)
        .setURL(ctx.config.url)
        .setFooter({ text: ctx.config.footer })
        .setTimestamp();

    if (opts.title) embed.setTitle(`Join4Join | ${opts.title}`);
    if (opts.description) embed.setDescription(opts.description);
    if (opts.fields?.length) embed.addFields(opts.fields);
    if (opts.image) embed.setImage(opts.image);
    if (opts.thumbnail !== false && ctx.client?.user) {
        embed.setThumbnail(ctx.client.user.displayAvatarURL());
    }

    return embed;
}

/**
 * Build a red error embed with a translated title.
 * @param {object} ctx
 * @param {string} description - already-translated message
 */
function error(ctx, description) {
    return build(ctx, {
        title: "Error",
        description,
        color: "#ed4245",
        thumbnail: false,
    });
}

module.exports = { build, error };
