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

import { axe, render } from '../../util/test-utils';

import Carousel from './Carousel';
import { SLIDES } from './__fixtures__';

describe('Carousel', () => {
  describe('styles', () => {
    it('should not render without slides data', () => {
      const { container } = render(<Carousel />);

      expect(container).toMatchSnapshot();
    });

    it('should render with default styles', () => {
      const { container } = render(<Carousel slides={SLIDES} />);

      expect(container).toMatchSnapshot();
    });

    it('should render with default paused styles', () => {
      const { container } = render(
        <Carousel slides={SLIDES} autoPlay={false} />,
      );

      expect(container).toMatchSnapshot();
    });

    it('should render with children as a function', () => {
      const { container } = render(
        <Carousel slides={SLIDES}>
          {({ state }) => <h1>Carousel heading for step #{state.step}</h1>}
        </Carousel>,
      );

      expect(container).toMatchSnapshot();
    });

    it('should render with children as a node', () => {
      const { container } = render(
        <Carousel slides={SLIDES}>
          <h1>Carousel heading</h1>
        </Carousel>,
      );

      expect(container).toMatchSnapshot();
    });

    it('should render without controls', () => {
      const { container } = render(<Carousel hideControls />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = render(<Carousel slides={SLIDES} />);
      const actual = await axe(container);

      expect(actual).toHaveNoViolations();
    });
  });
});
