import { CommandInteraction } from 'discord.js';
import { osuModule } from '..';
import { logger } from '../../../client';
import { extractCommandInfos } from '../../../utils/commandInteraction';
import { getScores, getUserScore } from '../api/entities/scores';
import { OsuScore } from '../api/types';
import { getDefaultUsername } from '../utils';
import { buildRecentReply } from './recent';

export const beatmap = async (command: CommandInteraction, id: number, username?: string) => {
   const t = osuModule.t;
   const { userId, guildId } = extractCommandInfos(command);

   if (!username) {
      username = await getDefaultUsername(userId, guildId);
   }

   if (username) {
      const scores = await getScores(`${id}`, username, 1);
      const score: OsuScore = {
         ...scores[0],
         id: `${id}`,
      };

      if (scores.length > 0) {
         const userScore = await getUserScore(score, username);
         command.editReply(buildRecentReply(userScore, command.guild));
      } else {
         logger.log({ id: 'LOG_Osu_User_Score_Not_Found', beatmapId: score.id, username });
         command.editReply(t('noUserScoreFound', guildId, { id, username }));
      }
   } else {
      command.editReply(t('noUsernameAssociated', guildId));
   }
};
