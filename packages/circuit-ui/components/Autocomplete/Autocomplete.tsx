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
  shift,
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
import { isArrowDown, isArrowUp, isEnter } from '../../util/key-codes.js';
import { changeInputValue } from '../../util/input-value.js';
import { debounce } from '../../util/helpers.js';
import { Modal } from '../Modal/index.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { Button } from '../Button/Button.js';
import { Body } from '../Body/index.js';
import { Spinner } from '../Spinner/index.js';
import { clsx } from '../../styles/clsx.js';

import { translations } from './translations/index.js';
import type { AutocompleteSuggestions } from './components/SuggestionBox/SuggestionBox.js';
import classes from './Autocomplete.module.css';
import { getSuggestionLabelByValue, isGroup } from './AutocompleteService.js';
import { AutocompleteResults } from './components/AutocompleteResults/AutocompleteResults.js';

export type AutocompleteProps = Omit<
  SearchInputProps,
  'renderPrefix' | 'renderSuffix' | 'as'
> & {
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
   * Indicated a loading state while loading more suggestions.
   */
  isLoadingMore?: boolean;
  /**
   * Indicated a loading state while loading suggestions.
   */
  isLoading?: boolean;
  /**
   * A label to display while loading suggestions.
   */
  loadingLabel?: ReactNode;
  /**
   * An optional action to display below the Autocomplete suggestions.
   */
  action?: ReactNode;
  /**
   * Whether to open the suggestion box when the input field gains focus
   */
  openOnFocus?: boolean;
  /**
   * Whether to allow the selection of items that are not in the suggestion list.
   */
  allowNewItems?: boolean;
  /**
   * On narrow screens, opens the suggestion list in a modal view for an immersive, focused experience.
   */
  modalMobileView?: boolean;
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

const boundaryPadding = 8;

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (
    {
      label,
      value,
      suggestions,
      onClear,
      onSelection,
      onChange,
      clearLabel,
      isLoading,
      isLoadingMore,
      loadingLabel,
      noResultsMessage,
      locale,
      readOnly,
      disabled,
      minQueryLength = 0,
      placement = 'bottom',
      fallbackPlacements = ['top'],
      action,
      loadMore,
      openOnFocus,
      allowNewItems,
      modalMobileView,
      ...props
    },
    ref,
  ) => {
    const {
      noResultsMessage: defaultNoResultsMessage,
      loadingLabel: defaultLoadingLabel,
      cancel: cancelButtonLabel,
      resultsFound,
    } = useI18n({ locale }, translations);

    const [searchText, setSearchText] = useState<string>(
      getSuggestionLabelByValue(suggestions, value) ?? '',
    );

    const [presentationFieldValue, setPresentationFieldValue] =
      useState<string>(getSuggestionLabelByValue(suggestions, value) ?? '');
    const isMobile = useMedia('(max-width: 479px)');
    const [isOpen, setIsOpen] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState<number>();
    const textBoxRef = useRef<HTMLInputElement>(null);
    const presentationFieldRef = useRef<HTMLInputElement>(null);
    const popupId = useId();
    const autocompleteId = useId();

    const suggestionValues: string[] = useMemo(
      () =>
        suggestions
          .flatMap((suggestion) =>
            isGroup(suggestion) ? suggestion.suggestions : suggestion,
          )
          .map((suggestion) => suggestion.value),
      [suggestions],
    );

    useEffect(() => {
      if (isLoading) {
        setActiveSuggestion(undefined);
      }
    }, [isLoading]);

    const openSuggestionBox = useCallback(() => {
      setIsOpen(true);
    }, []);

    const closeSuggestionBox = useCallback(() => {
      setIsOpen(false);
      setActiveSuggestion(undefined);
    }, []);

    const debouncedOnChange = useMemo(
      () =>
        debounce(
          (changeEvent: ChangeEvent<HTMLInputElement>) =>
            onChange?.(changeEvent),
          300,
        ),
      [onChange],
    );

    const onComboboxChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        if (event.target.value.length >= minQueryLength) {
          if (event.target.value !== '') {
            openSuggestionBox();
          }
          debouncedOnChange?.(event);
        }
      },
      [minQueryLength, openSuggestionBox, debouncedOnChange],
    );

    const onComboboxClear = useCallback(
      (event: ClickEvent) => {
        changeInputValue(textBoxRef.current, '');
        onClear?.(event);
      },
      [onClear],
    );

    const onPresentationFieldClear = useCallback(
      (event: ClickEvent) => {
        setPresentationFieldValue('');
        setSearchText('');
        changeInputValue(presentationFieldRef.current, '');
        openSuggestionBox();
        onClear?.(event);
      },
      [onClear, openSuggestionBox],
    );

    const onComboboxClick = useCallback(() => {
      if (value || openOnFocus || suggestions.length > 0) {
        openSuggestionBox();
        if (isMobile) {
          textBoxRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }, [openOnFocus, openSuggestionBox, value, suggestions, isMobile]);

    const { floatingStyles, refs, update } = useFloating<HTMLElement>({
      open: isOpen,
      placement,
      strategy: 'fixed',
      middleware: [
        offsetMiddleware(8),
        shift({ padding: boundaryPadding }),
        flip({ fallbackPlacements, padding: boundaryPadding }),
        size(sizeOptions),
      ],
    });

    const onSuggestionClicked = useCallback(
      (selectedValue: string) => {
        onSelection(selectedValue);
        changeInputValue(
          textBoxRef.current,
          getSuggestionLabelByValue(suggestions, selectedValue),
        );
        closeSuggestionBox();
        if (isMobile && modalMobileView) {
          setPresentationFieldValue(
            getSuggestionLabelByValue(suggestions, selectedValue),
          );
        }
      },
      [suggestions, onSelection, closeSuggestionBox, isMobile, modalMobileView],
    );

    const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        if (isOpen) {
          if (isArrowDown(event) || isArrowUp(event)) {
            event.preventDefault();

            if (activeSuggestion === undefined) {
              setActiveSuggestion(
                isArrowDown(event) ? 0 : suggestionValues.length - 1,
              );
            } else {
              const nextSuggestion =
                (isArrowDown(event)
                  ? (activeSuggestion ?? 0) + suggestionValues.length + 1
                  : (activeSuggestion ?? 0) + suggestionValues.length - 1) %
                suggestionValues.length;

              setActiveSuggestion(nextSuggestion);
            }
          }
          if (isEnter(event) && activeSuggestion !== undefined) {
            onSuggestionClicked(suggestionValues[activeSuggestion]);
          }
        } else if (isArrowDown(event) && suggestions.length > 0) {
          openSuggestionBox();
        }
      },
      [
        isOpen,
        activeSuggestion,
        suggestions,
        openSuggestionBox,
        suggestionValues,
        onSuggestionClicked,
      ],
    );

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

    const handleClickOutside = useCallback(() => {
      if (!(isMobile && modalMobileView)) {
        closeSuggestionBox();
      }
    }, [closeSuggestionBox, isMobile, modalMobileView]);
    useClickOutside([textBoxRef, refs.floating], handleClickOutside);

    useEscapeKey(closeSuggestionBox, isOpen);

    useEffect(() => {
      if ((readOnly || disabled) && isOpen) {
        closeSuggestionBox();
      }
    }, [readOnly, disabled, isOpen, closeSuggestionBox]);

    const activeDescendant =
      isOpen && activeSuggestion !== undefined
        ? `suggestion-${autocompleteId}-${activeSuggestion}`
        : undefined;

    const noResults = noResultsMessage ?? (
      <Body className={classes['no-results']}>{defaultNoResultsMessage}</Body>
    );

    const loading = loadingLabel ?? (
      <div className={classes.loading}>
        <Spinner data-testid="suggestions-loading-spinner" />
        <Body>{defaultLoadingLabel}</Body>
      </div>
    );

    const results = (
      <AutocompleteResults
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        suggestions={suggestions}
        loadingLabel={loading}
        noResultsMessage={noResults}
        value={value}
        onSuggestionClicked={onSuggestionClicked}
        label={label}
        activeSuggestion={activeSuggestion}
        loadMore={loadMore}
        readOnly={readOnly}
        action={action}
        suggestionIdPrefix={autocompleteId}
        allowNewItems={allowNewItems}
        searchText={searchText}
        resultsSummary={`${suggestionValues.length} ${resultsFound}.`}
      />
    );

    if (isMobile && modalMobileView) {
      return (
        <>
          <SearchInput
            {...props}
            label={label}
            ref={applyMultipleRefs(ref, presentationFieldRef)}
            onClick={openSuggestionBox}
            value={presentationFieldValue}
            onChange={onChange}
            onKeyDown={undefined}
            aria-controls={popupId}
            aria-expanded={isOpen}
            onClear={onPresentationFieldClear}
          />
          <Modal
            open={isOpen}
            className={classes.modal}
            onClose={closeSuggestionBox}
          >
            <div className={classes['modal-header']}>
              <SearchInput
                {...props}
                label={label}
                data-id={autocompleteId}
                ref={textBoxRef}
                clearLabel={clearLabel}
                hideLabel
                value={searchText}
                onChange={onComboboxChange}
                onClear={onComboboxClear}
                onKeyDown={isLoading ? undefined : onInputKeyDown}
                role="combobox"
                autoComplete="off"
                aria-autocomplete="list"
                style={{ flex: 1 }}
                aria-activedescendant={activeDescendant}
                onClick={onComboboxClick}
              />
              <Button variant="tertiary" onClick={closeSuggestionBox}>
                {cancelButtonLabel}
              </Button>
            </div>
            {results}
          </Modal>
        </>
      );
    }

    return (
      <>
        <SearchInput
          {...props}
          label={label}
          data-id={autocompleteId}
          ref={applyMultipleRefs(textBoxRef, ref, refs.setReference)}
          clearLabel={clearLabel}
          inputClassName={clsx(classes.input, props.inputClassName)}
          value={searchText}
          onChange={onComboboxChange}
          onClear={onComboboxClear}
          onKeyDown={isLoading ? undefined : onInputKeyDown}
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={popupId}
          aria-expanded={isOpen}
          aria-activedescendant={activeDescendant}
          onClick={onComboboxClick}
        />
        {isOpen && (
          <div
            className={classes.popup}
            ref={refs.setFloating}
            id={popupId}
            style={{
              ...floatingStyles,
              width: textBoxRef.current?.offsetWidth,
              maxWidth: textBoxRef.current?.offsetWidth,
            }}
          >
            {results}
          </div>
        )}
      </>
    );
  },
);
