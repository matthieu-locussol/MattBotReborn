import { Client, Intents } from 'discord.js';

export const client = new Client({
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
