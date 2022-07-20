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

import { Placement } from '@floating-ui/react-dom';
import { Info } from '@sumup/icons';

import { axe, render } from '../../util/test-utils';

import { Tooltip } from './Tooltip';

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

  /**
   * Style tests.
   */
  placements.forEach((placement) => {
    it(`should render with placement ${placement}`, () => {
      const { container } = render(
        <Tooltip label="Tooltip content" placement={placement}>
          <Info size="16" style={{ width: 'auto' }} />
        </Tooltip>,
      );
      expect(container).toMatchSnapshot();
    });
  });

  /**
   * Accessibility tests.
   */
  it('should meet accessibility guidelines', async () => {
    const { container } = render(
      <Tooltip label="Tooltip content" placement="top">
        <Info size="16" style={{ width: 'auto' }} />
      </Tooltip>,
    );
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
