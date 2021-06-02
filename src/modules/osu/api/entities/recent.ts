import { computePersonalBest, computeWorldBest, formatModsBitset, formatProgress } from '../../utils';
import { osuApi } from '../api';
import { OsuBeatmap, OsuPp, OsuRecentScore, OsuScore, OsuUser } from '../types';
import { getBeatmap } from './beatmap';
import { getBests } from './best';
import { getPp } from './pp';
import { getScores, parseScore } from './scores';
import { getUser } from './user';

export const getRecentScore = async (username: string, index: number): Promise<OsuRecentScore> => {
   const [recents, user] = await Promise.all([
      osuApi.getUserRecent({
         u: username,
         limit: index,
      }),
      getUser(username),
   ]);
   const recent = recents.pop();

   if (recent) {
      const score = parseScore(recent);
      const beatmap = await getBeatmap(recent.beatmapId);

      const [pp, userBestScores, beatmapBestScores] = await Promise.all([
         getPp(score, beatmap),
         getBests(username),
         getScores(beatmap.id),
      ]);

      const recentScore = parseRecent(score, beatmap, user, pp, userBestScores, beatmapBestScores);
      return recentScore;
   }
};

export const parseRecent = (
   score: OsuScore,
   beatmap: OsuBeatmap,
   user: OsuUser,
   pp: OsuPp,
   userBestScores: OsuScore[],
   beatmapBestScores: OsuScore[],
): OsuRecentScore => {
   const recentScore: OsuRecentScore = {
      bestIndex: computePersonalBest(score, userBestScores),
      worldIndex: computeWorldBest(score, beatmapBestScores),
      progress: formatProgress(score, beatmap),
      modsBitset: `${formatModsBitset(score.modsRaw)}`,
      ...score,
      ...beatmap,
      ...user,
      ...pp,
   };

   return recentScore;
};
