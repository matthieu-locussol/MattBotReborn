import { Beatmap } from 'node-osu';
import { osuModule } from '../..';
import { logger } from '../../../../client';
import { mapObject } from '../../../../utils/utils';
import { formatStat } from '../../utils';
import { osuBeatmapApi } from '../api';
import { OsuBeatmap, OsuMoeBeatmap } from '../types';

export const getBeatmap = async (id: string | Beatmap): Promise<OsuBeatmap> => {
   const beatmapId = `${id}`;
   logger.log({ id: 'LOG_Osu_Retrieving_Beatmap', beatmapId });
   const cacheGlobal = await osuModule.cache.get('global');

   if (cacheGlobal.beatmaps[beatmapId]) {
      logger.log({ id: 'LOG_Osu_Beatmap_Found_Cache' });
      return cacheGlobal.beatmaps[beatmapId];
   }

   logger.log({ id: 'LOG_Osu_Beatmap_Not_Found_Cache' });

   const beatmapResponse = await osuBeatmapApi(beatmapId);
   const beatmapData = beatmapResponse.data;
   const beatmap = parseBeatmap(beatmapData);

   logger.log({ id: 'LOG_Osu_Beatmap_Cached' });

   cacheGlobal.beatmaps[beatmapId] = beatmap;
   await osuModule.cache.set('global', cacheGlobal);

   return beatmap;
};

export const parseBeatmap = (beatmap: OsuMoeBeatmap): OsuBeatmap => {
   const osuBeatmap: OsuBeatmap = {
      id: beatmap.beatmap.beatmap_id,
      setId: beatmap.beatmap.beatmapset_id,
      artist: beatmap.beatmap.artist,
      title: beatmap.beatmap.title,
      author: beatmap.beatmap.creator,
      authorId: beatmap.beatmap.creator_id,
      maxCombo: beatmap.beatmap.max_combo,
      difficulty: beatmap.beatmap.version,
      length: beatmap.beatmap.total_length,
      hitObjects: beatmap.beatmap.hit_objects,
      bpm: beatmap.beatmap.bpm,
      approval: beatmap.beatmap.approved,
      approvalDate: beatmap.beatmap.approved_date,
      modsStats: mapObject(beatmap.difficulty, (key) => ({
         cs: formatStat(beatmap.beatmap.cs),
         hp: formatStat(beatmap.beatmap.hp),
         ar: formatStat(beatmap.difficulty[key].ar),
         od: formatStat(beatmap.difficulty[key].od),
         stars: beatmap.difficulty[key].total,
      })),
   };

   return osuBeatmap;
};
