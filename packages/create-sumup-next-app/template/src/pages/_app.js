import React from 'react';
import App, { Container } from 'next/app';
import { hydrate, css } from 'react-emotion';
import { standard } from '@sumup/circuit-ui/themes';
import { globalStyles } from '@sumup/circuit-ui/styles';
import { ThemeProvider } from 'emotion-theming';

// Adds server generated styles to emotion cache.
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-underscore-dangle
  hydrate(window.__NEXT_DATA__.ids);
}

const customGlobalStyles = `
body {
  background-color: ${standard.colors.n100};
}
`;

globalStyles({ theme: standard, custom: customGlobalStyles });

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={standard}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}
