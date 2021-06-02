import { CommandInteraction } from 'discord.js';
import { osuModule } from '.';
import { extractCommandInfos } from '../../utils/commandInteraction';
import { OsuBeatmap } from './api/types';

export type OsuModuleCache = {
   associations: Record<string, string>;
   beatmaps: Record<string, OsuBeatmap>;
};

export const defaultCache: OsuModuleCache = {
   associations: {},
   beatmaps: {},
};

export const initializeCache = async (command: CommandInteraction) => {
   const { guildId } = extractCommandInfos(command);

   const cache = await osuModule.cache.get(guildId);
   const cacheGlobal = await osuModule.cache.get('global');

   if (!cache) {
      osuModule.cache.set(guildId, defaultCache);
   }

   if (!cacheGlobal) {
      osuModule.cache.set('global', defaultCache);
   }
};
