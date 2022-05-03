import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { BaseStyles } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <CacheProvider value={cache}>
    <ThemeProvider theme={light}>
      <BaseStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
);

export default App;
