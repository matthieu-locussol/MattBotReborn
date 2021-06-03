import { Collection, CommandInteractionOption } from 'discord.js';

export const getStringOption = (options: Collection<string, CommandInteractionOption>, key: string) => {
   return options?.find((o) => o.name === key)?.value as string;
};

export const getIntegerOption = (options: Collection<string, CommandInteractionOption>, key: string) => {
   return options?.find((o) => o.name === key)?.value as number;
};

export const getBooleanOption = (options: Collection<string, CommandInteractionOption>, key: string) => {
   return options?.find((o) => o.name === key)?.value as boolean;
};

/**
 * Serializes an array of `CommandInteractionOption` for logging purpose.
 * @param options The options you want to serialize
 * @returns The serialized options as a string
 */
export const serializeOptions = (options?: Collection<string, CommandInteractionOption>) => {
   let serializedOptions = '';

   if (options) {
      options.forEach((option) => {
         if (option.type === 'SUB_COMMAND') {
            const suboptions = serializeOptions(option.options);
            serializedOptions += ` ${option.name}${suboptions}`;
         } else {
            serializedOptions += ` ${option.value}`;
         }
      });
   }

   return serializedOptions;
};
