////////////////////////////////////////////
/// @name DEBUG FUNCTIONS
//@{

let _debug_enabled = false;
let _debug_element: HTMLElement | null = null;

/// Set this to true if you want to debug to browser console.
/// Setting this will make log() log to browser debugger console using console.log().
// eslint-disable-next-line prefer-const
let ALLEGRO_CONSOLE = true;

/// Fatal error displays alert and logs to console
export function _error(string: string) {
  log("[ERROR] " + string);
  // eslint-disable-next-line no-alert
  alert(string);
}

export function _onerror(e: ErrorEvent) {
  const fa = e.filename.split("/");
  fa.reverse();
  log("[" + fa[0] + ":" + e.lineno + ":" + e.colno + "] " + e.message);
}

/// Enables debugging to a console.
/// 'console' can be any html element that can accept text, preferably a <div>
/// @param id id of the element to be the console
export function enable_debug(id: string) {
  _debug_element = document.getElementById(id);
  window.addEventListener("error", _onerror);
  if (_debug_element) _debug_enabled = true;
}

/// Logs to console
/// Only works after enable_debug() has been called. Will append <br/> newline tag. You can use html inside your logs too.
/// @param string text to log
export function log(string: string) {
  if (ALLEGRO_CONSOLE) console.log(string);
  if (!_debug_enabled || !_debug_element) return;
  _debug_element.innerHTML = _debug_element.innerHTML + string + "<br/>";
}

/// Logs to console
/// Only works after enable_debug() has been called. Will append <br/> newline tag. You can use html inside your logs too.
/// @param string text to log
export function _allog(string: string) {
  if (ALLEGRO_CONSOLE) console.log(string);
  if (!_debug_enabled || !_debug_element) return;
  _debug_element.innerHTML = _debug_element.innerHTML + string + "<br/>";
}

/// Wipes the debug console
/// Clears the debug element of any text. Useful if you want to track changing values in real time without clogging the browser. Just call it at the beginning every loop()!
export function wipe_log() {
  if (!_debug_enabled || !_debug_element) return;
  _debug_element.innerHTML = "";
}

//@}
