/**
 * Add custom Jest matchers for the DOM.
 * https://github.com/testing-library/jest-dom#custom-matchers
 */
import '@testing-library/jest-dom/extend-expect';

import { toHaveNoViolations } from 'jest-axe';

/**
 * This matchers helps you test for basic accessibility
 * violations in a test.
 *
 * https://github.com/nickcolley/jest-axe
 * */
expect.extend(toHaveNoViolations);

/**
 * Mocking the environment variables that are configured in next.config.js.
 */
process.env.SITE_NAME = 'SumUp';
process.env.SITE_LOCALE = 'en';
process.env.SITE_BASEURL = 'https://example.sumup.com';
process.env.STATIC_ASSET_BASEURL = 'https://static.sumup.com';
