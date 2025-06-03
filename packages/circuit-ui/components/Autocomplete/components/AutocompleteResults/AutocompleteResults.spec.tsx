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

import {
  AutocompleteResults,
  type AutocompleteResultsProps,
} from './AutocompleteResults.js';

const props: AutocompleteResultsProps = {
  suggestions,
  onSuggestionClicked: vi.fn(),
  autocompleteId: 'autocomplete-id',
  value: '',
  label: 'label',
};

describe('AutocompleteResults', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('renders suggestions correctly', () => {
    render(<AutocompleteResults {...props} />);
    expect(screen.getByRole('listbox')).toBeVisible();
    expect(screen.getAllByRole('option')).toHaveLength(
      props.suggestions.length,
    );
  });

  it('calls onSuggestionClicked when a suggestion is clicked', async () => {
    render(<AutocompleteResults {...props} />);

    await userEvent.click(screen.getByText(props.suggestions[0].label));
    expect(props.onSuggestionClicked).toHaveBeenCalledWith(
      props.suggestions[0].value,
    );
  });

  it('should render live region', () => {
    render(<AutocompleteResults {...props} />);

    expect(screen.getByRole('status')).toHaveTextContent(
      `${props.suggestions.length} results found`,
    );
  });

  describe('loading state', () => {
    it('should render live region as busy when loading', () => {
      render(<AutocompleteResults {...props} isLoading />);

      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });
    it('should render loading spinner when isLoading is true and suggestions are empty', () => {
      render(
        <AutocompleteResults
          {...props}
          suggestions={[]}
          isLoading
          loadingLabel="Loading..."
        />,
      );

      expect(screen.getByText('Loading...')).toBeVisible();
      expect(screen.getByTestId('suggestions-loading-spinner')).toBeVisible();
    });
  });

  describe('empty results state', () => {
    it('should default no results message when suggestions are empty and not loading', () => {
      const defaultNoResultsMessage = 'No results found';
      render(
        <AutocompleteResults
          {...props}
          suggestions={[]}
          defaultNoResultMessage={defaultNoResultsMessage}
        />,
      );

      expect(screen.getByText(defaultNoResultsMessage)).toBeVisible();
    });

    it('should render custom no results message when suggestions are empty and not loading', () => {
      const customNoResultsMessage =
        "Was not able to find the address you're looking for";
      render(
        <AutocompleteResults
          {...props}
          suggestions={[]}
          customNoResultsMessage={customNoResultsMessage}
        />,
      );

      expect(screen.getByText(customNoResultsMessage)).toBeVisible();
    });
  });
});
