const request = require("../requests");

/**
 * Get all servers available to farm
 * @param {string} user_id - the id of the user
**/

async function farm(user_id) {
    return request('/join4join/farm', {
        method: 'POST',
        body: JSON.stringify({
            user_id
        })
    })
}

module.exports = farm