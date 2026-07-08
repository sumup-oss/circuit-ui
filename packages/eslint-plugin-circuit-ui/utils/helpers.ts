export function get(obj: unknown, path: string[]) {
  let currentValue = obj;

  for (const property of path) {
    if (typeof currentValue !== 'object' || currentValue === null) {
      return undefined;
    }
    // @ts-expect-error
    currentValue = currentValue[property];
  }

  return currentValue;
}
