export function random(from: number | null = null, to: number | null = null, interpolation: ((n: number) => number) | null = null): number {
  if (from == null) {
    from = 0;
    to = 1;
  } else if (from != null && to == null) {
    to = from;
    from = 0;
  }
  const delta = (to as number) - from;

  if (interpolation == null) {
    interpolation = (n) => {
      return n;
    }
  }
  return from + (interpolation(Math.random()) * delta);
}

export function chance(c: number): boolean {
  return Math.random() <= c;
}
