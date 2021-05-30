import { CommandInteraction } from 'discord.js';
import { osuModule } from '..';
import { logger } from '../../../client';
import { extractCommandInfos } from '../../../utils/commandInteraction';

export const associate = async (command: CommandInteraction, username: string) => {
   const t = osuModule.t;
   const { user, userId, guildId } = extractCommandInfos(command);

   try {
      const cache = await osuModule.cache.get(guildId);
      cache.associations[userId] = username;

      await osuModule.cache.set(guildId, cache);

      command.reply(t('associateSuccess', guildId, { username }));
      logger.log({ id: 'LOG_Osu_Associated_Username', user, username });
   } catch (error) {
      logger.error({ id: 'LOG_Osu_Unable_Associate_Username', user, username, error });
   }
};
