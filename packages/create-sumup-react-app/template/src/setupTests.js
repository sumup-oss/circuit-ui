/**
 * Add custom Jest matchers for the DOM.
 * https://github.com/testing-library/jest-dom#readme
 */
import '@testing-library/jest-dom/extend-expect';

import serializer, { matchers } from 'jest-emotion';
import { toHaveNoViolations } from 'jest-axe';

/**
 * These matchers help you test agains specific style rules
 * in a test.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#custom-matchers
 */
// eslint-disable-next-line no-undef
expect.extend(matchers);
expect.extend(toHaveNoViolations);

/**
 * The serializer will make sure emotion generated styles
 * show up in snapshots.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#snapshot-serializer
 */
// eslint-disable-next-line no-undef
expect.addSnapshotSerializer(serializer);
