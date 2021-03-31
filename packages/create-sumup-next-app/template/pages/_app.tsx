import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import { CacheProvider } from '@emotion/core';
// eslint-disable-next-line emotion/no-vanilla
import { cache } from 'emotion';
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
