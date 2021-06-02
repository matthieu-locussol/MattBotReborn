import { Guild } from 'discord.js';

export const retrieveEmoji = (guild: Guild, name: string) => {
   const id = guild.emojis.cache.find((e) => e.name === name);
   return `<:${name}:${id}>`;
};
