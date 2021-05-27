import { bot } from '../../client';
import { extractCommandInfos } from '../../utils/commandInteraction';
import { getStringOption } from '../../utils/commandInteractionOption';
import type { CommandFn, Module } from '../Module';

const lang: CommandFn = (command) => {
   const { guildId } = extractCommandInfos(command);
   const language = getStringOption(command.options, 'lang');

   bot.setLocale(guildId, language);
};

export const langModule: Module = {
   name: 'Lang',
   command: {
      name: 'lang',
      description: 'Change the MattBot language',
      options: [
         {
            name: 'lang',
            description: 'The new language you want to switch to',
            type: 'STRING',
            choices: [
               {
                  name: 'Français',
                  value: 'fr',
               },
               {
                  name: 'English',
                  value: 'en',
               },
            ],
            required: true,
         },
      ],
      fn: lang,
   },
};
