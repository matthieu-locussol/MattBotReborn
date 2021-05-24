import { Module } from '../Module';
import { CommandInteraction } from 'discord.js';

const ping = (command: CommandInteraction) => {
   command.reply('Pong !');
};

export const pingModule: Module = {
   commands: [
      {
         infos: { name: 'ping', description: 'Ping the MattBot' },
         fn: ping,
      },
   ],
};
