import { Client, Intents, ApplicationCommandData, CommandInteraction } from 'discord.js';
import { logger } from '../../client';
import type { Module } from '../../modules/Module';
import { extractCommandInfos } from '../../utils/commandInteraction';
import { extractMessageInfos, sentByBotAdmin } from '../../utils/message';
import { permissionWrapper } from '../../utils/permissions';

export class Bot {
   private _client: Client;
   private _commands: ApplicationCommandData[] = [];

   constructor() {
      this._client = new Client({
         intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      });

      this._client.on('ready', () => {
         logger.log({ id: 'LOG_Logged_In', tag: this._client.user.tag });
      });
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
         this.onCommand(module.command.name, permissionWrapper(module.command.fn, module));
      } else {
         logger.error({
            id: 'LOG_Module_Command_Duplicate',
            moduleName: module.name,
            commandName: module.command.name,
         });
      }
   }

   /**
    * This method is used to refresh the existing slash commands for a guild given its id.
    *
    * It first delete the old slash commands, then it creates every single command again.
    *
    * *It is especially useful when one needs to delete an existing slash command and should
    * be called after the bot started up.*
    * @param guildId The ID of the Guild you want to update the slash commands
    * @see populateCommandsGlobal
    * @see [See Discord documentation](https://discord.com/developers/docs/interactions/slash-commands#registering-a-command)
    */
   async populateCommandsGuild(guildId: string) {
      const guild = await this._client.guilds.fetch(guildId);

      this._client.on('message', async (message) => {
         if (message.content === '!POPULATE_GUILD') {
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
   private onCommand(name: string, fn: (command: CommandInteraction) => void) {
      this._client.on('interaction', (interaction) => {
         const userCommand = interaction;

         if (userCommand.isCommand()) {
            if (userCommand.commandName === name) {
               logger.log({
                  id: 'LOG_Received_Command',
                  commandName: name,
                  ...extractCommandInfos(userCommand),
               });

               fn(userCommand);
            }
         }
      });
   }

   /**
    *
    * @param token The discord bot token
    * @see [See Discord documentation](https://discord.com/developers/docs/topics/oauth2#bots)
    */
   async run(token: string) {
      await this._client.login(token);
   }
}
