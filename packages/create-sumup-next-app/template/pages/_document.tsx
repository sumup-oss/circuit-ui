import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps as NextDocumentProps,
} from 'next/document';
import { extractCritical } from '@emotion/server';
import { EmotionCritical } from '@emotion/server/create-instance';

interface DocumentProps extends NextDocumentProps, EmotionCritical {}

export default class extends Document<DocumentProps> {
  /**
   * Manually configuring Emotion for server-side rendering (SSR) enables
   * the safe use of :nth-child() selectors.
   */
  static async getInitialProps({ renderPage, ...ctx }: DocumentContext) {
    const page = await renderPage();
    const styles = extractCritical(page.html);
    return { ...ctx, ...page, ...styles };
  }

  render() {
    return (
      <Html lang={process.env.SITE_LOCALE}>
        <Head>
          {/* Browser icons */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://static.sumup.com/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://static.sumup.com/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://static.sumup.com/favicons/favicon-16x16.png"
          />
          <link
            rel="manifest"
            href="https://static.sumup.com/favicons/site.webmanifest"
          />
          <link
            rel="mask-icon"
            href="https://static.sumup.com/favicons/safari-pinned-tab.svg"
            color="#ffffff"
          />
          <link
            rel="shortcut icon"
            href="https://static.sumup.com/favicons/favicon.ico"
          />
          <meta
            name="msapplication-config"
            content="https://static.sumup.com/favicons/browserconfig.xml"
          />
          <meta
            name="apple-mobile-web-app-title"
            content={process.env.SITE_NAME}
          />
          <meta name="application-name" content={process.env.SITE_NAME} />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />

          {/* Performance optimizations */}
          <link
            rel="preload"
            href="https://static.sumup.com/fonts/latin-greek-cyrillic/aktiv-grotest-400.woff2"
          />
          <link
            rel="preload"
            href="https://static.sumup.com/fonts/latin-greek-cyrillic/aktiv-grotest-700.woff2"
          />

          {/* Critical CSS */}
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
