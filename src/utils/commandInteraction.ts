import { CommandInteraction } from 'discord.js';

/**
 * Allows to easily retrieve useful informations from a `CommandInteraction` object.
 * @param command The command you want to extract informations from
 * @returns The extracted informations as an object
 */
export const extractCommandInfos = (command: CommandInteraction) => {
   const guildObject = command.client.guilds.cache.get(command.guildID);
   const channelObject = guildObject.channels.resolve(command.channelID);

   const guild = guildObject.name;
   const guildId = guildObject.id;
   const channel = channelObject.name;
   const user = command.member.user.username;
   const userId = `${command.member.user.id}`;

   return { guild, guildId, channel, user, userId };
};
