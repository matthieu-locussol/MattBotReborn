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

/**
 * Checks whether a given message has been sent by the bot admin or not (ID defined in `.env`).
 * @param message The message we want to check the author
 * @returns `true` if the author of the message is the bot admin, `false` otherwise
 */
export const sentByBotAdmin = (message: Message) => {
   return message.author.id === process.env.DISCORD_ADMIN_ID;
};

/**
 * Allows to easily retrieve useful informations from a `Message` object.
 * @param message The message you want to extract informations from
 * @returns The extracted informations as an object
 */
export const extractMessageInfos = (message: Message) => {
   const guildObject = message.client.guilds.cache.get(message.guild.id);
   const channelObject = guildObject.channels.resolve(message.channel.id);

   const guild = guildObject.name;
   const channel = channelObject.name;
   const user = message.author.username;
   const userId = message.author.id;

   return { guild, channel, user, userId };
};
