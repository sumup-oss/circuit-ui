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

import { render, screen, axe } from '../../util/test-utils.js';

import { Header } from './Header.js';

describe('Header', () => {
  const baseProps = {
    title: 'Title',
    mobileOnly: false,
  };

  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(
      <Header {...baseProps} className={className} />,
    );
    const header = container.querySelector('header');
    expect(header?.className).toContain(className);
  });

  it('should render children', () => {
    const children = 'Text';
    render(<Header {...baseProps}>{children}</Header>);
    const header = screen.getByRole('banner');
    expect(header).toHaveTextContent(children);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(<Header {...baseProps} ref={ref} />);
    const header = container.querySelector('header');
    expect(ref.current).toBe(header);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Header {...baseProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
