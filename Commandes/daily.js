const Discord = require("discord.js")
const config = require("../config")
const daily = require("../api/methods/daily");

module.exports = {

    name: "daily",
    description: "Get 3 daily coins every 24h.",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const request = await daily(message.user.id);

        if (request && request.success === true) {
            if (request.data && request.data.remaining_time) {
                const hours = Math.floor(request.data.remaining_time / 3600000);
                const minutes = Math.floor((request.data.remaining_time % 3600000) / 60000);
                const seconds = Math.floor((request.data.remaining_time % 60000) / 1000);

                const emb = new Discord.EmbedBuilder()
                    .setColor(message.member.displayHexColor)
                    .setTitle('join4join.xyz | Daily')
                    .setURL(config.url)
                    .setDescription(request.data.ready ? `**You claimed your 3 daily coins.**\n> Check it out on [join4join.xyz](https://join4join.xyz)` : `**You need to wait ${hours}h ${minutes}m ${seconds}s.**\n> More coins on [join4join.xyz](https://join4join.xyz)`)
                    .setThumbnail(bot.user.displayAvatarURL())
                    .setFooter({ text: config.footer })
                    .setTimestamp()
                message.reply({ embeds: [emb] });
            }
        } else {
            console.log(request);
        }
    }
}