import { _downloadables } from "./core.js";
import { log } from "./debug.js";
import { SAMPLE } from "./types.js";

let _volume = 1.0;
let _midi_volume = 1.0;

/**
 * Samples
 *
 * @remarks
 * Internal samples array
 *
 * @internal
 */
const _samples: SAMPLE[] = [];

// Constants
export const DIGI_AUTODETECT = -1;
export const DIGI_NONE = 0;
export const MIDI_AUTODETECT = -1;
export const MIDI_NONE = 0;
export const MIDI_DIGMID = 1;

/**
 * Install Sound
 *
 * @remarks
 * Install sound module
 *
 * @param digi - DIGI config
 * @param midi - MIDI config
 * @param cfg_path - Path to config, does nothing
 *
 * @returns 0 on success, 1 on failure
 *
 * @allegro 1.25.5
 */
export function install_sound(
  digi: number,
  midi: number,
  cfg_path?: string | null
): number {
  void digi;
  void midi;
  void cfg_path;
  return 0;
}

/**
 * Remove Sound
 *
 * @remarks
 * Remove sound module
 *
 * @allegro 1.25.6
 */
export function remove_sound(): void {
  // Does nothing
}

/**
 * Set Global Volume
 *
 * @remarks
 * Sets global volume modifier
 *
 * @param digi_volume - Global volume modifier from 0-255
 * @param midi_volume - Global midi volume modifier from 0-255
 *
 * @allegro 1.25.7
 */
export function set_volume(digi_volume: number, midi_volume: number) {
  // Bound check
  if (digi_volume > 255) {
    _volume = 255;
  } else if (digi_volume >= 0) {
    _volume = digi_volume;
  }

  // Bound check
  if (midi_volume > 255) {
    _midi_volume = 255;
  } else if (midi_volume >= 0) {
    _midi_volume = midi_volume;
  }

  // Loop over samples
  _samples.forEach(
    (sample) => (sample.element.volume = sample.volume * (_volume / 255))
  );
}

/**
 * Get Volume
 *
 * @remarks
 * In allegro, these are returned through argument pointers, here we
 * have to return an object.
 *
 * @returns Object containing digi_volume and midi_volume
 */
export function get_volume() {
  return { digi_volume: _volume, midi_volume: _midi_volume };
}

/**
 * Loads a sample from file
 *
 * @remarks
 *  Loads a sample from file and returns it. Doesn't stall for loading, use ready() to make sure your samples are loaded! Note that big files, such as music jingles, will most probably get streamed instead of being fully loaded into memory, meta data should be accessible tho.
 *
 * @param filename - name of the audio file
 * @returns sample object
 *
 * @allegro 1.27.1
 */
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

/**
 * Destory Sample
 *
 * @remarks
 * Does nothing!
 *
 * @param spl - Sample to destroy
 *
 * @allegro 1.27.8
 */
export function destroy_sample(spl: SAMPLE) {
  void spl;
}

/**
 * Plays given sample.
 *
 * @remarks
 * Plays a sample object using given values.
 * Note how pan is left out, as it doesn't seem to have a js counterpart.
 * Freq will probably not work everywhere too!
 *
 * @param sample - sample to be played
 * @param vol - playback volume from 0-255
 * @param pan - sample panning from 0-255
 * @param freq - speed, 1.0 is normal
 * @param loop - loop or not to loop
 *
 * @allegro 1.27.11
 */
export function play_sample(
  sample: SAMPLE,
  vol = 255,
  pan = 127,
  freq = 1000,
  loop = false
) {
  adjust_sample(sample, vol, pan, freq, loop);
  sample.element.currentTime = 0;
  void sample.element.play();
}

/**
 * Adjust sample during playback
 *
 * @remarks
 * Adjusts sample data
 *
 * @param sample - sample to be played
 * @param vol - playback volume from 0-255
 * @param pan - sample panning from 0-255 (does not work)
 * @param freq - speed, 1.0 is normal
 * @param loop - loop or not to loop
 *
 * @allegro 1.27.12
 */
export function adjust_sample(
  sample: SAMPLE,
  vol: number,
  pan: number,
  freq: number,
  loop: boolean
) {
  void pan;
  sample.volume = vol;
  sample.element.volume = sample.volume / 255;
  sample.element.loop = loop;
  sample.element.playbackRate = freq / 1000;
}

/**
 * Stops sample from playing
 *
 * @remarks
 * Stop sample and reset position of playback
 *
 * @param sample - sample to be stopped
 *
 * @allegro 1.27.13
 */
export function stop_sample(sample: SAMPLE) {
  sample.element.pause();
  sample.element.currentTime = 0;
}
