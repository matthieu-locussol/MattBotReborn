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
            description: 'What kind of dice do yout want to roll? (default: d6)',
            type: 'STRING',
            choices: [
               {
                  name: 'D6',
                  value: 'd6',
               },
               {
                  name: 'D12',
                  value: 'd12',
               },
               {
                  name: 'D20',
                  value: 'd20',
               },
            ],
         },
         {
            name: 'count',
            description: 'How many dices do you want to roll? (default: 1)',
            type: 'INTEGER',
         },
      ],
      fn: dices,
   },
};
