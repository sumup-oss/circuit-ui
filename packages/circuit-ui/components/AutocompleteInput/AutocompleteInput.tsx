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
  shift,
  size,
  type SizeOptions,
  useFloating,
} from '@floating-ui/react-dom';

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
import { Body } from '../Body/index.js';
import { clsx } from '../../styles/clsx.js';
import { isString } from '../../util/type-check.js';

import { translations } from './translations/index.js';
import classes from './AutocompleteInput.module.css';
import {
  getSuggestionLabelByValue,
  isGroup,
} from './AutocompleteInputService.js';
import { Results, type ResultsProps } from './components/Results/Results.js';
import {
  ComboboxInput,
  type ComboboxInputProps,
} from './components/ComboboxInput/ComboboxInput.js';

export type AutocompleteInputProps = ComboboxInputProps &
  Pick<
    ResultsProps,
    | 'isLoading'
    | 'loadingLabel'
    | 'noResultsMessage'
    | 'loadMore'
    | 'isLoadingMore'
    | 'action'
    | 'allowNewItems'
    | 'suggestions'
  > & {
    /**
     * A callback function fired when a suggestion is selected.
     */
    onSelection: (value: string) => void;
    /**
     * A callback function fired when the search text value has changed.
     * Use this callback to update the `suggestions` prop based on the user's input.
     */
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * The minimum length of the search query that would trigger an `onChange` event.
     * @default 0
     */
    minQueryLength?: number;
    /**
     * Use the `immersive` to open the suggestion list in a modal view on mobile, for an immersive, focused experience.
     * @default 'contextual'
     * */
    variant?: 'contextual' | 'immersive';
    /**
     * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
     * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
     * When passing an array, the first supported locale is used.
     * Defaults to `navigator.language` in supported environments.
     */
    locale?: Locale;
    /**
     * A custom label for the "Load more" button.
     */
    loadMoreLabel?: ResultsProps['loadMoreLabel'];
  };
const boundaryPadding = 8;

const sizeOptions: SizeOptions = {
  padding: boundaryPadding,
  apply({ availableHeight, elements }) {
    elements.floating.style.setProperty(
      '--suggestion-box-max-height',
      `${availableHeight}px`,
    );
  },
};

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(
  (
    {
      label,
      value,
      suggestions,
      onClear,
      onSelection,
      onChange,
      isLoading,
      isLoadingMore,
      loadingLabel,
      noResultsMessage,
      locale,
      readOnly,
      disabled,
      minQueryLength = 0,
      action,
      loadMore,
      allowNewItems,
      variant = 'contextual',
      ...props
    },
    ref,
  ) => {
    const {
      noResultsMessage: defaultNoResultsMessage,
      loadMoreLabel,
      resultsFound,
      clearLabel,
    } = useI18n(
      {
        locale,
        loadMoreLabel: props.loadMoreLabel,
        clearLabel: props.clearLabel,
      },
      translations,
    );

    const [searchText, setSearchText] = useState<string>(
      getSuggestionLabelByValue(suggestions, value) ?? '',
    );

    const [presentationFieldValue, setPresentationFieldValue] =
      useState<string>(getSuggestionLabelByValue(suggestions, value) ?? '');
    const isMobile = useMedia('(max-width: 479px)');
    const isImmersive = isMobile && variant === 'immersive';
    const [isOpen, setIsOpen] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState<number>();
    const textBoxRef = useRef<HTMLInputElement>(null);
    const presentationFieldRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
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
        setActiveSuggestion(undefined);
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

    const onPresentationFieldClick = useCallback(() => {
      if (!readOnly && !disabled) {
        openSuggestionBox();
      }
    }, [readOnly, disabled, openSuggestionBox]);

    const onComboboxClick = useCallback(() => {
      if (!readOnly && !disabled) {
        textBoxRef?.current?.select();
        openSuggestionBox();
        if (isMobile && !isImmersive) {
          textBoxRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }, [openSuggestionBox, isMobile, isImmersive, disabled, readOnly]);

    const { floatingStyles, refs, update } = useFloating<HTMLElement>({
      open: isOpen,
      placement: 'bottom',
      strategy: 'fixed',
      middleware: [
        offsetMiddleware(8),
        shift({ padding: boundaryPadding }),
        flip({ padding: boundaryPadding, fallbackPlacements: ['top'] }),
        size(sizeOptions),
      ],
    });

    const onSuggestionClick = useCallback(
      (selectedValue: string) => {
        onSelection(selectedValue);
        changeInputValue(
          textBoxRef.current,
          getSuggestionLabelByValue(suggestions, selectedValue),
        );
        closeSuggestionBox();
        if (isImmersive) {
          setPresentationFieldValue(
            getSuggestionLabelByValue(suggestions, selectedValue),
          );
        }
      },
      [suggestions, onSelection, closeSuggestionBox, isImmersive],
    );

    const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        if (isOpen) {
          if (isArrowDown(event) || isArrowUp(event)) {
            const totalShownSuggestions =
              resultsRef.current?.querySelectorAll('[role="option"]').length ??
              0;
            event.preventDefault();

            if (activeSuggestion === undefined) {
              setActiveSuggestion(
                isArrowDown(event) ? 0 : suggestionValues.length - 1,
              );
            } else {
              const nextSuggestion =
                (activeSuggestion +
                  totalShownSuggestions +
                  (isArrowDown(event) ? 1 : -1)) %
                totalShownSuggestions;

              setActiveSuggestion(nextSuggestion);
            }
          }
          if (isEnter(event) && activeSuggestion !== undefined) {
            onSuggestionClick(suggestionValues[activeSuggestion]);
          }
        } else if (isArrowDown(event)) {
          openSuggestionBox();
          setActiveSuggestion(0);
        }
      },
      [
        isOpen,
        activeSuggestion,
        openSuggestionBox,
        suggestionValues,
        onSuggestionClick,
      ],
    );

    useEffect(() => {
      /**
       * When we support `ResizeObserver` (https://caniuse.com/resizeobserver),
       * we can look into using Floating UI's `autoUpdate` (but we can't use
       * `whileElementIsMounted` because our implementation hides the floating
       * element using CSS instead of using conditional rendering.
       * See https://floating-ui.com/docs/react-dom#updating
       */
      if (isOpen) {
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
    }, [isOpen, update]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: we need to update the floating element styles if the suggestions length changes
    useEffect(() => {
      if (isOpen) {
        update();
      }
    }, [isOpen, update, suggestions.length]);

    const handleClickOutside = useCallback(() => {
      if (!isImmersive) {
        closeSuggestionBox();
      }
    }, [closeSuggestionBox, isImmersive]);
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

    const noResults = useMemo(
      () =>
        isString(noResultsMessage) || !noResultsMessage ? (
          <Body className={classes['no-results']}>
            {noResultsMessage ?? defaultNoResultsMessage}
          </Body>
        ) : (
          noResultsMessage
        ),
      [noResultsMessage, defaultNoResultsMessage],
    );

    const results =
      searchText || suggestions.length ? (
        <Results
          ref={resultsRef}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          suggestions={suggestions}
          loadingLabel={loadingLabel}
          noResultsMessage={noResults}
          value={value}
          onSuggestionClick={onSuggestionClick}
          label={label}
          loadMoreLabel={loadMoreLabel}
          activeSuggestion={activeSuggestion}
          loadMore={loadMore}
          action={action}
          suggestionIdPrefix={autocompleteId}
          allowNewItems={allowNewItems}
          searchText={searchText}
          resultsSummary={`${suggestionValues.length} ${resultsFound}.`}
          isImmersive={isImmersive}
        />
      ) : null;

    const comboboxProps = {
      label,
      'data-id': autocompleteId,
      clearLabel,
      value: searchText,
      onChange: onComboboxChange,
      onClear: onComboboxClear,
      onKeyDown: isLoading ? undefined : onInputKeyDown,
      role: 'combobox',
      autoComplete: 'off',
      'aria-autocomplete': 'list' as const,
      'aria-activedescendant': activeDescendant,
      onClick: onComboboxClick,
      readOnly,
      disabled,
    };

    if (isImmersive) {
      return (
        <>
          <ComboboxInput
            {...props}
            inputClassName={clsx(classes.input, props.inputClassName)}
            label={label}
            ref={applyMultipleRefs(ref, presentationFieldRef)}
            onClick={onPresentationFieldClick}
            value={presentationFieldValue}
            onChange={onChange}
            onKeyDown={undefined}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClear={onPresentationFieldClear}
            clearLabel={clearLabel}
            readOnly={readOnly}
            disabled={disabled}
          />
          <Modal
            open={isOpen}
            className={classes.modal}
            contentClassName={classes['modal-content']}
            onClose={closeSuggestionBox}
          >
            <div className={classes['modal-header']}>
              <ComboboxInput {...props} ref={textBoxRef} {...comboboxProps} />
            </div>
            {results}
          </Modal>
        </>
      );
    }

    return (
      <>
        <ComboboxInput
          {...props}
          ref={applyMultipleRefs(textBoxRef, ref, refs.setReference)}
          inputClassName={clsx(classes.input, props.inputClassName)}
          aria-controls={popupId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          {...comboboxProps}
        />
        {isOpen && (
          <div
            className={classes.popup}
            data-testid={`${autocompleteId}-popup`}
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
