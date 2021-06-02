import { CommandInteractionOption } from 'discord.js';

export const LOG_RAW_LOG = 'LOG_Raw_Log';
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
export const LOG_OSU_RECENT_GET_USERNAME_FROM_CACHE = 'LOG_Osu_Recent_Get_Username_From_Cache';
export const LOG_OSU_RECENT_NO_USERNAME_MATCHING = 'LOG_Osu_Recent_No_Username_Matching';
export const LOG_OSU_RECENT_RETRIEVING_SCORE = 'LOG_Osu_Recent_Retrieving_Score';
export const LOG_OSU_RETRIEVING_BEATMAP = 'LOG_Osu_Retrieving_Beatmap';
export const LOG_OSU_BEATMAP_FOUND_CACHE = 'LOG_Osu_Beatmap_Found_Cache';
export const LOG_OSU_BEATMAP_NOT_FOUND_CACHE = 'LOG_Osu_Beatmap_Not_Found_Cache';
export const LOG_OSU_BEATMAP_CACHED = 'LOG_Osu_Beatmap_Cached';
export const LOG_OSU_RETRIEVING_USER = 'LOG_Osu_Retrieving_User';
export const LOG_OSU_RECENT_CLAMPED = 'LOG_Osu_Recent_Clamped';
export const LOG_OSU_RECENT_NOT_FOUND = 'LOG_Osu_Recent_Not_Found';
export const LOG_OSU_RETRIEVING_BEST_SCORES = 'LOG_Osu_Retrieving_Best_Scores';
export const LOG_OSU_BEST_SCORES_FOUND = 'LOG_Osu_Best_Scores_Found';
export const LOG_OSU_RETRIEVING_SCORE_PP = 'LOG_Osu_Retrieving_Score_Pp';
export const LOG_OSU_PP_COMPUTED = 'LOG_Osu_Pp_Computed';
export const LOG_OSU_RETRIEVING_SCORES = 'LOG_Osu_Retrieving_Scores';
export const LOG_OSU_SCORES_FOUND = 'LOG_Osu_Scores_Found';
export const LOG_OSU_RETRIEVING_BEATMAP_FILE = 'LOG_Osu_Retrieving_Beatmap_File';
export const LOG_OSU_BEATMAP_FILE_COMPUTED = 'LOG_Osu_Beatmap_File_Computed';
export const LOG_OSU_BEATMAP_FILE_COMPUTED_FC = 'LOG_Osu_Beatmap_File_Computed_FC';
export const LOG_OSU_BEATMAP_CHART_FOUND = 'LOG_Osu_Beatmap_Chart_Found';
export const LOG_OSU_BEATMAP_CHART_NOT_FOUND = 'LOG_Osu_Beatmap_Chart_Not_Found';
export const LOG_OSU_BEATMAP_CHART_RENDERING = 'LOG_Osu_Beatmap_Chart_Rendering';
export const LOG_OSU_BEATMAP_CHART_CACHED = 'LOG_Osu_Beatmap_Chart_Cached';

export type LogData =
   | {
        id: typeof LOG_RAW_LOG;
        data: string;
     }
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
        error: string;
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
     }
   | {
        id: typeof LOG_OSU_RECENT_GET_USERNAME_FROM_CACHE;
     }
   | {
        id: typeof LOG_OSU_RECENT_NO_USERNAME_MATCHING;
     }
   | {
        id: typeof LOG_OSU_RECENT_RETRIEVING_SCORE;
        username: string;
        index: number;
     }
   | {
        id: typeof LOG_OSU_RETRIEVING_BEATMAP;
        beatmapId: string;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_FOUND_CACHE;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_NOT_FOUND_CACHE;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_CACHED;
     }
   | {
        id: typeof LOG_OSU_RETRIEVING_USER;
        username: string;
     }
   | {
        id: typeof LOG_OSU_RECENT_CLAMPED;
        index: number;
        limit: number;
     }
   | {
        id: typeof LOG_OSU_RECENT_NOT_FOUND;
        username: string;
     }
   | {
        id: typeof LOG_OSU_RETRIEVING_BEST_SCORES;
        username: string;
        limit: number;
     }
   | {
        id: typeof LOG_OSU_BEST_SCORES_FOUND;
        username: string;
        count: number;
     }
   | {
        id: typeof LOG_OSU_RETRIEVING_SCORE_PP;
        playerId: string;
        beatmapId: string;
     }
   | {
        id: typeof LOG_OSU_PP_COMPUTED;
     }
   | {
        id: typeof LOG_OSU_RETRIEVING_SCORES;
        beatmapId: string;
        limit: number;
     }
   | {
        id: typeof LOG_OSU_SCORES_FOUND;
        beatmapId: string;
        count: number;
     }
   | {
        id: typeof LOG_OSU_RETRIEVING_BEATMAP_FILE;
        beatmapId: string;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_FILE_COMPUTED;
        beatmapId: string;
        acc: string;
        pp: string;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_FILE_COMPUTED_FC;
        beatmapId: string;
        accFc: string;
        ppFc: string;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_CHART_FOUND;
        filename: string;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_CHART_NOT_FOUND;
        filename: string;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_CHART_RENDERING;
        filename: string;
     }
   | {
        id: typeof LOG_OSU_BEATMAP_CHART_CACHED;
        filename: string;
     };
