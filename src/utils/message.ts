import { Message } from 'discord.js';

export const sentByOwner = (message: Message) => {
   return message.author.id === message.guild.ownerID;
};
