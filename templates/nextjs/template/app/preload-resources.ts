'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  ReactDOM.preload(
    'https://static.sumup.com/fonts/Inter/Inter-normal-latin.woff2',
    { as: 'font' },
  );
  return null;
}
