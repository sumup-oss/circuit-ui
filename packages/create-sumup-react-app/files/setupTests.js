/**
 * Add custom Jest matchers for the DOM.
 * https://github.com/gnapse/jest-dom#table-of-contents
 */
import 'jest-dom/extend-expect';

import { createMatchers, createSerializer } from 'jest-emotion';
import * as emotion from 'emotion';

/**
 * These matchers help you test agains specific style rules
 * in a test.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#tohavestylerule
 * */
expect.extend(createMatchers(emotion));

/**
 * The serializer will make sure emotion generated styles
 * show up in snapshots.
 *
 * https://github.com/emotion-js/emotion/tree/master/packages/jest-emotion#snapshot-serializer
 * */
expect.addSnapshotSerializer(createSerializer(emotion));
