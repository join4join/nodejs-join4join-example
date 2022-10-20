const request = require("../requests");

/**
 * Know if a user can leave the server or not
 * @param {string} user_id - the id of the user
 * @param {string} guild_id - the id of the guild
**/

async function check(user_id, guild_id) {
    return request('/join4join/check', {
        method: 'POST',
        body: JSON.stringify({
            user_id, guild_id
        })
    })
}

module.exports = check