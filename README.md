# mentor_bot

A Discord bot to help with learning by giving tasks about a specific subject.

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

## How to Add Commands

- Add a new file in the `commands/` directory.
- Export an object with `data` (name, description) and an `execute` function.
- Example:
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
- After adding or updating commands, run:
  ```sh
  node deploy-commands.js
  ```

---

## Notes

- The bot uses environment variables from `.env` for sensitive info.
- Only run `deploy-commands.js` when you add or change commands.
- Start the bot with `node index.js` to keep it online.
