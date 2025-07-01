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

import { Checkmark, type IconComponentType } from '@sumup-oss/icons';
import { type HTMLAttributes, useEffect, useId, useRef } from 'react';

import { clsx } from '../../../../styles/clsx.js';
import { Compact } from '../../../Compact/index.js';

import classes from './Suggestion.module.css';

export type SuggestionType = {
  value: string;
  label: string;
  description?: string;
  selected?: boolean;
  icon?: IconComponentType;
  image?: string;
};

export type SuggestionProps = HTMLAttributes<HTMLLIElement> &
  SuggestionType & {
    isSelectable?: boolean;
    isFocused?: boolean;
    onSuggestionClick: (value: string) => void;
    isNew?: boolean;
  };

export const Suggestion = ({
  label,
  description,
  image,
  icon: Icon,
  selected,
  isSelectable,
  isFocused,
  onSuggestionClick,
  value,
  className,
  isNew,
  ...props
}: SuggestionProps) => {
  const labelId = useId();
  const suggestionRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isFocused) {
      suggestionRef?.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [isFocused]);

  return (
    <li
      tabIndex={0}
      {...props}
      ref={suggestionRef}
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
      onClick={() => onSuggestionClick(value)}
    >
      {(image || Icon) && (
        <div className={classes.media}>
          {Icon && (
            <div
              aria-hidden
              data-testid={`suggestion-icon-${value}`}
              className={clsx(
                classes.icon,
                isNew && !description && classes['is-new'],
              )}
            >
              <Icon size="16" />
            </div>
          )}
          {image && (
            <img data-testid={`suggestion-image-${value}`} src={image} alt="" />
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
          data-testid={`suggestion-checkbox-${value}`}
          className={clsx(classes.checkbox, selected && classes.selected)}
        >
          {selected && <Checkmark size="16" />}
        </div>
      )}
    </li>
  );
};
