const config = require('./config');
const { REST, Routes } = require('discord.js');
const loadCommands = require('./utils/loadCommands');


const { commands } = loadCommands();


const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(config.client_id), {
      body: commands,
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

