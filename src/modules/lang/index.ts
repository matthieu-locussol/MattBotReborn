import { bot, logger } from '../../client';
import { buildTranslationFunction } from '../../locales';
import { extractCommandInfos } from '../../utils/commandInteraction';
import { getStringOption } from '../../utils/commandInteractionOption';
import type { CommandFn, Module } from '../Module';

const lang: CommandFn = (command) => {
   const t = langModule.t;
   const { guildId } = extractCommandInfos(command);
   const language = getStringOption(command.options, 'lang');

   bot.setLocale(guildId, language);

   logger.log({ id: 'LOG_Lang_Updated', language, guildId });
   command.reply(t('successfullyChanged', guildId));
};

export const langModule: Module = {
   name: 'Lang',
   t: buildTranslationFunction('lang'),
   command: {
      name: 'lang',
      description: 'Change the MattBot language',
      options: [
         {
            name: 'lang',
            description: 'The new language you want to switch your server to',
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
