# mentor_bot

A Discord bot to help with learning by giving tasks about a specific subject.

---

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [How It Works](#how-it-works)
  - [Command Registration (`command.js`)](#command-registration-commandjs)
  - [Bot Logic (`index.js`)](#bot-logic-indexjs)
- [Environment Variables](#environment-variables)
- [Running the Bot](#running-the-bot)

---

## Features

- Responds to messages in Discord servers.
- Registers a `/ping` slash command that replies with "Pong!!".
- Can be extended to provide learning tasks and more.

---

## Setup Instructions

1. **Clone the repository** and navigate to the project folder.

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the project root with your Discord bot token and client ID:
   ```
   DISCORD_BOT_TOKEN=your-bot-token-here
   CLIENT_ID=your-client-id-here
   ```

4. **Register slash commands:**
   ```sh
   node command.js
   ```
   This will register the `/ping` command with Discord.

5. **Start the bot:**
   ```sh
   node index.js
   ```

---

## How It Works

### Command Registration (`command.js`)

This script registers your bot's slash commands with Discord.

**How it works:**
- Loads configuration (token and client ID).
- Defines the `/ping` command.
- Uses Discord's REST API to register the command.
- Prints status messages and exits.

**You only need to run this when you add or change commands.**

---

### Bot Logic (`index.js`)

This is the main bot file that keeps your bot online and responding to events.

**How it works:**
- Loads configuration (token).
- Creates a Discord client with necessary intents.
- Listens for new messages:
  - If the message is not from a bot, replies with a greeting.
- Listens for interactions (such as slash commands):
  - Replies with "Pong!!" when the `/ping` command is used.
- Logs in to Discord using your bot token.

---

## Environment Variables

The bot uses a `.env` file for sensitive information:

- `DISCORD_BOT_TOKEN`: Your bot's token from the Discord Developer Portal.
- `CLIENT_ID`: Your application's client ID.

---

## Running the Bot

1. **Register commands (only needed after changes):**
   ```sh
   node command.js
   ```

2. **Start the bot:**
   ```sh
   node index.js
   ```

---

## Extending the Bot

- Add more commands to the `commands` array in `command.js`.
- Add more event listeners or logic in `index.js` for
