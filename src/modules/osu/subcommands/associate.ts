import { CommandInteraction } from 'discord.js';

export const associate = (command: CommandInteraction, username: string) => {
   console.log('associate: ', username);
};
