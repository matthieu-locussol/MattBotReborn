import { currentTime } from '../../utils/date';
import { LogData } from './LogData';

const LOG_TYPE = {
   INFO: '[INFO]',
   WARN: '[WARN]',
   ERROR: '[ERROR]',
};

type LogLevel = keyof typeof LOG_TYPE;

export class Logger {
   private _logs: LogData[];

   constructor() {
      this._logs = [];
   }

   log(data: LogData) {
      this._push(data, 'INFO', console.log);
   }

   warn(data: LogData) {
      this._push(data, 'WARN', console.warn);
   }

   error(data: LogData) {
      this._push(data, 'ERROR', console.error);
   }

   private _push(data: LogData, level: LogLevel, logFn: (...data: unknown[]) => void) {
      this._logs.push(data);
      logFn(`${LOG_TYPE[level]} ${currentTime()} ${this._serializeData(data)}`);
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
            return `Received command "/${data.commandName}" from user "${data.user}" (ID: ${data.userId}) in channel "${data.channel}" (guild "${data.guild}")`;
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
      }
   }
}
