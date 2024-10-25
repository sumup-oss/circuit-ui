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

import { render, axe } from '../../../util/test-utils';

import type { Position, Alignment } from './Tooltip';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  /**
   * Style tests.
   */
  const positions: Position[] = ['top', 'right', 'bottom', 'left'];
  positions.forEach((position) => {
    it(`should render with position ${position}, when passed "${position}" for the position prop`, () => {
      const { container } = render(
        <Tooltip position={position}>Tooltip content</Tooltip>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  const alignments: Alignment[] = ['right', 'left', 'top', 'bottom', 'center'];
  alignments.forEach((align) => {
    it(`should render with align ${align}, when passed "${align}" for the align prop`, () => {
      const { container } = render(
        <Tooltip align={align}>Tooltip content</Tooltip>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  it('should override alignment styles with position styles', () => {
    const { container } = render(
      <Tooltip align={'left'} position={'left'}>
        Tooltip content
      </Tooltip>,
    );
    expect(container).toMatchSnapshot();
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Tooltip align={'center'}>Text</Tooltip>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
