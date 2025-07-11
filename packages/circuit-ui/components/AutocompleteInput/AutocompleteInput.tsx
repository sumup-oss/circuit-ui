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
import { getOptionByValue, isGroup } from './AutocompleteInputService.js';
import { Results, type ResultsProps } from './components/Results/Results.js';
import {
  ComboboxInput,
  type ComboboxInputProps,
} from './components/ComboboxInput/ComboboxInput.js';
import type { AutocompleteInputOption } from './components/Option/Option.js';

export type AutocompleteInputProps = Omit<
  ComboboxInputProps,
  'data-id' | 'value' | 'onChange'
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
    | 'options'
  > & {
    /**
     * the selected item
     */
    value?: AutocompleteInputOption;
    /**
     * A callback function fired when the search text value changes.
     * Use this callback to update the `options` prop based on the user's input.
     */
    onSearch: (value: string) => void;
    /**
     * A callback function fired when an option is selected.
     */
    onChange: (option?: AutocompleteInputOption) => void;
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

    const [searchText, setSearchText] = useState(value?.label ?? '');

    // used only for immmersive variant
    const [presentationFieldValue, setPresentationFieldValue] = useState(
      value?.label ?? '',
    );
    const isMobile = useMedia('(max-width: 479px)');
    const hasTouch = !useMedia('(hover: hover) and (pointer: fine)');
    const isImmersive = isMobile && variant === 'immersive';
    const [isOpen, setIsOpen] = useState(false);
    const [activeOption, setActiveOption] = useState<number>();
    const textBoxRef = useRef<HTMLInputElement>(null);
    const presentationFieldRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const resultsId = useId();
    const autocompleteId = useId();

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
      textBoxRef?.current?.select();
      setIsOpen(true);
    }, []);

    const { floatingStyles, refs, update } = useFloating<HTMLElement>({
      open: isOpen,
      placement: 'bottom',
      strategy: 'fixed',
      middleware: [
        offset(8),
        shift({ padding: boundaryPadding }),
        flip({ padding: boundaryPadding, fallbackPlacements: ['top'] }),
        size(sizeOptions),
      ],
      whileElementsMounted: autoUpdate,
    });

    useEffect(() => {
      setSearchText(value?.label ?? '');
      if (isImmersive) {
        setPresentationFieldValue(value?.label ?? '');
      }
    }, [value, isImmersive]);

    const onOptionClick = useCallback(
      (selectedValue?: AutocompleteInputOption) => {
        onChange(selectedValue);
        closeResults();
      },
      [onChange, closeResults],
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
        } else {
          setIsOpen(true);
          setActiveOption(0);
        }
      },
      [isOpen, activeOption, optionValues, onOptionClick, options],
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
          textBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        update();
      }
    }, [isOpen, update, options.length]);

    const handleClickOutside = useCallback(() => {
      if (!isImmersive) {
        closeResults();
      }
    }, [closeResults, isImmersive]);
    useClickOutside([textBoxRef, refs.floating], handleClickOutside);

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
        />
      ) : null;

    const comboboxProps = {
      ...props,
      label,
      'data-id': autocompleteId,
      clearLabel,
      value: searchText,
      onChange: onComboboxChange,
      onClear: onClear ? onComboboxClear : undefined,
      onKeyDown: isLoading ? undefined : onInputKeyDown,
      role: 'combobox',
      'aria-controls': resultsId,
      autoComplete: 'off',
      'aria-autocomplete': 'list' as const,
      'aria-activedescendant': activeDescendant,
      onClick: !readOnly && !disabled ? onComboboxClick : undefined,
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
            onClick={
              readOnly || disabled ? undefined : onPresentationFieldClick
            }
            value={presentationFieldValue}
            onKeyDown={onPresentationFieldKeyDown}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClear={onClear ? onPresentationFieldClear : undefined}
            clearLabel={clearLabel}
            readOnly={readOnly}
            disabled={disabled}
          />
          <Modal
            open={isOpen}
            className={classes.modal}
            contentClassName={classes['modal-content']}
            onClose={closeResults}
          >
            <ComboboxInput
              ref={textBoxRef}
              {...comboboxProps}
              className={classes['modal-input']}
              inputClassName={classes.input}
              aria-expanded={true}
            />

            {results}
          </Modal>
        </>
      );
    }

    return (
      <>
        <ComboboxInput
          ref={applyMultipleRefs(textBoxRef, ref, refs.setReference)}
          inputClassName={clsx(classes.input, props.inputClassName)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          {...comboboxProps}
        />
        {isOpen && (
          <div
            className={classes.results}
            data-testid={`${autocompleteId}-popup`}
            ref={refs.setFloating}
            id={resultsId}
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
