const Discord = require("discord.js")
const config = require("../config")

module.exports = {
    name: "invite",
    description: "Get server support invite",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const emb = new Discord.EmbedBuilder()
            .setColor(message.member.displayHexColor)
            .setTitle('join4join.xyz | Invite')
            .setURL(config.url)
            .setDescription(`Some useful links.\n\n> [Add the bot](${config.bot_invite_link})\n> [Join4Join website](https://join4join.xyz)\n> [Join4Join support](https://discord.gg/join4join)`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter({ text: config.footer })
            .setTimestamp()
        message.reply({ embeds: [emb] });
    }
}