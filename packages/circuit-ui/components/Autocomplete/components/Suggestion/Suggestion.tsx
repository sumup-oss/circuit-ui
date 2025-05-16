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
import { type HTMLAttributes, type KeyboardEvent, useId } from 'react';

import { clsx } from '../../../../styles/clsx.js';
import { Compact } from '../../../Compact/index.js';
import { isEnter, isSpacebar } from '../../../../util/key-codes.js';

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

type SuggestionProps = HTMLAttributes<HTMLLIElement> &
  AutocompleteSuggestion & {
    isSelectable?: boolean;
    onClick?: (value: string) => void;
  };

export const Suggestion = ({
  label,
  description,
  selected,
  leadingMedia,
  isSelectable,
  value,
  ...props
}: SuggestionProps) => {
  const labelId = useId();
  const onSuggestionKeydown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (isEnter(event) || isSpacebar(event)) {
      props.onClick?.(value);
    }
  };
  return (
    <li
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: list element has all necessary attributes to be interactive
      role="option"
      className={classes.base}
      aria-selected={selected}
      aria-labelledby={labelId}
      tabIndex={0}
      onKeyDown={onSuggestionKeydown}
      onClick={() => props.onClick?.(value)}
      {...props}
    >
      {leadingMedia && (
        <div className={classes.media}>
          {isIcon(leadingMedia) && (
            <div aria-hidden className={classes.icon}>
              <leadingMedia.icon size="16" />
            </div>
          )}
          {isImage(leadingMedia) && (
            <img src={leadingMedia.src} alt={leadingMedia.alt} />
          )}
        </div>
      )}
      <div className={classes.content}>
        <Compact id={labelId} size="s" weight="bold">
          {label}
        </Compact>
        {description && (
          <Compact size="s" color="subtle">
            {description}
          </Compact>
        )}
      </div>
      {isSelectable && (
        <div className={clsx(classes.checkbox, selected && classes.selected)}>
          {selected && <Checkmark />}
        </div>
      )}
    </li>
  );
};
