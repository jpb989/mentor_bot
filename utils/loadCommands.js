const fs = require('fs');
const path = require('path');

function loadCommands() {
  const commands = [];
  const commandMap = new Map();

  const commandsPath = path.join(__dirname, '..', 'commands');
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (command.data && command.execute) {
      commands.push(command.data);
      commandMap.set(command.data.name, command);
    } else {
      console.warn(
        `[WARNING] Command file ${file} is missing "data" or "execute" property.`
      );
    }
  }

  return { commands, commandMap };
}

module.exports = loadCommands;
