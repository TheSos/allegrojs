/// 1.4

import { _downloadables } from "./core.js";
import { log } from "./debug.js";
import { CONFIG, CONFIG_DATA } from "./types.js";

const configs: CONFIG[] = [];
let config: CONFIG = {
  file: "",
  data: {},
  ready: false,
  type: "config",
};

// Parse a config file into data
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

/// 1.4.1
export function set_config_file(filename: string) {
  log("Loading config " + filename + "...");
  config.file = filename;

  _downloadables.push(config);

  // read text from URL location
  const request = new XMLHttpRequest();
  request.open("GET", filename, true);
  request.send(null);
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const type = request.getResponseHeader("Content-Type");
      if (type?.indexOf("text") !== 1) {
        config.data = _parse_config_file(request.responseText);
        config.ready = true;
      }
    }
  };
}

/// 1.4.2
export function set_config_data(data: CONFIG_DATA, length: number) {
  config.data = data;
  void length;
}

/// 1.4.3, 1.4.4
export function override_config_data(data: CONFIG_DATA, length: number) {
  config.data = data;
  void length;
}

/// 1.4.5
export function push_config_state() {
  configs.push(config);
  config = {
    file: "",
    data: {},
    ready: false,
    type: "config",
  };
}

/// 1.4.6
export function pop_config_state() {
  const top = configs.pop();
  if (top) {
    config = top;
  }
}

/// 1.4.7
export function flush_config_state() {
  /// NOOP
}

/// 1.4.8
export function reload_config_texts(new_language: string) {
  void new_language;
}

/// 1.4.9
export function hook_config_section(
  section: string,
  intgetter: (name: string, def: number) => void,
  stringgetter: (name: string, def: string) => void,
  stringsetter: (name: string, value: string) => void
) {
  void section;
  void intgetter;
  void stringgetter;
  void stringsetter;
}

/// 1.4.10
export function config_is_hooked(section: number) {
  void section;
  return false;
}

/// 1.4.11
export function get_config_string(section: string, name: string, def: string) {
  return config.data[section]?.[name] ?? def;
}

/// 1.4.12
export function get_config_int(section: string, name: string, def: number) {
  const data = config.data[section]?.[name];
  return typeof data === "string" ? parseInt(data, 10) : def;
}

/// 1.4.13
export function get_config_hex(section: string, name: string, def: number) {
  const data = config.data[section]?.[name];
  return typeof data === "string" ? parseInt(data, 10) : def;
}

/// 1.4.14
export function get_config_float(section: string, name: string, def: number) {
  const data = config.data[section]?.[name];
  return typeof data === "string" ? parseFloat(data) : def;
}

/// 1.4.15
export function get_config_id(section: string, name: string, def: string) {
  return config.data[section]?.[name] ?? def;
}

/// 1.4.16
export function get_config_argv(section: string, name: string) {
  return (config.data[section]?.[name] ?? "").split(" ");
}

/// 1.4.17
export function get_config_text(msg: string) {
  return msg;
}

/// 1.4.18
export function set_config_string(section: string, name: string, val: string) {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val };
}

/// 1.4.19
export function set_config_int(section: string, name: string, val: number) {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val.toString() };
}

/// 1.4.20
export function set_config_hex(section: string, name: string, val: number) {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val.toString() };
}

/// 1.4.21
export function set_config_float(section: string, name: string, val: number) {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val.toString() };
}

/// 1.4.22
export function set_config_id(section: string, name: string, val: number) {
  if (!section) {
    config.data[section] = {};
  }
  config.data[section] = { ...config.data[section], [name]: val.toString() };
}

/// 1.4.23
export function list_config_entries(section: string) {
  return Object.keys(config.data[section] ?? {});
}

/// 1.4.24
export function list_config_sections(names: string[]) {
  void names;
  return Object.keys(config.data);
}

/// 1.4.25
export function free_config_entries(names: string[]) {
  names.forEach((name) => delete config.data[name]);
}
