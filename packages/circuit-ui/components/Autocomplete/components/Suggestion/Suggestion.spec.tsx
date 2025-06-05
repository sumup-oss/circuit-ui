/**
 * Copyright 2025, SumUp Ltd.
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
import { Favorite } from '@sumup-oss/icons';

import { render, screen, userEvent } from '../../../../util/test-utils.js';

import { Suggestion, type SuggestionProps } from './Suggestion.js';

const description = 'A gentle giant';

const leadingMedia = {
  src: '/images/illustration-cat-mochi.jpg',
  alt: 'Image of Mochi taking a nap',
};

const props: SuggestionProps = {
  label: 'Mochi',
  value: 'mochi',
  description,
  leadingMedia,
  isSelectable: false,
  isFocused: false,
  onSuggestionClicked: vi.fn(),
  onKeyDown: vi.fn(),
};

describe('Suggestion', () => {
  it('renders with leading icon', () => {
    render(<Suggestion {...props} leadingMedia={{ icon: Favorite }} />);

    expect(screen.getByText(props.label)).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
    expect(screen.getByTestId(`suggestion-icon-${props.value}`)).toBeVisible();
  });

  it('renders with leading image', () => {
    render(<Suggestion {...props} />);

    expect(screen.getByText(props.label)).toBeVisible();
    expect(screen.getByAltText(leadingMedia?.alt)).toBeVisible();
  });

  it('renders with checkbox', () => {
    render(<Suggestion {...props} isSelectable selected />);

    expect(screen.getByText(props.label)).toBeVisible();
    expect(
      screen.getByTestId(`suggestion-checkbox-${props.value}`),
    ).toBeVisible();
    expect(
      screen.getByTestId(`suggestion-checkbox-${props.value}`).className,
    ).toContain('selected');
  });

  it('calls onSuggestionClicked when clicked', async () => {
    render(<Suggestion {...props} />);

    await userEvent.click(screen.getByText(props.label));
    expect(props.onSuggestionClicked).toHaveBeenCalledWith(props.value);
  });

  it('calls onKeyDowb when arrow down key is pressed', async () => {
    render(<Suggestion {...props} tabIndex={0} />);

    const suggestion = screen.getByRole('option', { name: props.label });
    suggestion.focus();
    await userEvent.keyboard('{ArrowDown}');

    expect(props.onKeyDown).toHaveBeenCalled();
  });
});
