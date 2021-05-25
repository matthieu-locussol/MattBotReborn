import type { CommandFn, Module } from '../Module';

const ping: CommandFn = (command) => {
   command.reply('Pong !');
};

export const pingModule: Module = {
   name: 'Ping',
   commands: [
      {
         infos: { name: 'ping', description: 'Ping the MattBot' },
         fn: ping,
      },
   ],
};
