import { CommandInteraction } from 'discord.js';

export const recent = (command: CommandInteraction, username?: string, index?: string) => {
   console.log('recent: ', username, ' index: ', index);
};
