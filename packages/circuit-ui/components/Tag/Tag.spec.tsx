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

import { axe, render, userEvent, screen } from '../../util/test-utils.js';

import { Tag } from './Tag.js';

const DummyIcon = (props: any) => <div data-testid="tag-icon" {...props} />;

describe('Tag', () => {
  it('should merge a custom class name with the default ones', () => {
    const className = 'foo';
    const { container } = render(<Tag className={className}>Tag</Tag>);
    const element = container.querySelector('div');
    expect(element?.className).toContain(className);
  });

  it('should forward a ref', () => {
    const ref = createRef<HTMLButtonElement & HTMLDivElement>();
    const { container } = render(<Tag ref={ref} onClick={vi.fn()} />);
    const button = container.querySelector('button');
    expect(ref.current).toBe(button);
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Tag>Tag</Tag>);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });

  it('should call onRemove when removed', async () => {
    const onRemove = vi.fn();
    render(
      <Tag onRemove={onRemove} removeButtonLabel="Remove">
        SomeTest
      </Tag>,
    );

    await userEvent.click(screen.getByText('Remove'));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('should render with a prefix', () => {
    render(<Tag prefix={DummyIcon}>SomeTest</Tag>);
    expect(screen.getByTestId('tag-icon')).not.toBeNull();
  });

  it('should render with a suffix', () => {
    render(<Tag suffix={DummyIcon}>SomeTest</Tag>);
    expect(screen.getByTestId('tag-icon')).toBeVisible();
  });

  it('should have not have aria-pressed attribute when selected', () => {
    render(<Tag selected>Tag</Tag>);
    const tagEl = screen.getByText('Tag');
    expect(tagEl).not.toHaveAttribute('aria-pressed', 'true');
  });

  describe('when interactive', () => {
    it('should render an anchor', () => {
      const onClick = vi.fn();
      render(
        <Tag href="/" onClick={onClick}>
          Link
        </Tag>,
      );
      const linkEl = screen.getByRole('link');
      expect(linkEl).toBeVisible();
      expect(linkEl).not.toHaveAttribute('type');
    });

    it('should render a button', () => {
      const onClick = vi.fn();
      render(<Tag onClick={onClick}>Button</Tag>);
      const buttonEl = screen.getByRole('button');
      expect(buttonEl).toBeVisible();
      expect(buttonEl).toHaveAttribute('type', 'button');
    });

    it('should call onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<Tag onClick={onClick}>SomeTest</Tag>);

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should have aria-pressed attribute when selected', () => {
      render(
        <Tag onClick={vi.fn()} selected>
          Tag
        </Tag>,
      );
      const buttonEl = screen.getByRole('button');
      expect(buttonEl).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
