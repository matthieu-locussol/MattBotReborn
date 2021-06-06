import {
   ApplicationCommandData,
   ClientEvents,
   CommandInteraction,
   Message,
   MessageComponentInteraction,
} from 'discord.js';
import { StringMap } from 'i18next';
import KeyvFile from 'keyv-file';
import { resolve } from 'path';
import Keyv = require('keyv');
import { TranslationFunction } from '../locales';

export type CommandFn = (command: CommandInteraction) => void;

export interface Command extends ApplicationCommandData {
   fn: CommandFn;
}

export type PermissionList = {
   channels?: string[];
   users?: string[];
};

export type EventListener<K extends keyof ClientEvents> = {
   event: K;
   listener: (...args: ClientEvents[K]) => Awaited<void>;
};

export type Module<T = unknown> = {
   cache?: Keyv<T>;
   command: Command;
   name: string;
   blacklist?: PermissionList;
   whitelist?: PermissionList;
   t?: TranslationFunction<StringMap>;
   ui?: Record<string, (interaction: MessageComponentInteraction) => void>;
   listeners?: ((message: Message) => Awaited<void>)[];
};

/**
 * Builds a cache for a specific module given its name
 * @param moduleName The name of the module you want to build a cache for
 * @param expiredCheckDelay The duration you want to keep the value in the cache
 * @returns The cache object for the module
 */
export const buildCache = <T>(moduleName: string, expiredCheckDelay = 1000 * 60 * 60 * 24 * 365) => {
   return new Keyv<T>({
      store: new KeyvFile<T>({
         filename: resolve(__dirname, `../../cache/${moduleName}.json`),
         expiredCheckDelay,
      }),
   });
};
