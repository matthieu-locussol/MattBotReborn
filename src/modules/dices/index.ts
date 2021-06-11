import { CommandInteraction } from 'discord.js';
import { getIntegerOption, getStringOption } from '../../utils/commandInteractionOption';
import { clamp } from '../../utils/utils';
import type { Module } from '../Module';
import { DICE_TYPE, roll } from './subcommands/roll';

const dices = async (command: CommandInteraction) => {
   const type = getStringOption(command.options, 'type') || 'classic';
   const finalType = type as DICE_TYPE;
   const count = getIntegerOption(command.options, 'count') || 1;
   const finalCount = clamp(count, 1, 24);

   roll(command, finalType, finalCount);
};

export const dicesModule: Module = {
   name: 'Dices',
   command: {
      name: 'dices',
      description: 'Roll some dices',
      options: [
         {
            name: 'type',
            description: 'What kind of dice do yout want to roll? (default: classic)',
            type: 'STRING',
            choices: [
               {
                  name: 'Classic dice (1 to 6)',
                  value: 'classic',
               },
               {
                  name: 'Board dice (1 to 12)',
                  value: 'board',
               },
            ],
         },
         {
            name: 'count',
            description: 'How many dices do you want to roll? (defaut: 1)',
            type: 'INTEGER',
         },
      ],
      fn: dices,
   },
};
