const en = require("./locales/en");
const fr = require("./locales/fr");
const tr = require("./locales/tr");

const LOCALES = { en, fr, tr };
const DEFAULT_LOCALE = "en";

/**
 * Map a Discord locale (e.g. "en-US", "fr", "tr") to one of our supported
 * languages. Anything we don't translate falls back to English.
 * @param {string} discordLocale - interaction.locale
 * @returns {"en" | "fr" | "tr"}
 */
function resolveLocale(discordLocale) {
    if (!discordLocale) return DEFAULT_LOCALE;
    const short = String(discordLocale).toLowerCase().split("-")[0];
    return LOCALES[short] ? short : DEFAULT_LOCALE;
}

/** Read a "a.b.c" dot-path from a nested object. */
function dig(obj, path) {
    return path.split(".").reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

/**
 * Translate a key for a given locale, interpolating {placeholders}.
 * @param {string} locale - "en" | "fr" | "tr"
 * @param {string} key - dot-path, e.g. "daily.claimed"
 * @param {Record<string, string|number>} [vars] - values for {placeholders}
 */
function t(locale, key, vars = {}) {
    const lang = LOCALES[locale] ? locale : DEFAULT_LOCALE;
    let value = dig(LOCALES[lang], key);
    if (value == null) value = dig(LOCALES[DEFAULT_LOCALE], key); // fallback to EN
    if (value == null) return key; // last resort: show the key so it's obvious

    return String(value).replace(/\{(\w+)\}/g, (match, name) =>
        vars[name] != null ? String(vars[name]) : match
    );
}

module.exports = { t, resolveLocale, DEFAULT_LOCALE, SUPPORTED: Object.keys(LOCALES) };
