import { ApplicationCommandData, CommandInteraction } from 'discord.js';

export type Module = {
   commands: {
      infos: ApplicationCommandData;
      fn: (command: CommandInteraction) => void;
   }[];
};
