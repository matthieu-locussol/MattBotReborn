import { Interaction } from 'discord.js';
import { musicModule } from '..';
import { logger } from '../../../client';
import { clamp } from '../../../utils/utils';
import { initializeCache, inMemoryCache } from '../cache';

export const volumeUp = async (interaction: Interaction) => {
   const t = musicModule.t;
   const member = interaction.guild.members.cache.find((member) => member.id === interaction.member.user.id);
   const guildId = member.guild.id;
   await initializeCache(member.guild.id);

   if (interaction.isCommand() || interaction.isMessageComponent()) {
      interaction.reply(t('commandRan', guildId, { name: 'volume up' }), { ephemeral: true });
   }

   const cache = await musicModule.cache.get(guildId);
   cache.volume = clamp(cache.volume + 1, 1, 10);
   logger.log({ id: 'LOG_Music_Caching_Volume', volume: cache.volume, guild: member.guild.name });
   await musicModule.cache.set(guildId, cache);

   if (inMemoryCache[guildId].dispatcher) {
      logger.log({ id: 'LOG_Music_Played_Volume', volume: cache.volume });
      inMemoryCache[guildId].dispatcher.setVolumeLogarithmic(cache.volume / 10);
   }
};
