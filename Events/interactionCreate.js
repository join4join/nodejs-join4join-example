const Discord = require("discord.js")
const config = require("../config")
const getUser = require("../api/methods/getUser")
const buy = require("../api/methods/buy")
const pay = require("../api/methods/pay")

module.exports = async (bot, interaction, message) => {

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {

        let command = require(`../Commandes/${interaction.commandName}`)
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

        try {
            command.run(bot, interaction, command.options)//.catch(error => console.log("Something went wrong...?"));
        } catch (error) {
            console.log(error)
        }
    }

    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'createAd') {
            const user = getUser(interaction.user.id);
            const server_invite = interaction.fields.getTextInputValue('server_invite');
            const coins = interaction.fields.getTextInputValue('coins');
            const filter_account = interaction.fields.getTextInputValue('filter_account');
            const filter_language = interaction.fields.getTextInputValue('filter_language');
            const regex = new RegExp("discord(?:\.com|app\.com|\.gg)/(?:invite/)?([a-zA-Z0-9\-]{2,32})").exec(server_invite)
            if (!server_invite || !regex) {
                await interaction.reply({ content: 'Please provide a valid discord invite.' });
            } else if (!coins) {
                await interaction.reply({ content: 'Please provide the amount of members you want to buy.' });
            } else if (user.coins < coins) {
                await interaction.reply({ content: `You don't have enough coins.` });
            } else if (!Number.isInteger(parseInt(Number(coins)))) {
                await interaction.reply({ content: `The amount of coins should be a number.` });
            } else if (coins < 3) {
                await interaction.reply({ content: `You need to buy atleast for 3 members.` });
            } else if (!["true", "false"].includes(filter_account)) {
                await interaction.reply({ content: `Please provide true or false for the alt filter.` });
            } else if (!["fr", "en", "tr", "all"].includes(filter_language)) {
                await interaction.reply({ content: `Please provide en fr tr all for the filter language.` });
            } else {
                const buy_api = await buy(interaction.user.id, coins, "https://" + regex[0], filter_account, filter_language);
                if (buy_api && buy_api.success === true) {
                    await interaction.reply({ content: `Please click [here](${buy_api.link}) to run your ad` });
                } else {
                    console.log(buy_api)
                    await interaction.reply({ content: `Something went wrong. Try again.` });
                }
            }
        }

        if (interaction.customId === 'payCoins') {
            const user = getUser(interaction.user.id);
            const friend_id = interaction.fields.getTextInputValue('friend_id');
            const coins = interaction.fields.getTextInputValue('coins');
            if (!coins) {
                await interaction.reply({ content: 'Please provide the amount of coins you want to give.' });
            } else if (user.coins < coins) {
                await interaction.reply({ content: `You don't have enough coins.` });
            } else if (!Number.isInteger(parseInt(Number(coins)))) {
                await interaction.reply({ content: `The amount of coins should be a number.` });
            } else if (!friend_id) {
                await interaction.reply({ content: 'Please provide your friend id.' });
            } else if (friend_id === interaction.user.id) {
                await interaction.reply({ content: `You can't transfer coins to yourself` });
            } else {
                const pay_api = await pay(interaction.user.id, friend_id, coins);
                if (pay_api && pay_api.success === true) {
                    await interaction.reply({ content: `Please click [here](${pay_api.link}) to accept the transfer` });
                } else {
                    console.log(pay_api)
                    await interaction.reply({ content: `Something went wrong. Try again.` });
                }
            }
        }
    }
}