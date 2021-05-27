import Keyv = require('keyv');
import KeyvFile from 'keyv-file';
import { resolve } from 'path';
import { logger } from '../../client';
import { getIntegerOption, getStringOption } from '../../utils/commandInteractionOption';
import type { CommandFn, Module } from '../Module';
import { initializeCache, OsuModuleCache } from './cache';
import { associate } from './subcommands/associate';
import { beatmap } from './subcommands/beatmap';
import { recent } from './subcommands/recent';
import { top } from './subcommands/top';

const osu: CommandFn = async (command) => {
   await initializeCache(command);

   const subcommand = command.options[0];

   switch (subcommand.name) {
      case 'recent': {
         const username = getStringOption(subcommand.options, 'username');
         recent(command, username);
         break;
      }
      case 'beatmap': {
         const id = getIntegerOption(subcommand.options, 'id');
         const username = getStringOption(subcommand.options, 'username');
         beatmap(command, id, username);
         break;
      }
      case 'top': {
         const username = getStringOption(subcommand.options, 'username');
         const count = getIntegerOption(subcommand.options, 'count');
         top(command, username, count);
         break;
      }
      case 'associate': {
         const username = getStringOption(subcommand.options, 'username');
         associate(command, username);
         break;
      }
      default: {
         logger.warn({ id: 'LOG_Unkown_Module_Command', moduleName: osuModule.name });
         break;
      }
   }
};

export const osuModule: Module<OsuModuleCache> = {
   name: 'Osu!',
   cache: new Keyv<OsuModuleCache>({
      store: new KeyvFile<OsuModuleCache>({
         filename: resolve(__dirname, '../../../cache/osu.json'),
         expiredCheckDelay: 1000 * 60 * 60 * 24 * 365, // One year in ms
      }),
   }),
   command: {
      name: 'osu',
      description: 'Commands related to the osu! rythm game',
      options: [
         {
            name: 'recent',
            description: 'Returns the recent scores for an osu! user',
            type: 'SUB_COMMAND',
            options: [
               {
                  name: 'username',
                  description: 'The osu! user you want to get a recent score',
                  type: 'STRING',
               },
               {
                  name: 'index',
                  description: 'Which recent score do you want? The 1st? The 13th? (between 1 and 50)',
                  type: 'INTEGER',
               },
            ],
         },
         {
            name: 'beatmap',
            description: "Returns an osu! user's best score on a given beatmap",
            type: 'SUB_COMMAND',
            options: [
               {
                  name: 'id',
                  description: 'The id of the beatmap you want to look for the score',
                  type: 'INTEGER',
                  required: true,
               },
               {
                  name: 'username',
                  description: 'The osu! user you want to get the score',
                  type: 'STRING',
               },
            ],
         },
         {
            name: 'top',
            description: 'Returns an osu! player top scores',
            type: 'SUB_COMMAND',
            options: [
               {
                  name: 'username',
                  description: 'The osu! user you want to get the top scores',
                  type: 'STRING',
               },
               {
                  name: 'count',
                  description: 'How many top scores you want to retrieve (between 1 and 10)',
                  type: 'INTEGER',
               },
            ],
         },
         {
            name: 'associate',
            description: 'Associates an osu! username to your discord account',
            type: 'SUB_COMMAND',
            options: [
               {
                  name: 'username',
                  description: 'The osu! username you want to associate with your discord account',
                  type: 'STRING',
                  required: true,
               },
            ],
         },
      ],
      fn: osu,
   },
};
