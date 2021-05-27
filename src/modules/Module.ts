import { ApplicationCommandData, CommandInteraction } from 'discord.js';
import Keyv = require('keyv');

export type CommandFn = (command: CommandInteraction) => void;

export type Command = {
   fn: CommandFn;
   infos: ApplicationCommandData;
};

export type PermissionList = {
   channels?: string[];
   users?: string[];
};

export type Module<T = unknown> = {
   cache?: Keyv<T>;
   commands: Command[];
   name: string;
   blacklist?: PermissionList;
   whitelist?: PermissionList;
};
