import { Client, Intents, ApplicationCommandData, CommandInteraction } from 'discord.js';
import { logger } from '../../client';
import type { Module } from '../../modules/Module';
import { sentByOwner } from '../../utils/message';
import { permissionWrapper } from '../../utils/permissions';

export class Bot {
   private _client: Client;
   private _commands: ApplicationCommandData[] = [];

   constructor() {
      this._client = new Client({
         intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
      });
   }

   /**
    * This method allows you to add a module and all of its commands to the bot.
    * @param module The module you want to add to the bot
    */
   addModule(module: Module) {
      logger.log({ id: 'LOG_Add_Module', moduleName: module.name });

      module.commands.forEach((command) => {
         logger.log({ id: 'LOG_Add_Module_Command', commandName: command.infos.name });

         this._commands.push(command.infos);
         this.onCommand(command.infos.name, permissionWrapper(command.fn, module));
      });
   }

   /**
    * This method is used to refresh the existing slash commands for a guild given its id.
    *
    * It first delete the old slash commands, then it creates every single command again.
    *
    * *It is especially useful when one needs to delete an existing slash command and should
    * be called after the bot started up.*
    * @param guildId The ID of the Guild you want to update the slash commands
    * @see populateCommandsGeneral
    * @see [See Discord documentation](https://discord.com/developers/docs/interactions/slash-commands#registering-a-command)
    */
   async populateCommandsGuild(guildId: string) {
      const guild = await this._client.guilds.fetch(guildId);

      this._client.on('message', async (msg) => {
         if (msg.content === '!POPULATE_GUILD' && sentByOwner(msg)) {
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
   populateCommandsGeneral() {
      this._client.on('message', async (msg) => {
         if (msg.content === '!POPULATE_GUILD' && sentByOwner(msg)) {
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
      this._client.on('ready', () => {
         logger.log({ id: 'LOG_Logged_In', tag: this._client.user.tag });
      });

      await this._client.login(token);
   }
}
