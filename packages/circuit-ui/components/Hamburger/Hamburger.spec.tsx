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

import { describe, expect, it, vi } from 'vitest';

import {
  create,
  renderToHtml,
  axe,
  render,
  userEvent,
  RenderFn,
} from '../../util/test-utils.js';

import { Hamburger, HamburgerProps } from './Hamburger.js';

describe('Hamburger', () => {
  function renderHamburger<T>(renderFn: RenderFn<T>, props: HamburgerProps) {
    return renderFn(<Hamburger {...props} />);
  }

  const baseProps = {
    activeLabel: 'Close menu',
    inactiveLabel: 'Open menu',
  };

  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = renderHamburger(create, baseProps);
    expect(actual).toMatchSnapshot();
  });

  it('should render with active styles when passed the isActive prop', () => {
    const actual = renderHamburger(create, { ...baseProps, isActive: true });
    expect(actual).toMatchSnapshot();
  });

  const sizes: HamburgerProps['size'][] = ['kilo', 'giga'];

  it.each(sizes)('should render with %s styles', (size) => {
    const actual = renderHamburger(create, { ...baseProps, size });
    expect(actual).toMatchSnapshot();
  });

  /**
   * Logic tests.
   */
  it('should call the onClick prop when clicked', async () => {
    const onClick = vi.fn();
    const { getByTestId } = renderHamburger(render, {
      ...baseProps,
      onClick,
      'data-testid': 'hamburger',
    });

    await userEvent.click(getByTestId('hamburger'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderHamburger(renderToHtml, baseProps);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });
});
