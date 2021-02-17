/// @name TIMER ROUTINES
//@{

import { log } from "./debug.js";
import { TIMER } from "./types.js";

export const timer_driver = {
  id: 0,
  name: "Browser Timer",
  desc: " Browser Timer",
  ascii_name: "Browser Timer",
};

/// 1.6.1
export function install_timer(): number {
  // Setup retrace_counter
  install_int(() => {
    retrace_count += 1;
  }, 1000 / 70);

  return 1;
}

/// 1.6.2
export function remove_timer() {
  // NOOP
}

/// 1.6.3 Installs interrupt function.
/// Installs a user timer handler, with the speed given as the number of milliseconds between ticks. This is the same thing as install_int_ex(proc, MSEC_TO_TIMER(speed)). Calling again this routine with the same timer handler as parameter allows you to adjust its speed.
/// @param procedure function to be called
/// @param speed execution interval in msec
export function install_int(proc: () => void, speed: number) {
  return install_int_ex(proc, MSEC_TO_TIMER(speed));
}

/// 1.6.4 Installs interrupt function.
/// With this one, you must use helper functions to set the interval in the second argument. The lowest interval is 1 msec, but you probably don't want to go below 17 msec. Suggested values are BPS_TO_TIMER(30) or BPS_TO_TIMER(60). It cannot be used to alter previously installed interrupt function as well.
/// * SECS_TO_TIMER(secs) - seconds
/// * MSEC_TO_TIMER(msec) - milliseconds (1/1000th)
/// * BPS_TO_TIMER(bps) - beats per second
/// * BPM_TO_TIMER(bpm) - beats per minute
/// @param procedure function to be called
/// @param speed execution interval
export function install_int_ex(proc: () => void, speed: number) {
  const timer_id = window.setInterval(proc, speed);
  _installed_timers.push({ timer: proc, id: timer_id });
  log("Added insterrupt #" + timer_id + " at " + speed + "msec isntervals!");
}

/// 1.6.5
export function LOCK_VARIABLE(variable_name: number | string) {
  void variable_name;
}

/// 1.6.6
export function LOCK_FUNCTION(function_name: () => void) {
  void function_name;
}

/// 1.6.7
export function END_OF_FUNCTION(function_name: () => void) {
  void function_name;
}

/// 1.6.8 Removes interrupt
/// @param procedure interrupt procedure to be removed
export function remove_int(proc: () => void) {
  _installed_timers.forEach((timer, index) => {
    if (timer.timer === proc) {
      log("Removing interrupt " + timer.id + "!");
      window.clearInterval(timer.id);
      _installed_timers.splice(index, 1);
    }
  });
}

/// 1.6.9
export function install_param_int(
  procedure: () => void,
  param: string,
  speed: number
) {
  return install_param_int_ex(procedure, param, speed);
}

/// 1.6.10
export function install_param_int_ex(
  procedure: () => void,
  param: string,
  speed: number
) {
  void procedure;
  void param;
  void speed;
}

/// 1.6.11
export function remove_param_int(proc: () => void, param: string) {
  void proc;
  void param;
}

/// 1.6.12
export let retrace_count = 0;

/// 1.6.13
export async function rest(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

/// 1.6.13
export function rest_callback(time: number, callback: () => void) {
  setTimeout(callback, time);
}

/// looks up a timer by it's function on the list
export function _timer_lookup(proc: () => void) {
  return _installed_timers.find((t) => t.timer === proc) ?? -1;
}

/// Converts seconds to install_int_ex interval units
/// @param secs number of seconds
/// @return value converted to milliseconds
export function SECS_TO_TIMER(secs: number) {
  return secs * 1000;
}

/// Converts milliseconds to install_int_ex interval units
/// @param msec number of milliseconds
/// @return value converted to milliseconds
export function MSEC_TO_TIMER(msec: number) {
  return msec;
}

/// Converts beats-per-second to install_int_ex interval units
/// @param bps number of beats per second
/// @return value converted to milliseconds
export function BPS_TO_TIMER(bps: number) {
  return 1000 / bps;
}

/// Converts beats-per-minute to install_int_ex interval units
/// @param bpm number of beats per minute
/// @return value converted to milliseconds
export function BPM_TO_TIMER(bpm: number) {
  return (60 * 1000) / bpm;
}

/// INTERNAL

/// holds all currently installed timers
const _installed_timers: TIMER[] = [];

//@}
