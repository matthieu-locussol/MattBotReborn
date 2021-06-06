import { MessageButton, MessageComponentInteraction } from 'discord.js';
import { logger } from '../../../client';
import { play } from '../subcommands/play';

export const playButton = () => {
   const emoji = '<:play:850790170051870770>';

   return new MessageButton({
      customID: 'music_play',
      style: 'SECONDARY',
   }).setEmoji(emoji);
};

export const handlePlay = async (interaction: MessageComponentInteraction) => {
   logger.log({
      id: 'LOG_Music_Play_Command',
      username: interaction.member.user.username,
      songUrl: interaction.message.content,
      guild: interaction.guild.name,
   });
   await play(interaction, interaction.message.content);
};
