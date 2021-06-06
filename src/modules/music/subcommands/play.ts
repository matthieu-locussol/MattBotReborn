import { Interaction } from 'discord.js';
import ytdl from 'ytdl-core-discord';
import { musicModule } from '..';
import { logger } from '../../../client';
import { initializeCache, inMemoryCache } from '../cache';

export const play = async (interaction: Interaction, songUrl: string) => {
   const t = musicModule.t;
   const member = interaction.guild.members.cache.find((member) => member.id === interaction.member.user.id);
   const guildId = member.guild.id;
   await initializeCache(member.guild.id);

   if (interaction.isCommand() || interaction.isMessageComponent()) {
      interaction.reply(t('commandRan', guildId, { name: 'play' }), { ephemeral: true });
   }

   const cache = await musicModule.cache.get(guildId);

   if (!inMemoryCache[guildId].connection) {
      logger.log({ id: 'LOG_Music_No_Voice_Connection_Found', guild: member.guild.name });
      const voiceChannel = member.voice.channel;

      if (!voiceChannel) {
         logger.log({ id: 'LOG_Music_No_Voice_Channel', guild: member.guild.name, username: member.user.username });
         return;
      }

      logger.log({ id: 'LOG_Music_Voice_Connecting', guild: member.guild.name, channel: voiceChannel.name });
      inMemoryCache[guildId].connection = await voiceChannel.join();
   } else if (inMemoryCache[guildId].connection.channel.id !== member.voice.channelID) {
      logger.log({
         id: 'LOG_Music_Changed_Voice_Channel',
         guild: member.guild.name,
         oldChannel: inMemoryCache[guildId].connection.channel.name,
         newChannel: member.voice.channel.name,
      });

      const voiceChannel = member.voice.channel;
      inMemoryCache[guildId].dispatcher?.destroy();
      inMemoryCache[guildId].connection = await voiceChannel.join();
   }

   const song = ytdl(songUrl, {
      highWaterMark: 1 << 25,
      quality: 'highestaudio',
   });

   logger.log({ id: 'LOG_Music_Playing_Song' });
   const connection = inMemoryCache[guildId].connection;
   const dispatcher = connection.play(await song, { type: 'opus' });
   dispatcher.setVolumeLogarithmic(cache.volume / 10);

   inMemoryCache[guildId].dispatcher = dispatcher;
};
