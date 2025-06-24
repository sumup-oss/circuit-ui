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
import { suggestions } from '../../fixtures.js';

import { Results, type ResultsProps } from './Results.js';

const props: ResultsProps = {
  suggestions,
  onSuggestionClick: vi.fn(),
  suggestionIdPrefix: 'autocomplete-id',
  value: '',
  label: 'label',
  resultsSummary: 'results summary',
  loadMoreLabel: 'Load more',
} satisfies AutocompleteResultsProps;

describe('Results', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders suggestions correctly', () => {
    render(<Results {...props} />);
    expect(screen.getByRole('listbox')).toBeVisible();
    expect(screen.getAllByRole('option')).toHaveLength(
      props.suggestions.length,
    );
  });

  it('calls onSuggestionClick when a suggestion is clicked', async () => {
    render(<Results {...props} />);

    await userEvent.click(screen.getByText(props.suggestions[0].label));
    expect(props.onSuggestionClick).toHaveBeenCalledWith(
      props.suggestions[0].value,
    );
  });

  it('renders a live region', () => {
    render(<Results {...props} />);

    expect(screen.getByRole('status')).toHaveTextContent(props.resultsSummary);
  });

  describe('loading state', () => {
    it('renders live region as busy when loading', () => {
      render(<Results {...props} isLoading />);

      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });
    it('renders loading message when isLoading is true and suggestions are empty', () => {
      render(
        <Results
          {...props}
          suggestions={[]}
          isLoading
          loadingLabel="Loading..."
        />,
      );

      expect(screen.getByText('Loading...')).toBeVisible();
    });
  });

  describe('empty results state', () => {
    it('renders no results message when suggestions are empty and not loading', () => {
      const noResultsMessage = 'No results found';
      render(
        <Results
          {...props}
          suggestions={[]}
          noResultsMessage={noResultsMessage}
        />,
      );

      expect(screen.getByText(noResultsMessage)).toBeVisible();
    });
  });
});
