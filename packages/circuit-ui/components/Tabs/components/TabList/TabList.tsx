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
  Children,
  forwardRef,
  type HTMLAttributes,
  type KeyboardEventHandler,
  type MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { clsx } from '../../../../styles/clsx.js';
import { utilClasses } from '../../../../styles/utility.js';
import { isArrowLeft, isArrowRight } from '../../../../util/key-codes.js';

import classes from './TabList.module.css';

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Determines whether the component renders with full tab semantics or as a navigation list inside a <nav> using tab-like visuals.
   *
   * @default 'tabs'
   */
  as?: 'tablist' | 'navigation';
  /**
   * If true, the tabs will stretch to fill the width of their container.
   * @default false
   */
  stretched?: boolean;
}

const MOBILE_AUTOSTRETCH_ITEMS_MAX = 3;

const getCurrentTab = (node?: HTMLElement | null) =>
  node
    ? node.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
    : undefined;

/**
 * TabList component that wraps the Tab components
 */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  (
    {
      className,
      stretched,
      children,
      onClick,
      onKeyDown,
      as = 'tablist',
      ...props
    },
    ref,
  ) => {
    const gliderRef = useRef<HTMLSpanElement>(null);
    const tabListRef = useRef<HTMLDivElement>(null);
    const numberOfTabs = Children.toArray(children).length;
    const stretchOnMobile = numberOfTabs <= MOBILE_AUTOSTRETCH_ITEMS_MAX;

    const updateGliderStyles = useCallback((tab: HTMLElement) => {
      tabListRef.current?.style.setProperty(
        '--selected-tab-pseudo-content',
        'unset',
      );
      const { offsetLeft, offsetWidth } = tab;
      gliderRef.current?.style?.setProperty(
        'transform',
        `translateX(${offsetLeft}px)`,
      );
      gliderRef.current?.style?.setProperty('display', 'block');
      gliderRef.current?.style?.setProperty('width', `${offsetWidth}px`);
    }, []);

    useEffect(() => {
      // scrolls the active tab into view on initial render
      const activeTab = getCurrentTab(tabListRef.current);
      if (tabListRef.current && activeTab) {
        tabListRef.current.scrollLeft += activeTab.offsetLeft;
      }
    }, []);

    useEffect(() => {
      tabListRef.current?.style.setProperty(
        '--tab-list-width',
        `${tabListRef.current.getBoundingClientRect().width / numberOfTabs}px`,
      );
      const gliderCallback = () => {
        if (tabListRef.current && gliderRef.current) {
          const activeTab = getCurrentTab(tabListRef.current);
          if (activeTab) {
            updateGliderStyles(activeTab);
          }
        }
      };
      // apply initial styles to glider
      gliderCallback();

      // listen to resize events
      window.addEventListener('resize', gliderCallback);
      return () => window.removeEventListener('resize', gliderCallback);
    }, [updateGliderStyles, numberOfTabs]);

    useEffect(() => {
      // shows / hides scroll indicators
      const scrollListener = () => {
        if (tabListRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = tabListRef.current;

          tabListRef.current?.classList.toggle(
            classes['scroll-start'],
            scrollLeft !== 0,
          );
          tabListRef.current?.classList.toggle(
            classes['scroll-end'],
            scrollLeft + clientWidth < scrollWidth,
          );
        }
      };

      if (!tabListRef.current) {
        return undefined;
      }
      scrollListener();

      tabListRef.current.addEventListener('scroll', scrollListener);
      return () => {
        tabListRef.current?.removeEventListener('scroll', scrollListener);
      };
    }, []);

    const onTabListClick: MouseEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        onClick?.(event);
        const target = event.target as HTMLDivElement;
        if (target.role === 'tab') {
          updateGliderStyles(target);
        }
      },
      [onClick, updateGliderStyles],
    );

    const onTabListKeydown: KeyboardEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        onKeyDown?.(event);
        if (
          (isArrowLeft(event) || isArrowRight(event)) &&
          document.activeElement &&
          document.activeElement?.role === 'tab'
        ) {
          updateGliderStyles(document.activeElement as HTMLElement);
        }
      },
      [onKeyDown, updateGliderStyles],
    );
    const Element = as === 'navigation' ? 'nav' : 'div';
    return (
      <Element ref={ref} className={clsx(classes.wrapper, className)}>
        <div
          ref={tabListRef}
          className={clsx(
            classes.base,
            utilClasses.hideScrollbar,
            stretched && classes.stretched,
            stretchOnMobile && classes['stretched-mobile'],
          )}
          {...props}
          role={as === 'tablist' ? 'tablist' : 'list'}
          {...{
            ...(as === 'tablist' && {
              onClick: onTabListClick,
              onKeyDown: onTabListKeydown,
            }),
          }}
        >
          {children}
          <span className={classes.glider} ref={gliderRef} />
        </div>
        <span className={classes['left-scroll-indicator']} />
        <span className={classes['right-scroll-indicator']} />
      </Element>
    );
  },
);
