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

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  useState,
} from 'react';

import { Hamburger, type HamburgerProps } from '../Hamburger/index.js';
import { SkeletonContainer } from '../Skeleton/index.js';
import { clsx } from '../../styles/clsx.js';
import { SkipLink } from '../SkipLink/index.js';

import {
  UtilityLinks,
  type UtilityLinksProps,
} from './components/UtilityLinks/index.js';
import classes from './TopNavigation.module.css';

/**
 * @deprecated Use the `var(--top-navigation-height)` CSS variable instead.
 */
export const TOP_NAVIGATION_HEIGHT = '68px';

export interface TopNavigationProps
  extends Partial<UtilityLinksProps>,
    HTMLAttributes<HTMLElement> {
  logo: ReactNode;
  hamburger?: HamburgerProps;
  isLoading?: boolean;
  /**
   * Hash link to the page's main content to enable keyboard and screen reader
   * users to skip over the navigation links. Required to comply with
   * [WCAG 2.1 SC 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
   */
  skipNavigationHref?: string;
  /**
   * label for the skip navigation link.
   */
  skipNavigationLabel?: string;
}

export function TopNavigation({
  logo,
  links,
  hamburger,
  isLoading,
  className,
  skipNavigationHref,
  skipNavigationLabel,
  ...props
}: TopNavigationProps) {
  const topNavigationRef = useRef<HTMLHeadElement>(null);
  const [scrollState, setScrollState] = useState<typeof classes.scrolled>();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--top-navigation-height',
      TOP_NAVIGATION_HEIGHT,
    );
    return () => {
      document.documentElement.style.removeProperty('--top-navigation-height');
    };
  }, []);

  // show light shadow when page is scrolled
  useEffect(() => {
    // create a sentinel to "spy" on page scroll
    const sentinel = document.createElement('div');
    sentinel.style.height = '1px'; // invisible line
    sentinel.style.width = '100%';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.pointerEvents = 'none';
    // insert it as the very first child of <body>
    document.body.prepend(sentinel);

    const topNavigation = topNavigationRef.current;
    if (!topNavigation || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const handleObserver: IntersectionObserverCallback = ([entry]) =>
      setScrollState(entry.isIntersecting ? undefined : classes.scrolled);

    // IntersectionObserver in supported in the browser we are targeting
    // eslint-disable-next-line compat/compat
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => {
      observer.unobserve(sentinel);
      sentinel.remove();
    };
  }, []);

  return (
    <header
      ref={topNavigationRef}
      className={clsx(classes.base, scrollState, className)}
      {...props}
    >
      {skipNavigationHref && skipNavigationLabel && (
        <SkipLink href={skipNavigationHref}>{skipNavigationLabel}</SkipLink>
      )}
      <div className={classes.wrapper}>
        {hamburger && (
          <SkeletonContainer isLoading={Boolean(isLoading)}>
            <Hamburger {...hamburger} className={classes.hamburger} />
          </SkeletonContainer>
        )}
        <div className={classes.logo}>{logo}</div>
      </div>
      <SkeletonContainer isLoading={Boolean(isLoading)}>
        {links && <UtilityLinks links={links} />}
      </SkeletonContainer>
    </header>
  );
}
