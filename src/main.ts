import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { bot } from './client';
import { pingModule } from './modules/ping';

dotenv.config({ path: resolve(__dirname, '../.env') });

(async () => {
   bot.addModule(pingModule);

   if (process.env.NODE_ENV === 'development') {
      await bot.run(process.env.DISCORD_TOKEN_DEVELOPMENT);
      await bot.populateCommandsGuild(process.env.DISCORD_GUILD_ID);
   } else {
      await bot.run(process.env.DISCORD_TOKEN_PRODUCTION);
      // bot.populateCommandsGeneral();
   }
})();
