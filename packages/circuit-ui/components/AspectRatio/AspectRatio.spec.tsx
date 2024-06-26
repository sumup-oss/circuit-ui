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

/* eslint-disable testing-library/no-container */

import { describe, expect, it } from 'vitest';
import { createRef } from 'react';

import { render } from '../../util/test-utils.js';

import { AspectRatio } from './AspectRatio.js';

describe('AspectRatio', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <AspectRatio aspectRatio={1.618} className={className}>
        <span />
      </AspectRatio>,
    );
    const wrapper = container.querySelector('div');
    expect(wrapper?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <AspectRatio aspectRatio={1.618} ref={ref}>
        <span />
      </AspectRatio>,
    );
    const wrapper = container.querySelector('div');
    expect(ref.current).toBe(wrapper);
  });

  it('should not render without children', () => {
    const { container } = render(<AspectRatio aspectRatio={1.618} />);
    expect(container.firstChild).toBeNull();
  });
});
