import '@sumup/circuit-ui/styles.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={light}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
