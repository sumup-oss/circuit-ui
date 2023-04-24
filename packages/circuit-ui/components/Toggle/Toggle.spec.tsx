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

import { render, axe } from '../../util/test-utils.jsx';

import { Toggle } from './Toggle';

const defaultProps = {
  label: 'Label',
  explanation: 'A longer explanation',
  checkedLabel: 'on',
  uncheckedLabel: 'off',
};

describe('Toggle', () => {
  /**
   * Style tests.
   */
  it('should render with default styles', () => {
    const { container } = render(<Toggle {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  describe('business logic', () => {
    /**
     * Should accept a working ref
     */
    it('should accept a working ref', () => {
      const tref = createRef<HTMLButtonElement>();
      const { container } = render(<Toggle {...defaultProps} ref={tref} />);
      const button = container.querySelector('button');
      expect(tref.current).toBe(button);
    });

    it('should accept a custom description via aria-describedby', () => {
      const customDescription = 'Custom description';
      const customDescriptionId = 'customDescriptionId';
      const { getByRole } = render(
        <>
          <span id={customDescriptionId}>{customDescription}</span>
          <Toggle aria-describedby={customDescriptionId} {...defaultProps} />,
        </>,
      );
      const toggleEl = getByRole('switch');

      expect(toggleEl).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(customDescriptionId),
      );
      expect(toggleEl).toHaveAccessibleDescription(
        `${customDescription} ${defaultProps.explanation}`,
      );
    });
  });

  /**
   * Accessibility tests.
   * See https://inclusive-components.design/toggle-button/
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Toggle {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
