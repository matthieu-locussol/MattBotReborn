import { Score } from 'node-osu';
import { logger } from '../../../../client';
import { computeAccuracy, formatMods } from '../../utils';
import { osuApi } from '../api';
import { OsuBestScores, OsuRecentScore, OsuScore } from '../types';
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
   logger.log({ id: 'LOG_Osu_Retrieving_User_Score', beatmapId: score.id, username });

   const [beatmap, user, userBestScores] = await Promise.all([
      getBeatmap(score.id),
      getUser(username),
      getBests(username),
   ]);

   const [pp, beatmapBestScores] = await Promise.all([getPp(score, beatmap), getScores(beatmap.id)]);

   const recentScore = parseRecent(score, beatmap, user, pp, userBestScores, beatmapBestScores);
   return recentScore;
};

export const getBestScores = async (username: string, count: number): Promise<OsuBestScores> => {
   const [user, scores] = await Promise.all([getUser(username), getBests(username, count)]);
   const beatmaps = await Promise.all(scores.map((score) => getBeatmap(score.id)));

   const bestScores: OsuBestScores = {
      ...user,
      scores: scores.map((score, id) => ({
         score,
         beatmap: beatmaps[id],
      })),
   };

   return bestScores;
};

export const parseScore = (score: Score): OsuScore => {
   const osuScore: OsuScore = {
      id: `${score.beatmapId}`,
      pp: `${score.pp}`,
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
