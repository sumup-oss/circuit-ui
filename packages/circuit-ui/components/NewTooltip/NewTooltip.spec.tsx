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

import styled from '@emotion/styled';
import { Placement } from '@floating-ui/react-dom';
import { Info } from '@sumup/icons';
import React from 'react';

import { axe, render } from '../../util/test-utils';

import { NewTooltip as Tooltip, TooltipProps } from './NewTooltip';

describe('Tooltip', () => {
  const placements: Placement[] = [
    'top-start',
    'top',
    'top-end',
    'left-start',
    'left',
    'left-end',
    'right-start',
    'right',
    'right-end',
    'bottom-start',
    'bottom',
    'bottom-start',
  ];

  const Container = styled.div`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
  `;

  const generateArgs = (placement: Placement): TooltipProps => ({
    text: 'Tooltip content',
    placement,
    component: () => (
      <Container>
        <Info size="16" style={{ width: 'auto' }} />
      </Container>
    ),
  });

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  /**
   * Style tests.
   */
  placements.forEach((placement) => {
    it(`should render with placement ${placement}`, () => {
      const tooltip = render(<Tooltip {...generateArgs(placement)} />);
      expect(tooltip).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Tooltip {...generateArgs('top')} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
