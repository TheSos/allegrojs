// Pi
export const PI = 3.14159265;

// Pi * 2
export const PI2 = 2 * 3.14159265;

// Pi / 2
export const PI_2 = 3.14159265 / 2;

// Pi / 3
export const PI_3 = 3.14159265 / 3;

// Pi / 4
export const PI_4 = 3.14159265 / 4;

/**
 * Converts fix to radians.
 * Also, changes clockwise to anticlockwise.
 * @param d - value in degrees to be converted
 * @returns -d*PI/180.0f
 */
export function fix_to_rad(d: number): number {
  const deg = d * (360.0 / 256.0);
  return (-deg * PI) / 180.0;
}

/**
 * Returns the floored number of float input
 * Result is always integer.
 * @returns floored integer
 */
export function floor(num: number): number {
  return Math.floor(num);
}

/**
 * Returns a random number from 0 to 65535
 * Result is always integer. Use modulo (%) operator to create smaller values i.e. rand()%256 will return a random number from 0 to 255 inclusive.
 * @returns a random number in 0-65535 inclusive range
 */
export function rand(): number {
  return Math.floor(65536 * Math.random());
}

export function AL_RAND(): number {
  return rand();
}

/**
 * Returns a random number from -2147483648 to 2147483647
 * Result is always integer. Use abs() if you only want positive values.
 * @returns a random number in -2147483648-2147483648 inclusive range
 */
export function rand32(): number {
  return rand() | (rand() << 16);
}

/**
 * Returns a random number from 0.0 to 1.0
 * This one is float. Use multiply (*) operator to get higher values. i.e. frand()*10 will return a value from 0.0 to 10.0
 * @returns a random floating point value from 0.0 to 1.0
 */
export function frand(): number {
  return Math.random();
}

/**
 * Returns absolute value of a
 * Removes minus sign from the value, should there be any.
 * @param a - value to be absoluted
 * @returns absolute value of a
 */
export function abs(a: number): number {
  return a < 0 ? -a : a;
}

/**
 * Scales value from one range to another and clamps it down
 * @param value - value to be scaled
 * @param min - max bound to scale from
 * @param max - max bound to scale from
 * @param min2 - max bound to scale clamp to
 * @param max2 - max bound to scale clamp to
 * @returns scaled and clamped value
 */
export function scaleclamp(
  value: number,
  min: number,
  max: number,
  min2: number,
  max2: number
): number {
  let cmp_val = min2 + ((value - min) / (max - min)) * (max2 - min2);
  if (max2 > min2) {
    cmp_val = cmp_val < max2 ? cmp_val : max2;
    return cmp_val > min2 ? cmp_val : min2;
  }
  cmp_val = cmp_val < min2 ? cmp_val : min2;
  return cmp_val > max2 ? cmp_val : max2;
}
