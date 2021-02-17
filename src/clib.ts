export function atoi(str: string | undefined) {
  if (typeof str === "undefined") {
    return -1;
  }
  return parseInt(str, 10);
}
