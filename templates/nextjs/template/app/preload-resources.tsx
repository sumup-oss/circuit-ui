'use client';

import ReactDOM from 'react-dom';

export function PreloadResources() {
  ReactDOM.preload(
    'https://static.sumup.com/fonts/latin-greek-cyrillic/aktiv-grotest-400.woff2',
    { as: 'font' },
  );
  ReactDOM.preload(
    'https://static.sumup.com/fonts/latin-greek-cyrillic/aktiv-grotest-700.woff2',
    { as: 'font' },
  );

  return null;
}
