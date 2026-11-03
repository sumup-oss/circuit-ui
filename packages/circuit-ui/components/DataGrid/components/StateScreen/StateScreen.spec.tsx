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

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { axe, render, screen } from '../../../../util/test-utils.js';

import { StateScreen } from './StateScreen.js';
import classes from './StateScreen.module.css';

const onActionClick = vi.fn();

const defaultProps = {
  type: 'empty' as const,
  isMobile: false,
  title: 'No data',
  description: 'There is nothing to show yet.',
  action: {
    children: 'Add item',
    onClick: onActionClick,
  },
};

function getRoot() {
  return screen.getByRole('presentation').parentElement as HTMLElement;
}
const customLabel = 'Custom state';

describe('StateScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the title, description, and action', () => {
    render(<StateScreen {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeVisible();
    expect(screen.getByText(defaultProps.description)).toBeVisible();
    expect(
      screen.getByRole('button', { name: defaultProps.action.children }),
    ).toBeVisible();
  });

  it('should render the custom screen instead of the default content', () => {
    render(
      <StateScreen
        type="empty"
        isMobile={false}
        customScreen={<p>{customLabel}</p>}
      />,
    );

    expect(screen.getByText(customLabel)).toBeVisible();
    expect(screen.queryByText(defaultProps.title)).not.toBeInTheDocument();
    expect(
      screen.queryByText(defaultProps.description),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  describe('Illustrations', () => {
    it('should render the empty state illustration by default', () => {
      render(<StateScreen {...defaultProps} type="empty" />);

      expect(screen.getByRole('presentation').getAttribute('style')).toContain(
        'empty-state-1_light.svg',
      );
    });

    it('should render the no results illustration by default', () => {
      render(<StateScreen {...defaultProps} type="no-results" />);

      expect(screen.getByRole('presentation').getAttribute('style')).toContain(
        'empty-state-3_light.svg',
      );
    });

    it('should render a custom illustration', () => {
      render(<StateScreen {...defaultProps} illustration="empty-state-2" />);

      expect(screen.getByRole('presentation').getAttribute('style')).toContain(
        'empty-state-2_light.svg',
      );
    });
  });

  describe('loading', () => {
    it('should mark the screen as busy while loading', () => {
      render(<StateScreen {...defaultProps} isLoading />);

      const root = getRoot();
      expect(root).toHaveClass(classes.loading);
      expect(root).toHaveAttribute('aria-busy', 'true');
      expect(root).toHaveAttribute('inert');
    });

    it('should mark a custom screen as busy while loading', () => {
      render(
        <StateScreen
          type="no-results"
          isMobile
          isLoading
          customScreen={customLabel}
        />,
      );

      const root = screen.getByText(customLabel);
      expect(root).toHaveAttribute('aria-busy', 'true');
      expect(root).toHaveAttribute('inert');
      expect(root).not.toHaveClass(classes.base);
    });
  });

  it('should meet accessibility guidelines', async () => {
    const { container } = render(<StateScreen {...defaultProps} />);
    const actual = await axe(container);
    expect(actual).toHaveNoViolations();
  });
});
