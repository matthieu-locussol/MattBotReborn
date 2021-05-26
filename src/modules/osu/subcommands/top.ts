import { CommandInteraction } from 'discord.js';

export const top = (command: CommandInteraction, username?: string, count?: number) => {
   console.log('top: ', username, ' count: ', count);
};
