import { ApplicationCommandData, CommandInteraction } from 'discord.js';
import Keyv = require('keyv');

export type CommandFn = (command: CommandInteraction) => void;

export interface Command extends ApplicationCommandData {
   fn: CommandFn;
}

export type PermissionList = {
   channels?: string[];
   users?: string[];
};

export type Module<T = unknown> = {
   cache?: Keyv<T>;
   command: Command;
   name: string;
   blacklist?: PermissionList;
   whitelist?: PermissionList;
};
