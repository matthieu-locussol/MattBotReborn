export type OsuScore = {
   id: string;
   rank: string;
   playerId: string;
   date: string | Date;
   mods: string;
   modsRaw: number;
   accuracy: string | number;
   score: number;
   n50: number;
   n100: number;
   n300: number;
   miss: number;
   combo: number;
};

export type OsuRecentScore = OsuScore &
   OsuBeatmap &
   OsuUser &
   OsuPp & {
      bestIndex: number;
      worldIndex: number;
      progress: number;
      modsBitset: string;
   };

export type OsuBeatmapDifficulty = {
   cs: number;
   hp: number;
   ar: number;
   od: number;
   stars: string;
};

export type OsuBeatmap = {
   id: string;
   setId: string;
   artist: string;
   title: string;
   author: string;
   authorId: string;
   maxCombo: string;
   difficulty: string;
   length: string;
   hitObjects: number;
   bpm: string;
   approval: string;
   approvalDate: string;
   modsStats: Record<string, OsuBeatmapDifficulty>;
};

export type OsuUser = {
   player: string;
   ppUser: string;
   worldRank: string;
   countryRank: string;
   country: string;
};

export type OsuPp = {
   fc: boolean;
   pp: string;
   ppFc: string;
   accuracyFc: string;
};

export type OsuPpResult = {
   stars: string;
   accuracy: string;
   accuracyFc: string;
   pp: string;
   ppFc: string;
};

export type OsuMoeBeatmap = {
   beatmap: {
      beatmap_id: string;
      beatmapset_id: string;
      approved: string;
      total_length: string;
      hit_length: string;
      version: string;
      artist: string;
      title: string;
      creator: string;
      creator_id: string;
      mode: string;
      cs: string;
      od: string;
      ar: string;
      hp: string;
      approved_date: string;
      submitted_date: string;
      last_updated_date: string;
      bpm: string;
      bpm_min: string | null;
      bpm_max: string | null;
      source: string;
      tags: string;
      genre_id: string;
      language_id: string;
      max_combo: string;
      star_rating: string;
      star_rating_aim: string | null;
      star_rating_speed: string | null;
      hit_objects: number;
      num_circles: string;
      num_sliders: string;
      num_spinners: string;
      favorites: string;
      plays: string;
      passes: string;
      recalculate: string;
      max_score: string;
      packs: string;
      rating: string;
      video: string;
      storyboard: string;
      download_unavailable: string;
      audio_unavailable: string;
      file_md5: string;
      eyup_star_rating: string;
   };
   difficulty: {
      [level: string]: {
         aim: string;
         speed: string;
         od: string;
         ar: string;
         max_combo: string;
         total: string;
      };
   };
};
