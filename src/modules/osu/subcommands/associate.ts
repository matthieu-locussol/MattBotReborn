import { CommandInteraction } from 'discord.js';
import { osuModule } from '..';
import { logger } from '../../../client';
import { extractCommandInfos } from '../../../utils/commandInteraction';

export const associate = async (command: CommandInteraction, username: string) => {
   const { user, userId, guildId } = extractCommandInfos(command);
   const cache = await osuModule.cache.get(guildId);

   cache.associations[userId] = username;

   osuModule.cache
      .set(guildId, cache)
      .then(() => {
         logger.log({ id: 'LOG_Osu_Associated_Username', user, username });
      })
      .catch(() => {
         logger.error({ id: 'LOG_Osu_Unable_Associate_Username', user, username });
      });
};
