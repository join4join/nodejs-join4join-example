const Discord = require("discord.js")
const loadSlashCommands = require("../Loaders/loadSlashCommands")

module.exports = async bot => {

    await loadSlashCommands(bot)

    console.log(`${bot.user.tag} is online !`)
    await bot.user.setActivity('join4join.xyz | help | Grow your discord server for free');
    const activitys = [`join4join.xyz | help | Grow your discord server for free`];

    setInterval(async () => {
        await bot.user.setActivity(activitys[Math.floor(Math.random() * activitys.length)]);
    }, 120000);

    console.log("You need help? join here ---> https://discord.gg/join4join")
    console.log("Join4Join website ---> https://join4join.xyz")
    console.log("Host this bot for free ---> https://bot-hosting.net")
}