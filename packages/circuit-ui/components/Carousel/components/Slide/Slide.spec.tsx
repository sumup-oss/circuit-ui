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

import { axe, render } from '../../../../util/test-utils.tsx';
import { SLIDE_DIRECTIONS } from '../../constants.js';

import { Slide } from './Slide.js';

describe('Slide', () => {
  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = render(<Slide>content</Slide>);

      expect(container).toMatchSnapshot();
    });

    it('should render with forward animation styles', () => {
      const { container } = render(
        <Slide
          index={0}
          step={0}
          slideSize={{ width: 800 }}
          slideDirection={SLIDE_DIRECTIONS.FORWARD}
        >
          content
        </Slide>,
      );

      expect(container).toMatchSnapshot();
    });

    it('should render with backward animation styles', () => {
      const { container } = render(
        <Slide
          index={0}
          prevStep={0}
          slideSize={{ width: 800 }}
          slideDirection={SLIDE_DIRECTIONS.BACK}
        >
          content
        </Slide>,
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(<Slide>content</Slide>);
      const actual = await axe(container);

      expect(actual).toHaveNoViolations();
    });
  });
});
