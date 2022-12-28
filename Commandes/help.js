const Discord = require("discord.js")
const config = require("../config")

module.exports = {
    name: "help",
    description: "Displays bot commands.",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, user, member) {

        const emb = new Discord.EmbedBuilder()
            .setColor(message.member.displayHexColor)
            .setTitle('join4join.xyz | Help')
            .setURL(config.url)
            .setDescription('**Here all the available commands: :robot:**\n\n`help` : **display the available commands.**\n`invite` : **To get the useful links.**\n`balance` : **Check your coins balance.**\n`buy` : **Start an ad using your coins.**\n`pay` : **Give coins to your friends.**\n`farm` : **Farm servers to get coins.**\n`check` : **Check if you can leave servers without losing coins.**\n\n[https://join4join.xyz](https://join4join.xyz) • [https://discord.gg/join4join](https://discord.gg/join4join)')
            .setImage("https://cdn.discordapp.com/attachments/696832317745922098/719321848860639423/hELPp.png")
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter({ text: config.footer })
            .setTimestamp()
        message.reply({ embeds: [emb] });
    }
}