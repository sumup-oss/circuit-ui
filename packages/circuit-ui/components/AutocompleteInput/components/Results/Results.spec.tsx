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
import { options } from '../../fixtures.js';

import { Results, type ResultsProps } from './Results.js';

const props = {
  options,
  onOptionClick: vi.fn(),
  optionIdPrefix: 'autocomplete-id',
  label: 'label',
  resultsSummary: 'results summary',
  loadMoreLabel: 'Load more',
} satisfies ResultsProps;

describe('Results', () => {
  beforeAll(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('should render options correctly', () => {
    render(<Results {...props} />);
    expect(screen.getByRole('listbox')).toBeVisible();
    expect(screen.getAllByRole('option')).toHaveLength(props.options.length);
  });

  it('should call onOptionClick when an option is clicked', async () => {
    render(<Results {...props} />);

    await userEvent.click(screen.getByText(props.options[0].label));
    expect(props.onOptionClick).toHaveBeenCalledWith({
      value: props.options[0].value,
      label: props.options[0].label,
    });
  });

  it('should render a live region', () => {
    render(<Results {...props} />);

    expect(screen.getByRole('status')).toHaveTextContent(props.resultsSummary);
  });

  describe('loading state', () => {
    it('should render live region as busy when loading', () => {
      render(<Results {...props} isLoading />);

      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });
    it('should render a loading message when isLoading is true and options are empty', () => {
      render(
        <Results {...props} options={[]} isLoading loadingLabel="Loading..." />,
      );

      expect(screen.getByText('Loading...')).toBeVisible();
    });
  });

  describe('empty results state', () => {
    it('should render a no results message when options are empty and not loading', () => {
      const noResultsMessage = 'No results found';
      render(
        <Results {...props} options={[]} noResultsMessage={noResultsMessage} />,
      );

      expect(screen.getByText(noResultsMessage)).toBeVisible();
    });
  });
});
