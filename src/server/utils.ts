export function dieRoll(sides = 6) {
  return randomInt(1, sides);
}

export function randomInt(min: number, max: number): number {
  const sides = max - min + 1;
  const die = Math.random() * sides;
  return Math.floor(die) + min;
}

export function validatePosInt(text: unknown): number | null {
  if (typeof text !== 'string' || !/^[1-9][0-9]*$/.test(text)) {
    return null;
  }
  const res = parseInt(text);
  return `${res}` === text ? res : null;
}
