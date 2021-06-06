import { Interaction } from 'discord.js';
import { musicModule } from '..';
import { logger } from '../../../client';
import { initializeCache, inMemoryCache } from '../cache';

export const stop = async (interaction: Interaction) => {
   const t = musicModule.t;
   const member = interaction.guild.members.cache.find((member) => member.id === interaction.member.user.id);
   const guildId = member.guild.id;
   await initializeCache(member.guild.id);

   if (!interaction.isCommand() && !interaction.isMessageComponent()) {
      return;
   }

   if (!inMemoryCache[guildId].connection) {
      logger.log({ id: 'LOG_Music_No_Voice_Connection_Found', guild: member.guild.name });
      interaction.reply(t('notConnectedVoiceChannel', guildId));
      return;
   }

   interaction.reply(t('commandRan', guildId, { name: 'stop' }), { ephemeral: true });

   logger.log({ id: 'LOG_Music_Disconnected' });
   inMemoryCache[guildId].connection.disconnect();
   inMemoryCache[guildId].connection = null;

   if (inMemoryCache[guildId].dispatcher) {
      logger.log({ id: 'LOG_Music_Dispatcher_Ended' });
      inMemoryCache[guildId].dispatcher.end();
      inMemoryCache[guildId].dispatcher = null;
   }
};
