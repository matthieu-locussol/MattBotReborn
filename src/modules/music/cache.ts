import { StreamDispatcher, VoiceConnection } from 'discord.js';
import { musicModule } from '.';

export type MusicModuleInMemoryCache = {
   loop: boolean;
   queue: string[];
   connection: VoiceConnection;
   dispatcher: StreamDispatcher;
};

export const inMemoryCache: Record<string, MusicModuleInMemoryCache> = {};

export const defaultInMemoryCache = (): MusicModuleInMemoryCache => ({
   loop: false,
   queue: [],
   connection: null,
   dispatcher: null,
});

export type MusicModuleCache = {
   volume: number;
};

export const defaultCache: MusicModuleCache = {
   volume: 3,
};

export const initializeCache = async (guildId: string) => {
   const cache = await musicModule.cache.get(guildId);

   if (!cache) {
      musicModule.cache.set(guildId, defaultCache);
   }

   if (!inMemoryCache[guildId]) {
      inMemoryCache[guildId] = defaultInMemoryCache();
   }
};
