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
  type ComponentType,
} from 'react';

import { useComponents } from '../../../ComponentsContext/index.js';
import type { EmotionAsPropType } from '../../../../types/prop-types.js';
import { clsx } from '../../../../styles/clsx.js';
import type { TierIndicatorProps } from '../../../TierIndicator/TierIndicator.js';

import classes from './Tab.module.css';
import { AccessibilityError } from '../../../../util/errors.js';

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
  };

function hasMissingAccessibilityProps(props: Partial<TabProps>) {
  return !(
    props.id &&
    props['aria-controls'] &&
    props.onClick &&
    props.onKeyDown
  );
}

const tabIndex = (selected: boolean) => (selected ? undefined : -1);

/**
 * Tab component that represents a single tab inside a Tabs wrapper
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  (
    {
      selected = false,
      as = 'tab',
      className,
      children,
      trailingComponent: TrailingComponent,
      ...props
    },
    ref,
  ) => {
    const components = useComponents();
    const Link = components.Link as EmotionAsPropType;
    const Element = props.href ? Link : 'button';

    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      as === 'tab' &&
      hasMissingAccessibilityProps(props)
    ) {
      // biome-ignore lint/suspicious/noConsole: Logging an accessibility warning is intentional.
      console.warn(
        new AccessibilityError(
          'Tab',
          'Missing some accessibility props which will become required in the next major version. Read more about tab accessibility here: https://circuit.sumup.com/?path=/docs/navigation-tabs--docs#use-subcomponents-independently',
        ),
      );
    }

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
        className={clsx(classes.base, className)}
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
          className={clsx(classes.base, className)}
          aria-current={selected ? 'page' : undefined}
          {...props}
        >
          {content}
        </Element>
      </div>
    );
  },
);

Tab.displayName = 'Tab';
