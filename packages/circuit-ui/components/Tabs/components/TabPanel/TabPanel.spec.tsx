/**
 * Copyright 2016, SumUp Ltd.
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

import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import { axe, render, screen } from '../../../../util/test-utils.js';

import { TabPanel } from './TabPanel.js';
import { AccessibilityError } from '../../../../util/errors.js';

declare const process: {
  env: { NODE_ENV: string };
};

const defaultProps = {
  id: 'tab-id',
  'aria-labelledby': 'foo',
};

describe('TabPanel', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<TabPanel className={className} {...defaultProps} />);
    const element = screen.getByRole('tabpanel');
    expect(element.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<TabPanel ref={ref} {...defaultProps} />);
    const tabList = screen.getByRole('tabpanel');
    expect(ref.current).toBe(tabList);
  });

  it('should have no violations', async () => {
    const { container } = render(<TabPanel {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it.each([
    'id',
    'aria-labelledby',
  ])('should throw an accessibility error when the "%s" prop is missing', (prop) => {
    const consoleSpy = vi.spyOn(console, 'warn');
    consoleSpy.mockImplementation(() => {});
    const testProps = {
      ...defaultProps,
      [prop]: undefined,
    };
    process.env.NODE_ENV = 'development';
    render(<TabPanel {...testProps} />);
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(AccessibilityError));
    process.env.NODE_ENV = 'test';
  });
});
