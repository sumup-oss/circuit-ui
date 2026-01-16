'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  ReactDOM.preload(
    'https://static.sumup.com/fonts/holo/NaNHoloNarrow-Blond.ttf',
    { as: 'font' },
  );
  return null;
}
