import { CommandInteraction } from 'discord.js';
import { osuModule } from '..';
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
      const userScore = await getUserScore(score, username);

      command.editReply(buildRecentReply(userScore, command.guild));
   } else {
      command.editReply(t('noUsernameAssociated', guildId));
   }
};
