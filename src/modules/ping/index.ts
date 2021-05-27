import { buildTranslationFunction } from '../../locales';
import { extractCommandInfos } from '../../utils/commandInteraction';
import type { CommandFn, Module } from '../Module';

const ping: CommandFn = async (command) => {
   const t = pingModule.t;
   const { guildId } = extractCommandInfos(command);

   command.reply(t('pong', guildId, { delay: command.client.ws.ping }));
};

export const pingModule: Module = {
   name: 'Ping',
   t: buildTranslationFunction('ping'),
   command: {
      name: 'ping',
      description: 'Ping the MattBot',
      fn: ping,
   },
};
