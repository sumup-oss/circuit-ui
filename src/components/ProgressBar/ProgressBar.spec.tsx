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

import { create, renderToHtml, axe } from '../../util/test-utils';

import ProgressBar from '.';

describe('ProgressBar', () => {
  describe('task', () => {
    /**
     * Style tests.
     */

    it('should render with default styles', () => {
      const actual = create(<ProgressBar max={1} value={0.5} />);
      expect(actual).toMatchSnapshot();
    });

    /**
     * Accessibility tests.
     */
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<ProgressBar max={1} value={0.5} />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });

  describe('timer', () => {
    /**
     * Style tests.
     */
    it('should render with default styles', () => {
      const actual = create(<ProgressBar />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with paused styles', () => {
      const actual = create(<ProgressBar paused />);
      expect(actual).toMatchSnapshot();
    });

    it('should render with loop styles', () => {
      const actual = create(<ProgressBar loop />);
      expect(actual).toMatchSnapshot();
    });

    /**
     * Accessibility tests.
     */
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<ProgressBar />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
