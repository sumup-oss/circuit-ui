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

const props: SuggestionProps = {
  label: 'Mochi',
  value: 'mochi',
  description,
  image: '/images/illustration-cat-mochi.jpg',
  isSelectable: false,
  isFocused: false,
  onSuggestionClick: vi.fn(),
  onKeyDown: vi.fn(),
};

describe('Suggestion', () => {
  it('renders with leading icon', () => {
    render(<Suggestion {...props} icon={Favorite} />);

    expect(screen.getByText(props.label)).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
    expect(screen.getByTestId(`suggestion-icon-${props.value}`)).toBeVisible();
  });

  it('renders with leading image', () => {
    render(<Suggestion {...props} />);

    expect(screen.getByText(props.label)).toBeVisible();
    expect(screen.getByTestId(`suggestion-image-${props.value}`)).toBeVisible();
  });

  it('calls onSuggestionClick when clicked', async () => {
    render(<Suggestion {...props} />);

    await userEvent.click(screen.getByText(props.label));
    expect(props.onSuggestionClick).toHaveBeenCalledWith({
      value: props.value,
      label: props.label,
    });
  });
});
