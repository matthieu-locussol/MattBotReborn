import moment from 'moment';

export const clamp = (n: number, low: number, high: number) => {
   return Math.max(low, Math.min(n, high));
};

type ValueOf<T> = T[keyof T];

type MapTo<T, U> = {
   [P in keyof T]: U;
};

export const mapObject = <T, U>(object: T, fn: (key: keyof T, value: ValueOf<T>) => U): MapTo<T, U> => {
   const mapped = {} as MapTo<T, U>;

   for (const key in object) {
      mapped[key] = fn(key, object[key]);
   }

   return mapped;
};

export const formatNumberSeparators = (value: number | string | null) => {
   if (value === null) {
      return '';
   }

   if (typeof value === 'number') {
      value = value.toString();
   }

   const formattedString = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   return formattedString;
};

export const elapsedTime = (dateValue: string | Date, locale?: string) => {
   if (locale) {
      moment.locale(locale);
   }

   const date = new Date(dateValue);
   return toUpperFirst(moment(date).fromNow());
};

export const toUpperFirst = (value: string) => {
   const head = value.charAt(0).toUpperCase();
   const tail = value.slice(1);

   return `${head}${tail}`;
};

export const sum = (array: number[]) => {
   return array.reduce((p, c) => p + c, 0);
};

export const average = (array: number[]) => {
   return array.reduce((p, c) => p + c, 0) / array.length;
};

export const random = (min: number, max: number) => {
   min = Math.ceil(min);
   max = Math.floor(max);

   return Math.floor(Math.random() * (max - min + 1)) + min;
};
