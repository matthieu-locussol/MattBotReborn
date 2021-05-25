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
         case 'LOG_Add_Module_Command': {
            return `> Registering command "/${data.commandName}"...`;
         }
      }
   }
}
