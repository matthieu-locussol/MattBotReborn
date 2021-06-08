import { CommandInteraction } from 'discord.js';
import { logger } from '../../client';
import { buildTranslationFunction } from '../../locales';
import { getStringOption } from '../../utils/commandInteractionOption';
import { buildCache, Module } from '../Module';
import { MusicModuleCache } from './cache';
import { youtubeLinkListener } from './listeners';
import { pause } from './subcommands/pause';
import { play } from './subcommands/play';
import { stop } from './subcommands/stop';
import { volumeDown } from './subcommands/volumeDown';
import { volumeUp } from './subcommands/volumeUp';
import { handlePause } from './ui/pauseButton';
import { handlePlay } from './ui/playButton';
import { handleStop } from './ui/stopButton';
import { handleVolumeDown } from './ui/volumeDownButton';
import { handleVolumeUp } from './ui/volumeUpButton';

const music = async (command: CommandInteraction) => {
   const subcommand = command.options.array()[0];

   switch (subcommand.name) {
      case 'play': {
         const songUrl = getStringOption(subcommand.options, 'url');
         play(command, songUrl);
         break;
      }
      case 'pause': {
         pause(command);
         break;
      }
      case 'stop': {
         stop(command);
         break;
      }
      case 'volume': {
         const value = getStringOption(subcommand.options, 'value');

         if (value === 'up') {
            volumeUp(command);
         } else if (value === 'down') {
            volumeDown(command);
         }

         break;
      }
      default: {
         logger.warn({ id: 'LOG_Unkown_Module_Command', moduleName: musicModule.name });
         break;
      }
   }
};

export const musicModule: Module<MusicModuleCache> = {
   name: 'Music',
   cache: buildCache('music'),
   t: buildTranslationFunction('music'),
   command: {
      name: 'music',
      description: 'Play some music!',
      options: [
         {
            name: 'play',
            description: 'Plays a YouTube music or livestream',
            type: 'SUB_COMMAND',
            options: [
               {
                  name: 'url',
                  description: 'The url (link) of the video you want to listen to',
                  type: 'STRING',
                  required: true,
               },
            ],
         },
         {
            name: 'pause',
            description: 'Pauses the music currently being played',
            type: 'SUB_COMMAND',
         },
         {
            name: 'stop',
            description: 'Stops the music currently being played',
            type: 'SUB_COMMAND',
         },
         {
            name: 'volume',
            description: 'Changes the MattBot volume on this server',
            type: 'SUB_COMMAND',
            options: [
               {
                  name: 'value',
                  description: 'Whether you want to increase or decrease the volume',
                  type: 'STRING',
                  choices: [
                     {
                        name: 'Up',
                        value: 'up',
                     },
                     {
                        name: 'Down',
                        value: 'down',
                     },
                  ],
                  required: true,
               },
            ],
         },
      ],
      fn: music,
   },
   ui: {
      music_play: handlePlay,
      music_pause: handlePause,
      music_stop: handleStop,
      music_volumeDown: handleVolumeDown,
      music_volumeUp: handleVolumeUp,
   },
   listeners: [youtubeLinkListener],
   whitelist: {
      channels: ['playlists'],
   },
};
