const request = require("../requests");

/**
 * Give coins to a friend
 * @param {string} user_donator - the id of the friend.
 * @param {string} user_receiver - the id of the friend.
 * @param {int} coins - the number of coins the user want to give.
**/

async function pay(user_donator, user_receiver, coins) {
    return request('/join4join/pay', {
        method: 'POST',
        body: JSON.stringify({
            user_donator, user_receiver, coins
        })
    })
}

module.exports = pay