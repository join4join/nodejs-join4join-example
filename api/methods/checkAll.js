const request = require("../requests");

/**
 * Know all the server a user can leave or not
 * @param {string} user_id - the id of the user
 * @return {Array} check - array of all the server id that a user can leave
**/

async function checkAll(user_id) {
    return request('/join4join/check/all', {
        method: 'POST',
        body: JSON.stringify({
            user_id
        })
    })
}

module.exports = checkAll