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
  suggestions,
  mochi,
  luna,
  oliver,
  groupedSuggestions,
} from '../../fixtures.js';

import { SuggestionBox, type SuggestionBoxProps } from './SuggestionBox.js';

const props: SuggestionBoxProps = {
  suggestions,
  onSuggestionClicked: vi.fn(),
  loadMore: vi.fn(),
  label: 'label',
  suggestionIdPrefix: 'autocomplete-id',
  value: '',
  loadMoreLabel: 'Load more',
};

describe('SuggestionBox', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });
  it('renders suggestions correctly', () => {
    render(<SuggestionBox {...props} />);

    expect(screen.getByLabelText(props.label)).toBeVisible();
    expect(screen.getAllByRole('option')).toHaveLength(10);
  });
  it('renders grouped suggestions correctly', () => {
    render(<SuggestionBox {...props} suggestions={groupedSuggestions} />);

    expect(screen.getByLabelText(props.label)).toBeVisible();
    expect(screen.getByLabelText(groupedSuggestions[0].label)).toBeVisible();
    expect(screen.getByLabelText(groupedSuggestions[1].label)).toBeVisible();
    expect(screen.getByLabelText(groupedSuggestions[2].label)).toBeVisible();
    expect(screen.getAllByRole('option')).toHaveLength(10);
  });

  it('calls onSuggestionClicked when a suggestion is clicked', async () => {
    render(<SuggestionBox {...props} />);

    await userEvent.click(screen.getByText(suggestions[0].label));
    expect(props.onSuggestionClicked).toHaveBeenCalledWith(
      suggestions[0].value,
    );
  });

  it('applies correct tabIndex based on active suggestion', () => {
    const { rerender } = render(
      <SuggestionBox
        {...props}
        suggestions={[mochi, luna, oliver]}
        activeSuggestion={0}
      />,
    );

    const boxSuggestions = screen.getAllByRole('option');
    expect(boxSuggestions[0]).toHaveAttribute('tabIndex', '0');
    expect(boxSuggestions[1]).toHaveAttribute('tabIndex', '-1');
    expect(boxSuggestions[2]).toHaveAttribute('tabindex', '-1');

    rerender(
      <SuggestionBox
        {...props}
        suggestions={[mochi, luna, oliver]}
        activeSuggestion={2}
      />,
    );
    expect(boxSuggestions[0]).toHaveAttribute('tabIndex', '-1');
    expect(boxSuggestions[1]).toHaveAttribute('tabIndex', '-1');
    expect(boxSuggestions[2]).toHaveAttribute('tabindex', '0');
  });

  it('shows a loading spinner when isLoading is true', () => {
    render(<SuggestionBox {...props} isLoadingMore />);

    expect(screen.getByTestId('suggestions-loading')).toBeVisible();
  });

  it("suggests a new entry when searchText doesn't match any suggestions and allowNewItems is set to true", async () => {
    render(<SuggestionBox {...props} searchText={'Chewbacca'} allowNewItems />);
    const newSuggestion = screen.getByRole('option', { name: 'Chewbacca' });
    expect(newSuggestion).toBeVisible();
    await userEvent.click(newSuggestion);
    expect(props.onSuggestionClicked).toHaveBeenCalledWith('Chewbacca');
  });

  it('calls loadMore when the load more button is clicked', async () => {
    render(<SuggestionBox {...props} />);

    await userEvent.click(screen.getByRole('button', { name: 'Load more' }));

    expect(props.loadMore).toHaveBeenCalled();
  });
});
