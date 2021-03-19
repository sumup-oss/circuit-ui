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
  render,
  renderToHtml,
  axe,
  act,
  userEvent,
} from '../../util/test-utils';

import { Badge } from './Badge';

describe('Badge', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const actual = create(<Badge />);
    expect(actual).toMatchSnapshot();
  });

  const variants = [
    'neutral',
    'success',
    'warning',
    'danger',
    'primary',
    'promo',
  ] as const;

  it.each(variants)('should render with %s styles', (variant) => {
    const actual = create(<Badge variant={variant} />);
    expect(actual).toMatchSnapshot();
  });

  it('should have hover/active styles only when the onClick handler is provided', () => {
    const actual = create(<Badge onClick={jest.fn()} />);
    expect(actual).toMatchSnapshot();
  });

  it('should have the correct circle styles', () => {
    const actual = create(<Badge circle />);
    expect(actual).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = React.createRef<HTMLDivElement>();
      const { container } = render(<Badge ref={tref} />);
      const div = container.querySelector('div');
      expect(tref.current).toBe(div);
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const wrapper = renderToHtml(<Badge />);
    const actual = await axe(wrapper);
    expect(actual).toHaveNoViolations();
  });

  /**
   * Logic tests.
   */
  it('should be clickable', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Badge onClick={onClick} data-testid="badge" />,
    );

    act(() => {
      userEvent.click(getByTestId('badge'));
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
