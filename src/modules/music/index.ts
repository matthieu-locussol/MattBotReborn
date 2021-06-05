import { MessageActionRow, MessageButton } from 'discord.js';
import { buildTranslationFunction } from '../../locales';
import type { CommandFn, Module } from '../Module';
import { musicUi } from './ui';

const music: CommandFn = async (command) => {
   const emoji = command.guild.emojis.cache.find((e) => e.name === 'play');

   command.reply('https://www.youtube.com/watch?v=Ksh4KpuZLJk', {
      components: [
         new MessageActionRow({
            type: 'BUTTON',
            components: [
               new MessageButton({
                  customID: 'button',
                  style: 'PRIMARY',
                  label: 'Bouton 1',
               }),
               new MessageButton({
                  customID: 'button2',
                  style: 'SECONDARY',
                  emoji,
               }),
            ],
         }),
      ],
   });
};

export const musicModule: Module = {
   name: 'Music',
   t: buildTranslationFunction('music'),
   command: {
      name: 'music',
      description: 'Play some music!',
      fn: music,
   },
   ui: musicUi,
};
