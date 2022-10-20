const fs = require("fs")

module.exports = async bot => {

    fs.readdirSync("./Commandes").filter(f =>  f.endsWith(".js")).forEach(async file => {

        let command = require(`../Commandes/${file}`)
        if(!command.name || typeof command.name !== "string") throw new TypeError(`${file.slice(0, file.lengh - 3)} doesn't have name`)
        bot.commands.set(command.name, command)
        console.log(`Command ${file} loaded successfully !`)
    })
}