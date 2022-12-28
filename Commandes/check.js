const Discord = require("discord.js")
const check = require("../api/methods/check")
const config = require("../config")

module.exports = {

    name: "check",
    description: "Allows you to check if you can leave the server.",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const check_ = await check(message.user.id, message.guild.id);
        if (check_ && check_.success === true && check_.data.check === false) {
            const emb = new Discord.EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle('join4join.xyz | Check')
                .setURL(config.url)
                .setDescription(`**Please wait 4 days before being able to leave this server.**`)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter({ text: config.footer })
                .setTimestamp()
            message.reply({ embeds: [emb] });
        } else if (check_ && check_.success === true && check_.data.check === true) {
            const emb = new Discord.EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle('join4join.xyz | Check')
                .setURL(config.url)
                .setDescription(`**You can leave this server without losing coins.**`)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter({ text: config.footer })
                .setTimestamp()
            message.reply({ embeds: [emb] });
        }
    }
}