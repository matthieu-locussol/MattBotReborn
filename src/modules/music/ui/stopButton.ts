import { MessageButton, MessageComponentInteraction } from 'discord.js';
import { logger } from '../../../client';
import { stop } from '../subcommands/stop';

export const stopButton = () => {
   const emoji = '<:stop:850790170226851880>';

   return new MessageButton({
      customID: 'music_stop',
      style: 'SECONDARY',
   }).setEmoji(emoji);
};

export const handleStop = async (interaction: MessageComponentInteraction) => {
   logger.log({
      id: 'LOG_Music_Stop_Command',
      username: interaction.member.user.username,
      guild: interaction.guild.name,
   });
   await stop(interaction);
};
