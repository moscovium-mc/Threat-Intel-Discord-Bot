// Logger
export class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  static info(message: string): void {
    console.log(`[INFO] ${this.getTimestamp()} - ${message}`);
  }

  static error(message: string, error?: any): void {
    console.error(`[ERROR] ${this.getTimestamp()} - ${message}`);
    if (error) console.error(error);
  }

  static warn(message: string): void {
    console.warn(`[WARN] ${this.getTimestamp()} - ${message}`);
  }

  static success(message: string): void {
    console.log(`[SUCCESS] ${this.getTimestamp()} - SUCCESS ${message}`);
  }
}
