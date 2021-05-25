/**
 * Format: `00-59`.
 *
 * Adds a '0' prefix if the number is <= 9.
 * @param number The number you want to format
 * @returns The number formatted accordingly
 */
export const formatTimeNumber = (number: number) => {
   if (number <= 9) {
      return `0${number}`;
   } else {
      return `${number}`;
   }
};

/**
 * Format: `HH:mm:ss`.
 * @returns Current time as a string
 */
export const currentTime = () => {
   const date = new Date();

   const hours = formatTimeNumber(date.getHours());
   const minutes = formatTimeNumber(date.getMinutes());
   const seconds = formatTimeNumber(date.getSeconds());

   return `${hours}:${minutes}:${seconds}`;
};
