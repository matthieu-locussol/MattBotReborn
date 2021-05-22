import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { Client, Intents } from 'discord.js';

dotenv.config({ path: resolve(__dirname, '../.env') });

const client = new Client({
   ws: {
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
   },
});

client.on('ready', () => {
   console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (msg) => {
   if (msg.content === 'ping') {
      msg.channel.send('pong');
   }
});

client.on('message', (msg) => {
   if (msg.content === 'pingo') {
      msg.channel.send('pongo');
   }
});

if (process.env.NODE_ENV === 'development') {
   client.login(process.env.DISCORD_TOKEN_DEVELOPMENT);
} else {
   client.login(process.env.DISCORD_TOKEN_PRODUCTION);
}
