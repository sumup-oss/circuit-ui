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
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';

import { useComponents } from '../../../ComponentsContext/index.js';
import type { EmotionAsPropType } from '../../../../types/prop-types.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './Tab.module.css';

type LinkElProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonElProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type TabProps = LinkElProps &
  ButtonElProps & {
    /**
     * Determines whether the component renders with full tab semantics or as a list item.
     * @default tab
     */
    as?: 'tab' | 'listitem';
    /**
     * Triggers selected styles of the component
     */
    selected?: boolean;
  };

const tabIndex = (selected: boolean) => (selected ? undefined : -1);

/**
 * Tab component that represents a single tab inside a Tabs wrapper
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ selected = false, as = 'tab', className, ...props }, ref) => {
    const components = useComponents();
    const Link = components.Link as EmotionAsPropType;
    const Element = props.href ? Link : 'button';

    return as === 'tab' ? (
      <Element
        ref={ref}
        role={as}
        className={clsx(classes.base, className)}
        {...props}
        aria-selected={selected}
        tabindex={tabIndex(selected)}
      />
    ) : (
      <div role="listitem">
        <Element
          ref={ref}
          className={clsx(classes.base, className)}
          {...props}
          aria-current={selected ? 'page' : undefined}
        />
      </div>
    );
  },
);

Tab.displayName = 'Tab';
