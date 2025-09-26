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
  type FocusEventHandler,
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
  autoUpdate,
  flip,
  offset,
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
import {
  isArrowDown,
  isArrowUp,
  isBackspace,
  isEnter,
} from '../../util/key-codes.js';
import { changeInputValue } from '../../util/input-value.js';
import { debounce } from '../../util/helpers.js';
import { Modal } from '../Modal/index.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { Body } from '../Body/index.js';
import { isString } from '../../util/type-check.js';
import { CircuitError } from '../../util/errors.js';

import { translations } from './translations/index.js';
import classes from './AutocompleteInput.module.css';
import { getOptionByValue, isGroup } from './AutocompleteInputService.js';
import { Results, type ResultsProps } from './components/Results/Results.js';
import {
  ComboboxInput,
  type ComboboxInputProps,
} from './components/ComboboxInput/ComboboxInput.js';
import type { AutocompleteInputOption } from './components/Option/Option.js';

export type AutocompleteInputProps = Omit<
  ComboboxInputProps,
  | 'data-id'
  | 'value'
  | 'onChange'
  | 'moreResults'
  | 'removeTagButtonLabel'
  | 'tags'
  | 'onTagRemove'
  | 'isOpen'
> &
  Pick<
    ResultsProps,
    | 'isLoading'
    | 'loadingLabel'
    | 'noResultsMessage'
    | 'loadMore'
    | 'isLoadingMore'
    | 'action'
    | 'allowNewItems'
    | 'multiple'
    | 'options'
  > & {
    /**
     * the selected item(s)
     */
    value: AutocompleteInputOption | AutocompleteInputOption[] | undefined;
    /**
     * A callback function fired when the search text value changes.
     * Use this callback to update the `options` prop based on the user's input.
     */
    onSearch: (value: string) => void;
    /**
     * A callback function fired when an option is selected.
     */
    onChange: (option: AutocompleteInputOption) => void;
    /**
     * The minimum length of the search query that would trigger an `onChange` event.
     * @default 0
     */
    minQueryLength?: number;
    /**
     * Use the `immersive` to open the list in a modal view on mobile, for an immersive, focused experience.
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
      '--results-max-height',
      `${availableHeight}px`,
    );
  },
  boundary: document.documentElement,
};

export const AutocompleteInput = forwardRef<
  HTMLInputElement,
  AutocompleteInputProps
>(
  (
    {
      label,
      value,
      options,
      onClear,
      onSearch,
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
      'aria-setsize': ariaSetSize,
      multiple = false,
      ...props
    },
    ref,
  ) => {
    const {
      noResultsMessage: defaultNoResultsMessage,
      loadMoreLabel,
      resultsFound,
      clearLabel,
      moreResults,
      removeTagButtonLabel,
    } = useI18n(
      {
        locale,
        loadMoreLabel: props.loadMoreLabel,
        clearLabel: props.clearLabel,
      },
      translations,
    );

    const [searchText, setSearchText] = useState(
      Array.isArray(value) ? '' : (value?.label ?? ''),
    );

    // used only for immmersive variant
    const [presentationFieldValue, setPresentationFieldValue] = useState(
      Array.isArray(value) ? '' : (value?.label ?? ''),
    );
    const isMobile = useMedia('(max-width: 479px)');
    const hasTouch = !useMedia('(hover: hover) and (pointer: fine)');
    const isImmersive = isMobile && variant === 'immersive';
    const [isOpen, setIsOpen] = useState(false);
    const [activeOption, setActiveOption] = useState<number>();
    const comboboxRef = useRef<HTMLInputElement>(null);
    const inputWrapperRef = useRef<HTMLDivElement>(null);
    const presentationFieldRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const resultsId = useId();
    const autocompleteId = useId();

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      multiple &&
      value !== undefined &&
      !Array.isArray(value)
    ) {
      throw new CircuitError(
        'AutocompleteInput',
        'You have passed a non array value to a multiple selection AutocompleteInput. Please pass an array of values instead.',
      );
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !multiple &&
      value !== undefined &&
      Array.isArray(value)
    ) {
      throw new CircuitError(
        'AutocompleteInput',
        'You have passed an array value to a single selection AutocompleteInput. Please pass an object instead.',
      );
    }

    const optionValues: string[] = useMemo(
      () =>
        options
          .flatMap((option) => (isGroup(option) ? option.options : option))
          .map((option) => option.value),
      [options],
    );

    useEffect(() => {
      if (isLoading) {
        setActiveOption(undefined);
      }
    }, [isLoading]);

    const closeResults = useCallback(() => {
      setIsOpen(false);
      setActiveOption(undefined);
    }, []);

    const debouncedOnSearch = useMemo(
      () =>
        debounce(
          (changeEvent: ChangeEvent<HTMLInputElement>) =>
            onSearch?.(changeEvent.target.value),
          300,
        ),
      [onSearch],
    );

    const onComboboxChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setActiveOption(undefined);
        if (event.target.value.length >= minQueryLength) {
          debouncedOnSearch?.(event);
        }
      },
      [minQueryLength, debouncedOnSearch],
    );

    const onComboboxClear = useCallback(
      (event: ClickEvent) => {
        changeInputValue(comboboxRef.current, '');
        onClear?.(event);
      },
      [onClear],
    );

    const onPresentationFieldClear = useCallback(
      (event: ClickEvent) => {
        setPresentationFieldValue('');
        setSearchText('');
        changeInputValue(presentationFieldRef.current, '');
        setIsOpen(true);
        onClear?.(event);
      },
      [onClear],
    );

    const onPresentationFieldKeyDown = useCallback(() => {
      setIsOpen(true);
      setActiveOption(0);
    }, []);

    const onPresentationFieldClick = useCallback(() => {
      setIsOpen(true);
    }, []);

    const onComboboxClick = useCallback(() => {
      comboboxRef?.current?.select();
      setIsOpen(true);
    }, []);

    const { floatingStyles, refs, update } = useFloating<HTMLElement>({
      open: isOpen,
      placement: 'bottom',
      strategy: 'fixed',
      middleware: [
        offset({ mainAxis: 21, crossAxis: 0 }), // 12px input padding + 1px border bottom + 8px offset
        shift({ padding: boundaryPadding }),
        flip({
          padding: boundaryPadding,
          fallbackPlacements: multiple ? [] : ['top'],
        }),
        size(sizeOptions),
      ],
      whileElementsMounted: autoUpdate,
    });

    useEffect(() => {
      if (value && !Array.isArray(value)) {
        setSearchText(value.label ?? '');
        if (isImmersive) {
          setPresentationFieldValue(value.label ?? '');
        }
      }
    }, [value, isImmersive]);

    const onOptionClick = useCallback(
      (selectedValue: AutocompleteInputOption) => {
        if (multiple) {
          setSearchText('');
          // put focus back on the input field after selection
          comboboxRef.current?.focus();
          comboboxRef.current?.scrollIntoView(true);
        } else {
          closeResults();
        }
        onChange(selectedValue);
      },
      [onChange, closeResults, multiple],
    );

    const onTagRemove = useCallback(
      (tagValue: AutocompleteInputOption) => {
        onChange(tagValue);
        comboboxRef.current?.focus();
      },
      [onChange],
    );

    const onInputKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        if (isOpen) {
          if (isArrowDown(event) || isArrowUp(event)) {
            event.preventDefault();
            const totalDisplayedOptions =
              resultsRef.current?.querySelectorAll('[role="option"]').length ??
              0;

            if (activeOption === undefined) {
              setActiveOption(isArrowDown(event) ? 0 : optionValues.length - 1);
            } else {
              const nextOption =
                (activeOption +
                  totalDisplayedOptions +
                  (isArrowDown(event) ? 1 : -1)) %
                totalDisplayedOptions;

              setActiveOption(nextOption);
            }
          }
          if (isEnter(event) && activeOption !== undefined) {
            event.preventDefault();
            onOptionClick(
              getOptionByValue(options, optionValues[activeOption]),
            );
          }
          if (
            isBackspace(event) &&
            !searchText &&
            Array.isArray(value) &&
            value.length > 0
          ) {
            // if the search text is empty and the user presses backspace,
            // remove the last selected value
            onChange(value[value.length - 1]);
          }
        } else {
          setIsOpen(true);
          setActiveOption(0);
        }
      },
      [
        isOpen,
        activeOption,
        onChange,
        optionValues,
        onOptionClick,
        searchText,
        options,
        value,
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

    // biome-ignore lint/correctness/useExhaustiveDependencies: we need to update the floating element styles if the options length changes
    useEffect(() => {
      if (isOpen) {
        if (isMobile && hasTouch) {
          comboboxRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        update();
      }
    }, [isOpen, update, options.length, value]);

    const handleClickOutside = useCallback(() => {
      if (!isImmersive) {
        closeResults();
      }
    }, [closeResults, isImmersive]);
    useClickOutside([inputWrapperRef, refs.floating], handleClickOutside);

    useEscapeKey(closeResults, isOpen);

    useEffect(() => {
      // if readOnly or disabled props become truthy, close the list box
      if ((readOnly || disabled) && isOpen) {
        closeResults();
      }
    }, [readOnly, disabled, isOpen, closeResults]);

    const activeDescendant =
      isOpen && activeOption !== undefined
        ? `option-${autocompleteId}-${activeOption}`
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
      searchText || options.length ? (
        <Results
          ref={resultsRef}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          options={options}
          loadingLabel={loadingLabel}
          noResultsMessage={noResults}
          value={value}
          onOptionClick={onOptionClick}
          label={label}
          loadMoreLabel={loadMoreLabel}
          activeOption={activeOption}
          loadMore={loadMore}
          action={action}
          optionIdPrefix={autocompleteId}
          allowNewItems={allowNewItems}
          searchText={searchText}
          resultsSummary={`${optionValues.length} ${resultsFound}.`}
          isImmersive={isImmersive}
          aria-setsize={ariaSetSize}
          multiple={multiple}
        />
      ) : null;

    const restoreValue: FocusEventHandler<HTMLInputElement> = useCallback(
      (event) => {
        if (!Array.isArray(value) && searchText !== value?.value) {
          setSearchText(value?.label ?? '');
          if (isImmersive) {
            setPresentationFieldValue(value?.label ?? '');
          }
        }
        props.onBlur?.(event);
      },
      [value, searchText, isImmersive, props.onBlur],
    );

    const comboboxProps = {
      ...props,
      label,
      'data-id': autocompleteId,
      clearLabel,
      value: searchText,
      onChange: onComboboxChange,
      onClear: onClear && !multiple ? onComboboxClear : undefined,
      onKeyDown: isLoading ? undefined : onInputKeyDown,
      role: 'combobox',
      'aria-controls': resultsId,
      autoComplete: 'off',
      'aria-autocomplete': 'list' as const,
      'aria-activedescendant': activeDescendant,
      onClick: !readOnly && !disabled ? onComboboxClick : undefined,
      readOnly,
      disabled,
      onBlur: restoreValue,
      tags: Array.isArray(value) ? value : undefined,
      onTagRemove,
      isOpen,
      moreResults,
      removeTagButtonLabel,
    };

    if (isImmersive) {
      return (
        <>
          <ComboboxInput
            {...props}
            inputClassName={props.inputClassName}
            label={label}
            ref={applyMultipleRefs(ref, presentationFieldRef)}
            onClick={
              readOnly || disabled ? undefined : onPresentationFieldClick
            }
            value={presentationFieldValue}
            onKeyDown={onPresentationFieldKeyDown}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClear={
              onClear && !multiple ? onPresentationFieldClear : undefined
            }
            moreResults={moreResults}
            removeTagButtonLabel={removeTagButtonLabel}
            clearLabel={clearLabel}
            readOnly={readOnly}
            disabled={disabled}
            tags={Array.isArray(value) ? value : undefined}
            onTagRemove={onTagRemove}
            isOpen={false}
          />
          <Modal
            open={isOpen}
            className={classes.modal}
            contentClassName={classes['modal-content']}
            onClose={closeResults}
          >
            <div ref={inputWrapperRef} className={classes['modal-input']}>
              <ComboboxInput
                ref={comboboxRef}
                {...comboboxProps}
                inputClassName={classes.input}
                aria-expanded={true}
              />
            </div>
            {results}
          </Modal>
        </>
      );
    }

    return (
      <>
        <div ref={inputWrapperRef}>
          <ComboboxInput
            ref={applyMultipleRefs(comboboxRef, ref, refs.setReference)}
            inputClassName={props.inputClassName}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            {...comboboxProps}
          />
        </div>
        {isOpen && (
          <div
            className={classes.results}
            data-testid={`${autocompleteId}-popup`}
            ref={refs.setFloating}
            id={resultsId}
            style={{
              ...floatingStyles,
              width: (comboboxRef.current?.offsetWidth ?? 0) + 34, // 32px for padding + 2px border
              maxWidth: (comboboxRef.current?.offsetWidth ?? 0) + 34, // 32px for padding + 2px border
            }}
          >
            {results}
          </div>
        )}
      </>
    );
  },
);
