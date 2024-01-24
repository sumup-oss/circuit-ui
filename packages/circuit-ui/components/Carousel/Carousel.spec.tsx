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

import { describe, expect, it, vi } from 'vitest';

import { axe, render, screen } from '../../util/test-utils.js';

import { Carousel } from './Carousel.js';
import { SLIDES } from './__fixtures__/index.js';

describe('Carousel', () => {
  const baseProps = {
    playButtonLabel: 'Play',
    pauseButtonLabel: 'Pause',
    prevButtonLabel: 'Previous',
    nextButtonLabel: 'Next',
  };

  it('should not render without slides data', () => {
    const { container } = render(<Carousel slides={[]} {...baseProps} />);

    expect(container).toBeEmpty();
  });

  it('should render with children as a function', () => {
    const children = vi.fn(() => <h1>Carousel heading</h1>);
    render(
      <Carousel slides={SLIDES} {...baseProps}>
        {children}
      </Carousel>,
    );

    expect(children).toHaveBeenCalled();
  });

  it('should render with children as a node', () => {
    render(
      <Carousel slides={SLIDES} {...baseProps}>
        <h1>Carousel heading</h1>
      </Carousel>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Carousel heading');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Carousel slides={SLIDES} {...baseProps} />);
    const actual = await axe(container);

    expect(actual).toHaveNoViolations();
  });
});
