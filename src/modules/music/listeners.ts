import { Message, MessageActionRow } from 'discord.js';
import { logger } from '../../client';
import { sentByBot } from '../../utils/message';
import { pauseButton } from './ui/pauseButton';
import { playButton } from './ui/playButton';
import { stopButton } from './ui/stopButton';
import { volumeDownButton } from './ui/volumeDownButton';
import { volumeUpButton } from './ui/volumeUpButton';

const YOUTUBE_REGEX = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌[\w?‌=]*)?/;

export const youtubeLinkListener = (message: Message) => {
   if (sentByBot(message)) {
      return;
   }

   if (!YOUTUBE_REGEX.test(message.content)) {
      return;
   }

   logger.log({ id: 'LOG_Music_Listener_Youtube', username: message.member.user.username });

   message.delete();

   message.channel.send(message.content, {
      components: [
         new MessageActionRow({
            type: 'BUTTON',
            components: [playButton(), pauseButton(), stopButton(), volumeDownButton(), volumeUpButton()],
         }),
      ],
   });
};
