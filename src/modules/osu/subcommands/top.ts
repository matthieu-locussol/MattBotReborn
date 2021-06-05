import { CommandInteraction, Guild, MessageEmbed } from 'discord.js';
import { StringMap, TOptions } from 'i18next';
import moment from 'moment';
import { osuModule } from '..';
import { bot, logger } from '../../../client';
import { extractCommandInfos } from '../../../utils/commandInteraction';
import { retrieveEmoji } from '../../../utils/guild';
import { clamp, elapsedTime } from '../../../utils/utils';
import { getBestScores } from '../api/entities/scores';
import { OsuBestScores } from '../api/types';
import { COLORS } from '../constants';
import { formatAccuracy, getDefaultUsername } from '../utils';

export const top = async (command: CommandInteraction, username?: string, count = 5) => {
   const t = osuModule.t;
   const { userId, guildId } = extractCommandInfos(command);

   if (!username) {
      username = await getDefaultUsername(userId, guildId);
   }

   if (username) {
      const limit = clamp(count, 1, 10);
      if (count !== limit) {
         logger.log({ id: 'LOG_Osu_Bests_Clamped', count, limit });
      }

      const scores = await getBestScores(username, limit);

      if (scores.scores.length > 0) {
         command.editReply(buildTopReply(scores, command.guild));
      } else {
         logger.log({ id: 'LOG_Osu_Bests_Never_Played', username });
         command.editReply(t('noPlayFound', guildId, { username }));
      }
   }
};

export const buildTopReply = (bestScores: OsuBestScores, guild: Guild) => {
   const t = osuModule.t;
   const locale = bot.getLocale(guild.id);
   const options = buildOptions(bestScores);

   moment.locale(locale);

   return new MessageEmbed({
      color: COLORS[bestScores.scores[0].score.rank],
      author: {
         name: t('top.author', guild.id, options),
         iconURL: `https://osu.ppy.sh/images/flags/${bestScores.country}.png`,
         url: `https://osu.ppy.sh/users/${bestScores.scores[0].score.playerId}`,
      },
      url: `https://osu.ppy.sh/users/${bestScores.scores[0].score.playerId}`,
      thumbnail: { url: `https://a.ppy.sh/${bestScores.scores[0].score.playerId}` },
      fields: bestScores.scores.map(({ score, beatmap }) => {
         const emoji = retrieveEmoji(guild, `Rank${score.rank}`);
         const context = score.mods ? 'mods' : '';

         return {
            name: t('top.name', guild.id, {
               emoji,
               mods: score.mods,
               title: beatmap.title,
               context,
            }),
            value: t('top.value', guild.id, {
               pp: score.pp,
               accuracy: formatAccuracy(score.accuracy),
               difficulty: beatmap.difficulty,
               url: `https://osu.ppy.sh/beatmaps/${beatmap.id}`,
               date: elapsedTime(score.date),
            }),
         };
      }),
      footer: {
         text: t('top.footer', guild.id, options),
      },
   });
};

const buildOptions = (bestScores: OsuBestScores) => {
   const options: TOptions<StringMap> = {
      ...bestScores,
   };

   return options;
};
