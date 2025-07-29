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

import { Option, type OptionProps } from './Option.js';

const description = 'A gentle giant';

const props: OptionProps = {
  label: 'Mochi',
  value: 'mochi',
  description,
  image: '/images/illustration-cat-mochi.jpg',
  isSelectable: false,
  isFocused: false,
  onOptionClick: vi.fn(),
  onKeyDown: vi.fn(),
};

describe('Option', () => {
  it('should render with leading icon', () => {
    render(<Option {...props} image={Favorite} />);

    expect(screen.getByText(props.label)).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
    expect(screen.getByTestId(`option-icon-${props.value}`)).toBeVisible();
  });

  it('should render with leading image', () => {
    render(<Option {...props} />);

    expect(screen.getByText(props.label)).toBeVisible();
    expect(screen.getByTestId(`option-image-${props.value}`)).toBeVisible();
  });

  it('should call onOptionClick when clicked', async () => {
    render(<Option {...props} />);

    await userEvent.click(screen.getByText(props.label));
    expect(props.onOptionClick).toHaveBeenCalledWith({
      value: props.value,
      label: props.label,
      image: props.image,
      description: props.description,
    });
  });

  it('should render as selected when isSelectable and selected are true', () => {
    render(<Option {...props} isSelectable selected />);

    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
  });
});
