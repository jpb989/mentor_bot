# mentor_bot

A Discord bot that helps users learn JavaScript by providing daily, personalized coding tasks based on their proficiency level. The bot uses slash commands and interactive menus, and leverages the Cerebras API to generate engaging tasks.

---

## Project Overview

**mentor_bot** is designed for Discord servers to encourage learning and practice of JavaScript.  
- Users can request a daily task tailored to their skill level (beginner, intermediate, advanced, expert).
- The bot uses the Cerebras API to generate unique, practical, and fun tasks.
- The codebase is modular, making it easy to add new commands or extend functionality.

---

## Project Structure

```
mentor_bot/
├── commands/            # All bot commands (e.g., dailytask, ping)
│   ├── dailytask.js
│   └── ping.js
├── prompts/             # Prompt templates for AI/generation
│   └── dailytaskPrompt.js
├── utils/               # Utility functions
│   └── loadCommands.js
├── .env                 # Environment variables (not committed)
├── config.js            # Loads environment variables for use in code
├── deploy-commands.js   # Registers slash commands with Discord
├── index.js             # Main bot entry point
├── package.json
└── README.md
```

---

## Setup Instructions

1. **Clone the repository** and navigate to the project folder.

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the project root with your Discord bot token, client ID, and Cerebras API key:
   ```
   DISCORD_BOT_TOKEN=your-bot-token-here
   CLIENT_ID=your-client-id-here
   CEREBRAS_API_KEY=your-cerebras-api-key-here
   ```

4. **Register slash commands (run this after adding or changing commands):**
   ```sh
   node deploy-commands.js
   ```

5. **Start the bot:**
   ```sh
   node index.js
   ```

---

## Usage

### Getting a Daily JavaScript Task

- Use the `/dailytask` slash command in your Discord server.
- The bot will prompt you to select your proficiency level via a dropdown menu.
- After you select your level, the bot will generate and send a personalized JavaScript task using the Cerebras API.

### Other Commands

- `/ping` — Replies with "Pong!" (for testing if the bot is online).

---

## How to Add Commands

1. **Create a new file** in the `commands/` directory.
2. **Export an object** with `data` (name, description) and an `execute` function.
3. **Example:**
   ```js
   // commands/hello.js
   module.exports = {
     data: {
       name: 'hello',
       description: 'Replies with a greeting!',
     },
     async execute(interaction) {
       await interaction.reply('Hello!');
     },
   };
   ```
4. **Register the new command:**
   ```sh
   node deploy-commands.js
   ```

---

## How It Works

- **Slash commands** are registered with Discord using `deploy-commands.js`.
- **All commands** are dynamically loaded from the `commands/` folder using `utils/loadCommands.js`.
- **Prompts** for AI generation are kept in the `prompts/` folder for easy editing and reuse.
- **Sensitive information** (tokens, API keys) is stored in `.env` and loaded via `config.js`.
- **The bot** listens for interactions and executes the appropriate command logic.

---

## Notes

- The bot uses environment variables from `.env` for sensitive info.
- Only run `deploy-commands.js` when you add or change commands.
- Start the bot with `node index.js` to keep it online and responding.
- The Cerebras API key is required for the `/dailytask` command to function.

---

## Extending the Bot

- Add new commands to the `commands/` directory.
- Add new prompt templates to the `prompts/` directory as needed.
- Update `deploy-commands.js` and run it to register new commands.

---

**Happy coding!**
