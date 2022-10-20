const request = require("../requests");

/**
 * Get informations about a server
 * @param {string} guild_id - the id of the guild
**/

async function info(guild_id) {
    return request('/join4join/info', {
        method: 'POST',
        body: JSON.stringify({
            guild_id
        })
    })
}

module.exports = info