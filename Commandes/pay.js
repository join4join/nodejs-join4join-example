const Discord = require("discord.js");
const { default: fetch } = require("node-fetch");
const config = require("../config")

module.exports = {

    name: "pay",
    description: "Give coins to your friends.",
    permission: "None",
    dm: false,
    adminOnly: false,
    ownerOnly: false,

    async run(bot, message, args, member) {
        const modal = new Discord.ModalBuilder()
            .setCustomId('payCoins')
            .setTitle('Give coins to your friends');

        const friend_id = new Discord.TextInputBuilder()
            .setCustomId('friend_id')
            .setLabel("Please provide the id of your friend.")
            .setStyle(Discord.TextInputStyle.Short);

        const coins = new Discord.TextInputBuilder()
            .setCustomId('coins')
            .setLabel("Amount of coins you want to give.")
            .setStyle(Discord.TextInputStyle.Short);

        const one_ = new Discord.ActionRowBuilder().addComponents(friend_id);
        const two_ = new Discord.ActionRowBuilder().addComponents(coins);

        modal.addComponents(one_, two_);
        await message.showModal(modal);
    }
}