export function hoursBetween(d1: Date, d2: Date): number {
  return Math.floor(Math.abs(d1.getTime() - d2.getTime()) / 36e5);
}
