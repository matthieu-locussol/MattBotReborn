import { CommandInteraction } from 'discord.js';
import { osuModule } from '..';
import { extractCommandInfos } from '../../../utils/commandInteraction';

export const associate = async (command: CommandInteraction, username: string) => {
   const { userId, guildId } = extractCommandInfos(command);

   const cache = await osuModule.cache.get(guildId);
   const entry = {
      userId,
      username,
   };

   cache.associations.push(entry);

   osuModule.cache.set(guildId, cache);
};
