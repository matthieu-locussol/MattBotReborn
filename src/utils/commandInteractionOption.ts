import { CommandInteractionOption } from 'discord.js';

export const getStringOption = (options: CommandInteractionOption[], key: string) => {
   return options?.find((o) => o.name === key)?.value as string;
};

export const getIntegerOption = (options: CommandInteractionOption[], key: string) => {
   return options?.find((o) => o.name === key)?.value as number;
};

export const getBooleanOption = (options: CommandInteractionOption[], key: string) => {
   return options?.find((o) => o.name === key)?.value as boolean;
};
