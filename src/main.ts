import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { client } from './client';

dotenv.config({ path: resolve(__dirname, '../.env') });

if (process.env.NODE_ENV === 'development') {
   client.login(process.env.DISCORD_TOKEN_DEVELOPMENT);
} else {
   client.login(process.env.DISCORD_TOKEN_PRODUCTION);
}
