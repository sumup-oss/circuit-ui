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

import { Checkmark, type IconComponentType, Plus } from '@sumup-oss/icons';
import { type HTMLAttributes, useEffect, useId, useRef } from 'react';

import { clsx } from '../../../../styles/clsx.js';
import { Compact } from '../../../Compact/index.js';

import classes from './Option.module.css';

export type AutocompleteInputOption = {
  value: string;
  label: string;
  description?: string;
  selected?: boolean;
  image?: string | IconComponentType;
};

export type OptionProps = HTMLAttributes<HTMLLIElement> &
  AutocompleteInputOption & {
    isSelectable?: boolean;
    isFocused?: boolean;
    onOptionClick: (value: AutocompleteInputOption) => void;
    isNew?: boolean;
  };

export const Option = ({
  label,
  description,
  image,
  selected,
  isSelectable,
  isFocused,
  onOptionClick,
  value,
  className,
  isNew,
  ...props
}: OptionProps) => {
  const labelId = useId();
  const optionRef = useRef<HTMLLIElement>(null);
  const icon = typeof image === 'string' ? undefined : image;
  const Icon = isNew ? Plus : icon;

  useEffect(() => {
    if (isFocused) {
      optionRef?.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [isFocused]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: The options is already keyboard-selectable.
    <li
      tabIndex={0}
      {...props}
      ref={optionRef}
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: list element has all necessary attributes to be interactive
      role="option"
      className={clsx(
        classes.base,
        !description && classes['align-center'],
        isFocused && classes.focused,
        selected && classes.selected,
        className,
      )}
      aria-selected={selected}
      onClick={() => onOptionClick({ label, value, image, description })}
    >
      {image && (
        <div className={classes.media}>
          {Icon && (
            <div
              aria-hidden
              data-testid={`option-icon-${value}`}
              className={clsx(
                classes.icon,
                isNew && !description && !icon && classes['is-new'],
              )}
            >
              {isNew ? <Plus size="16" /> : <Icon size="16" />}
            </div>
          )}
          {typeof image === 'string' && (
            <img data-testid={`option-image-${value}`} src={image} alt="" />
          )}
        </div>
      )}
      <div
        className={clsx(
          classes.content,
          (image || Icon) && classes['has-media'],
        )}
      >
        <Compact id={labelId} size="s" weight="semibold">
          {label}
        </Compact>
        {description && (
          <Compact size="s" color="subtle">
            {description}
          </Compact>
        )}
      </div>
      {isSelectable && (
        <div
          data-testid={`option-checkbox-${value}`}
          className={clsx(
            classes.checkbox,
            selected && classes.selected,
            description && classes.offset,
          )}
        >
          {selected && <Checkmark size="16" />}
        </div>
      )}
    </li>
  );
};
