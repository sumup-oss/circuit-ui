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

import { render, screen } from '../../../../util/test-utils.js';

import { TabList } from './TabList.js';
import { axe } from 'jest-axe';
import { Tab } from '../Tab/Tab.js';

describe('TabList', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    render(<TabList className={className} />);
    const element = screen.getByRole('tablist').parentElement as HTMLDivElement;
    expect(element.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLDivElement>();
    render(<TabList ref={ref} />);
    const tabList = screen.getByRole('tablist').parentElement as HTMLDivElement;
    expect(ref.current).toBe(tabList);
  });
  it('should render with navigation semantics', () => {
    const ref = createRef<HTMLDivElement>();
    render(<TabList as="navigation" ref={ref} />);
    const navigation = screen.getByRole('navigation');
    expect(ref.current).toBe(navigation);
    expect(screen.getByRole('list')).toBeVisible();
  });
  describe('Accessibility', () => {
    it('should have no violations as tab', async () => {
      const { container } = render(
        <TabList>
          <Tab>Tab title</Tab>
        </TabList>,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
    it('should have no violations as navigation', async () => {
      const { container } = render(
        <TabList as="navigation">
          <Tab as="listitem">Tab title </Tab>
        </TabList>,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
