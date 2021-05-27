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

/**
 * Serializes an array of `CommandInteractionOption` for logging purpose.
 * @param options The options you want to serialize
 * @returns The serialized options as a string
 */
export const serializeOptions = (options: CommandInteractionOption[]) => {
   let serializedOptions = '';

   for (const option of options) {
      if (option.type === 'SUB_COMMAND') {
         const suboptions = serializeOptions(option.options);
         serializedOptions += ` ${option.name} ${suboptions}`;
      } else {
         serializedOptions += ` ${option.value}`;
      }
   }

   return serializedOptions;
};
