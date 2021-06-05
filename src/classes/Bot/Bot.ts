import { ApplicationCommandData, Client, CommandInteraction, Intents, MessageComponentInteraction } from 'discord.js';
import { readFileSync, statSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { logger } from '../../client';
import type { Module } from '../../modules/Module';
import { extractCommandInfos } from '../../utils/commandInteraction';
import { extractMessageInfos, sentByBotAdmin } from '../../utils/message';
import { permissionWrapper } from '../../utils/permissions';

export class Bot {
   private _client: Client;
   private _locales: Record<string, string> = {};
   private _commands: ApplicationCommandData[] = [];

   constructor() {
      this._client = new Client({
         intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      });
      this._locales = this._loadLocales();

      this._client.on('ready', () => {
         logger.log({ id: 'LOG_Logged_In', tag: this._client.user.tag });
      });
   }

   /**
    * Gets the locale associated to a discord guild.
    * @param guildId The guild id you want to get the locale
    * @returns The locale of this guild
    */
   getLocale(guildId: string) {
      return this._locales[guildId];
   }

   /**
    * Sets the locale for a specific discord guild.
    * @param guildId The guild id you want to set the locale for
    * @param locale The locale you want to associate to this guild id
    */
   setLocale(guildId: string, locale: string) {
      this._locales[guildId] = locale;
      writeFileSync(resolve(__dirname, '../../../cache/locales.json'), JSON.stringify(this._locales, null, 2));
   }

   /**
    * Loads the locales from the locales.json cache file or creates the file if it does not exist.
    * @returns The loaded locales data
    */
   private _loadLocales() {
      const path = resolve(__dirname, '../../../cache/locales.json');

      try {
         statSync(path);
      } catch (error) {
         if (error?.code === 'ENOENT') {
            writeFileSync(path, JSON.stringify({}));
         }
      }

      const buffer = readFileSync(path);
      const locales = JSON.parse(buffer.toString());

      return locales;
   }

   /**
    * This method allows you to add a module and all of its commands to the bot.
    * @param module The module you want to add to the bot
    */
   addModule(module: Module) {
      logger.log({ id: 'LOG_Add_Module', moduleName: module.name });

      const index = this._commands.findIndex((c) => c.name === module.command.name);
      if (index === -1) {
         this._commands.push(module.command);
         this._onCommand(module.command.name, permissionWrapper(module.command.fn, module));

         if (module.ui) {
            for (const [id, fn] of Object.entries(module.ui)) {
               this._onMessageComponent(id, fn);
            }
         }
      } else {
         logger.error({
            id: 'LOG_Module_Command_Duplicate',
            moduleName: module.name,
            commandName: module.command.name,
         });
      }
   }

   /**
    * This method is used to refresh the existing slash commands for a specific guild determined using the incoming message.
    *
    * It first delete the old slash commands, then it creates every single command again.
    *
    * *It is especially useful when one needs to delete an existing slash command and should
    * be called after the bot started up.*
    * @see populateCommandsGlobal
    * @see [See Discord documentation](https://discord.com/developers/docs/interactions/slash-commands#registering-a-command)
    */
   populateCommandsGuild() {
      this._client.on('message', async (message) => {
         if (message.content === '!POPULATE_GUILD') {
            const guild = message.guild;
            logger.log({ id: 'LOG_Populate_Guild', guild: guild.name });

            if (sentByBotAdmin(message)) {
               const commands = await guild.commands.fetch();

               await Promise.all(
                  commands.map((command) => {
                     guild.commands.delete(command);
                  }),
               );

               await Promise.all(
                  this._commands.map((commandData) => {
                     guild.commands.create(commandData);
                  }),
               );
            } else {
               const { user, userId, guild } = extractMessageInfos(message);
               logger.warn({ id: 'LOG_Populate_Guild_Unauthorized', user, userId, guild });
            }
         }
      });
   }

   /**
    * This method is used to refresh the existing global slash commands for the bot.
    *
    * It first delete the old global slash commands, then it creates every single command again.
    *
    * It is especially useful when one needs to delete an existing global slash command and should
    * be called after the bot started up.
    * @see populateCommandsGuild
    * @see [See Discord documentation](https://discord.com/developers/docs/interactions/slash-commands#registering-a-command)
    */
   populateCommandsGlobal() {
      this._client.on('message', async (message) => {
         if (message.content === '!POPULATE_GLOBAL') {
            logger.log({ id: 'LOG_Populate_Global' });

            if (sentByBotAdmin(message)) {
               const commands = await this._client.application.commands.fetch();

               await Promise.all(
                  commands.map((command) => {
                     this._client.application.commands.delete(command);
                  }),
               );

               await Promise.all(
                  this._commands.map((commandData) => {
                     this._client.application.commands.create(commandData);
                  }),
               );
            } else {
               const { user, userId } = extractMessageInfos(message);
               logger.warn({ id: 'LOG_Populate_Global_Unauthorized', user, userId });
            }
         }
      });
   }

   /**
    * Listens for the slash command named `name` and fires the function `fn` when the command is called.
    * @param name The name of the slash command (as defined in a Module)
    * @param fn The function to execute when the slash command is called
    */
   private _onCommand(name: string, fn: (command: CommandInteraction) => void) {
      this._client.on('interaction', (interaction) => {
         const userCommand = interaction;

         if (userCommand.isCommand()) {
            if (userCommand.commandName === name) {
               logger.log({
                  id: 'LOG_Received_Command',
                  commandName: name,
                  options: userCommand.options,
                  ...extractCommandInfos(userCommand),
               });

               fn(userCommand);
            }
         }
      });
   }

   /**
    * Listens for events on the `MessageComponent` associated to the `customId` and fires `fn` when an event is caught.
    * @param customId The id of the component you want to listen to
    * @param fn The function to fire when an event is caught
    */
   private _onMessageComponent = (customId: string, fn: (interaction: MessageComponentInteraction) => void) => {
      this._client.on('interaction', (interaction) => {
         if (interaction.isMessageComponent()) {
            if (interaction.customID === customId) {
               fn(interaction);
            }
         }
      });
   };

   /**
    *
    * @param token The discord bot token
    * @see [See Discord documentation](https://discord.com/developers/docs/topics/oauth2#bots)
    */
   async run(token: string) {
      await this._client.login(token);

      this._client.on('guildCreate', (guild) => {
         logger.log({ id: 'LOG_Bot_Joined_Guild', guild: guild.name, guildId: guild.id });
      });
      this._client.on('guildDelete', (guild) => {
         logger.log({ id: 'LOG_Bot_Removed_Guild', guild: guild.name, guildId: guild.id });
      });
   }
}
