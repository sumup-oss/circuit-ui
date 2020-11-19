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

import React from 'react';

import {
  create,
  renderToHtml,
  axe,
  render,
  act,
  userEvent,
  RenderFn,
} from '../../util/test-utils';

import { Hamburger, HamburgerProps } from './Hamburger';

describe('Hamburger', () => {
  function renderHamburger<T>(renderFn: RenderFn<T>, props: HamburgerProps) {
    return renderFn(<Hamburger {...props} />);
  }

  const baseProps = {
    labelActive: 'Close menu',
    labelInActive: 'Open menu',
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

  /**
   * Logic tests.
   */
  it('should call the onClick prop when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = renderHamburger(render, {
      ...baseProps,
      onClick,
      'data-testid': 'hamburger',
    });

    act(() => {
      userEvent.click(getByTestId('hamburger'));
    });

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
