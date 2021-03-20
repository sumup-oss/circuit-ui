/**
 * Copyright 2019, SumUp Ltd.
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

import '@testing-library/jest-dom/extend-expect';
import { createSerializer } from 'jest-emotion';
import { toHaveNoViolations } from 'jest-axe';
import { fireEvent } from '@testing-library/react';

import {
  create,
  render,
  renderToHtml,
  act,
  userEvent,
  axe,
} from './util/test-utils';

global.axe = axe;
global.act = act;
global.fireEvent = fireEvent;
global.userEvent = userEvent;
global.render = render;
global.renderToHtml = renderToHtml;
global.create = create;

// react-popper relies on document.createRange
if (global.document) {
  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });
}

// Add custom matchers
expect.extend(toHaveNoViolations);

// Add a snapshot serializer that removes random hashes
// from emotion class names.
expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `circuit-${index}`;
    },
  }),
);
