import { ApplicationCommandData, CommandInteraction } from 'discord.js';

export type CommandFn = (command: CommandInteraction) => void;

export type Command = {
   infos: ApplicationCommandData;
   fn: CommandFn;
};

export type Module = {
   commands: Command[];
};
