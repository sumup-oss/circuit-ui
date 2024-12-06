'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  // @ts-expect-error This API is available in the React canary used by Next.js
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  ReactDOM.preload(
    'https://static.sumup.com/fonts/Inter/Inter-normal-latin.woff2',
    { as: 'font' },
  );
  return null;
}
