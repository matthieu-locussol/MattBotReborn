import { logger } from '../../../../client';
import { osuApi } from '../api';
import { OsuScore } from '../types';
import { parseScore } from './scores';

export const getBests = async (username: string, limit = 100): Promise<OsuScore[]> => {
   logger.log({ id: 'LOG_Osu_Retrieving_Best_Scores', username, limit });

   const bests = await osuApi.getUserBest({
      u: username,
      limit,
   });
   const bestScores = bests.map((b) => parseScore(b));

   logger.log({ id: 'LOG_Osu_Best_Scores_Found', username, count: bestScores.length });

   return bestScores;
};
