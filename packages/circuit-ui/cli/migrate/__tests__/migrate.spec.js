/**
 * Copyright 2020, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs';
import path from 'path';

import { runInlineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();

const PARSERS = ['babel', 'tsx', 'flow'];

defineTest('button-variant-enum');
defineTest('button-size-giga');
defineTest('list-variant-enum');
defineTest('onchange-prop');
defineTest('as-prop');
defineTest('selector-props');
defineTest('exit-animations');
defineTest('input-deepref-prop');
defineTest('input-styles-prop');
defineTest('component-names-v2');
defineTest('component-static-properties');
defineTest('toggle-checked-prop');
defineTest('badge-variant-enum');
defineTest('inline-message-variant-enum');
// Need to skip the TypeScript parser, because the output format slightly
// differs from the expected format (but it is correct).
defineTest('theme-grid-tera', null, { parser: 'babel' });
defineTest('theme-to-design-tokens', 'theme-to-design-tokens-1');
defineTest('theme-to-design-tokens', 'theme-to-design-tokens-2');
defineTest('theme-icon-sizes');
defineTest('currency-utils', 'currency-utils-1');
defineTest('currency-utils', 'currency-utils-2');

function defineTest(transformName, testFilePrefix, testOptions = {}) {
  const dirName = __dirname;
  const fixtureDir = path.join(dirName, '..', '__testfixtures__');
  const inputPath = path.join(
    fixtureDir,
    `${testFilePrefix || transformName}.input.js`,
  );
  const source = fs.readFileSync(inputPath, 'utf8');
  const expectedOutput = fs.readFileSync(
    path.join(fixtureDir, `${testFilePrefix || transformName}.output.js`),
    'utf8',
  );
  // Assumes transform is one level up from __tests__ directory
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const module = require(path.join(dirName, '..', transformName));

  PARSERS.forEach((parser) => {
    let testName = 'transforms correctly';

    if (testFilePrefix) {
      testName = `${testName} using ${testFilePrefix} data`;
    }

    testName = `${testName} with the ${parser} parser`;

    // eslint-disable-next-line jest/valid-title
    describe(transformName, () => {
      // eslint-disable-next-line jest/expect-expect, jest/valid-title
      it(testName, () => {
        runInlineTest(
          module,
          null,
          { path: inputPath, source },
          expectedOutput,
          { parser, ...testOptions },
        );
      });
    });
  });
}
