export class LibTimidity {
  public duration: number;

  public currentTime: number;

  public constructor(baseUrl?: string[]);
  public load(url: string): void;
  public play(): void;
  public pause(): void;
  public seek(second: number): void;
  public destroy(): void;
}
