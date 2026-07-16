// Tiny dependency-free logger with timestamps and levels.
// Swap this out for pino/winston if your fork needs structured logs.

const COLORS = {
    info: "\x1b[36m",  // cyan
    warn: "\x1b[33m",  // yellow
    error: "\x1b[31m", // red
    ready: "\x1b[32m", // green
    reset: "\x1b[0m",
};

function stamp() {
    return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function log(level, args) {
    const color = COLORS[level] || "";
    const tag = level.toUpperCase().padEnd(5);
    console.log(`${color}[${stamp()}] ${tag}${COLORS.reset}`, ...args);
}

module.exports = {
    info: (...args) => log("info", args),
    warn: (...args) => log("warn", args),
    error: (...args) => log("error", args),
    ready: (...args) => log("ready", args),
};
