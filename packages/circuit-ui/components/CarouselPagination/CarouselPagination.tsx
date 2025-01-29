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

export type Slide = LinkElProps &
  ButtonElProps & {
    /**
     * A unique identifier
     */
    id: string | number;
    /**
     * A concise description of the slide content
     */
    label: string;
  };

export interface CarouselPaginationProps
  extends HTMLAttributes<HTMLUListElement> {
  /**
   * The collection of slides that can be navigated using this component.
   */
  slides: Slide[];
  /**
   * The unique identifier of the current slide
   */
  currentId: string | number;
  /**
   * Specify the nature of the slide content for the [`aria-current`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current) attribute.
   *
   * `page`: Represents the current page within a set of pages such as the link
   * to the current document in a breadcrumb.
   *
   * `step`: Represents the current step within a process such as the current
   * step in an enumerated multi step checkout flow.
   */
  type?: 'page' | 'step';
}

/**
 * The carousel pagination component allows users to navigate content that is
 * divided into multiple slides or pages.
 */
export const CarouselPagination = forwardRef<
  HTMLUListElement,
  CarouselPaginationProps
>(({ slides, currentId, type, className, ...props }, ref) => {
  const components = useComponents();
  const Link = components.Link as AsPropType;

  return (
    <ul ref={ref} className={clsx(classes.base, className)} {...props}>
      {slides.map(({ id, label, ...item }) => {
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
