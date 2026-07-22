/**
 * Copyright 2024, SumUp Ltd.
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
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react-dom';
import { ChevronDown } from '@sumup-oss/icons';

import {
  FieldLabel,
  FieldLabelText,
  FieldWrapper,
  type FieldSize,
} from '../Field/index.js';
import type { SelectOption } from '../Select/Select.js';
import { clsx } from '../../styles/clsx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import { useClickOutside } from '../../hooks/useClickOutside/index.js';
import { useEscapeKey } from '../../hooks/useEscapeKey/index.js';
import { changeInputValue } from '../../util/input-value.js';
import {
  isArrowDown,
  isArrowUp,
  isEnter,
  isEscape,
  isSpacebar,
} from '../../util/key-codes.js';

import type { CountryCodeOption } from './PhoneNumberInputService.js';
import selectClasses from '../Select/Select.module.css';
import classes from './CountryCodeDropdown.module.css';

export interface CountryCodeDropdownProps {
  label: string;
  hideLabel?: boolean;
  options: CountryCodeOption[];
  mappedOptions: SelectOption[];
  value?: string;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  size?: FieldSize;
  className?: string;
  style?: CSSProperties;
  'aria-describedby'?: string;
  renderOption: (
    option: CountryCodeOption,
    meta: { selected: boolean },
  ) => ReactNode;
  renderPrefix?: ComponentType<{
    value?: string | number;
    className?: string;
  }>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CountryCodeDropdown = forwardRef<
  HTMLInputElement,
  CountryCodeDropdownProps
>(
  (
    {
      label,
      hideLabel,
      options,
      mappedOptions,
      value,
      disabled,
      required,
      invalid,
      size = 'm',
      className,
      style,
      'aria-describedby': descriptionId,
      renderOption,
      renderPrefix: RenderPrefix,
      onChange,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>();
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();
    const triggerId = useId();

    const sortedOptions = useMemo(
      () =>
        mappedOptions
          .map((mapped) => {
            const option = options.find(
              ({ country }) => country === mapped.value,
            );
            return option ? { option, label: mapped.label } : null;
          })
          .filter((item): item is { option: CountryCodeOption; label: string } =>
            Boolean(item),
          ),
      [mappedOptions, options],
    );

    const selectedCountry = value;
    const selectedIndex = sortedOptions.findIndex(
      ({ option }) => option.country === selectedCountry,
    );

    const { refs, floatingStyles } = useFloating({
      placement: 'bottom-start',
      whileElementsMounted: autoUpdate,
      middleware: [offset(4), flip(), shift({ padding: 8 })],
    });

    const close = useCallback((returnFocus = false) => {
      setIsOpen(false);
      setActiveIndex(undefined);
      if (returnFocus) {
        triggerRef.current?.focus();
      }
    }, []);

    const selectOption = useCallback(
      (option: CountryCodeOption) => {
        changeInputValue(hiddenInputRef.current, option.country);
        hiddenInputRef.current?.dispatchEvent(
          new Event('change', { bubbles: true }),
        );
        onChange?.({
          target: hiddenInputRef.current,
        } as ChangeEvent<HTMLInputElement>);
        close();
        triggerRef.current?.focus();
      },
      [close, onChange],
    );

    useClickOutside([wrapperRef, refs.floating], () => close(), isOpen);
    useEscapeKey(() => close(true), isOpen);

    useEffect(() => {
      if (isOpen) {
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
      }
    }, [isOpen, selectedIndex]);

    useEffect(() => {
      if (!isOpen || activeIndex === undefined) {
        return;
      }

      document
        .getElementById(`${listboxId}-option-${activeIndex}`)
        ?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    }, [activeIndex, isOpen, listboxId]);

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      if (isEscape(event) && isOpen) {
        event.preventDefault();
        close(true);
        return;
      }

      if (isSpacebar(event)) {
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          return;
        }
        if (activeIndex !== undefined) {
          const selected = sortedOptions[activeIndex];
          if (selected) {
            selectOption(selected.option);
          }
        }
        return;
      }

      if (isArrowDown(event) || isArrowUp(event)) {
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          return;
        }
      }

      if (!isOpen) {
        return;
      }

      if (isArrowDown(event)) {
        setActiveIndex((current = -1) =>
          current < sortedOptions.length - 1 ? current + 1 : 0,
        );
      }

      if (isArrowUp(event)) {
        setActiveIndex((current = sortedOptions.length) =>
          current > 0 ? current - 1 : sortedOptions.length - 1,
        );
      }

      if (isEnter(event) && activeIndex !== undefined) {
        const selected = sortedOptions[activeIndex];
        if (selected) {
          selectOption(selected.option);
        }
      }
    };

    const handleListboxKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
      if (isEscape(event)) {
        event.preventDefault();
        close(true);
        return;
      }

      if (isArrowDown(event)) {
        event.preventDefault();
        setActiveIndex((current = -1) =>
          current < sortedOptions.length - 1 ? current + 1 : 0,
        );
      }

      if (isArrowUp(event)) {
        event.preventDefault();
        setActiveIndex((current = sortedOptions.length) =>
          current > 0 ? current - 1 : sortedOptions.length - 1,
        );
      }

      if (isEnter(event) && activeIndex !== undefined) {
        event.preventDefault();
        const selected = sortedOptions[activeIndex];
        if (selected) {
          selectOption(selected.option);
        }
      }
    };

    const prefix = RenderPrefix && (
      <RenderPrefix
        className={selectClasses.prefix}
        value={selectedCountry}
      />
    );
    const hasPrefix = Boolean(prefix);

    const activeOptionId =
      activeIndex !== undefined
        ? `${listboxId}-option-${activeIndex}`
        : undefined;

    const selectedOption =
      selectedIndex >= 0 ? sortedOptions[selectedIndex] : undefined;

    return (
      <FieldWrapper
        disabled={disabled}
        size={size}
        className={className}
        style={style}
      >
        <FieldLabel htmlFor={triggerId}>
          <FieldLabelText label={label} hideLabel={hideLabel} required={required} />
        </FieldLabel>
        <input
          type="hidden"
          ref={applyMultipleRefs(ref, hiddenInputRef)}
          value={value ?? ''}
          disabled={disabled}
          required={required}
          tabIndex={-1}
          aria-hidden="true"
        />
        <div
          ref={wrapperRef}
          className={clsx(selectClasses.wrapper, selectClasses[size])}
        >
          {prefix}
          <button
            id={triggerId}
            type="button"
            ref={applyMultipleRefs(triggerRef, refs.setReference)}
            disabled={disabled}
            autoComplete="tel-country-code"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-describedby={descriptionId}
            aria-invalid={invalid && 'true'}
            aria-required={required || undefined}
            aria-autocomplete="none"
            aria-activedescendant={isOpen ? activeOptionId : undefined}
            role="combobox"
            className={clsx(
              selectClasses.base,
              classes.trigger,
              hasPrefix && selectClasses['has-prefix'],
            )}
            onClick={() => {
              if (!disabled) {
                setIsOpen((open) => !open);
              }
            }}
            onKeyDown={handleTriggerKeyDown}
          >
            <span className={classes['trigger-content']}>
              {selectedOption?.label}
            </span>
          </button>
          <ChevronDown
            className={selectClasses.icon}
            size={size === 's' ? '16' : '24'}
            aria-hidden="true"
          />
          <ul
            ref={refs.setFloating}
            id={listboxId}
            role="listbox"
            aria-labelledby={triggerId}
            hidden={!isOpen}
            tabIndex={-1}
            style={isOpen ? floatingStyles : undefined}
            className={classes.panel}
            onKeyDown={handleListboxKeyDown}
          >
            {sortedOptions.map(({ option, label: optionLabel }, index) => {
              const isSelected = option.country === selectedCountry;
              const isFocused = index === activeIndex;

              return (
                // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard selection handled on listbox
                <li
                  key={option.country}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-label={optionLabel}
                  className={clsx(
                    classes.option,
                    isSelected && classes.selected,
                    isFocused && classes.focused,
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                >
                  {renderOption(option, { selected: isSelected })}
                </li>
              );
            })}
          </ul>
        </div>
      </FieldWrapper>
    );
  },
);

CountryCodeDropdown.displayName = 'CountryCodeDropdown';
