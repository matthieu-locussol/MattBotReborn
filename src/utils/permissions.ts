import { CommandInteraction } from 'discord.js';
import { logger } from '../client';
import { CommandFn, Module } from '../modules/Module';

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
      const guild = command.client.guilds.cache.get(command.guildID);
      const channel = guild.channels.resolve(command.channelID);

      if (module.whitelist?.channels?.length > 0) {
         if (!module.whitelist.channels.includes(channel.name)) {
            return;
         }
      }

      if (module.blacklist?.channels?.length > 0) {
         if (module.blacklist.channels.includes(channel.name)) {
            return;
         }
      }

      fn(command);
   };
};

const usersPermissionWrapper = (fn: CommandFn, module: Module) => {
   return (command: CommandInteraction) => {
      const userId = command.member.user.id;

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

      fn(command);
   };
};
