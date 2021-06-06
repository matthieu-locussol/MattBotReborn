import i18next, { StringMap, TFunctionKeys, TFunctionResult, TOptions } from 'i18next';
import moment from 'moment';
import { bot } from '../client';
import langEn from './en/lang.json';
import musicEn from './en/music.json';
import osuEn from './en/osu.json';
import pingEn from './en/ping.json';
import langFr from './fr/lang.json';
import musicFr from './fr/music.json';
import osuFr from './fr/osu.json';
import pingFr from './fr/ping.json';

const resources = {
   fr: {
      lang: langFr,
      music: musicFr,
      osu: osuFr,
      ping: pingFr,
   },
   en: {
      lang: langEn,
      music: musicEn,
      osu: osuEn,
      ping: pingEn,
   },
};

export const initializeLocales = () =>
   i18next.init({
      resources,
      interpolation: {
         escapeValue: false,
         format: function (value, format, lang) {
            if (value instanceof Date) {
               if (format) {
                  return moment(value).format(format);
               }

               if (lang === 'en') {
                  return moment(value).format('MM/DD/YYYY');
               } else if (lang === 'fr') {
                  return moment(value).format('DD/MM/YYYY');
               }
            }
         },
      },
   });

export type TranslationFunction<T extends Record<string, unknown>> = <
   TResult extends TFunctionResult = string,
   TKeys extends TFunctionKeys = string,
>(
   key: TKeys | TKeys[],
   guildId: string,
   options?: TOptions<T>,
) => TResult;

export const buildTranslationFunction = <TInterpolationMap extends Record<string, unknown> = StringMap>(
   moduleName: string,
   defaultOptions?: TOptions<TInterpolationMap>,
): TranslationFunction<TInterpolationMap> => {
   return (key, guildId, options = defaultOptions) => {
      const locale = bot.getLocale(guildId);

      return i18next.t(key, { ns: moduleName, lng: locale, fallbackLng: 'en', ...options });
   };
};
