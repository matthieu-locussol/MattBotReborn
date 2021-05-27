import { CommandInteraction } from 'discord.js';
import { osuModule } from '.';
import { extractCommandInfos } from '../../utils/commandInteraction';

export type OsuModuleCache = {
   associations: {
      userId: string;
      username: string;
   }[];
};

export const defaultCache: OsuModuleCache = {
   associations: [],
};

export const initializeCache = async (command: CommandInteraction) => {
   const { guildId } = extractCommandInfos(command);
   const cache = await osuModule.cache.get(guildId);

   if (!cache) {
      osuModule.cache.set(guildId, defaultCache);
   }
};
