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

import { axe, render } from '../../../../util/test-utils';

import Status from './Status';

describe('Status', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<Status step={1} total={3} />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(<Status step={1} total={3} />);
      const actual = await axe(container);

      expect(actual).toHaveNoViolations();
    });
  });
});
