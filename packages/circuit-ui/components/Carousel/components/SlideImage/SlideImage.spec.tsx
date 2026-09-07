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

import { axe, render, screen } from '../../../../util/test-utils.js';

import { SlideImage } from './SlideImage.js';
import { createRef } from 'react';

const image = {
  src: '/images/sumup-coffee-transaction.jpg',
  alt: 'Next to a cup of coffee lays a phone showing a card transaction in the SumUp app',
};

describe('SlideImage', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<SlideImage {...image} className={className} />);
    const slideImage = screen.getByRole('img');
    screen.debug();
    expect(slideImage?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLImageElement>();
    render(<SlideImage {...image} ref={ref} />);
    const slideImage = screen.getByRole('img');
    expect(ref.current).toBe(slideImage);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<SlideImage {...image} />);
    const actual = await axe(container);

    expect(actual).toHaveNoViolations();
  });
});
