/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/
// export const stringFormat = (str, ...args) =>
//        str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");

/**
 * Formats a string by replacing placeholders with provided arguments
 * @param str - The template string with placeholders like {0}, {1}, etc.
 * @param args - Values to replace the placeholders
 * @returns Formatted string
 * @throws Error if str is not a string
 */
export const stringFormat = (str: string, ...args: any[]): string => {
  if (typeof str !== 'string') {
    throw new Error(`Expected string for str parameter, got ${typeof str}: ${str}`);
  }
  return str.replace(/{(\d+)}/g, (match, index) => {
    const arg = args[index];
    return arg !== undefined && arg !== null ? arg.toString() : '';
  });
};