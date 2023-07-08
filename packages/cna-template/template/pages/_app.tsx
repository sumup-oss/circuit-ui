import type { AppProps } from 'next/app';

import '@sumup/design-tokens/light.css';
import '@sumup/circuit-ui/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
