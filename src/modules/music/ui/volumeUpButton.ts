import { MessageButton, MessageComponentInteraction } from 'discord.js';
import { logger } from '../../../client';
import { volumeUp } from '../subcommands/volumeUp';

export const volumeUpButton = () => {
   const emoji = '<:plus:850790170088964187>';

   return new MessageButton({
      customID: 'music_volumeUp',
      style: 'SECONDARY',
   }).setEmoji(emoji);
};

export const handleVolumeUp = async (interaction: MessageComponentInteraction) => {
   logger.log({
      id: 'LOG_Music_VolumeDown_Command',
      username: interaction.member.user.username,
      guild: interaction.guild.name,
   });
   await volumeUp(interaction);
};
