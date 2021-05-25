export const LOG_LOGGED_IN = 'LOG_Logged_In';
export const LOG_PERMISSIONLISTS_COLLISION = 'LOG_PermissionLists_Collision';
export const LOG_ADD_MODULE = 'LOG_Add_Module';
export const LOG_ADD_MODULE_COMMAND = 'LOG_Add_Module_Command';

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
        id: typeof LOG_ADD_MODULE_COMMAND;
        commandName: string;
     };
