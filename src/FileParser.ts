/**
 * File Parser
 */
export class FileParser {
  // Data for parsing
  private readonly data: DataView;

  // File pointer
  private pointer: number;

  /**
   * Constructor
   *
   * @param dataView - Data to use for parsing
   */
  public constructor(dataView: DataView) {
    this.data = dataView;
    this.pointer = 0;
  }

  /**
   * Move Pointer
   *
   * @param bytes - How many bytes to move by
   */
  public movePointer(bytes: number): number {
    // Move the pointer negative and positive direction
    this.pointer += bytes;
    return this.pointer;
  }

  /**
   * Read an integer from buffer
   *
   * @param bytes - Number of bytes to read
   */
  public readInt(bytes: number): number {
    // Get integer from next bytes group (big-endian)
    const clamp_bytes = Math.min(bytes, this.data.byteLength - this.pointer);

    // EOF
    if (clamp_bytes < 1) {
      return -1;
    }
    let value = 0;
    if (clamp_bytes > 1) {
      for (let i = 1; i <= clamp_bytes - 1; i += 1) {
        value += this.data.getUint8(this.pointer) * 256 ** (clamp_bytes - i);
        this.pointer += 1;
      }
    }
    value += this.data.getUint8(this.pointer);

    this.pointer += 1;
    return value;
  }

  /**
   * Read a string from buffer
   *
   * @param bytes - Number of bytes to read
   */
  public readStr(bytes: number): string {
    // Read as ASCII chars, the followoing bytes
    let text = "";
    for (let char = 1; char <= bytes; char += 1)
      text += String.fromCharCode(this.readInt(1));
    return text;
  }

  /**
   * Read a variable length value
   *
   * @param bytes - Number of bytes to read
   */
  public readIntVLV(): number {
    // Read a variable length value
    let value = 0;
    if (this.pointer >= this.data.byteLength) {
      // EOF
      return -1;
    } else if (this.data.getUint8(this.pointer) < 128) {
      // ...value in a single byte
      value = this.readInt(1);
    } else {
      // ...value in multiple bytes
      const FirstBytes: number[] = [];
      while (this.data.getUint8(this.pointer) >= 128) {
        FirstBytes.push(this.readInt(1) - 128);
      }
      const lastByte = this.readInt(1);
      for (let dt = 1; dt <= FirstBytes.length; dt += 1) {
        const num = FirstBytes[FirstBytes.length - dt];
        if (typeof num === "number") {
          value += num * 128 ** dt;
        }
      }
      value += lastByte;
    }
    return value;
  }
}
