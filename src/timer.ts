import { log } from "./debug.js";
import { TIMER } from "./types.js";

/**
 * Timer driverr
 *
 * @remarks
 * The driver we use for timer routines.
 * Only exists for compatibility.
 *
 */
export const timer_driver = {
  id: 0,
  name: "Browser Timer",
  desc: " Browser Timer",
  ascii_name: "Browser Timer",
};

/**
 * Install core timer routines
 *
 * @remarks
 * Installs the Allegro timer interrupt handler. You must do this before installing any user timer routines.
 *
 * @returns 0 on success, negative otherwise
 *
 * @allegro 1.6.1
 */
export function install_timer(): number {
  // Setup retrace_counter
  install_int(() => {
    retrace_count += 1;
  }, 1000 / 70);

  return 0;
}

/**
 * Remove timer
 *
 * @remarks
 * Not implemented
 *
 * @allegro 1.6.2
 *
 * @alpha
 */
export function remove_timer(): void {
  // NOOP
}

/**
 * Installs interrupt function.
 *
 * @remarks
 * Installs a user timer handler, with the speed given as the number of milliseconds between ticks. This is the same thing as install_int_ex(proc, MSEC_TO_TIMER(speed)). Calling again this routine with the same timer handler as parameter allows you to adjust its speed.
 *
 * @param proc - Procedure to call at frequency set by speed
 * @param speed - Speed to call proc in ms
 *
 * @allegro 1.6.3
 */
export function install_int(proc: () => void, speed: number): void {
  install_int_ex(proc, MSEC_TO_TIMER(speed));
}

/**
 * Seconds to timer
 *
 * @remarks
 * Converts seconds to install_int_ex interval units
 *
 * @param secs - number of seconds
 *
 * @returns value converted to milliseconds
 *
 * @allegro 1.6.3
 */
export function SECS_TO_TIMER(secs: number): number {
  return secs * 1000;
}

/**
 * Milliseconds to timer
 *
 * @remarks
 * Converts milliseconds to install_int_ex interval units
 *
 * @param msec - number of milliseconds
 *
 * @returns value converted to milliseconds
 *
 * @allegro 1.6.3
 */
export function MSEC_TO_TIMER(msec: number): number {
  return msec;
}

/**
 * Beats per second to timer
 *
 * @remarks
 * Converts beats-per-second to install_int_ex interval units
 *
 * @param bps - number of beats per second
 *
 * @returns value converted to milliseconds
 *
 * @allegro 1.6.3
 */
export function BPS_TO_TIMER(bps: number): number {
  return 1000 / bps;
}

/**
 * Beats per minute to timer
 *
 * @remarks
 * Converts beats-per-minute to install_int_ex interval units
 *
 * @param bps - number of beats per minute
 *
 * @returns value converted to milliseconds
 *
 * @allegro 1.6.3
 */
export function BPM_TO_TIMER(bpm: number): number {
  return (60 * 1000) / bpm;
}

/**
 * Installs interrupt function.
 *
 * @remarks
 * With this one, you must use helper functions to set the interval in the second argument.
 * The lowest interval is 1 msec, but you probably don't want to go below 17 msec.
 * Suggested values are BPS_TO_TIMER(30) or BPS_TO_TIMER(60).
 * It cannot be used to alter previously installed interrupt function as well.
 *
 * @param procedure - function to be called
 * @param speed - execution interval
 *
 * @allegro 1.6.4
 */
export function install_int_ex(proc: () => void, speed: number): void {
  const timer_id = window.setInterval(proc, speed);
  _installed_timers.push({ timer: proc, id: timer_id });
  log(`Added insterrupt #${timer_id} at ${speed}msec isntervals!`);
}

/**
 * Lock a variable
 *
 * @remarks
 * Does nothing since we do not need to lock variables
 *
 * @param variable_name - Variable to lock
 *
 * @allegro 1.6.5
 */
export function LOCK_VARIABLE(variable_name: number | string): void {
  void variable_name;
}

/**
 * Lock a function
 *
 * @remarks
 * Does nothing since we do not need to lock functions
 *
 * @param function_name - Function to lock
 *
 * @allegro 1.6.6
 */
export function LOCK_FUNCTION(function_name: (...args: never) => void): void {
  void function_name;
}

/**
 * End of function
 *
 * @remarks
 * Does nothing since we do not need to worry about locking functions
 *
 * @param function_name - Name of function to end
 *
 * @allegro 1.6.7
 */
export function END_OF_FUNCTION(function_name: (...args: never) => void): void {
  void function_name;
}

/**
 * Removes interrupt
 *
 * @remarks
 * Remove a passed interrupt from system
 *
 * @param proc - interrupt procedure to be removed
 *
 * @allegro 1.6.8
 */
export function remove_int(proc: () => void): void {
  _installed_timers.forEach((timer, index) => {
    if (timer.timer === proc) {
      log(`Removing interrupt ${timer.id}!`);
      window.clearInterval(timer.id);
      _installed_timers.splice(index, 1);
    }
  });
}

/**
 * Install param interrupt
 *
 * @remarks
 * Not implemented
 *
 * @param procedure - Procedure to set up
 * @param param - Parameter to add to callback
 * @param speed - Frequency of callback
 *
 * @allegro 1.6.9
 *
 * @alpha
 */
export function install_param_int(
  procedure: () => void,
  param: string,
  speed: number
): void {
  install_param_int_ex(procedure, param, speed);
}

/**
 * Install param interrupt ex
 *
 * @remarks
 * Not implemented
 *
 * @param procedure - Procedure to set up
 * @param param - Parameter to add to callback
 * @param speed - Frequency of callback
 *
 * @allegro 1.6.10
 *
 * @alpha
 */
export function install_param_int_ex(
  procedure: () => void,
  param: string,
  speed: number
): void {
  void procedure;
  void param;
  void speed;
}

/**
 * Remove parameter interrupt
 *
 * @remarks
 * Not implemented
 *
 * @param proc - Procedure to remove
 * @param param - Param to unhook
 *
 * @allegro 1.6.11
 */
export function remove_param_int(proc: () => void, param: string): void {
  void proc;
  void param;
}

/**
 * Retrace counter
 *
 * @remarks
 * It is incremented 70 times a second. This provides a way of controlling the speed of your program without installing user timer functions.
 *
 * @allegro 1.6.12
 */
export let retrace_count = 0;

/**
 * Rest
 *
 * @remarks
 * Rest for specified time.
 * Uses a promise to ensure code is non blocking.
 *
 * @param time - Time in ms to wait
 *
 * @allegro 1.6.13
 */
export async function rest(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 * Rest callback
 *
 * @remarks
 * Like rest(), but for non-zero values continually calls the specified function while it is waiting for the required time to elapse.
 * If the provided ‘callback’ parameter is NULL, this function does exactly the same thing as calling rest().
 *
 * @allegro 1.6.13
 *
 * @alpha
 */
export async function rest_callback(
  time: number,
  callback?: () => void
): Promise<void> {
  if (!callback) {
    return rest(time);
  }
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/**
 * Timer Lookup
 *
 * @remarks
 * Look up timer by function
 *
 * @param proc - Procedure to lookup
 *
 * @internal
 */
export function _timer_lookup(proc: () => void): TIMER | -1 {
  return _installed_timers.find((t) => t.timer === proc) ?? -1;
}

/**
 * Installed timers
 *
 * @remarks
 * Internal list of installed timers
 *
 * @internal
 */
const _installed_timers: TIMER[] = [];
