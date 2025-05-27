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

'use client';

import {
  type ChangeEvent,
  forwardRef,
  type KeyboardEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  flip,
  offset as offsetMiddleware,
  type Placement,
  size,
  type SizeOptions,
  useFloating,
} from '@floating-ui/react-dom';

import { SearchInput, type SearchInputProps } from '../SearchInput/index.js';
import type { ClickEvent } from '../../types/events.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import type { Locale } from '../../util/i18n.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { isArrowDown, isArrowUp } from '../../util/key-codes.js';
import { changeInputValue } from '../../util/input-value.js';
import { Spinner } from '../Spinner/index.js';
import { Body } from '../Body/index.js';
import { debounce } from '../../util/helpers.js';
import { utilClasses } from '../../styles/utility.js';

import { translations } from './translations/index.js';
import {
  type AutocompleteSuggestions,
  SuggestionBox,
} from './components/SuggestionBox/SuggestionBox.js';
import classes from './Autocomplete.module.css';
import { getSuggestionLabelByValue, isGroup } from './AutocompleteService.js';

export type AutocompleteProps = SearchInputProps & {
  /**
   * List of suggestions to display in the dropdown.
   */
  suggestions: AutocompleteSuggestions;
  /**
   * The field's value.
   */
  value?: string;
  /**
   * A function called when a suggestion is selected.
   */
  onSelection: (value: string) => void;
  /**
   * A custom message to display when no suggestions are available.
   */
  noResultsMessage?: ReactNode;
  /**
   * the minimum length of the search query
   * @default 0
   */
  minQueryLength?: number;
  /**
   * An optional function that allows to update the suggestions list when user scrolls to the bottom of the suggestions box
   */
  loadMore?: () => void;
  /**
   * Indicated a loading state while loading suggestions.
   */
  isLoading?: boolean;
  /**
   * A label to display while loading suggestions.
   */
  loadingLabel?: string;
  /**
   * An optional action to display below the Autocomplete suggestions.
   */
  action?: ReactNode;
  /**
   * One of the accepted placement values.
   * @default `bottom`.
   */
  placement?: Placement;
  /**
   * The placements to fallback to when there is not enough space for the
   * Popover.
   * @default `['top', 'right', 'left']`.
   */
  fallbackPlacements?: Placement[];
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   * Defaults to `navigator.language` in supported environments.
   */
  locale?: Locale;
};

const sizeOptions: SizeOptions = {
  apply({ availableHeight, elements }) {
    elements.floating.style.setProperty(
      '--suggestion-box-max-height',
      `${availableHeight}px`,
    );
  },
};

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      value,
      onClear,
      clearLabel,
      isLoading,
      loadingLabel: customLoadingLabel,
      noResultsMessage: customNoResultsMessage,
      locale,
      minQueryLength = 0,
      placement = 'bottom',
      fallbackPlacements = ['top', 'right', 'left'],
      suggestions,
      onSelection,
      action,
      onChange,
      loadMore,
      ...props
    },
    ref,
  ) => {
    const { noResultsMessage: defaultNoResultMessage, loadingLabel } = useI18n(
      { noResultsMessage: '', locale, loadingLabel: customLoadingLabel },
      translations,
    );
    const suggestionValues: string[] = useMemo(
      () =>
        suggestions
          .flatMap((suggestion) =>
            isGroup(suggestion) ? suggestion.suggestions : suggestion,
          )
          .map((suggestion) => suggestion.value),
      [suggestions],
    );
    const [searchText, setSearchText] = useState<string>(
      getSuggestionLabelByValue(suggestions, value) ?? '',
    );
    const [isOpen, setIsOpen] = useState(false);
    const [summary, setSummary] = useState<string>();
    const [activeSuggestion, setActiveSuggestion] = useState<number>();
    const textBoxRef = useRef<HTMLInputElement>(null);
    const popupId = useId();
    const autocompleteId = useId();

    useEffect(() => {
      if (isLoading) {
        setActiveSuggestion(undefined);
      }
    }, [isLoading]);

    const openSuggestionBox = useCallback(() => {
      setIsOpen(true);
    }, []);

    const closeSuggestionBox = () => {
      setIsOpen(false);
      setActiveSuggestion(undefined);
    };

    const onSearchTextChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        if (event.target.value.length >= minQueryLength) {
          const debouncedOnChange = debounce(
            (changeEvent: ChangeEvent<HTMLInputElement>) =>
              onChange?.(changeEvent),
            500,
          );
          if (event.target.value !== '') {
            openSuggestionBox();
          }
          debouncedOnChange?.(event);
        }
      },
      [minQueryLength, onChange, openSuggestionBox],
    );

    const onSearchTextClear = (event: ClickEvent) => {
      changeInputValue(textBoxRef.current, '');
      onSelection('');
      onClear?.(event);
    };

    const onSearchTextFocus = () => {
      if (value) {
        openSuggestionBox();
      }
    };
    const { floatingStyles, refs, update } = useFloating<HTMLElement>({
      open: isOpen,
      placement,
      strategy: 'fixed',
      middleware: [
        offsetMiddleware(8),
        flip({ fallbackPlacements }),
        size(sizeOptions),
      ],
    });

    const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
      if (isOpen) {
        if (isArrowDown(event) || isArrowUp(event)) {
          event.preventDefault();
          const totalSuggestions =
            refs.floating.current?.querySelectorAll('[role="option"]').length ??
            0;
          if (activeSuggestion === undefined) {
            setActiveSuggestion(isArrowDown(event) ? 0 : totalSuggestions - 1);
          } else {
            const nextSuggestion =
              (isArrowDown(event)
                ? (activeSuggestion ?? 0) + totalSuggestions + 1
                : (activeSuggestion ?? 0) + totalSuggestions - 1) %
              totalSuggestions;

            setActiveSuggestion(nextSuggestion);
          }
        }
      } else if (isArrowDown(event) && searchText?.length) {
        openSuggestionBox();
      }
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: we need to update the floating element styles if the suggestions length changes
    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementIsMounted` because our implementation hides the floating
       * element using CSS instead of using conditional rendering.
       * See https://floating-ui.com/docs/react-dom#updating
       */
      if (isOpen) {
        update();
        window.addEventListener('resize', update);
        window.addEventListener('scroll', update);
      } else {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update);
      }

      return () => {
        window.removeEventListener('resize', update);
        window.removeEventListener('scroll', update);
      };
    }, [isOpen, update, suggestions]);

    useEscapeKey(closeSuggestionBox, isOpen);

    useClickOutside([textBoxRef, refs.floating], closeSuggestionBox);

    const onSuggestionClicked = (selectedValue: string) => {
      onSelection(selectedValue);
      changeInputValue(
        textBoxRef.current,
        getSuggestionLabelByValue(suggestions, selectedValue),
      );
      closeSuggestionBox();
    };

    useEffect(() => {
      if (isOpen) {
        setSummary(`${suggestionValues.length} results found`);
      } else {
        setSummary(undefined);
      }
    }, [suggestionValues, isOpen]);

    return (
      <div>
        <SearchInput
          {...props}
          ref={applyMultipleRefs(textBoxRef, ref, refs.setReference)}
          clearLabel={clearLabel}
          className={classes.input}
          value={searchText}
          onChange={onSearchTextChange}
          onClear={onSearchTextClear}
          onKeyDown={isLoading ? undefined : onInputKeyDown}
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={popupId}
          aria-expanded={isOpen}
          aria-busy={isLoading}
          aria-activedescendant={
            isOpen && activeSuggestion
              ? `suggestion-${autocompleteId}-${activeSuggestion}`
              : undefined
          }
          onFocus={onSearchTextFocus}
        />
        {isOpen && (
          <div
            className={classes.dialog}
            ref={refs.setFloating}
            id={popupId}
            style={{
              ...floatingStyles,
              width: textBoxRef.current?.offsetWidth,
              maxWidth: textBoxRef.current?.offsetWidth,
            }}
          >
            <div
              role="status"
              aria-live="polite"
              aria-busy={isLoading}
              className={utilClasses.hideVisually}
            >
              {summary}
            </div>
            {isLoading && suggestions.length === 0 && (
              <div className={classes.loading}>
                <Spinner />
                <Body>{loadingLabel}</Body>
              </div>
            )}
            {!isLoading && suggestions.length === 0 && (
              <div className={classes['no-results']}>
                {customNoResultsMessage ? (
                  customNoResultsMessage
                ) : (
                  <Body>{defaultNoResultMessage}</Body>
                )}
              </div>
            )}
            {suggestions.length > 0 && (
              <SuggestionBox
                value={value}
                suggestions={suggestions}
                suggestionValues={suggestionValues}
                onSuggestionClicked={onSuggestionClicked}
                label={props.label}
                autocompleteId={autocompleteId}
                activeSuggestion={activeSuggestion}
                aria-readonly={props.readOnly}
                isLoading={isLoading}
                loadMore={loadMore}
              />
            )}
            {action && <div className={classes.action}>{action}</div>}
          </div>
        )}
      </div>
    );
  },
);
