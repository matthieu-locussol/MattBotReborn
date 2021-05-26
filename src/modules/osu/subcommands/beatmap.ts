import { CommandInteraction } from 'discord.js';

export const beatmap = (command: CommandInteraction, id: number, username?: string) => {
   console.log('beatmap: ', id, ' username: ', username);
};
