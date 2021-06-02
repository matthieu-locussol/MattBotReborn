import axios from 'axios';
import { exec } from 'child-process-promise';
import { Api } from 'node-osu';
import { logger } from '../../../client';
import { OsuPpResult } from './types';

export const osuApi = new Api(process.env.OSU_API_KEY, {
   completeScores: false,
   notFoundAsError: false,
});

export const osuBeatmapApi = axios.create({
   baseURL: 'https://osu.lea.moe/b/',
});

export const osuPpApi = {
   compute: async (
      id: string,
      mods: string,
      combo: number | string,
      maxCombo: number | string,
      accuracy: number,
      misses = 0,
   ) => {
      const args = [mods, `${accuracy}%`, `${combo}x`, `${misses}m`, `${maxCombo}MAX`, `${id}ID`];

      logger.log({ id: 'LOG_Osu_Retrieving_Beatmap_File', beatmapId: id });

      const command = `curl https://osu.ppy.sh/osu/${id} | node build/modules/osu/api/parser ${args.join(' ')}`;
      const buffer = await exec(command);

      const bufferLines = buffer.stdout.split('\n');
      const bufferLogs = bufferLines.slice(0, bufferLines.length - 1);
      const bufferLastLine = bufferLines.reverse()[0];

      logger.logRaw(bufferLogs.join('\n'));

      const [stars, acc, pp, accFc, ppFc] = bufferLastLine.split(' ');
      logger.log({ id: 'LOG_Osu_Beatmap_File_Computed', beatmapId: id, acc, pp });
      logger.log({ id: 'LOG_Osu_Beatmap_File_Computed_FC', beatmapId: id, accFc, ppFc });

      const results: OsuPpResult = {
         stars,
         accuracy: acc,
         accuracyFc: accFc,
         pp,
         ppFc,
      };

      return results;
   },
};
