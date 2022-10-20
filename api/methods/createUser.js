const request = require("../requests");

/**
 * Create an user with his id. 0,10 coins for each user that farms and was created by your api key
 * @param {string} user_id - the id of the user
 * THE NEW USER WILL BE AUTOMATICALLY AFFILIATE WITH YOU. 
**/

async function createUser(user_id) {
    return request('/user/create', {
        method: 'POST',
        body: JSON.stringify({
            user_id
        })
    })
}

module.exports = createUser