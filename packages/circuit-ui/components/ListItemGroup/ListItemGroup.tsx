/**
 * Copyright 2021, SumUp Ltd.
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

import { forwardRef, HTMLAttributes, ReactNode, useState } from 'react';

import { AccessibilityError } from '../../util/errors.js';
import Body from '../Body/index.js';
import ListItem, { ListItemProps } from '../ListItem/index.js';
import { isString } from '../../util/type-check.js';
import { clsx } from '../../styles/clsx.js';
import utilityClasses from '../../styles/utility.js';

import classes from './ListItemGroup.module.css';

type Variant = 'plain' | 'inset';

export type ItemProps = ListItemProps & { key: string | number };

export interface BaseProps {
  /**
   * Choose between 'inset' (outer border and dividers) and 'plain' (only
   * dividers) variant. Defaults to 'inset'.
   */
  variant?: Variant;
  /**
   * List of ListItem prop objects to render as a group. Each item needs to
   * have a unique `key`.
   */
  items: ItemProps[];
  /**
   * Display a main label/headline describing the group.
   */
  label: ReactNode;
  /**
   * Visually hide the label. This should only be used in rare cases and only
   * if the purpose of the field can be inferred from other context.
   */
  hideLabel?: boolean;
  /**
   * Display a secondary right-aligned label.
   */
  details?: ReactNode;
}

export type ListItemGroupProps = BaseProps & HTMLAttributes<HTMLDivElement>;

/**
 * The ListItemGroup component enables the user to render a named list of ListItem components.
 */
export const ListItemGroup = forwardRef<HTMLDivElement, ListItemGroupProps>(
  (
    {
      variant = 'inset',
      items,
      label,
      hideLabel,
      details,
      className,
      ...props
    },
    ref,
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError(
        'ListItemGroup',
        'The `label` prop is missing. This is an accessibility requirement. Pass `hideLabel` if you intend to hide the label visually.',
      );
    }
    const [focusedItemKey, setFocusedItemKey] = useState<
      ItemProps['key'] | null
    >(null);

    const isPlain = variant === 'plain';
    const isInteractive = items.some((item) => !!item.href || !!item.onClick);

    return (
      <div
        className={clsx(classes.base, isPlain && classes.plain, className)}
        {...props}
        ref={ref}
      >
        <div className={classes.header}>
          <div
            className={clsx(
              classes.label,
              hideLabel && utilityClasses.hideVisually,
            )}
          >
            {isString(label) ? (
              <Body as="h4" size="two">
                {label}
              </Body>
            ) : (
              label
            )}
          </div>
          {details && (
            <div className={classes.details}>
              {isString(details) ? <Body size="two">{details}</Body> : details}
            </div>
          )}
        </div>
        <ul className={classes.items}>
          {items.map(({ key, ...item }) => (
            <li
              className={clsx(
                classes.item,
                isInteractive && classes.interactive,
                focusedItemKey === key && classes.focused,
                item.selected && classes.selected,
              )}
              key={key}
            >
              <ListItem
                {...item}
                className={classes.child}
                onFocus={(event) => {
                  try {
                    if (event.currentTarget.matches(':focus-visible')) {
                      setFocusedItemKey(key);
                    }
                  } catch (err) {
                    setFocusedItemKey(key);
                  }
                }}
                onBlur={() => setFocusedItemKey(null)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

ListItemGroup.displayName = 'ListItemGroup';
