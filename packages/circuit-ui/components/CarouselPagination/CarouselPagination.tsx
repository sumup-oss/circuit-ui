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
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';

import { useComponents } from '../ComponentsContext/useComponents.js';
import type { AsPropType } from '../../types/prop-types.js';
import { utilClasses } from '../../styles/utility.js';
import { clsx } from '../../styles/clsx.js';

import classes from './CarouselPagination.module.css';

type LinkElProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonElProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type Items = LinkElProps &
  ButtonElProps & {
    /**
     * TODO:
     */
    id: string | number;
    /**
     * TODO:
     */
    label: string;
  };

export interface CarouselPaginationProps
  extends HTMLAttributes<HTMLUListElement> {
  /**
   * TODO:
   */
  items: Items[];
  /**
   * TODO: same as item id
   */
  currentId: string | number;
  /**
   * TODO:
   */
  type?: 'page' | 'step';
}

export const CarouselPagination = forwardRef<
  HTMLUListElement,
  CarouselPaginationProps
>(({ items, currentId, type }, ref) => {
  const components = useComponents();
  const Link = components.Link as AsPropType;

  return (
    // eslint-disable-next-line jsx-a11y/no-redundant-roles
    <ul ref={ref} className={classes.base} role="list">
      {items.map(({ id, label, ...item }) => {
        let Element: AsPropType;
        if (item.href) {
          Element = Link;
        } else if (item.onClick) {
          Element = 'button';
        } else {
          Element = 'span';
        }
        return (
          <li key={id}>
            <Element
              {...item}
              aria-current={currentId === id ? type || true : undefined}
              className={clsx(classes.cue, utilClasses.focusVisibleInset)}
            >
              <span className={classes.shape} />
              <span className={utilClasses.hideVisually}>{label}</span>
            </Element>
          </li>
        );
      })}
    </ul>
  );
});
