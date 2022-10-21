const config = require("../config");
const fetch = require("node-fetch")

/**
 * Make a request to the API
 * @param {string} endpoint - the API endpoint to make a request to
 * @param {object} options - request options
 * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} options.method - the HTTP method to use for the request
 * @param {*} options.body - the body of the request (only valid for POST, PUT and PATCH)
 * @param {string} options.contentType - the content type of the request body
 */


async function request(endpoint, options = {}) {
    const api = config.api_key;
    endpoint = endpoint.startsWith('/') ? endpoint.slice(1, endpoint.length) : endpoint

    const headers = {}
    if (api) headers.Authorization = api
    if (options.contentType) headers['content-type'] = options.contentType
    else if (options.body) headers['content-type'] = 'application/json'

    const body = options.body ?? undefined


    return (await fetch(`${config.api_url}/api/v1/${endpoint}`, {
        headers,
        method: options.method ?? 'GET',
        body
    })).json()
}

module.exports = request