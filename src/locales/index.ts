import i18next, { StringMap, TFunctionKeys, TFunctionResult, TOptions } from 'i18next';
import { bot } from '../client';
import langEn from './en/lang.json';
import pingEn from './en/ping.json';
import langFr from './fr/lang.json';
import pingFr from './fr/ping.json';

const resources = {
   fr: {
      ping: pingFr,
      lang: langFr,
   },
   en: {
      ping: pingEn,
      lang: langEn,
   },
};

export const initializeLocales = () =>
   i18next.init({
      resources,
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
