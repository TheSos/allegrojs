import { _downloadables } from "./core.js";
import { log } from "./debug.js";
import { CONFIG, CONFIG_DATA } from "./types.js";

/**
 * Internal list of config files
 */
const configs: CONFIG[] = [];

/**
 * Default structure
 */
let config: CONFIG = {
  file: "",
  data: {},
  ready: false,
  type: "config",
};

/**
 * Parse a config file into data
 *
 * @remarks
 * This splits config data into keys
 *
 * @param data - String to parse
 *
 * @internal
 */
function _parse_config_file(data: string): CONFIG_DATA {
  const conf: CONFIG_DATA = {};

  const lines = data
    .split("\n")
    .filter((line) => !/^#/u.exec(line) && line.length > 0);

  let section = "";

  lines.forEach((line) => {
    if (/\[[a-zA-Z]*\]/u.exec(line)) {
      section = line.replace("[", "").replace("]", "");
    } else if (line.includes("=")) {
      const [key, val] = line.split("=");
      const k = key?.trim();
      const v = val?.trim();
      if (typeof k === "string" && typeof v === "string") {
        conf[section] = { ...conf[section], [k]: v };
      }
    }
  });

  return conf;
}

/**
 * Set config file
 *
 * @remarks
 * Sets up config file and loads it
 *
 * @param filename - Name of file to load
 *
 * @allegro 1.4.1
 */
export function set_config_file(filename: string): void {
  log(`Loading config ${filename}...`);
  config.file = filename;

  _downloadables.push(config);

  // Read text from URL location
  const request = new XMLHttpRequest();
  request.open("GET", filename, true);
  request.send(null);
  request.onreadystatechange = (): void => {
    if (request.readyState === 4 && request.status === 200) {
      const type = request.getResponseHeader("Content-Type");
      if (type?.indexOf("text") !== 1) {
        config.data = _parse_config_file(request.responseText);
        config.ready = true;
      }
    }
  };
}

/**
 * Set config data
 *
 * @remarks
 * Sets data of config file manually
 *
 * @param data - Data to config
 * @param length - Length of data
 *
 * @allegro 1.4.2
 */
export function set_config_data(data: CONFIG_DATA, length: number): void {
  config.data = data;
  void length;
}

/**
 * Override config data
 *
 * @remarks
 * Overrides data of config file manually
 *
 * @param data - Data to config
 * @param length - Length of data
 *
 * @allegro 1.4.3, 1.4.4
 */
export function override_config_data(data: CONFIG_DATA, length: number): void {
  config.data = data;
  void length;
}

/**
 * Push config state
 *
 * @remarks
 * Push config state to stack
 *
 * @allegro 1.4.5
 */
export function push_config_state(): void {
  configs.push(config);
  config = {
    file: "",
    data: {},
    ready: false,
    type: "config",
  };
}

/**
 * Pop config state
 *
 * @remarks
 * Pop config state from stack
 *
 * @allegro 1.4.6
 */
export function pop_config_state(): void {
  const top = configs.pop();
  if (top) {
    config = top;
  }
}

/**
 * Flush config state
 *
 * @remarks
 * Writes the current config file from contents if contents are changed.
 *
 * @allegro 1.4.7
 *
 * @alpha
 */
export function flush_config_state(): void {
  // NOOP
}

/**
 * Reload config texts
 *
 * @remarks
 * Reloads the translated strings returned by get config text().
 * This is useful to switch to another language in your program at runtime.
 *
 * @param new_language - Language to read
 *
 * @allegro 1.4.8
 *
 * @alpha
 */
export function reload_config_texts(new_language: string): void {
  void new_language;
}

/**
 * Hook config section
 *
 * @remarks
 * Hook getter into config system
 *
 * @param section - Section to hook into
 * @param intgetter - Getter for ints
 * @param stringgetter - Getter for strings
 * @param stringsetter - Setter for strings
 *
 * @allegro 1.4.9
 */
export function hook_config_section(
  section: string,
  intgetter: (name: string, def: number) => void,
  stringgetter: (name: string, def: string) => void,
  stringsetter: (name: string, value: string) => void
): void {
  void section;
  void intgetter;
  void stringgetter;
  void stringsetter;
}

/**
 * Config is hooked
 *
 * @remarks
 * Return if the config is hooked into
 *
 * @param section - Section to check if its hooked
 *
 * @returns Config hooked status
 *
 * @allegro 1.4.10
 */
export function config_is_hooked(section: number): boolean {
  void section;
  return false;
}

/**
 * Get config string
 *
 * @remarks
 * Get section of config
 *
 * @param section - section to read
 * @param name - sectiton name to read
 * @param def - Language string
 *
 * @allegro 1.4.11
 */
export function get_config_string(
  section: string,
  name: string,
  def: string
): string {
  return config.data[section]?.[name] ?? def;
}

/**
 * Get config integer
 *
 * @remarks
 * Get integer from config file
 *
 * @param section - section to read
 * @param name - sectiton name to read
 * @param def - Language string
 * @returns integer if found
 *
 * @allegro 1.4.12
 */
export function get_config_int(
  section: string,
  name: string,
  def: number
): number {
  const data = config.data[section]?.[name];
  return typeof data === "string" ? parseInt(data, 10) : def;
}

/**
 * Get config hex
 *
 * @remarks
 * Get hex from config file
 *
 * @param section - section to read
 * @param name - sectiton name to read
 * @param def - Language string
 * @returns hex if found
 *
 * @allegro 1.4.13
 */
export function get_config_hex(
  section: string,
  name: string,
  def: number
): number {
  const data = config.data[section]?.[name];
  return typeof data === "string" ? parseInt(data, 10) : def;
}

/**
 * Get config float
 *
 * @remarks
 * Get float from config file
 *
 * @param section - section to read
 * @param name - sectiton name to read
 * @param def - Language string
 * @returns float if found
 *
 * @allegro 1.4.14
 */
export function get_config_float(
  section: string,
  name: string,
  def: number
): number {
  const data = config.data[section]?.[name];
  return typeof data === "string" ? parseFloat(data) : def;
}

/**
 * Get config id
 *
 * @remarks
 * Get id from config file
 *
 * @param section - section to read
 * @param name - sectiton name to read
 * @param def - Language string
 * @returns id if found
 *
 * @allegro 1.4.15
 */
export function get_config_id(
  section: string,
  name: string,
  def: string
): string {
  return config.data[section]?.[name] ?? def;
}

/**
 * Get config array
 *
 * @remarks
 * Get array from config file
 *
 * @param section - section to read
 * @param name - sectiton name to read
 * @param def - Language string
 * @returns array if found
 *
 * @allegro 1.4.16
 */
export function get_config_argv(section: string, name: string): string[] {
  return (config.data[section]?.[name] ?? "").split(" ");
}

/**
 * Get config text
 *
 * @remarks
 * Get string from config file
 *
 * @param msg - text to get
 * @returns text if found
 *
 * @allegro 1.4.17
 */
export function get_config_text(msg: string): string {
  return msg;
}

/**
 * Set config string
 *
 * @remarks
 * Sets string in config file
 *
 * @param section - section to write to
 * @param name - name of entry to write to
 * @param val - string value
 *
 * @allegro 1.4.18
 */
export function set_config_string(
  section: string,
  name: string,
  val: string
): void {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val };
}

/**
 * Set config int
 *
 * @remarks
 * Sets int in config file
 *
 * @param section - section to write to
 * @param name - name of entry to write to
 * @param val - int value
 *
 * @allegro 1.4.19
 */
export function set_config_int(
  section: string,
  name: string,
  val: number
): void {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val.toString() };
}

/**
 * Set config hex
 *
 * @remarks
 * Sets hex in config file
 *
 * @param section - section to write to
 * @param name - name of entry to write to
 * @param val - hex value
 *
 * @allegro 1.4.20
 */
export function set_config_hex(
  section: string,
  name: string,
  val: number
): void {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val.toString() };
}

/**
 * Set config float
 *
 * @remarks
 * Sets float in config file
 *
 * @param section - section to write to
 * @param name - name of entry to write to
 * @param val - float value
 *
 * @allegro 1.4.21
 */
export function set_config_float(
  section: string,
  name: string,
  val: number
): void {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val.toString() };
}

/**
 * Set config id
 *
 * @remarks
 * Sets id in config file
 *
 * @param section - section to write to
 * @param name - name of entry to write to
 * @param val - id value
 *
 * @allegro 1.4.22
 */
export function set_config_id(
  section: string,
  name: string,
  val: number
): void {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val.toString() };
}

/**
 * List config entries
 *
 * @remarks
 * List entries in config file
 *
 * @param section - section to write to
 *
 * @allegro 1.4.23
 */
export function list_config_entries(section: string): string[] {
  return Object.keys(config.data[section] ?? {});
}

/**
 * List config sections
 *
 * @remarks
 * List sections in config file
 *
 * @param names - array of names
 *
 * @allegro 1.4.24
 */
export function list_config_sections(names: string[]): string[] {
  void names;
  return Object.keys(config.data);
}

/**
 * Free config entries
 *
 * @remarks
 * Free names in config file
 *
 * @param names - array of names to free
 *
 * @allegro 1.4.25
 */
export function free_config_entries(names: string[]): void {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  names.forEach((name) => delete config.data[name]);
}
