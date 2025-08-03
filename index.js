const config = require('./config');
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore messages from bots
  message.reply('Hello! I am your mentor bot. How can I assist you today?');
});

client.on("interactionCreate", interaction => {
  console.log(interaction);
  interaction.reply({
    content: 'Pong!!',
  });
}
)

client.login(config.token);
