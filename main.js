const Discord = require("discord.js")
const bot = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
    ],
});

const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents");
const config = require("./config");

bot.commands = new Discord.Collection();

bot.login(config.token);
loadCommands(bot);
loadEvents(bot);
