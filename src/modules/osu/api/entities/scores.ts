import { Score } from 'node-osu';
import { logger } from '../../../../client';
import { computeAccuracy, formatMods } from '../../utils';
import { osuApi } from '../api';
import { OsuRecentScore, OsuScore } from '../types';
import { getBeatmap } from './beatmap';
import { getBests } from './best';
import { getPp } from './pp';
import { parseRecent } from './recent';
import { getUser } from './user';

export const getScores = async (beatmapId: string, username?: string, limit = 100): Promise<OsuScore[]> => {
   logger.log({ id: 'LOG_Osu_Retrieving_Scores', beatmapId, username, limit });

   const scores = await osuApi.getScores({ b: beatmapId, u: username, limit });
   const osuScores = scores.map((s) => parseScore(s));

   logger.log({ id: 'LOG_Osu_Scores_Found', beatmapId, username, count: osuScores.length });

   return osuScores;
};

export const getUserScore = async (score: OsuScore, username: string): Promise<OsuRecentScore> => {
   const beatmap = await getBeatmap(score.id);

   const [user, pp, userBestScores, beatmapBestScores] = await Promise.all([
      getUser(username),
      getPp(score, beatmap),
      getBests(username),
      getScores(beatmap.id),
   ]);

   const recentScore = parseRecent(score, beatmap, user, pp, userBestScores, beatmapBestScores);
   return recentScore;
};

export const parseScore = (score: Score): OsuScore => {
   const osuScore: OsuScore = {
      id: `${score.beatmapId}`,
      rank: score.rank,
      playerId: score.user.id,
      date: score.date,
      score: score.score,
      n50: score.counts[50],
      n100: score.counts[100],
      n300: score.counts[300],
      miss: score.counts.miss,
      combo: score.maxCombo,
      modsRaw: score.raw_mods,
      mods: formatMods(score.raw_mods),
      accuracy: computeAccuracy(score),
   };

   return osuScore;
};
