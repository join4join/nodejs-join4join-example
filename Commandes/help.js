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
            .setDescription(`**Here all the available commands: :robot:**\n\n\`help\` : **display the available commands.**\n\`invite\` : **Get the useful links.**\n\`balance\` : **Check your coin balance and history.**\n\`buy\` : **Start an ad using your coins.**\n\`info\` : **Get information about the server.**\n\`pay\` : **Give coins to your friends.**\n\`farm\` : **Farm servers to get coins.**\n\`check\` : **Check if you can leave servers without losing coins.**\n\`daily\` : **Claim 3 daily coins every 24h.**\n\n[join4join.xyz](https://join4join.xyz) • [Support Server](https://join4join.xyz/discord) • [Add the bot](${config.bot_invite_link})`)
            .setImage("https://cdn.discordapp.com/attachments/696832317745922098/719321848860639423/hELPp.png")
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter({ text: config.footer })
            .setTimestamp()
        message.reply({ embeds: [emb] });
    }
}