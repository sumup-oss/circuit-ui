export const isDebugging = () =>
  process.argv.includes('--debug') || process.env.NODE_ENV === 'DEBUG';
