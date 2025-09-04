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
  stretched?: boolean;
}

const MOBILE_AUTOSTRETCH_ITEMS_MAX = 3;

/**
 * TabList component that wraps the Tab components
 */
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  (
    {
      className,
      style = {},
      stretched,
      children,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const gliderRef = useRef<HTMLSpanElement>(null);
    const tabListRef = useRef<HTMLDivElement>(null);
    const numberOfTabs = Children.toArray(children).length;
    const tabWidth = Math.floor(100 / numberOfTabs);
    const stretchOnMobile = numberOfTabs <= MOBILE_AUTOSTRETCH_ITEMS_MAX;

    const updateGliderStyles = useCallback((tab: HTMLElement) => {
      const { offsetLeft, offsetWidth } = tab;
      gliderRef.current?.style?.setProperty(
        'transform',
        `translateX(${offsetLeft}px)`,
      );
      gliderRef.current?.style?.setProperty('width', `${offsetWidth}px`);
    }, []);

    useEffect(() => {
      // apply initial styles to glider
      if (tabListRef.current && gliderRef.current) {
        const activeTab = tabListRef.current.querySelector<HTMLElement>(
          '[role="tab"][aria-selected="true"]',
        );
        if (activeTab) {
          updateGliderStyles(activeTab);
          activeTab.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
      }
    }, [updateGliderStyles]);

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
        const activeTab = tabListRef.current?.querySelector<HTMLElement>(
          '[role="tab"][aria-selected="true"]',
        );
        if (target.role === 'tab' && activeTab) {
          updateGliderStyles(activeTab);
        }
      },
      [onClick, updateGliderStyles],
    );

    const onTabListKeydown: KeyboardEventHandler<HTMLDivElement> = useCallback(
      (event) => {
        onKeyDown?.(event);
        if (isArrowLeft(event) || isArrowRight(event)) {
          if (
            document.activeElement &&
            document.activeElement?.role === 'tab'
          ) {
            updateGliderStyles(document.activeElement as HTMLElement);
          }
        }
      },
      [onKeyDown, updateGliderStyles],
    );
    return (
      <div
        ref={ref}
        className={clsx(classes.wrapper, className)}
        style={{ ...style, '--tab-list-width': tabWidth }}
      >
        {/* eslint-disable-next-line  jsx-a11y/interactive-supports-focus */}
        <div
          ref={tabListRef}
          className={clsx(
            classes.base,
            utilClasses.hideScrollbar,
            stretched && classes.stretched,
            stretchOnMobile && classes['stretched-mobile'],
          )}
          {...props}
          role="tablist"
          onClick={onTabListClick}
          onKeyDown={onTabListKeydown}
        >
          {children}
          <span className={classes.glider} ref={gliderRef} />
        </div>
        <span className={classes['left-scroll-indicator']} />
        <span className={classes['right-scroll-indicator']} />
      </div>
    );
  },
);
