import { CommandInteraction } from 'discord.js';
import { buildTranslationFunction } from '../../locales';
import { extractCommandInfos } from '../../utils/commandInteraction';
import type { Module } from '../Module';

const ping = async (command: CommandInteraction) => {
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
