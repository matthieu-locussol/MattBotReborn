import { CommandInteraction, Guild, MessageEmbed } from 'discord.js';
import { StringMap, TOptions } from 'i18next';
import moment from 'moment';
import { osuModule } from '..';
import { bot, logger } from '../../../client';
import { extractCommandInfos } from '../../../utils/commandInteraction';
import { retrieveEmoji } from '../../../utils/guild';
import { clamp, elapsedTime, formatNumberSeparators } from '../../../utils/utils';
import { getRecentScore } from '../api/entities/recent';
import { OsuRecentScore } from '../api/types';
import { COLORS } from '../constants';
import { formatAccuracy, formatApproval, formatDuration, formatModsChart, formatStars } from '../utils';

export const recent = async (command: CommandInteraction, username?: string, index = 1) => {
   const t = osuModule.t;
   const { userId, guildId } = extractCommandInfos(command);

   if (!username) {
      logger.log({ id: 'LOG_Osu_Recent_Get_Username_From_Cache' });

      const cache = await osuModule.cache.get(guildId);
      username = cache.associations[userId];

      if (username === undefined) {
         logger.log({ id: 'LOG_Osu_Recent_No_Username_Matching' });
         command.editReply(t('noUsernameAssociated', guildId));
      }
   }

   if (username) {
      const limit = clamp(index, 1, 50);
      if (index !== limit) {
         logger.log({ id: 'LOG_Osu_Recent_Clamped', index, limit });
      }

      logger.log({ id: 'LOG_Osu_Recent_Retrieving_Score', username, index: limit });
      const score = await getRecentScore(username, limit);

      if (score) {
         command.editReply(buildReply(score, command.guild));
      } else {
         logger.log({ id: 'LOG_Osu_Recent_Not_Found', username });
         command.editReply(t('noRecentPlayFound', guildId, { username }));
      }
   }
};

const buildReply = (score: OsuRecentScore, guild: Guild) => {
   const t = osuModule.t;
   const locale = bot.getLocale(guild.id);
   const options = buildOptions(score, guild);

   moment.locale(locale);

   return new MessageEmbed({
      color: COLORS[score.rank],
      author: {
         name: t('recent.author', guild.id, options),
         iconURL: `https://a.ppy.sh/${score.playerId}`,
         url: `https://osu.ppy.sh/users/${score.playerId}`,
      },
      title: t('recent.title', guild.id, options),
      description: t('recent.description', guild.id, { ...options, context: computeDescriptionContext(score) }),
      url: `https://osu.ppy.sh/beatmaps/${score.id}`,
      thumbnail: {
         url: `https://b.ppy.sh/thumb/${score.setId}l.jpg`,
      },
      image: {
         url: `attachment://${score.id}_${formatModsChart(score.modsRaw)}.png`,
      },
      fields: [
         {
            name: t('recent.score', guild.id, { ...options, context: computeScoreContext(score) }),
            value: t('recent.details', guild.id, { ...options, context: computeDetailsContext(score) }),
         },
         {
            name: t('recent.infos', guild.id),
            value: t('recent.stats', guild.id, options),
         },
      ],
      footer: {
         text: t('recent.footer', guild.id, options),
         iconURL: `https://a.ppy.sh/${score.authorId}`,
      },
   }).attachFiles([`cache/osu/${score.id}_${formatModsChart(score.modsRaw)}.png`]);
};

const buildOptions = (score: OsuRecentScore, guild: Guild) => {
   const locale = bot.getLocale(guild.id);
   const stats = score.modsStats[score.modsBitset];
   const emoji = retrieveEmoji(guild, `Rank${score.rank}`);

   const options: TOptions<StringMap> = {
      ...score,
      ...stats,
      emoji,
      length: formatDuration(score.length),
      stars: formatStars(stats.stars),
      score: formatNumberSeparators(score.score),
      accuracy: formatAccuracy(score.accuracy),
      date: elapsedTime(score.date, locale),
      approval: formatApproval(score.approval, guild.id),
      approvalDate: new Date(score.approvalDate),
   };

   return options;
};

const computeDescriptionContext = (score: OsuRecentScore) => {
   const contexts: string[] = [];

   if (score.worldIndex > 0) {
      contexts.push('wr');
   }

   if (score.bestIndex > 0) {
      contexts.push('pb');
   }

   return contexts.join('_');
};

const computeScoreContext = (score: OsuRecentScore) => {
   const contexts: string[] = [];

   if (score.rank.includes('F')) {
      contexts.push('fail');
   }

   if (score.mods) {
      contexts.push('mods');
   }

   return contexts.join('_');
};

const computeDetailsContext = (score: OsuRecentScore) => {
   const contexts: string[] = [];

   if (score.fc) {
      contexts.push('fc');
   }

   return contexts.join('_');
};
