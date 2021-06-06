import winston from 'winston';
import { serializeOptions } from '../../utils/commandInteractionOption';
import { currentTime } from '../../utils/date';
import { LogData } from './LogData';

export class Logger {
   private _logs: LogData[];
   private _logger: winston.Logger;
   private _loggerRaw: winston.Logger;

   constructor() {
      this._logs = [];
      this._logger = winston.createLogger({
         transports: [new winston.transports.Console()],
         format: winston.format.printf((log) => `[${log.level.toUpperCase()}] ${currentTime()} > ${log.message}`),
      });
      this._loggerRaw = winston.createLogger({
         transports: [new winston.transports.Console()],
         format: winston.format.printf((log) => log.message),
      });
   }

   logRaw(data: string) {
      const log: LogData = { id: 'LOG_Raw_Log', data };

      this._logs.push(log);
      this._loggerRaw.log('info', data);
   }

   log(data: LogData) {
      this._logs.push(data);
      this._logger.log('info', this._serializeData(data));
   }

   warn(data: LogData) {
      this._logs.push(data);
      this._logger.log('warn', this._serializeData(data));
   }

   error(data: LogData) {
      this._logs.push(data);
      this._logger.log('error', this._serializeData(data));
   }

   private _serializeData(data: LogData) {
      switch (data.id) {
         case 'LOG_Logged_In': {
            return `Logged in as ${data.tag}!`;
         }
         case 'LOG_PermissionLists_Collision': {
            return `You defined both a whitelist and a blacklist for the key "${data.listKey}" in the module "${data.moduleName}", this may lead to undefined behaviors. You should consider removing one or the other.`;
         }
         case 'LOG_Add_Module': {
            return `Registering module "${data.moduleName}"...`;
         }
         case 'LOG_Received_Command': {
            const serializedOptions = serializeOptions(data.options);
            return `Received command "/${data.commandName}${serializedOptions}" from user "${data.user}" (ID: ${data.userId}) in channel "${data.channel}" (guild "${data.guild}")`;
         }
         case 'LOG_Populate_Guild': {
            return `Refreshing guild slash commands for guild "${data.guild}"...`;
         }
         case 'LOG_Populate_Global': {
            return `Refreshing global slash commands...`;
         }
         case 'LOG_Populate_Guild_Unauthorized': {
            return `User "${data.user}" (ID: ${data.userId}) in guild "${data.guild}" does not have the right to refresh guild slash commands!`;
         }
         case 'LOG_Populate_Global_Unauthorized': {
            return `User "${data.user}" (ID: ${data.userId}) does not have the right to refresh global slash commands!`;
         }
         case 'LOG_Whitelist_Channel': {
            return `Channel "${data.channel}" has not been whitelisted for the module "${data.moduleName}"!`;
         }
         case 'LOG_Blacklist_Channel': {
            return `Channel "${data.channel}" has been blacklisted for the module "${data.moduleName}"!`;
         }
         case 'LOG_Whitelist_User': {
            return `User "${data.user}" (ID: ${data.userId}) has not been whitelisted for the module "${data.moduleName}"!`;
         }
         case 'LOG_Blacklist_User': {
            return `User "${data.user}" (ID: ${data.userId}) has been blacklisted for the module "${data.moduleName}"!`;
         }
         case 'LOG_Module_Command_Duplicate': {
            return `Could not register command "${data.commandName}" for the module "${data.moduleName}": this command name already exists!`;
         }
         case 'LOG_Unkown_Module_Command': {
            return `Unknown command for module "${data.moduleName}"!`;
         }
         case 'LOG_Osu_Unable_Associate_Username': {
            return `Could not associate the osu! username "${data.username}" for the user "${data.user}"!\n${data.error}`;
         }
         case 'LOG_Osu_Associated_Username': {
            return `Successfully associated the osu! username "${data.username}" for the user "${data.user}"`;
         }
         case 'LOG_Lang_Updated': {
            return `Successfully set language "${data.language}" for guild ${data.guildId}`;
         }
         case 'LOG_Bot_Joined_Guild': {
            return `MattBot joined server "${data.guild}" (ID: ${data.guildId})`;
         }
         case 'LOG_Bot_Removed_Guild': {
            return `MattBot has been removed from server "${data.guild}" (ID: ${data.guildId})`;
         }
         case 'LOG_Osu_Recent_Get_Username_From_Cache': {
            return `--- No username provided, retrieving it from cache...`;
         }
         case 'LOG_Osu_Recent_No_Username_Matching': {
            return `--- No username provided nor found in cache, aborting!`;
         }
         case 'LOG_Osu_Recent_Retrieving_Score': {
            return `--- Retrieving the recent osu! score ${data.index} for username ${data.username}...`;
         }
         case 'LOG_Osu_Retrieving_Beatmap': {
            return `--- Retrieving osu! beatmap ${data.beatmapId}...`;
         }
         case 'LOG_Osu_Beatmap_Found_Cache': {
            return `--- Found beatmap in cache!`;
         }
         case 'LOG_Osu_Beatmap_Not_Found_Cache': {
            return `--- Beatmap not found in cache, calling the API...`;
         }
         case 'LOG_Osu_Beatmap_Cached': {
            return `--- Beatmap has been retrieved and cached!`;
         }
         case 'LOG_Osu_Retrieving_User': {
            return `--- Retrieving the osu! user ${data.username}...`;
         }
         case 'LOG_Osu_Recent_Clamped': {
            return `--- Index ${data.index} has been clamped to ${data.limit} because it was out of range`;
         }
         case 'LOG_Osu_Recent_Not_Found': {
            return `--- No recent play found the osu! user ${data.username}!`;
         }
         case 'LOG_Osu_Retrieving_Best_Scores': {
            return `--- Retrieving the osu! ${data.limit} best scores for username ${data.username}...`;
         }
         case 'LOG_Osu_Best_Scores_Found': {
            return `--- Found ${data.count} osu! best scores for username ${data.username}!`;
         }
         case 'LOG_Osu_Retrieving_Score_Pp': {
            return `--- Retrieving the osu! PP for a score set by the user ${data.playerId} on the beatmap ${data.beatmapId}...`;
         }
         case 'LOG_Osu_Pp_Computed': {
            return `--- PP for the score have been computed!`;
         }
         case 'LOG_Osu_Retrieving_Scores': {
            if (data.username) {
               return `--- Retrieving the osu! ${data.limit} best scores for the user ${data.username} on the beatmap ${data.beatmapId}...`;
            } else {
               return `--- Retrieving the osu! ${data.limit} best scores on the beatmap ${data.beatmapId}...`;
            }
         }
         case 'LOG_Osu_Scores_Found': {
            if (data.username) {
               return `--- Found ${data.count} osu! best scores for the user ${data.username} on the beatmap ${data.beatmapId}!`;
            } else {
               return `--- Found ${data.count} osu! best scores on the beatmap ${data.beatmapId}!`;
            }
         }
         case 'LOG_Osu_Retrieving_Beatmap_File': {
            return `--- Downloading beatmap file for beatmap ${data.beatmapId} using curl...`;
         }
         case 'LOG_Osu_Beatmap_File_Computed': {
            return `--- Computed score for beatmap ${data.beatmapId}: ${data.acc} accuracy and ${data.pp}pp`;
         }
         case 'LOG_Osu_Beatmap_File_Computed_FC': {
            return `--- Computed FC score for beatmap ${data.beatmapId}: ${data.accFc} accuracy and ${data.ppFc}pp`;
         }
         case 'LOG_Osu_Beatmap_Chart_Found': {
            return `--- Found chart ${data.filename} in cache!`;
         }
         case 'LOG_Osu_Beatmap_Chart_Not_Found': {
            return `--- Could not find the chart ${data.filename}, generating it...`;
         }
         case 'LOG_Osu_Beatmap_Chart_Rendering': {
            return `--- Rendering chart ${data.filename} on a canvas...`;
         }
         case 'LOG_Osu_Beatmap_Chart_Cached': {
            return `--- Chart ${data.filename} has been generated and cached!`;
         }
         case 'LOG_Osu_Retrieving_User_Score': {
            return `--- Retrieving best score on the beatmap ${data.beatmapId} for the username ${data.username}...`;
         }
         case 'LOG_Osu_User_Score_Not_Found': {
            return `--- Could not find the best score on the beatmap ${data.beatmapId} for the username ${data.username}!`;
         }
         case 'LOG_Osu_Bests_Clamped': {
            return `--- Count ${data.count} has been clamped to ${data.limit} because it was out of range`;
         }
         case 'LOG_Osu_Bests_Never_Played': {
            return `--- Could not find any plays for the username ${data.username}!`;
         }
         case 'LOG_Music_No_Voice_Channel': {
            return `--- Could not join a voice channel: ${data.username} is not in a voice channel (server ${data.guild})!`;
         }
         case 'LOG_Music_Changed_Voice_Channel': {
            return `--- MattBot changed from voice channel "${data.oldChannel}" to "${data.newChannel}" (server ${data.guild})!`;
         }
         case 'LOG_Music_Voice_Connecting': {
            return `--- Connecting to channel ${data.channel} (server ${data.guild})...`;
         }
         case 'LOG_Music_Playing_Song': {
            return `--- Playing song...`;
         }
         case 'LOG_Music_No_Voice_Connection_Found': {
            return `--- No existing connection found in server ${data.guild}!`;
         }
         case 'LOG_Music_Play_Command': {
            return `User ${data.username} triggered the play command for the song ${data.songUrl} in the server ${data.guild}`;
         }
         case 'LOG_Music_Listener_Youtube': {
            return `--- User ${data.username} sent a YouTube link, it has been converted to handle Discord interactions`;
         }
         case 'LOG_Music_Resuming_Song': {
            return `--- Resuming song...`;
         }
         case 'LOG_Music_Pause_Command': {
            return `User ${data.username} triggered the pause command in the server ${data.guild}`;
         }
         case 'LOG_Music_Stop_Command': {
            return `User ${data.username} triggered the stop command in the server ${data.guild}`;
         }
         case 'LOG_Music_No_Song_Playing': {
            return `--- No song is currently being played in the server ${data.guild}!`;
         }
         case 'LOG_Music_Pausing_Song': {
            return `--- Pausing song...`;
         }
         case 'LOG_Music_Disconnected': {
            return `--- MattBot successfully disconnected from the voice channel`;
         }
         case 'LOG_Music_Dispatcher_Ended': {
            return `--- Stream dispatcher has ended`;
         }
         case 'LOG_Music_Caching_Volume': {
            return `--- Caching the new volume for server ${data.guild}: ${data.volume}/10`;
         }
         case 'LOG_Music_Played_Volume': {
            return `--- Updated the volume of the song being played to ${data.volume}/10`;
         }
         case 'LOG_Music_VolumeDown_Command': {
            return `User ${data.username} triggered the volumeDown command in the server ${data.guild}`;
         }
      }
   }
}
