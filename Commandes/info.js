const Discord = require("discord.js")
const config = require("../config")
const getUser = require("../api/methods/getUser");
const info = require("../api/methods/info");

module.exports = {

    name: "info",
    description: "Get information on the server.",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const request = await info(message.guild.id);
        if (request && request.success === true) {
            if (request.data.ad === "no") {
                const emb = new Discord.EmbedBuilder()
                    .setColor(message.member.displayHexColor)
                    .setTitle('join4join.xyz | Info')
                    .setURL(config.url)
                    .setDescription(`**No ad is running currently on this server.**\n> Run an ad on the website: [join4join.xyz](https://join4join.xyz)\n> Run an ad directly on the server with the \`/buy\` command.`)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setFooter({ text: config.footer })
                    .setTimestamp()
                return message.reply({ embeds: [emb] });
            } else {
                const emb = new Discord.EmbedBuilder()
                    .setColor(message.member.displayHexColor)
                    .setTitle('join4join.xyz | Info')
                    .setURL(config.url)
                    .setDescription(`**An ad is currently running on this server.**\n> **Order: ${Number(request.data.invitation_request) - Number(request.data.invitation_update)}/${request.data.invitation_request}**`)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setFooter({ text: config.footer })
                    .setTimestamp()
                return message.reply({ embeds: [emb] });
            }
        } else {
            console.log(request);
        }
    }
}