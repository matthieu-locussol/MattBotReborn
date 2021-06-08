import { Message, MessageActionRow } from 'discord.js';
import { musicModule } from '.';
import { logger } from '../../client';
import { extractMessageInfos, sentByBot } from '../../utils/message';
import { pauseButton } from './ui/pauseButton';
import { playButton } from './ui/playButton';
import { stopButton } from './ui/stopButton';
import { volumeDownButton } from './ui/volumeDownButton';
import { volumeUpButton } from './ui/volumeUpButton';

const YOUTUBE_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌[\w?‌=]*)?/;

export const youtubeLinkListener = (message: Message) => {
   const t = musicModule.t;

   if (sentByBot(message)) {
      return;
   }

   if (!YOUTUBE_REGEX.test(message.content)) {
      return;
   }

   logger.log({ id: 'LOG_Music_Listener_Youtube', username: message.member.user.username });

   message.delete();

   const content = t('messageSentBy', message.guild.id, {
      username: message.member.user.username,
      link: message.content,
   });

   message.channel.send(content, {
      components: [
         new MessageActionRow({
            type: 'BUTTON',
            components: [playButton(), pauseButton(), stopButton(), volumeDownButton(), volumeUpButton()],
         }),
      ],
   });
};
