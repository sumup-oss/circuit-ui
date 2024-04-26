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

import { render, axe, screen } from '../../util/test-utils.js';

import { ButtonGroup, type ButtonGroupProps } from './ButtonGroup.js';

describe('ButtonGroup', () => {
  const defaultProps: ButtonGroupProps = {
    actions: {
      primary: {
        children: 'Continue',
      },
      secondary: {
        children: 'Cancel',
      },
    },
  };

  it('should render two buttons', () => {
    render(<ButtonGroup {...defaultProps} />);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<ButtonGroup {...defaultProps} ref={ref} />);
    const div = container.querySelector('div');
    expect(ref.current).toBe(div);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<ButtonGroup {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
