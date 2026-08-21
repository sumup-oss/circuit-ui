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

import type {
  Ref,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
} from 'react';

import { useComponents } from '../../../ComponentsContext/index.js';
import type { EmotionAsPropType } from '../../../../types/prop-types.js';
import { clsx } from '../../../../styles/clsx.js';
import type { TierIndicatorProps } from '../../../TierIndicator/TierIndicator.js';

import classes from './Tab.module.css';
import { utilClasses } from '../../../../styles/utility.js';

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
    /**
     * Display a `TierIndicator` badge next to the tab's label to indicate
     * features that are part of the plus plan
     */
    trailingComponent?: ComponentType<TierIndicatorProps>;
    ref?: Ref<HTMLButtonElement>;
  };

const tabIndex = (selected: boolean) => (selected ? undefined : -1);

/**
 * Tab component that represents a single tab inside a Tabs wrapper
 */
export function Tab({
  selected = false,
  as = 'tab',
  className,
  children,
  trailingComponent: TrailingComponent,
  ref,
  ...props
}: TabProps) {
  const components = useComponents();
  const Link = components.Link as EmotionAsPropType;
  const Element = props.href ? Link : 'button';

  const content = TrailingComponent ? (
    <span className={classes.content}>
      {children}
      <TrailingComponent variant="plus" size="s" />
    </span>
  ) : (
    children
  );

  return as === 'tab' ? (
    <Element
      ref={ref}
      role={as}
      className={clsx(classes.base, utilClasses.focusVisibleInset, className)}
      aria-selected={selected}
      tabIndex={tabIndex(selected)}
      {...props}
    >
      {content}
    </Element>
  ) : (
    <div role="listitem">
      <Element
        ref={ref}
        className={clsx(classes.base, utilClasses.focusVisibleInset, className)}
        aria-current={selected ? 'page' : undefined}
        {...props}
      >
        {content}
      </Element>
    </div>
  );
}
