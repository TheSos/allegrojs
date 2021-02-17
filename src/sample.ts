////////////////////////////////////////////
/// @name SOUND ROUTINES
//@[

import { _downloadables } from "./core.js";
import { log } from "./debug.js";
import { SAMPLE } from "./types.js";

let _volume = 1.0;

/// Loaded samples
const _samples: SAMPLE[] = [];

/// Install sound
/// @todo: stuff here? AudioContext? compatibility first!
export function install_sound(
  digi: number,
  midi: number,
  cfg_path?: string | null
) {
  void digi;
  void midi;
  void cfg_path;
  return 0;
}

export const DIGI_AUTODETECT = -1;
export const DIGI_NONE = 0;

export const MIDI_AUTODETECT = -1;
export const MIDI_NONE = 0;
export const MIDI_DIGMID = 1;

/// Sets global volume
export function set_volume(volume: number) {
  _volume = volume;
  _samples.forEach(
    (sample) => (sample.element.volume = sample.volume * _volume)
  );
}

/// Gets global volume
export function get_volume() {
  return _volume;
}

/// Loads a sample from file
/// Loads a sample from file and returns it. Doesn't stall for loading, use ready() to make sure your samples are loaded! Note that big files, such as music jingles, will most probably get streamed instead of being fully loaded into memory, meta data should be accessible tho.
/// @param filename name of the audio file
/// @return sample object
export function load_sample(filename: string) {
  const audio = document.createElement("audio");
  audio.src = filename;
  const sample: SAMPLE = {
    element: audio,
    file: filename,
    volume: 1.0,
    ready: false,
    type: "snd",
  };
  _downloadables.push(sample);
  _samples.push(sample);
  log("Loading sample " + filename + "...");
  audio.onloadeddata = () => {
    if (!sample.ready) {
      sample.ready = true;
      log("Sample " + filename + " loaded!");
    }
  };
  return sample;
}

/// Does nothing.
/// @todo: something that happens here
export function destroy_sample(filename: string) {
  void filename;
}

/// Plays given sample.
/// Plays a sample object using given values. Note how pan is left out, as it doesn't seem to have a js counterpart. Freq will probably not work everywhere too!
/// @param sample sample to be played
/// @param vol playback volume
/// @param freq speed, 1.0 is normal
/// @param loop loop or not to loop
export function play_sample(
  sample: SAMPLE,
  vol = 1.0,
  freq = 1.0,
  loop = false
) {
  adjust_sample(sample, vol, freq, loop);
  sample.element.currentTime = 0;
  void sample.element.play();
}

/// Adjust sample during playback
/// Adjusts sample data Note how pan is left out, as it doesn't seem to have a js counterpart. freq will probably not work everywhere too!
/// @param sample sample
/// @param vol playback volume
/// @param freq speed, 1.0 is normal
/// @param loop loop or not to loop
export function adjust_sample(
  sample: SAMPLE,
  vol: number,
  freq: number,
  loop: boolean
) {
  sample.volume = vol;
  sample.element.volume = sample.volume * _volume;
  sample.element.loop = loop;
  sample.element.playbackRate = freq;
}

/// Stops playing
/// Also resets position.
/// @param sample sample to be stopped
export function stop_sample(sample: SAMPLE) {
  sample.element.pause();
  sample.element.currentTime = 0;
}

/// Pauses playing
/// Also doesn't reset position. Use play_sample() to resume.
/// @param sample sample to be stopped
export function pause_sample(sample: SAMPLE) {
  sample.element.pause();
}

//@}
