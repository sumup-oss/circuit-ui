'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  ReactDOM.preload(
    'https://static.sumup.com/fonts/sumup/sumup-narrow-latin-s.woff2',
    { as: 'font' },
  );
  ReactDOM.preload(
    'https://static.sumup.com/fonts/sumup/sumup-black-latin-s.woff2',
    { as: 'font' },
  );
  return null;
}
