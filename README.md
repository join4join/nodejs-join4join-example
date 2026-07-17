# Join4Join - Open-Source Discord Bot

A clean, ready-to-fork [Join4Join](https://join4join.xyz) bot built on the official
[Join4Join API](https://join4join.xyz/documentation). Run your own bot, grow Discord
servers for free - and **earn developer rewards** every time your users farm.

> **Every user your bot creates is automatically affiliated to your API key.**
> You earn **+0.10 coins** each time one of them farms a server, plus **+10 coins** for
> every new user who signs up through your affiliate link. Passive income. 🚀

<p align="center">
  <a href="https://join4join.xyz">Website</a> •
  <a href="https://join4join.xyz/documentation">API Docs</a> •
  <a href="https://join4join.xyz/support">Support</a>
</p>

<p align="center">
  <a href="https://bot-hosting.net/deploy?source=template&template=nodejs-join4join-example">
    <img src="https://bot-hosting.net/assets/deploy-badge.svg" alt="Deploy on Bot-Hosting">
  </a>
</p>

---

HOST THE BOT FOR FREE: [bot-hosting.net](https://bot-hosting.net?utm_source=github&utm_medium=readme&utm_campaign=nodejs-join4join-example&aff=grality)

---

## ✨ Features

- **10 slash commands** - `help`, `invite`, `balance`, `daily`, `farm`, `info`, `check`, `buy`, `pay`, `stats`
- **Multi-language** 🇬🇧 🇫🇷 🇹🇷 - every user sees the bot in their own Discord language, automatically
- **Intuitive UX** - `/pay @user amount` and `/buy` with inline options, no clunky forms
- **Interactive farming** - one-click *Join* buttons, *Claim* and *Refresh*
- **Robust** - timeouts, deferred replies (no more "This interaction failed"), clean error embeds
- **Easy to fork** - tidy structure, commented code, zero boilerplate to add a command

## 💰 Developer rewards

Running your own Join4Join bot pays you back. **Every user your bot creates is
automatically affiliated to your API key** (their account is linked to you the first
time they appear in any API call), and you earn coins from what they do:

| Reward | When it's paid | Amount |
| ------ | -------------- | ------ |
| **Affiliation signup** | A new user signs up on [join4join.xyz](https://join4join.xyz) through **your affiliate link** | **+10 coins** |
| **Farm** | One of your affiliated users farms a server (real account, not an alt) | **+0.10 coins** |

> 💡 The **+10 signup bonus** is credited when someone registers on the website via
> your affiliate link (grab it from your [dashboard](https://join4join.xyz/dashboard/settings)),
> so don't hesitate to share it in your bot. The **+0.10 per farm** is fully automatic
> for every user your bot creates.

Track your earnings anytime with `/stats`.

## 📦 Requirements

- [Node.js](https://nodejs.org) **v18 or higher**
- A Discord bot ([how to create one](https://discordjs.guide/preparations/setting-up-a-bot-application.html))
- A Join4Join API key → [get it here](https://join4join.xyz/dashboard/settings?developer)

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/join4join/nodejs-join4join-example.git
cd nodejs-join4join-example

# 2. Install dependencies
npm install

# 3. Configure your bot
cp .env.example .env      # then open .env and fill it in

# 4. Start the bot
npm start
```

That's it - your Join4Join bot is live! 🎉

### Configuration (`.env`)

| Variable          | Required | Description                                                            |
| ----------------- | :------: | --------------------------------------------------------------------- |
| `TOKEN`           |    ✅    | Your Discord bot token                                                |
| `API_KEY`         |    ✅    | Your Join4Join API key (users get affiliated to it)                   |
| `BOT_INVITE_LINK` |    -     | The link people use to add your bot to their servers                  |
| `GUILD_ID`        |    -     | A test server ID - registers commands **instantly** during dev        |
| `ADMIN` / `OWNER` |    -     | Comma-separated Discord IDs allowed to run admin/owner-only commands  |

> During development, set `GUILD_ID` so slash commands appear instantly.
> In production, leave it empty to register commands **globally** (can take up to 1h).

## 🧭 Commands

| Command   | What it does                                                        |
| --------- | ------------------------------------------------------------------ |
| `/help`   | List every available command                                       |
| `/invite` | Get the useful Join4Join links                                     |
| `/balance`| Show your coin balance and recent transactions                     |
| `/daily`  | Claim your daily coins every 24h                                   |
| `/farm`   | Get servers to join and earn coins (with Join / Claim buttons)     |
| `/info`   | Join4Join info about the current server                            |
| `/check`  | Check if you can leave a server without losing coins               |
| `/buy`    | `/buy invite members [language] [filter_alts]` - advertise a server|
| `/pay`    | `/pay user amount` - send coins to a friend                        |
| `/stats`  | Your developer earnings & affiliation stats (owner-only)          |

> `/stats` shows **your** affiliation revenue (you earn 0.10 coins each time one
> of your users farms). It's restricted to the Discord IDs listed in `OWNER` in
> your `.env`, so leave that empty and it stays private to nobody but you.

## 🗂️ Project structure

```
├── index.js               # Entry point: creates the client, loads everything
├── config.js              # Reads & validates your .env
└── src/
    ├── api/               # Join4Join API layer
    │   ├── request.js     # fetch wrapper (auth header, timeout, JSON)
    │   └── join4join.js   # typed methods: getUser, farm, buy, pay, daily...
    ├── commands/          # One file per slash command
    ├── events/            # ready.js + interactionCreate.js (the router)
    ├── i18n/              # Translations
    │   ├── index.js       # t(locale, key, vars) + locale resolution
    │   └── locales/       # en.js · fr.js · tr.js
    ├── loaders/           # loadCommands · loadEvents · deployCommands
    └── utils/             # embeds.js (branding) · logger.js
```

## ➕ Add your own command

Create `src/commands/ping.js`:

```js
const { build } = require("../utils/embeds");

module.exports = {
    name: "ping",
    descriptionKey: "commands.ping", // add this key to src/i18n/locales/*.js
    dmPermission: true,

    async execute(interaction, ctx) {
        const embed = build(ctx, { title: "Ping", description: "🏓 Pong!" });
        await interaction.reply({ embeds: [embed] });
    },
};
```

Add `ping: "Check the bot latency."` under `commands` in each locale file, then restart.
The command loads and registers itself - no wiring needed.

Each command receives a `ctx` object:

| Field        | Description                                             |
| ------------ | ------------------------------------------------------ |
| `ctx.t`      | Translator bound to the user's language: `ctx.t(key)`  |
| `ctx.api`    | The Join4Join API methods                              |
| `ctx.config` | Your resolved configuration                            |
| `ctx.client` | The Discord client                                     |
| `ctx.locale` | The resolved locale (`en` / `fr` / `tr`)               |

## ☁️ Free hosting

You can host this bot for free on [bot-hosting.net](https://bot-hosting.net).

## 🆘 Support

Need help? Join the [Join4Join support server](https://join4join.xyz/support).

## 📄 License

[MIT](LICENSE) © Join4Join
