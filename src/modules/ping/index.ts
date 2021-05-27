import type { CommandFn, Module } from '../Module';

const ping: CommandFn = (command) => {
   command.reply(`Pong! (${command.client.ws.ping} ms)`);
};

export const pingModule: Module = {
   name: 'Ping',
   command: {
      name: 'ping',
      description: 'Ping the MattBot',
      fn: ping,
   },
};
