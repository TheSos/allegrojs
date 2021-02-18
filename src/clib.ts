/**
 * String to Integer helper
 *
 * @param str - String to convert to int
 *
 * @returns number from string
 */
export function atoi(str: string | undefined): number {
  if (typeof str === "undefined") {
    return -1;
  }
  return parseInt(str, 10);
}
