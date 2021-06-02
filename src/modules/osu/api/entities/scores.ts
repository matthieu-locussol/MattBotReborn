import { Score } from 'node-osu';
import { logger } from '../../../../client';
import { computeAccuracy, formatMods } from '../../utils';
import { osuApi } from '../api';
import { OsuScore } from '../types';

export const getScores = async (beatmapId: string, limit = 100): Promise<OsuScore[]> => {
   logger.log({ id: 'LOG_Osu_Retrieving_Scores', beatmapId, limit });

   const scores = await osuApi.getScores({ b: beatmapId, limit });
   const osuScores = scores.map((s) => parseScore(s));

   logger.log({ id: 'LOG_Osu_Scores_Found', beatmapId, count: osuScores.length });

   return osuScores;
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
