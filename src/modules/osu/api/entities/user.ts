import { User } from 'node-osu';
import { logger } from '../../../../client';
import { formatNumberSeparators } from '../../../../utils/utils';
import { osuApi } from '../api';
import { OsuUser } from '../types';

export const getUser = async (username: string): Promise<OsuUser> => {
   logger.log({ id: 'LOG_Osu_Retrieving_User', username });

   const userResponse = await osuApi.getUser({
      u: username,
      type: 'string',
   });

   if (userResponse.id) {
      const user = parseUser(username, userResponse);
      return user;
   }
};

export const parseUser = (username: string, user: User): OsuUser => {
   const osuUser: OsuUser = {
      player: username,
      ppUser: `${formatNumberSeparators(user.pp.raw as number)}`,
      worldRank: `${formatNumberSeparators(user.pp.rank as number)}`,
      countryRank: `${formatNumberSeparators(user.pp.countryRank as number)}`,
      country: user.country,
   };

   return osuUser;
};
