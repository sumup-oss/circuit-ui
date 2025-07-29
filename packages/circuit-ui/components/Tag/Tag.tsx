/**
 * Copyright 2019, SumUp Ltd.
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
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
} from 'react';
import type { IconComponentType } from '@sumup-oss/icons';

import type { ClickEvent } from '../../types/events.js';
import type { AsPropType } from '../../types/prop-types.js';
import {
  AccessibilityError,
  isSufficientlyLabelled,
} from '../../util/errors.js';
import { clsx } from '../../styles/clsx.js';
import { utilClasses } from '../../styles/utility.js';
import { CloseButton } from '../CloseButton/index.js';
import { useComponents } from '../ComponentsContext/index.js';

import classes from './Tag.module.css';

type BaseProps = {
  /**
   * Render prop that should render a leading-aligned icon or element.
   */
  prefix?: IconComponentType;
  /**
   * Render prop that should render a trailing-aligned icon or element.
   */
  suffix?: IconComponentType;
  /**
   * Triggers selected styles on the tag.
   */
  selected?: boolean;
  /**
   * Function that's called when the button is clicked.
   */
  onClick?: (event: ClickEvent) => void;
};

type RemoveProps =
  | {
      /**
       * Renders a close button inside the tag and calls the provided function
       * when the button is clicked.
       */
      onRemove: (event: ClickEvent) => void;
      /**
       * Text label for the remove icon for screen readers.
       * Important for accessibility.
       */
      removeButtonLabel: string;
    }
  | { onRemove?: never; removeButtonLabel?: never };

type DivElProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'prefix'>;
type LinkElProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'onClick' | 'prefix'
>;
type ButtonElProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'prefix'
>;

export type TagProps = BaseProps &
  RemoveProps &
  DivElProps &
  LinkElProps &
  ButtonElProps;

export const Tag = forwardRef<HTMLDivElement & HTMLButtonElement, TagProps>(
  (
    {
      children,
      prefix: Prefix,
      suffix: Suffix,
      onRemove,
      removeButtonLabel,
      selected,
      onClick,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const { Link } = useComponents();

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      onRemove &&
      !isSufficientlyLabelled(removeButtonLabel)
    ) {
      throw new AccessibilityError(
        'Tag',
        'The `removeButtonLabel` prop is missing or invalid. Omit the `onRemove` prop if you intend to disable the tag removing functionality.',
      );
    }

    let Element: AsPropType = 'div';
    if (props.href) {
      Element = Link;
    } else if (onClick) {
      Element = 'button';
    }

    const isRemovable = onRemove && removeButtonLabel;
    const isButton = onClick && !props.href;

    return (
      <div
        className={clsx(
          classes.base,
          isRemovable && classes.removable,
          selected && classes.selected,
          className,
        )}
        style={style}
      >
        <Element
          className={clsx(classes.content, onClick && utilClasses.focusVisible)}
          type={isButton ? 'button' : undefined}
          aria-pressed={isButton && selected ? 'true' : undefined}
          onClick={onClick}
          ref={ref}
          {...props}
        >
          {Prefix && <Prefix className={classes.prefix} aria-hidden="true" />}

          {children}

          {Suffix && <Suffix className={classes.suffix} aria-hidden="true" />}
        </Element>

        {isRemovable && (
          <CloseButton
            type="button"
            variant={selected ? 'primary' : 'secondary'}
            className={classes['remove-button']}
            size="s"
            onClick={onRemove}
          >
            {removeButtonLabel}
          </CloseButton>
        )}
      </div>
    );
  },
);

Tag.displayName = 'Tag';
