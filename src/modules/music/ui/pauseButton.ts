import { MessageButton, MessageComponentInteraction } from 'discord.js';
import { logger } from '../../../client';
import { pause } from '../subcommands/pause';

export const pauseButton = () => {
   const emoji = '<:pause:850790169883049985>';

   return new MessageButton({
      customID: 'music_pause',
      style: 'SECONDARY',
   }).setEmoji(emoji);
};

export const handlePause = async (interaction: MessageComponentInteraction) => {
   logger.log({
      id: 'LOG_Music_Pause_Command',
      username: interaction.member.user.username,
      guild: interaction.guild.name,
   });
   await pause(interaction);
};
