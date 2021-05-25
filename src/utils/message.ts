import { Message } from 'discord.js';

/**
 * Checks whether a given message sent in a Guild has been sent by the Guild's owner or not.
 * @param message The message we want to check the author
 * @returns `true` if the author of the message is the Guild's owner, `false` otherwise
 */
export const sentByOwner = (message: Message) => {
   return message.author.id === message.guild.ownerID;
};

/**
 * Checks whether a given message has been sent by a bot or not.
 * @param message The message we want to check the author
 * @returns `true` if the author of the message is a bot, `false` otherwise
 */
export const sentByBot = (message: Message) => {
   return message.author.bot;
};
