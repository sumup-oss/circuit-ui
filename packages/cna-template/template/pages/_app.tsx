import type { AppProps } from 'next/app';
import { ThemeProvider, CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import { BaseStyles } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={light}>
        <BaseStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
