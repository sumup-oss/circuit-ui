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

import '@testing-library/jest-dom/vitest';
import { vi, expect } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

// Add custom matchers
expect.extend(toHaveNoViolations);

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  /**
   * @deprecated
   */
  addListener: vi.fn(),
  /**
   * @deprecated
   */
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

global.scrollTo = vi.fn();

// The popover API is not available in JSDOM, so we need to mock it
// from https://github.com/jsdom/jsdom/issues/3721#issuecomment-2702227347
Object.defineProperties(HTMLElement.prototype, {
  popover: {
    value: 'auto',
    configurable: true,
    enumerable: true,
    writable: true,
  },
  showPopover: {
    value() {
      // display: block is important for getting RTL tests to see the popover
      // this is also how the popover is revealed in the browser
      const element = this as HTMLElement;
      element.style.display = 'block';
      element.setAttribute('popover-open', '');
      element.setAttribute('data-state', 'open');
      const showEvent = new window.Event('show', { bubbles: true });
      element.dispatchEvent(showEvent);
      return undefined;
    },
    configurable: true,
    writable: true,
  },
  hidePopover: {
    value() {
      // display; none is also how popovers are hidden in the browser
      const element = this as HTMLElement;
      element.style.display = 'none';
      element.removeAttribute('popover-open');
      element.setAttribute('data-state', 'closed');
      const hideEvent = new window.Event('hide', { bubbles: true });
      element.dispatchEvent(hideEvent);
      return undefined;
    },
    configurable: true,
    writable: true,
  },
});
