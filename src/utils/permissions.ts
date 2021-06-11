import { CommandInteraction, Message } from 'discord.js';
import { logger } from '../client';
import { CommandFn, MessageFn, Module } from '../modules/Module';
import { extractCommandInfos } from './commandInteraction';
import { extractMessageInfos } from './message';

/**
 * Higher order function returning the given function only if it has the correct permissions.
 * @param fn The function which we want to execute if permissions are correct
 * @param module The module for which we want to check permissions
 * @returns
 */
export const permissionWrapper = (fn: CommandFn, module: Module): CommandFn => {
   if (module.whitelist && module.blacklist) {
      for (const key of Object.keys(module.whitelist)) {
         if (module.whitelist[key] !== undefined && module.blacklist[key] !== undefined) {
            logger.warn({ id: 'LOG_PermissionLists_Collision', listKey: key, moduleName: module.name });
         }
      }
   }

   fn = usersPermissionWrapper(fn, module);
   fn = channelsPermissionWrapper(fn, module);

   return fn;
};

const channelsPermissionWrapper = (fn: CommandFn, module: Module) => {
   return (command: CommandInteraction) => {
      const { channel } = extractCommandInfos(command);

      if (module.whitelist?.channels?.length > 0) {
         if (!module.whitelist.channels.includes(channel)) {
            logger.warn({ id: 'LOG_Whitelist_Channel', channel, moduleName: module.name });
            return;
         }
      }

      if (module.blacklist?.channels?.length > 0) {
         if (module.blacklist.channels.includes(channel)) {
            logger.warn({ id: 'LOG_Blacklist_Channel', channel, moduleName: module.name });
            return;
         }
      }

      fn(command);
   };
};

const usersPermissionWrapper = (fn: CommandFn, module: Module) => {
   return (command: CommandInteraction) => {
      const { user, userId } = extractCommandInfos(command);

      if (module.whitelist?.users?.length > 0) {
         if (!module.whitelist.users.includes(userId)) {
            logger.warn({ id: 'LOG_Whitelist_User', user, userId, moduleName: module.name });
            return;
         }
      }

      if (module.blacklist?.users?.length > 0) {
         if (module.blacklist.users.includes(userId)) {
            logger.warn({ id: 'LOG_Blacklist_User', user, userId, moduleName: module.name });
            return;
         }
      }

      fn(command);
   };
};

/**
 * Higher order function returning the given function only if it has the correct permissions.
 * @param fn The function which we want to execute if permissions are correct
 * @param module The module for which we want to check permissions
 * @returns
 */
export const permissionListenerWrapper = (fn: MessageFn, module: Module): MessageFn => {
   if (module.whitelist && module.blacklist) {
      for (const key of Object.keys(module.whitelist)) {
         if (module.whitelist[key] !== undefined && module.blacklist[key] !== undefined) {
            logger.warn({ id: 'LOG_PermissionLists_Collision', listKey: key, moduleName: module.name });
         }
      }
   }

   fn = usersPermissionListenerWrapper(fn, module);
   fn = channelsPermissionListenerWrapper(fn, module);

   return fn;
};

const channelsPermissionListenerWrapper = (fn: MessageFn, module: Module) => {
   return (message: Message) => {
      const { channel } = extractMessageInfos(message);

      if (module.whitelist?.channels?.length > 0) {
         if (!module.whitelist.channels.includes(channel)) {
            return;
         }
      }

      if (module.blacklist?.channels?.length > 0) {
         if (module.blacklist.channels.includes(channel)) {
            return;
         }
      }

      fn(message);
   };
};

const usersPermissionListenerWrapper = (fn: MessageFn, module: Module) => {
   return (message: Message) => {
      const { userId } = extractMessageInfos(message);

      if (module.whitelist?.users?.length > 0) {
         if (!module.whitelist.users.includes(userId)) {
            return;
         }
      }

      if (module.blacklist?.users?.length > 0) {
         if (module.blacklist.users.includes(userId)) {
            return;
         }
      }

      fn(message);
   };
};
