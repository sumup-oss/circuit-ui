/**
 * Copyright 2026, SumUp Ltd.
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

import { axe, render, screen } from '../../util/test-utils.js';

import { Code } from './Code.js';

describe('Code', () => {
  it('should render a code element and forward HTML attributes', () => {
    render(<Code title="Install Circuit UI">npm install</Code>);

    const code = screen.getByText('npm install');
    expect(code.tagName).toBe('CODE');
    expect(code).toHaveAttribute('title', 'Install Circuit UI');
  });

  it('should merge a custom class name with the default one', () => {
    render(<Code className="custom-code">npm install</Code>);

    const code = screen.getByText('npm install');
    expect(code).toHaveClass('custom-code');
    expect(code.classList.length).toBeGreaterThan(1);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLElement>();
    render(<Code ref={ref}>npm install</Code>);

    expect(ref.current).toBe(screen.getByText('npm install'));
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<Code>npm install</Code>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
