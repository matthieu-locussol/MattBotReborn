import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

import { bot } from './client';
import { initializeLocales } from './locales';
import { langModule } from './modules/lang';
import { musicModule } from './modules/music';
import { osuModule } from './modules/osu';
import { pingModule } from './modules/ping';

(async () => {
   await initializeLocales();

   bot.addModule(langModule);
   bot.addModule(pingModule);
   bot.addModule(osuModule);
   bot.addModule(musicModule);

   if (process.env.NODE_ENV === 'development') {
      await bot.run(process.env.DISCORD_TOKEN_DEVELOPMENT);
   } else {
      await bot.run(process.env.DISCORD_TOKEN_PRODUCTION);
   }

   bot.populateCommandsGuild();
   bot.populateCommandsGlobal();
})();
