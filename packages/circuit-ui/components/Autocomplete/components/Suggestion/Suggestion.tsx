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

import type { IconComponentType } from '@sumup-oss/icons';
import { type HTMLAttributes, useEffect, useId, useRef } from 'react';

import { clsx } from '../../../../styles/clsx.js';
import { Compact } from '../../../Compact/index.js';

import classes from './Suggestion.module.css';
import { Checkmark } from './Checkmark.js';

type LeadingMedia =
  | {
      icon: IconComponentType;
    }
  | {
      src: string;
      alt: string;
    };

const isIcon = (media: LeadingMedia): media is { icon: IconComponentType } =>
  media && 'icon' in media;
const isImage = (media: LeadingMedia): media is { src: string; alt: string } =>
  media && 'src' in media;

export type AutocompleteSuggestion = {
  value: string;
  label: string;
  description?: string;
  selected?: boolean;
  leadingMedia?: LeadingMedia;
};

export type SuggestionProps = HTMLAttributes<HTMLLIElement> &
  AutocompleteSuggestion & {
    isSelectable?: boolean;
    isFocused?: boolean;
    onSuggestionClicked: (value: string) => void;
  };

export const Suggestion = ({
  label,
  description,
  selected,
  leadingMedia,
  isSelectable,
  isFocused,
  onSuggestionClicked,
  value,
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
        isFocused && classes.focused,
        selected && classes.selected,
      )}
      aria-selected={selected}
      aria-labelledby={labelId}
      onClick={() => onSuggestionClicked(value)}
    >
      {leadingMedia && (
        <div className={classes.media}>
          {isIcon(leadingMedia) && (
            <div
              aria-hidden
              data-testid={`suggestion-icon-${value}`}
              className={classes.icon}
            >
              <leadingMedia.icon size="16" />
            </div>
          )}
          {isImage(leadingMedia) && (
            <img src={leadingMedia.src} alt={leadingMedia.alt} />
          )}
        </div>
      )}
      <div className={classes.content}>
        <Compact
          id={labelId}
          size="s"
          weight={description ? 'bold' : 'regular'}
        >
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
          {selected && <Checkmark />}
        </div>
      )}
    </li>
  );
};
