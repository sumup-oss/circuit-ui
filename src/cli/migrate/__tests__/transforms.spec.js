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

import { defineTest } from 'jscodeshift/dist/testUtils';

jest.autoMockOff();

defineTest(__dirname, 'button-variant-enum');
defineTest(__dirname, 'list-variant-enum');
defineTest(__dirname, 'onchange-prop');
defineTest(__dirname, 'as-prop');
defineTest(__dirname, 'selector-props');
defineTest(__dirname, 'exit-animations');
defineTest(__dirname, 'input-deepref-prop');
defineTest(__dirname, 'input-styles-prop');
defineTest(__dirname, 'component-names-v2');
defineTest(__dirname, 'component-static-properties');
defineTest(__dirname, 'toggle-checked-prop');
defineTest(__dirname, 'badge-variant-enum');
defineTest(__dirname, 'inline-message-variant-enum');
defineTest(__dirname, 'theme-grid-tera');
defineTest(
  __dirname,
  'theme-to-design-tokens',
  null,
  'theme-to-design-tokens-1',
);
defineTest(
  __dirname,
  'theme-to-design-tokens',
  null,
  'theme-to-design-tokens-2',
);
defineTest(__dirname, 'theme-icon-sizes');
defineTest(__dirname, 'currency-utils', null, 'currency-utils-1');
defineTest(__dirname, 'currency-utils', null, 'currency-utils-2');
