const request = require("../requests");

/**
 * Buy an ad
 * @param {string} user_id - the id of the user.
 * @param {string} guild_id - the id of the guild.
 * @param {int} coins - the number of coins the user want to spend.
 * @param {string} invite - the invite of the server.
 * @param {string} filter_account true or false. (false default)
 * @param {string} filter_language all (All language) or fr (Francais) or en (English) or tr (Turkish). (all default)
**/

async function buy(user_id, guild_id, coins, invite, filter_account, filter_language) {
    return request('/join4join/buy', {
        method: 'POST',
        body: JSON.stringify({
            user_id, guild_id, coins, invite, filter_account, filter_language
        })
    })
}

module.exports = buy