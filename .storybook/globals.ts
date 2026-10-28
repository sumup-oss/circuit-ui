export type Globals = {
  theme: string;
  locale: string;
};

export function parseGlobals() {
  const globals = new URL(window.location.href).searchParams.get('globals');
  if (!globals) {
    return {};
  }
  return globals.split(';').reduce(
    (acc, global) => {
      const [key, value] = global.split(':');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
}
