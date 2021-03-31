import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentProps as NextDocumentProps,
} from 'next/document';
import { extractCritical } from 'emotion-server';
import { EmotionCritical } from 'create-emotion-server';

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
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffffff" />
          <meta
            name="apple-mobile-web-app-title"
            content={process.env.SITE_NAME}
          />
          <meta name="application-name" content={process.env.SITE_NAME} />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />

          {/* Performance optimizations */}
          <link rel="preconnect" href={process.env.STATIC_ASSET_BASEURL} />
          <link
            rel="preload"
            href={`${
              process.env.STATIC_ASSET_BASEURL as string
            }/fonts/latin-greek-cyrillic/aktiv-grotest-400.woff2`}
          />
          <link
            rel="preload"
            href={`${
              process.env.STATIC_ASSET_BASEURL as string
            }/fonts/latin-greek-cyrillic/aktiv-grotest-700.woff2`}
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
