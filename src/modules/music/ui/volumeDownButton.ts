import { MessageButton, MessageComponentInteraction } from 'discord.js';
import { logger } from '../../../client';
import { volumeDown } from '../subcommands/volumeDown';

export const volumeDownButton = () => {
   const emoji = '<:minus:850790170063798322>';

   return new MessageButton({
      customID: 'music_volumeDown',
      style: 'SECONDARY',
   }).setEmoji(emoji);
};

export const handleVolumeDown = async (interaction: MessageComponentInteraction) => {
   logger.log({
      id: 'LOG_Music_VolumeDown_Command',
      username: interaction.member.user.username,
      guild: interaction.guild.name,
   });
   await volumeDown(interaction);
};
