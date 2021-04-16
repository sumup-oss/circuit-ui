/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withTM = require('next-transpile-modules')([
  '@sumup/circuit-ui',
  '@sumup/design-tokens',
  '@sumup/intl',
  '@sumup/icons',
]);

module.exports = withBundleAnalyzer(
  withTM({
    /**
     * Environment variables can be used to inject dynamic configuration
     * into the Next.js app at built time. Learn more at
     * https://nextjs.org/docs/api-reference/next.config.js/environment-variables
     */
    env: {
      SITE_NAME: 'SumUp',
      SITE_LOCALE: 'en',
      SITE_BASEURL: 'https://example.sumup.com',
    },
  }),
);
