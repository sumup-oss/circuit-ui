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

import { render, axe, screen } from '../../util/test-utils.js';

import { TextArea } from './TextArea.js';

describe('TextArea', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <TextArea label="Textarea" inputClassName={className} />,
    );
    const paragraph = container.querySelector('textarea');
    expect(paragraph?.className).toContain(className);
  });

  it('should render with `rows` attribute when passed', () => {
    render(<TextArea label="Textarea" rows={3} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '3');
  });

  it('should render without `rows` attribute when passed `rows="auto"`', () => {
    render(<TextArea label="Textarea" rows="auto" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).not.toHaveAttribute('rows');
  });

  it('should render `minRows` prop as `rows` attribute when passed `rows="auto"`', () => {
    render(<TextArea label="Textarea" minRows={3} rows="auto" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '3');
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLInputElement & HTMLTextAreaElement>();
    const { container } = render(<TextArea label="Textarea" ref={ref} />);
    const textarea = container.querySelector('textarea');
    expect(ref.current).toBe(textarea);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<TextArea label="Textarea" id="textarea" />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
