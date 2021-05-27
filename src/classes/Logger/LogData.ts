import { CommandInteractionOption } from 'discord.js';

export const LOG_LOGGED_IN = 'LOG_Logged_In';
export const LOG_PERMISSIONLISTS_COLLISION = 'LOG_PermissionLists_Collision';
export const LOG_ADD_MODULE = 'LOG_Add_Module';
export const LOG_RECEIVED_COMMAND = 'LOG_Received_Command';
export const LOG_POPULATE_GUILD = 'LOG_Populate_Guild';
export const LOG_POPULATE_GLOBAL = 'LOG_Populate_Global';
export const LOG_POPULATE_GUILD_UNAUTHORIZED = 'LOG_Populate_Guild_Unauthorized';
export const LOG_POPULATE_GLOBAL_UNAUTHORIZED = 'LOG_Populate_Global_Unauthorized';
export const LOG_WHITELIST_CHANNEL = 'LOG_Whitelist_Channel';
export const LOG_BLACKLIST_CHANNEL = 'LOG_Blacklist_Channel';
export const LOG_WHITELIST_USER = 'LOG_Whitelist_User';
export const LOG_BLACKLIST_USER = 'LOG_Blacklist_User';
export const LOG_MODULE_COMMAND_DUPLICATE = 'LOG_Module_Command_Duplicate';
export const LOG_UNKNOWN_MODULE_COMMAND = 'LOG_Unkown_Module_Command';
export const LOG_OSU_UNABLE_ASSOCIATE_USERNAME = 'LOG_Osu_Unable_Associate_Username';
export const LOG_OSU_ASSOCIATED_USERNAME = 'LOG_Osu_Associated_Username';
export const LOG_LANG_UPDATED = 'LOG_Lang_Updated';
export const LOG_BOT_JOINED_GUILD = 'LOG_Bot_Joined_Guild';
export const LOG_BOT_REMOVED_GUILD = 'LOG_Bot_Removed_Guild';

export type LogData =
   | {
        id: typeof LOG_LOGGED_IN;
        tag: string;
     }
   | {
        id: typeof LOG_PERMISSIONLISTS_COLLISION;
        listKey: string;
        moduleName: string;
     }
   | {
        id: typeof LOG_ADD_MODULE;
        moduleName: string;
     }
   | {
        id: typeof LOG_RECEIVED_COMMAND;
        commandName: string;
        options: CommandInteractionOption[];
        user: string;
        userId: string;
        channel: string;
        guild: string;
     }
   | {
        id: typeof LOG_POPULATE_GUILD;
        guild: string;
     }
   | {
        id: typeof LOG_POPULATE_GUILD_UNAUTHORIZED;
        user: string;
        userId: string;
        guild: string;
     }
   | {
        id: typeof LOG_POPULATE_GLOBAL;
     }
   | {
        id: typeof LOG_POPULATE_GLOBAL_UNAUTHORIZED;
        user: string;
        userId: string;
     }
   | {
        id: typeof LOG_WHITELIST_CHANNEL;
        moduleName: string;
        channel: string;
     }
   | {
        id: typeof LOG_BLACKLIST_CHANNEL;
        moduleName: string;
        channel: string;
     }
   | {
        id: typeof LOG_WHITELIST_USER;
        moduleName: string;
        user: string;
        userId: string;
     }
   | {
        id: typeof LOG_BLACKLIST_USER;
        moduleName: string;
        user: string;
        userId: string;
     }
   | {
        id: typeof LOG_MODULE_COMMAND_DUPLICATE;
        moduleName: string;
        commandName: string;
     }
   | {
        id: typeof LOG_UNKNOWN_MODULE_COMMAND;
        moduleName: string;
     }
   | {
        id: typeof LOG_OSU_UNABLE_ASSOCIATE_USERNAME;
        user: string;
        username: string;
     }
   | {
        id: typeof LOG_OSU_ASSOCIATED_USERNAME;
        user: string;
        username: string;
     }
   | {
        id: typeof LOG_LANG_UPDATED;
        language: string;
        guildId: string;
     }
   | {
        id: typeof LOG_BOT_JOINED_GUILD;
        guild: string;
        guildId: string;
     }
   | {
        id: typeof LOG_BOT_REMOVED_GUILD;
        guild: string;
        guildId: string;
     };
