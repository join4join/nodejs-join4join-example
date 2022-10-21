const Discord = require("discord.js")
const createUser = require("../api/methods/createUser")
const getUser = require("../api/methods/getUser")
const config = require("../config")

module.exports = async (bot, interaction, message) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
        const user_ = await getUser(interaction.user.id);
        if (!user_ || !user_.id) {
            await createUser(interaction.user.id);
        }

        const cmd = bot.commands.get(interaction.commandName);

        if (cmd.adminOnly) {

            const emb = new Discord.EmbedBuilder()
                .setColor(config.color)
                .setTitle('join4join.xyz | Error')
                .setDescription(`You don't have permission to execute this command !`)
                .setFooter({ text: config.footer })
                .setTimestamp()

            if (interaction.user.id != config.admin) return interaction.reply({ embeds: [emb] });
        }

        if (cmd.ownerOnly) {

            const emb = new Discord.EmbedBuilder()
                .setColor(config.color)
                .setTitle('join4join.xyz | Error')
                .setDescription(`You don't have permission to execute this command !`)
                .setFooter({ text: config.footer })
                .setTimestamp()

            if (interaction.user.id != config.owner) return interaction.reply({ embeds: [emb] });
        }

        command.run(bot, interaction, command.options).catch(error => console.log("Something went wrong...?"));
    }
}