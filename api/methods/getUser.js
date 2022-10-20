const request = require("../requests");

/**
 * Get informations of an user with his id
 * @param {string} user_id - the id of the user
**/

async function getUser(user_id) {
    return request('/user/get', {
        method: 'POST',
        body: JSON.stringify({
            user_id
        })
    })
}

module.exports = getUser