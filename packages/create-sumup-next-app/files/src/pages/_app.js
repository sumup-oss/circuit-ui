import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'emotion-theming';
import { GlobalStyles, theme } from '@sumup/circuit-ui';

const { standard } = theme;

const customStyles = `
body {
  background-color: ${standard.colors.n100};
}`;

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <Head>
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
        </Head>
        <Container>
          <ThemeProvider theme={standard}>
            <GlobalStyles custom={customStyles} />
            <Component {...pageProps} />
          </ThemeProvider>
        </Container>
      </Fragment>
    );
  }
}
