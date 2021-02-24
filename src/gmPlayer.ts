interface GmPreset {
  op1Type: "sawtooth" | "sine" | "square" | "triangle";
  op2Type: "sawtooth" | "sine" | "square" | "triangle";
  gain: number;
  op1Dest: "op2" | "out";
  op2Dest: "op1" | "out";
  op1Ratio: number;
  op2Ratio: number;
}

const GM_INSTRUMENTS: GmPreset[] = [];

export class GmPlayer {
  private readonly context: AudioContext;

  private readonly op1: OscillatorNode;

  private readonly op2: OscillatorNode;

  private readonly gain: GainNode;

  private op1Ratio: number;

  private op2Ratio: number;

  public constructor() {
    this.context = new AudioContext();

    this.op1 = this.context.createOscillator();
    this.op2 = this.context.createOscillator();

    this.op1Ratio = 1.0;
    this.op2Ratio = 1.0;

    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);
  }

  public programChange(instrument: number): void {
    const preset = GM_INSTRUMENTS[instrument];

    if (!preset) {
      return;
    }

    this.changeInstrument(preset);
  }

  public changeInstrument(preset: GmPreset): void {
    this.op1.disconnect();
    this.op1.type = preset.op1Type;

    this.op2.disconnect();
    this.op2.type = preset.op2Type;

    this.op1Ratio = preset.op1Ratio;
    this.op2Ratio = preset.op2Ratio;

    this.gain.gain.value = preset.gain;

    switch (preset.op1Dest) {
      case "op2":
        this.op1.connect(this.op2);
        break;
      case "out":
      default:
        this.op1.connect(this.gain);
        break;
    }

    switch (preset.op2Dest) {
      case "op1":
        this.op2.connect(this.op1);
        break;
      case "out":
      default:
        this.op1.connect(this.gain);
        break;
    }
  }

  public play(freq: number): void {
    this.op1.frequency.value = freq * this.op1Ratio;
    this.op2.frequency.value = freq * this.op2Ratio;
  }

  public stop(freq: number): void {
    this.op1.frequency.value = freq * this.op1Ratio;
    this.op2.frequency.value = freq * this.op2Ratio;
  }
}
