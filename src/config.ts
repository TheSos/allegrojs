import { gfx_driver } from "./graphics";
import { _uberloop } from "./core";
import { log } from "./debug";
import { vsprintf } from "./sprintf";

/**
 * Loop interval for pausing
 *
 * @internal
 */
let _loop_interval = -1;

export function _set_loop_interval(interval: number): void {
  if (_loop_interval !== -1) {
    window.clearInterval(_loop_interval);
  }
  if (interval !== -1) {
    _loop_interval = interval;
  }
}

/**
 * Installs allegro.
 *
 * @remarks
 * This should be called before anything else, or allegro_init
 *
 * @param system_id - Id of system to setup. Does not matter
 * @param errno_ptr - Unused error pointer
 * @param atexit_ptr - Function called on exit
 *
 * @returns Zero on success, anything else on fail
 *
 * @allegro 1.1.1
 */
export function install_allegro(
  system_id: number,
  errno_ptr: number,
  atexit_ptr: () => void
): number {
  void system_id;
  void errno_ptr;
  void atexit_ptr;
  check_cpu();
  log("Allegro installed!");
  _set_loop_interval(window.setInterval(_uberloop, 16.6));
  log("Game loop initialised!");

  return 0;
}

export const SYSTEM_AUTODETECT = 0;
export const SYSTEM_NONE = AL_ID("N", "O", "N", "E");

/**
 * Wrapper for install_allegro.
 *
 * @remarks
 * Simply calls install_allegro with default parameters
 *
 * @returns Zero on success, other on fail
 *
 * @allegro 1.1.2
 */
export function allegro_init(): number {
  return install_allegro(SYSTEM_AUTODETECT, 0, atexit);
}

export function atexit(): void {
  log("Allegro destroyed");
}

/**
 * Exit allegro
 *
 * @remarks
 * Cleans up allegro and removes all installed handlers
 *
 * @allegro 1.1.3
 */
export function allegro_exit(): void {
  log("Allegro exited.");
}

/**
 * End of main
 *
 * @remarks
 * Macro to be placed after the end of main()
 * This does nothing, it is only here for comaptibility
 *
 * @allegro 1.1.4
 */
export function END_OF_MAIN(): void {
  // Noop
}

/**
 * Allegro ID
 *
 * @remarks
 * This usually contains date and version number.
 * We just return Allegro TS
 *
 * @allegro 1.1.5
 */
export const allegro_id = "Allegro TS";

/**
 * Allegro Error
 *
 * @remarks
 * String that will be populated with errors if needed.
 *
 * @allegro 1.1.6
 */
export const allegro_error = "";

/**
 * Allegro version
 *
 * @remarks
 * Number representing version (4 in our case)
 *
 * @allegro 1.1.7
 */
export const ALLEGRO_VERSION = 4;

/**
 * Allegro sub version
 *
 * @remarks
 * Number representing sub version of allegro
 *
 * @allegro 1.1.8
 */
export const ALLEGRO_SUB_VERSION = 1;

/**
 * Allegro wip version
 *
 * @remarks
 * Number representing wip version of allegro
 *
 * @allegro 1.1.9
 */
export const ALLEGRO_WIP_VERSION = 16;

/**
 * Allegro version string
 *
 * @remarks
 * Number representing full version
 *
 * @allegro 1.1.10
 */
export const ALLEGRO_VERSION_STR = "4.1.16";

/**
 * Allegro date string
 *
 * @remarks
 * Allegro year
 *
 * @allegro 1.1.11
 */
export const ALLEGRO_DATE_STR = "2021";

/**
 * Allegro date
 *
 * @remarks
 * We dont do anything with this
 *
 * @allegro 1.1.12
 */
export const ALLEGRO_DATE = 0;

/**
 * Allegro ID macro
 *
 * @remarks
 * This macro can be used to create a packed 32 bit integer from 8 bit characters,
 * on both 32 and 64 bit machines. These can be used for various things,
 * like custom datafile objects or system IDs.
 *
 * @allegro 1.1.13
 */
export function AL_ID(a: string, b: string, c: string, d: string): number {
  return (
    (a.charCodeAt(0) << 24) +
    (b.charCodeAt(0) << 16) +
    (c.charCodeAt(0) << 8) +
    d.charCodeAt(0)
  );
}

/**
 * Make version
 *
 * @remarks
 * This macro can be used to check if some Allegro version is (binary) compatible
 * with the current version.
 *
 * @allegro 1.1.14
 */
export function MAKE_VERSION(a: string, b: string, c: string): number {
  return (a.charCodeAt(0) << 16) + (b.charCodeAt(0) << 8) + c.charCodeAt(0);
}

/**
 * OS type string
 *
 * @remarks
 * We set it to BROWSER
 *
 * @allegro 1.1.15
 */
export const os_type = "OSTYPE_BROWSER";

/**
 * OS version
 *
 * @remarks
 * OS version set to 0
 *
 * @allegro 1.1.16
 */
export const os_version = 0;

/**
 * OS multitasking
 *
 * @remarks
 * True if os supports multitasking
 *
 * @allegro 1.1.17
 */
export const os_multitasking = true;

/**
 * Allegro Message
 *
 * @remarks
 * Show a dialog with allegro message
 *
 * @param text_format - String to format
 * @param args - Other args for formatting
 *
 * @allegro 1.1.18
 */
export function allegro_message(
  text_format: string,
  ...args: (number | string)[]
): void {
  // eslint-disable-next-line no-alert
  alert(vsprintf(text_format, args));
}

/**
 * Set window title
 *
 * @remarks
 * Set title of browser window
 *
 * @param name - Name to assign to title
 *
 * @allegro 1.1.19
 */
export function set_window_title(name: string): void {
  document.title = name;
}

/**
 * Set close buttton callback
 *
 * @remarks
 * Create callback for on close of browser
 *
 * @param proc - Procedure to call on exit
 *
 * @allegro 1.1.20
 */
export function set_close_button_callback(proc: () => void): void {
  window.onbeforeunload = proc;
}

/**
 * Get color depth of desktop
 *
 * @remarks
 * Returns desktop color depth (32)
 *
 * @allegro 1.1.21
 */
export function desktop_color_depth(): number {
  return 32;
}

/**
 * Return desktop resolution
 *
 * @remarks
 * Generally an int pointer is passed, here we return an object
 *
 * @allegro 1.1.22
 */
export function get_desktop_resolution(): { width: number; height: number } {
  return { width: gfx_driver.w, height: gfx_driver.h };
}

/**
 * Check cpu
 *
 * @remarks
 * Setup cpu info
 *
 * @allegro 1.1.23
 */
export function check_cpu(): void {
  cpu_vendor = "Browser CPU";
  cpu_family = "Browser CPU Family";
  cpu_model = "Browser CPU Model";
  cpu_capabilities = 0;
}

/**
 * Cpu vendor
 *
 * @remarks
 * Vendor of cpu
 *
 * @allegro 1.1.24
 */
export let cpu_vendor = "";

/**
 * Cpu family
 *
 * @remarks
 * Family of cpu
 *
 * @allegro 1.1.25
 */
export let cpu_family = "";

/**
 * Cpu model
 *
 * @remarks
 * Model of cpu
 *
 * @allegro 1.1.26
 */
export let cpu_model = "";

/**
 * Packed list of cpu capabilities
 *
 * @remarks
 * Capibilities of cpu
 *
 * @allegro 1.1.27
 */
export let cpu_capabilities = 0;
