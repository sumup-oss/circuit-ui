import React, { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'emotion-theming';
import { Global } from '@emotion/core';
import { BaseStyles, theme as themes } from '@sumup/circuit-ui';

const { circuit } = themes;

const customStyles = theme => `
body {
  background-color: ${theme.colors.n100};
}`;

export default class CustomApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Fragment>
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
        </Head>
        <ThemeProvider theme={circuit}>
          <BaseStyles />
          <Global custom={customStyles} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Fragment>
    );
  }
}
