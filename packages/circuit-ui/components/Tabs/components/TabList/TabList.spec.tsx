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

import { beforeAll, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';

import { axe, render, screen, userEvent } from '../../../../util/test-utils.js';
import { useTabState } from '../../helper.js';

import { Tab } from '../Tab/Tab.js';
import { TabList } from './TabList.js';

const tabs = [
  { id: 'a', tab: 'Tab A' },
  { id: 'b', tab: 'Tab B' },
  { id: 'c', tab: 'Tab C' },
];

describe('TabList', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('should render tabs from the tabs prop', () => {
    render(<TabList tabs={tabs} />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    expect(screen.getByRole('tab', { name: 'Tab A' })).toBeVisible();
  });

  it('should select the first tab by default', () => {
    render(<TabList tabs={tabs} />);
    const [first, second, third] = screen.getAllByRole('tab');
    expect(first).toHaveAttribute('aria-selected', 'true');
    expect(second).toHaveAttribute('aria-selected', 'false');
    expect(third).toHaveAttribute('aria-selected', 'false');
  });

  it('should respect initialSelectedIndex', () => {
    render(<TabList tabs={tabs} initialSelectedIndex={1} />);
    const [first, second] = screen.getAllByRole('tab');
    expect(first).toHaveAttribute('aria-selected', 'false');
    expect(second).toHaveAttribute('aria-selected', 'true');
  });

  it('should switch the selected tab on click', async () => {
    render(<TabList tabs={tabs} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute(
      'aria-selected',
      'false',
    );
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('should call onTabChange with the tab id on click', async () => {
    const onTabChange = vi.fn();
    render(<TabList tabs={tabs} onTabChange={onTabChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
    expect(onTabChange).toHaveBeenCalledExactlyOnceWith('b');
  });

  it('should navigate to the next tab on right arrow press', async () => {
    const onTabChange = vi.fn();
    render(<TabList tabs={tabs} onTabChange={onTabChange} />);
    screen.getByRole('tab', { name: 'Tab A' }).focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(onTabChange).toHaveBeenCalledWith('b');
  });

  it('should navigate to the previous tab on left arrow press', async () => {
    const onTabChange = vi.fn();
    render(
      <TabList
        tabs={tabs}
        initialSelectedIndex={1}
        onTabChange={onTabChange}
      />,
    );
    screen.getByRole('tab', { name: 'Tab B' }).focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Tab A' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(onTabChange).toHaveBeenCalledWith('a');
  });

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

  describe('Tab children (flexible pattern)', () => {
    const TabChildrenFixture = ({
      initialIndex = 0,
      onTabChange,
    }: {
      initialIndex?: number;
      onTabChange?: (id: string) => void;
    }) => {
      const ids = ['a', 'b', 'c'];
      const { selectedId, onTabKeyDown, onTabClick } = useTabState(
        ids,
        initialIndex,
        onTabChange,
      );
      return (
        <TabList onKeyDown={onTabKeyDown}>
          {tabs.map(({ id, tab }) => (
            <Tab
              key={id}
              id={`tab-${id}`}
              aria-controls={`panel-${id}`}
              selected={selectedId === id}
              onClick={() => onTabClick(id)}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
      );
    };

    it('should render Tab children', () => {
      render(<TabChildrenFixture />);
      expect(screen.getAllByRole('tab')).toHaveLength(3);
    });

    it('should switch the selected tab on click', async () => {
      render(<TabChildrenFixture />);
      await userEvent.click(screen.getByRole('tab', { name: 'Tab B' }));
      expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  });

  describe('Accessibility', () => {
    it('should have no violations as tablist', async () => {
      const { container } = render(
        <div>
          <TabList tabs={tabs} />
          {tabs.map(({ id }) => (
            <div
              key={id}
              id={`panel-${id}`}
              role="tabpanel"
              tabIndex={-1}
              aria-labelledby={`tab-${id}`}
            />
          ))}
        </div>,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });

    it('should have no violations as navigation', async () => {
      const { container } = render(
        <TabList
          as="navigation"
          tabs={[
            { id: 'home', tab: 'Home', href: '/home' },
            { id: 'about', tab: 'About', href: '/about' },
            { id: 'contact', tab: 'Contact', href: '/contact' },
          ]}
          initialSelectedIndex={2}
        />,
      );
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
