require('dotenv').config();

module.exports = {
  token: process.env.DISCORD_BOT_TOKEN,
  client_id: process.env.CLIENT_ID,
  cerebras_api_key: process.env.CEREBRAS_API_KEY,
};
