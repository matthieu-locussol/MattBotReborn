import { Score } from 'node-osu';
import { osuModule } from '.';
import { logger } from '../../client';
import { OsuBeatmap, OsuScore } from './api/types';
import { BEATMAP_STATE, MODS } from './constants';

export const computeAccuracy = (score: Score) => {
   const n300 = score.counts[300];
   const n100 = score.counts[100];
   const n50 = score.counts[50];
   const miss = score.counts.miss;

   const value = n300 * 300 + n100 * 100 + n50 * 50;
   const total = n300 * 1 + n100 * 1 + n50 * 1 + miss * 1;
   const accuracy = value / (total * 300);

   return accuracy;
};

export const formatAccuracy = (accuracy: string | number) => {
   if (typeof accuracy === 'string') {
      accuracy = parseFloat(accuracy);
   }

   return Math.round(accuracy * 10000) / 100;
};

export const formatStars = (stars: string) => {
   const starsNumber = parseFloat(stars);
   const starsRounded = Math.round(starsNumber * 100) / 100;

   return starsRounded;
};

export const formatDigit = (number: number) => {
   if (number <= 9) {
      return `0${number}`;
   }

   return `${number}`;
};

export const formatDuration = (duration: string | number) => {
   if (typeof duration === 'string') {
      duration = parseInt(duration);
   }

   const minutes = Math.floor(duration / 60);
   const seconds = duration % 60;

   return `${minutes}:${formatDigit(seconds)}`;
};

export const formatApproval = (approval: string, guildId: string) => {
   const t = osuModule.t;
   const key = BEATMAP_STATE[approval];

   return t(key, guildId);
};

export const formatMods = (modsRaw: number) => {
   const mods: string[] = [];

   if (modsRaw & MODS['NoFail']) mods.push('NF');
   if (modsRaw & MODS['Easy']) mods.push('EZ');
   if (modsRaw & MODS['Hidden']) mods.push('HD');
   if (modsRaw & MODS['HardRock']) mods.push('HR');
   if (modsRaw & MODS['HalfTime']) mods.push('HT');
   if (modsRaw & MODS['Flashlight']) mods.push('FL');
   if (modsRaw & MODS['SpunOut']) mods.push('SO');
   if (modsRaw & MODS['NoFail']) mods.push('NF');
   if (modsRaw & MODS['DoubleTime'] && modsRaw & MODS['Nightcore']) mods.push('NC');
   if (modsRaw & MODS['DoubleTime'] && !(modsRaw & MODS['Nightcore'])) mods.push('DT');
   if (modsRaw & MODS['SuddenDeath'] && modsRaw & MODS['Perfect']) mods.push('PF');
   if (modsRaw & MODS['SuddenDeath'] && !(modsRaw & MODS['Perfect'])) mods.push('SD');

   if (mods.length === 0) {
      return '';
   }

   return `+${mods.join('')}`;
};

export const formatModsChart = (modsRaw: number) => {
   if (modsRaw & MODS['DoubleTime'] && modsRaw & MODS['Nightcore']) {
      modsRaw -= MODS['DoubleTime'];
   }

   if (modsRaw & MODS['SuddenDeath'] && modsRaw & MODS['Perfect']) {
      modsRaw -= MODS['SuddenDeath'];
   }

   return modsRaw;
};

export const formatModsBitset = (modsRaw: number) => {
   const bitset: number[] = [];

   if (modsRaw & MODS['Easy']) bitset.push(MODS['Easy']);
   if (modsRaw & MODS['HardRock']) bitset.push(MODS['HardRock']);
   if (modsRaw & MODS['HalfTime']) bitset.push(MODS['HalfTime']);
   if (modsRaw & MODS['DoubleTime']) bitset.push(MODS['DoubleTime']);

   return bitset.reduce((acc, value) => acc + value, 0);
};

export const formatProgress = (score: OsuScore, beatmap: OsuBeatmap) => {
   const total = score.n300 * 1 + score.n100 * 1 + score.n50 * 1 + score.miss * 1;
   const count = beatmap.hitObjects;

   return formatAccuracy(total / count);
};

export const formatStat = (stat: string | number) => {
   if (typeof stat === 'string') {
      stat = parseFloat(stat);
   }

   return Math.round(stat * 10) / 10;
};

export const computePersonalBest = (score: OsuScore, bestScores: OsuScore[]) => {
   const itemIndex = bestScores.findIndex((best) => best.id === score.id && best.score === score.score);
   const itemExists = itemIndex !== -1;
   const scoreIndex = itemExists ? itemIndex + 1 : 0;

   return scoreIndex;
};

export const computeWorldBest = (score: OsuScore, beatmapScores: OsuScore[]) => {
   const itemIndex = beatmapScores.findIndex((best) => best.score === score.score);
   const itemExists = itemIndex !== -1;
   const scoreIndex = itemExists ? itemIndex + 1 : 0;

   return scoreIndex;
};

export const getDefaultUsername = async (userId: string, guildId: string) => {
   logger.log({ id: 'LOG_Osu_Recent_Get_Username_From_Cache' });

   const cache = await osuModule.cache.get(guildId);
   const username = cache.associations[userId];

   if (username === undefined) {
      logger.log({ id: 'LOG_Osu_Recent_No_Username_Matching' });
   }

   return username;
};
