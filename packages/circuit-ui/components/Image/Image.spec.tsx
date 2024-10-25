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

import { render, axe } from '../../util/test-utils';

import { Image } from './Image';

describe('Image', () => {
  const baseProps = {
    src: 'http://www.placepuppy.net/1p/800/500',
    alt: 'A random cute puppy',
  };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <Image {...baseProps} className={className} />,
    );
    const image = container.querySelector('img');
    expect(image?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLImageElement>();
    const { container } = render(<Image {...baseProps} ref={ref} />);
    const image = container.querySelector('img');
    expect(ref.current).toBe(image);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Image {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
