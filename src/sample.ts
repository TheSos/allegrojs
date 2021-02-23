import { log } from "./debug.js";
import { SAMPLE } from "./types.js";

let _volume = 1.0;
let _midi_volume = 1.0;

export const digi_driver = {
  id: 0,
  name: "Browser DIGI",
  desc: "Browser DIGI",
  ascii_name: "Browser DIGI",
};

/**
 * Samples
 *
 * @remarks
 * Internal samples array
 *
 * @internal
 */
const _samples: SAMPLE[] = [];

// Audio context
let _context: AudioContext | null = null;
let _context_gain: GainNode | null = null;

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

  _context = new window.AudioContext();
  _context_gain = _context.createGain();
  _context_gain.connect(_context.destination);

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
export function set_volume(digi_volume: number, midi_volume: number): void {
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
  if (_context_gain) {
    _context_gain.gain.value = _volume / 255;
  }
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
export function get_volume(): { digi_volume: number; midi_volume: number } {
  return { digi_volume: _volume, midi_volume: _midi_volume };
}

/**
 * Loads a sample from file
 *
 * @remarks
 * Loads a sample from file and returns it. Doesn't stall for loading, use ready() to make sure your samples are loaded!
 *
 * @param filename - name of the audio file
 * @returns sample object
 *
 * @allegro 1.27.1
 */
export async function load_sample(filename: string): Promise<SAMPLE> {
  if (!_context || !_context_gain) {
    throw new Error("Can not load audio without audio context");
  }

  log(`Loading sample ${filename}...`);

  const sample: SAMPLE = {
    file: filename,
    source: _context.createBufferSource(),
    gain: _context.createGain(),
    buffer: null,
    pan: _context.createStereoPanner(),
    ready: false,
    type: "snd",
  };

  // Fetch sound
  const buffer = await fetch(filename)
    .then(async (response) => response.arrayBuffer())
    .then(async (buffer) => _context?.decodeAudioData(buffer));

  if (!buffer) {
    throw new Error("Could not load sample");
  }

  // Set it up
  sample.buffer = buffer;
  sample.pan.connect(sample.gain);
  sample.gain.connect(_context_gain);
  sample.ready = true;

  log(`Sample ${filename} loaded!`);

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
export function destroy_sample(spl: SAMPLE): void {
  const index = _samples.findIndex((s) => s === spl);
  if (index !== -1) {
    log(`Sample destroyed at index ${index}`);
    spl.source.disconnect();
    _samples.splice(index, 1);
  }
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
): void {
  if (!_context) {
    return;
  }

  sample.source = _context.createBufferSource();
  sample.source.buffer = sample.buffer;
  sample.source.connect(sample.pan);
  adjust_sample(sample, vol, pan, freq, loop);
  sample.source.start(0);
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
): void {
  sample.pan.pan.value = pan / 127.0 - 1.0;
  sample.gain.gain.value = vol / 255.0;
  sample.source.loop = loop;
  sample.source.playbackRate.value = freq / 1000.0;
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
export function stop_sample(sample: SAMPLE): void {
  sample.source.stop();
}
