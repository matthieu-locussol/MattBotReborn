import { ApplicationCommandData, CommandInteraction } from 'discord.js';

export type CommandFn = (command: CommandInteraction) => void;

export type Command = {
   fn: CommandFn;
   infos: ApplicationCommandData;
};

export type PermissionList = {
   channels?: string[];
   users?: string[];
};

export type Module = {
   commands: Command[];
   name: string;
   blacklist?: PermissionList;
   whitelist?: PermissionList;
};
