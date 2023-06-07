const request = require("../requests");

/**
 * Get daily rewards.
 * @param {string} user_id - the id of the user
**/

async function daily(user_id) {
    return request('/join4join/daily', {
        method: 'POST',
        body: JSON.stringify({
            user_id
        })
    })
}

module.exports = daily