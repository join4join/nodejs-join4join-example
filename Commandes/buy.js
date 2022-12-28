const Discord = require("discord.js");
const { default: fetch } = require("node-fetch");
const config = require("../config")

module.exports = {

    name: "buy",
    description: "Buy an ad using your coins.",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const modal = new Discord.ModalBuilder()
            .setCustomId('createAd')
            .setTitle('Buy Advertising With https://join4join.xyz');

        const server_invite = new Discord.TextInputBuilder()
            .setCustomId('server_invite')
            .setLabel("Please provide the server invite.")
            .setStyle(Discord.TextInputStyle.Short);

        const coins = new Discord.TextInputBuilder()
            .setCustomId('coins')
            .setLabel("Amount of members you want to buy.")
            .setStyle(Discord.TextInputStyle.Short);

        const filter_account = new Discord.TextInputBuilder()
            .setCustomId('filter_account')
            .setLabel("Alt filter: true or false.")
            .setStyle(Discord.TextInputStyle.Short);

        const filter_language = new Discord.TextInputBuilder()
            .setCustomId('filter_language')
            .setLabel("User language: en, fr, tr, all")
            .setStyle(Discord.TextInputStyle.Short);

        const one_ = new Discord.ActionRowBuilder().addComponents(server_invite);
        const two_ = new Discord.ActionRowBuilder().addComponents(coins);
        const three_ = new Discord.ActionRowBuilder().addComponents(filter_account);
        const four_ = new Discord.ActionRowBuilder().addComponents(filter_language);

        modal.addComponents(one_, two_, three_, four_);
        await message.showModal(modal);
    }
}