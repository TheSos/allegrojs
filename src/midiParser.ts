/*
 *  Project Name : midi-parser-js
 *  Project Url  : https://github.com/colxi/midi-parser-js/
 *  Author       : colxi
 *  Author URL   : http://www.colxi.info/
 *  Description  : MidiParser library reads .MID binary files, Base64 encoded MIDI Data,
 *  or UInt8 Arrays, and outputs as a readable and structured JS object.
 */
import { log } from "./debug";
import { FileParser } from "./FileParser";

/* eslint-disable complexity */

interface MidiTrackEvent {
  time: number;
  type: number;
  data: number[];
  channel: number;
}

interface SMPTEOffset {
  hr: number;
  mn: number;
  se: number;
  fr: number;
  ff: number;
  time: number;
}

interface TimeSignature {
  nn: number;
  dd: number;
  cc: number;
  bb: number;
  time: number;
}

interface KeySignature {
  sf: number;
  mi: number;
  time: number;
}

interface Tempo {
  tempo: number;
  time: number;
}

interface MetaText {
  time: number;
  text: string;
}

interface NoteEvent {
  time: number;
  on: boolean;
  note: number;
  velocity: number;
  channel: number;
}

interface ProgramChange {
  time: number;
  program: number;
  channel: number;
}

interface MidiTrack {
  events: MidiTrackEvent[];
  text: MetaText[];
  copyright: MetaText[];
  trackName: MetaText[];
  instrumentName: MetaText[];
  programName: MetaText[];
  lyric: MetaText[];
  marker: MetaText[];
  cuePoint: MetaText[];
  tempo: Tempo[];
  smpteOffset: SMPTEOffset[];
  timeSignature: TimeSignature[];
  keySignature: KeySignature[];
  notes: NoteEvent[];
  programChange: ProgramChange[];
}

export interface MidiData {
  formatType: number;
  tracks: number;
  track: MidiTrack[];
  timeDivision: number[] | number;
}

/**
 * Parse midi file
 *
 * @param buffer - Array buffer from midi file
 */
export const parseMidi = (buffer: ArrayBuffer): MidiData | null => {
  // Convert to Uint8Array
  const uint8Data = new Uint8Array(buffer);

  // 8 bits bytes file data array
  const file = new FileParser(
    new DataView(uint8Data.buffer, uint8Data.byteOffset, uint8Data.byteLength)
  );

  // Check header
  const headerValidation = file.readInt(4);

  if (headerValidation !== 0x4d546864) {
    log(
      `Header validation failed (not MIDI standard or file corrupt), code: 0x${headerValidation.toString(
        16
      )}`
    );
    return null;
  }

  // Header size, getted just for read pointer movement
  file.movePointer(4);

  // Create new midi object
  const parsedMidi: MidiData = {
    formatType: file.readInt(2),
    tracks: file.readInt(2),
    track: [],
    timeDivision: [],
  };

  // Get Time Division first byte
  const timeDivisionByte1 = file.readInt(1);

  // Get Time Division second byte
  const timeDivisionByte2 = file.readInt(1);

  // Discover Time Division mode (fps or tpf)
  if (timeDivisionByte1 >= 128) {
    // Frames per second MODE  (1st byte), Ticks in each frame     (2nd byte)
    parsedMidi.timeDivision = [timeDivisionByte1 - 128, timeDivisionByte2];
  } else {
    // Else... ticks per beat MODE  (2 bytes value)
    parsedMidi.timeDivision = timeDivisionByte1 * 256 + timeDivisionByte2;
  }

  // Read TRACK CHUNK
  for (let t = 1; t <= parsedMidi.tracks; t += 1) {
    // Push new track
    const track: MidiTrack = {
      events: [],
      text: [],
      copyright: [],
      trackName: [],
      instrumentName: [],
      programName: [],
      lyric: [],
      marker: [],
      cuePoint: [],
      tempo: [],
      smpteOffset: [],
      timeSignature: [],
      keySignature: [],
      notes: [],
      programChange: [],
    };

    parsedMidi.track.push(track);

    // Read header
    const headerValidation = file.readInt(4);

    // EOF
    if (headerValidation === -1) {
      break;
    }

    // Check header
    if (headerValidation !== 0x4d54726b) {
      log(
        `Header validation failed (not MIDI standard or file corrupt), code: 0x${headerValidation.toString(
          16
        )}`
      );
      return null;
    }

    // Move pointer forward
    file.movePointer(4);

    // Flag for track reading secuence breaking
    let endOfTrack = false;

    // Keep track of status bytes
    let lastStatusByte = -1;

    // Loop until file has been parsed
    while (!endOfTrack) {
      // Read time
      const time = file.readIntVLV();

      // Read status byte
      let statusByte = file.readInt(1);

      // Done
      if (statusByte === -1) {
        break;
      }
      // Status byte detected
      else if (statusByte >= 128) {
        lastStatusByte = statusByte;
      }
      // Not a status byte
      else {
        // Running status situation detected, Apply last loop, Status Byte
        statusByte = lastStatusByte;

        // Move back the pointer (cause read byte is not status byte)
        file.movePointer(-1);
      }

      // Meta event
      if (statusByte === 0xff) {
        // Assign metaEvent code to array
        const type = file.readInt(1);

        // End of track
        if (type === 0x2f) {
          endOfTrack = true;
          file.movePointer(1);
        }

        // Get the metaEvent data
        else {
          getMetaData(type, time, track, file);
        }
      }
      // Regular event
      else {
        // First byte is event type id, second is channel
        const type = statusByte >> 4;
        const channel = statusByte & 0xf;

        // Read event
        if (!getRegularData(type, channel, time, track, file)) {
          log(
            `Unknown event 0x${type.toString(16)} detected! Reading cancelled!`
          );
          return null;
        }
      }
    }
  }

  return parsedMidi;
};

/**
 * Get regular data
 *
 * @param trackEvent - Current track event
 * @param file - File parser
 */
function getRegularData(
  type: number,
  channel: number,
  time: number,
  track: MidiTrack,
  file: FileParser
): boolean {
  switch (type) {
    // System Exclusive Events
    case 0xf: {
      const event_length = file.readIntVLV();
      file.movePointer(event_length);
      log("Unimplemented 0xF exclusive events! Skipped.");
      break;
    }
    // Note off
    case 0x8:
      track.notes.push({
        time,
        on: false,
        note: file.readInt(1),
        velocity: file.readInt(1),
        channel,
      });
      break;
    // Note On
    case 0x9:
      track.notes.push({
        time,
        on: false,
        note: file.readInt(1),
        velocity: file.readInt(1),
        channel,
      });
      break;
    // Program Change
    case 0xc:
      track.programChange.push({
        time,
        program: file.readInt(1),
        channel,
      });
      break;
    // Other single read events
    case 0xd:
      track.events.push({
        channel,
        time,
        type,
        data: [file.readInt(1)],
      });
      break;
    // Other multi-read events
    case 0xa:
    case 0xb:
    case 0xe:
      track.events.push({
        channel,
        time,
        type,
        data: [file.readInt(1), file.readInt(1)],
      });
      break;
    // Not implemented
    default:
      return false;
  }

  return true;
}

/**
 * Get meta data
 *
 * @param trackEvent - Current track event
 * @param file - File parser
 */
function getMetaData(
  type: number,
  time: number,
  track: MidiTrack,
  file: FileParser
): void {
  // Get meta event length
  const metaEventLength = file.readIntVLV();

  switch (type) {
    // Text Event
    case 0x01:
      track.text.push({ time, text: file.readStr(metaEventLength) });
      break;
    // Copyright Notice
    case 0x02:
      track.copyright.push({
        time,
        text: file.readStr(metaEventLength),
      });
      break;
    // Track Name
    case 0x03:
      track.trackName.push({
        time,
        text: file.readStr(metaEventLength),
      });
      break;
    // Instrument Name
    case 0x04:
      track.instrumentName.push({
        time,
        text: file.readStr(metaEventLength),
      });
      break;
    // Lyrics
    case 0x05:
      track.lyric.push({
        time,
        text: file.readStr(metaEventLength),
      });
      break;
    // Marker
    case 0x06:
      track.marker.push({
        time,
        text: file.readStr(metaEventLength),
      });
      break;
    // Cue point
    case 0x07:
      track.cuePoint.push({
        time,
        text: file.readStr(metaEventLength),
      });
      break;
    // Program name
    case 0x08:
      track.programName.push({
        time,
        text: file.readStr(metaEventLength),
      });
      break;
    // Set Tempo
    case 0x51:
      track.tempo.push({
        tempo: file.readInt(metaEventLength),
        time,
      });
      break;
    // SMPTE Offset
    case 0x54:
      track.smpteOffset.push({
        time,
        hr: file.readInt(1),
        mn: file.readInt(1),
        se: file.readInt(1),
        fr: file.readInt(1),
        ff: file.readInt(1),
      });
      break;
    // Time Signature
    case 0x58:
      track.timeSignature.push({
        time,
        nn: file.readInt(1),
        dd: file.readInt(1),
        cc: file.readInt(1),
        bb: file.readInt(1),
      });
      break;
    // Key Signature
    case 0x59:
      track.keySignature.push({
        time,
        sf: file.readInt(1),
        mi: file.readInt(1),
      });
      break;
    // Not implemented
    default:
      // Just move pointer
      log(
        `Unimplemented meta event, 0x${type.toString(16)} detected! Skipped.`
      );
      file.movePointer(metaEventLength);
  }
}
