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
import { createRef } from 'react';

import { render } from '../../../../util/test-utils.js';

import { Tab } from './Tab.js';

describe('Tab', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(<Tab className={className} />);
    const element = container.querySelector('button');
    expect(element?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container } = render(<Tab ref={ref} />);
    const button = container.querySelector('button');
    expect(ref.current).toBe(button);
  });

  it('should be focused when selected', () => {
    const ref = createRef<HTMLButtonElement>();
    const { container, rerender } = render(<Tab ref={ref} selected={false} />);
    const button = container.querySelector('button');
    vi.spyOn(button, 'focus');
    rerender(<Tab ref={ref} selected />);
    expect(button?.focus).toHaveBeenCalledOnce();
  });
});
