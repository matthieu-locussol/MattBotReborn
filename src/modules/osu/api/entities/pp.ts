import { logger } from '../../../../client';
import { formatAccuracy } from '../../utils';
import { osuPpApi } from '../api';
import { OsuBeatmap, OsuPp, OsuScore } from '../types';

export const getPp = async (score: OsuScore, beatmap: OsuBeatmap): Promise<OsuPp> => {
   logger.log({ id: 'LOG_Osu_Retrieving_Score_Pp', playerId: score.playerId, beatmapId: beatmap.id });

   const id = beatmap.id;
   const mods = score.mods;
   const accuracy = formatAccuracy(score.accuracy);
   const combo = score.combo;
   const misses = score.miss;
   const maxCombo = parseInt(beatmap.maxCombo);

   const results = await osuPpApi.compute(id, mods, combo, maxCombo, accuracy, misses);

   logger.log({ id: 'LOG_Osu_Pp_Computed' });

   const pp: OsuPp = {
      fc: results.pp === results.ppFc,
      pp: results.pp,
      ppFc: results.ppFc,
      accuracyFc: results.accuracyFc,
   };

   return pp;
};
