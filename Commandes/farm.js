const Discord = require("discord.js")
const farm = require("../api/methods/farm");
const info = require("../api/methods/info");
const config = require("../config")

module.exports = {

    name: "farm",
    description: "Allows you to farm coins.",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const farm_ = await farm(message.user.id);

        if (farm_ && farm_.success === true) {
            if (farm_ && farm_.data.length < 5) {
                const emb = new Discord.EmbedBuilder()
                    .setColor(message.member.displayHexColor)
                    .setTitle('join4join.xyz | Farm')
                    .setURL(config.url)
                    .setDescription(`**You joined all the server, please wait...**\n\n> Earn more coins here [join4join.xyz/](https://join4join.xyz/)`)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setFooter({ text: config.footer })
                    .setTimestamp()
                message.reply({ embeds: [emb] });
            } else {
                const guild_1 = await info(farm_.data[0])
                const guild_2 = await info(farm_.data[1])
                const guild_3 = await info(farm_.data[2])
                const guild_4 = await info(farm_.data[3])
                const guild_5 = await info(farm_.data[4])

                const emb = new Discord.EmbedBuilder()
                    .setColor(message.member.displayHexColor)
                    .setTitle('join4join.xyz | Farm')
                    .setURL(config.url)
                    .setDescription(`**Join these servers to get 0.75 coins each.**\n**Use the coins to buy members on the website:** [join4join.xyz](https://join4join.xyz)\n**Leaving a server before 4 days past will deduct 2 coins from your balance**\n\n
                \`${guild_1.data.name}\`\n> [Click here to join](${guild_1.data.invite})\n> **Order: ${guild_1.data.invitation_update}/${guild_1.data.invitation_request}**\n
                \`${guild_2.data.name}\`\n> [Click here to join](${guild_2.data.invite})\n> **Order: ${guild_2.data.invitation_update}/${guild_2.data.invitation_request}**\n
                \`${guild_3.data.name}\`\n> [Click here to join](${guild_3.data.invite})\n> **Order: ${guild_3.data.invitation_update}/${guild_3.data.invitation_request}**\n
                \`${guild_4.data.name}\`\n> [Click here to join](${guild_4.data.invite})\n> **Order: ${guild_4.data.invitation_update}/${guild_4.data.invitation_request}**\n
                \`${guild_5.data.name}\`\n> [Click here to join](${guild_5.data.invite})\n> **Order: ${guild_5.data.invitation_update}/${guild_5.data.invitation_request}**
                \n\n**After joining some servers [click here](join4join.xyz/claim) to get your coins.**`)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setFooter({ text: config.footer })
                    .setTimestamp()
                message.reply({ embeds: [emb] });
            }
        } else {
            console.log(farm_);
        }
    }
}