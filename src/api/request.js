const { config } = require("../../config");

// Node 18+ ships a global fetch, so we don't need node-fetch anymore.
// A short timeout keeps a slow API from freezing the bot for every user.
const REQUEST_TIMEOUT_MS = 15000;

/**
 * Low-level call to the Join4Join API.
 * Adds the base URL, the Authorization header (your API key) and JSON handling.
 *
 * @param {string} endpoint - path after /api/v1/, e.g. "join4join/farm"
 * @param {object} [options]
 * @param {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"} [options.method="GET"]
 * @param {object} [options.body] - plain object, serialized to JSON
 * @returns {Promise<object>} the parsed JSON response
 * @throws {Error} on network error, timeout or non-JSON response
 */
async function request(endpoint, options = {}) {
    const path = endpoint.replace(/^\/+/, "");
    const url = `${config.apiUrl}/api/v1/${path}`;

    const headers = { Authorization: config.apiKey };
    let body;
    if (options.body !== undefined) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(options.body);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            method: options.method || "GET",
            headers,
            body,
            signal: controller.signal,
        });

        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch {
            throw new Error(
                `Join4Join API returned a non-JSON response (HTTP ${response.status}) for ${path}`
            );
        }
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error(`Join4Join API request timed out for ${path}`);
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }
}

module.exports = request;
