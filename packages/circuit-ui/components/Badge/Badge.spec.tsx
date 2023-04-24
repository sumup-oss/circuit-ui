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

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { render, axe } from '../../util/test-utils';

import { Badge } from './Badge';

describe('Badge', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });

  const variants = [
    'neutral',
    'success',
    'warning',
    'danger',
    'promo',
    'confirm',
    'notify',
    'alert',
  ] as const;

  it.each(variants)('should render with %s styles', (variant) => {
    const { container } = render(<Badge variant={variant} />);
    expect(container).toMatchSnapshot();
  });

  it('should have the correct circle styles', () => {
    const { container } = render(<Badge circle />);
    expect(container).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = createRef<HTMLDivElement>();
      const { container } = render(<Badge ref={tref} />);
      const div = container.querySelector('div');
      expect(tref.current).toBe(div);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Badge />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
