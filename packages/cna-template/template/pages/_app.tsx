import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { BaseStyles } from '@sumup/circuit-ui';
import { light } from '@sumup/design-tokens';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={light}>
      <BaseStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
