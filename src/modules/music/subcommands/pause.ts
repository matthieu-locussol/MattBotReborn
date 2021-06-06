import { Interaction } from 'discord.js';
import { musicModule } from '..';
import { logger } from '../../../client';
import { initializeCache, inMemoryCache } from '../cache';

export const pause = async (interaction: Interaction) => {
   const t = musicModule.t;
   const member = interaction.guild.members.cache.find((member) => member.id === interaction.member.user.id);
   const guildId = member.guild.id;
   await initializeCache(member.guild.id);

   if (!interaction.isCommand() && !interaction.isMessageComponent()) {
      return;
   }

   if (!inMemoryCache[guildId].connection) {
      logger.log({ id: 'LOG_Music_No_Voice_Connection_Found', guild: member.guild.name });
      interaction.reply(t('botNotConnectedVoiceChannel', guildId), { ephemeral: true });
      return;
   }

   if (!inMemoryCache[guildId].dispatcher) {
      logger.log({ id: 'LOG_Music_No_Song_Playing', guild: member.guild.name });
      interaction.reply(t('noMusicBeingPlayed', guildId), { ephemeral: true });
      return;
   }

   interaction.reply(t('commandRan', guildId, { name: 'pause' }), { ephemeral: true });

   if (inMemoryCache[guildId].dispatcher?.paused) {
      logger.log({ id: 'LOG_Music_Resuming_Song' });
      inMemoryCache[guildId].dispatcher.resume();
      inMemoryCache[guildId].dispatcher.pause();
      inMemoryCache[guildId].dispatcher.resume();
   } else {
      logger.log({ id: 'LOG_Music_Pausing_Song' });
      inMemoryCache[guildId].dispatcher.pause();
   }
};
