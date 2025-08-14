const config = require('./config');
const loadCommands = require('./utils/loadCommands');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const { commandMap } = loadCommands();
client.commands = new Collection(commandMap);

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command){
    console.error(`No command matching ${interaction.commandName} found.`);
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing this command!', ephemeral: true });    
  }

});


client.login(config.token);
