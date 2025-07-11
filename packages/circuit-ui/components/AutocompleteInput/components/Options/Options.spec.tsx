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

import { beforeAll, describe, expect, it, vi } from 'vitest';

import { render, screen, userEvent } from '../../../../util/test-utils.js';
import {
  options,
  mochi,
  luna,
  oliver,
  groupedOptions,
} from '../../fixtures.js';

import { Options, type OptionsProps } from './Options.js';

const props: OptionsProps = {
  options,
  onOptionClick: vi.fn(),
  label: 'label',
  optionIdPrefix: 'autocomplete-id',
  loadMoreLabel: 'Load more',
};

describe('Options', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });
  it('should render options correctly', () => {
    render(<Options {...props} />);

    expect(screen.getByLabelText(props.label)).toBeVisible();
    expect(screen.getAllByRole('option')).toHaveLength(10);
  });
  it('should render grouped options correctly', () => {
    render(<Options {...props} options={groupedOptions} />);

    expect(screen.getByLabelText(props.label)).toBeVisible();
    expect(screen.getByLabelText(groupedOptions[0].label)).toBeVisible();
    expect(
      screen.getByRole('group', { name: groupedOptions[1].label }),
    ).toBeVisible();
    expect(
      screen.getByRole('group', { name: groupedOptions[2].label }),
    ).toBeVisible();
    expect(screen.getAllByRole('option')).toHaveLength(10);
  });

  it('should call onOptionClick when an option is clicked', async () => {
    render(<Options {...props} />);

    await userEvent.click(screen.getByText(options[0].label));
    expect(props.onOptionClick).toHaveBeenCalledWith({
      label: options[0].label,
      value: options[0].value,
    });
  });

  it('should apply correct tabIndex based on active option', () => {
    const { rerender } = render(
      <Options {...props} options={[mochi, luna, oliver]} activeOption={0} />,
    );

    const availableOptions = screen.getAllByRole('option');
    expect(availableOptions[0]).toHaveAttribute('tabIndex', '0');
    expect(availableOptions[1]).toHaveAttribute('tabIndex', '-1');
    expect(availableOptions[2]).toHaveAttribute('tabindex', '-1');

    rerender(
      <Options {...props} options={[mochi, luna, oliver]} activeOption={2} />,
    );
    expect(availableOptions[0]).toHaveAttribute('tabIndex', '-1');
    expect(availableOptions[1]).toHaveAttribute('tabIndex', '-1');
    expect(availableOptions[2]).toHaveAttribute('tabindex', '0');
  });

  it('should show a button in loading state when isLoadingMore is true', () => {
    render(<Options {...props} loadMore={vi.fn()} isLoadingMore />);

    expect(
      screen.getByRole('button', { name: 'Loading Load more' }),
    ).toHaveAttribute('aria-busy', 'true');
  });

  it("should suggest a new entry when searchText doesn't match any options and allowNewItems is set to true", async () => {
    const searchText = 'Chewbacca';
    render(<Options {...props} searchText={searchText} allowNewItems />);
    const newOption = screen.getByRole('option', { name: searchText });
    expect(newOption).toBeVisible();
    await userEvent.click(newOption);
    expect(props.onOptionClick).toHaveBeenCalledWith({
      label: searchText,
      value: searchText,
    });
  });

  it('should call loadMore when the load more button is clicked', async () => {
    const loadMore = vi.fn();
    render(<Options {...props} loadMore={loadMore} />);

    await userEvent.click(screen.getByRole('button', { name: 'Load more' }));

    expect(loadMore).toHaveBeenCalled();
  });
});
