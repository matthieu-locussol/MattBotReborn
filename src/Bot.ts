import { Client, Intents, ApplicationCommandData, CommandInteraction } from 'discord.js';
import { Module } from './modules/Module';

export type Command = {
   name: string;
   description: string;
   fn: () => void;
};

export class Bot {
   private _client: Client;
   private _commands: ApplicationCommandData[] = [];

   constructor() {
      this._client = new Client({
         intents: [Intents.ALL],
      });
   }

   addModule(module: Module) {
      module.commands.forEach((command) => {
         this._commands.push(command.infos);
         this.onCommand(command.infos.name, command.fn);
      });
   }

   async populateCommandsGuild(guildId: string) {
      const guild = await this._client.guilds.fetch(guildId);

      this._client.on('message', async (msg) => {
         if (msg.content === '!POPULATE_GUILD' && msg.author.id === msg.guild.ownerID) {
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

   populateCommandsGeneral() {
      this._client.on('message', async (msg) => {
         if (msg.content === '!POPULATE_GUILD' && msg.author.id === msg.guild.ownerID) {
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

   onCommand(name: string, fn: (command: CommandInteraction) => void) {
      this._client.on('interaction', (interaction) => {
         const userCommand = interaction;

         if (userCommand.isCommand()) {
            if (userCommand.commandName === name) {
               fn(userCommand);
            }
         }
      });
   }

   async run(token: string) {
      this._client.on('ready', () => {
         console.log(`Logged in as ${this._client.user.tag}!`);
      });

      await this._client.login(token);
   }
}
