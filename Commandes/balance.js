const Discord = require("discord.js")
const config = require("../config")
const getUser = require("../api/methods/getUser")
const createUser = require("../api/methods/createUser")

module.exports = {

    name: "balance",
    description: "See the coins you have",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const user_ = await getUser(message.user.id);

        if (user_ && user_.success === true) {
            const emb = new Discord.EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle('join4join.xyz | Balance')
                .setURL(config.url)
                .setDescription(`You have \`${user_.data.coins}\` coins\n> Earn more coins here [https://join4join.xyz/](https://join4join.xyz/)`)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter({ text: config.footer })
                .setTimestamp()
            message.reply({ embeds: [emb] });
        } else {
            console.log(user_);
            const emb = new Discord.EmbedBuilder()
                .setColor(message.member.displayHexColor)
                .setTitle('join4join.xyz | Error')
                .setURL(config.url)
                .setDescription(`Please login first [https://join4join.xyz/](https://join4join.xyz/) to have an account.`)
                .setThumbnail(bot.user.displayAvatarURL())
                .setFooter({ text: config.footer })
                .setTimestamp()
            message.reply({ embeds: [emb] });
        }
    }
}