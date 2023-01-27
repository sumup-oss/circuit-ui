import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
  return (
    <Html>
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
          content={process.env.NEXT_PUBLIC_SITE_NAME}
        />
        <meta
          name="application-name"
          content={process.env.NEXT_PUBLIC_SITE_NAME}
        />
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
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
