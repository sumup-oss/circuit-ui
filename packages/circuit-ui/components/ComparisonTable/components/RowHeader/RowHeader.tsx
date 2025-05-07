/**
 * Copyright 2025, SumUp Ltd.
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
  type ReactNode,
  type ThHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Toggletip, type ToggletipProps } from '../../../Toggletip/index.js';
import { clsx } from '../../../../styles/clsx.js';
import { Compact } from '../../../Compact/index.js';

import classes from './RowHeader.module.css';

export interface RowHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * A short description of the feature.
   */
  description?: string;
  /**
   * Additional description of the feature.
   */
  toggletip?: ToggletipProps;
  /**
   * The name of the feature.
   */
  children: ReactNode;
  /**
   * The sticky offset of the header.
   */
  offset: number;
}

export const RowHeader = ({
  description,
  toggletip,
  children,
  offset,
  ...props
}: RowHeaderProps) => {
  const toggletipRef = useRef<HTMLTableCellElement>(null);
  const [showToggletip, setShowToggletip] = useState(true);
  useEffect(() => {
    const cellElement = toggletipRef.current;
    if (
      !cellElement ||
      !toggletip ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return undefined;
    }
    const handleObserver: IntersectionObserverCallback = ([entry]) => {
      setShowToggletip(entry.isIntersecting);
    };
    // eslint-disable-next-line compat/compat
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
      rootMargin: `-${offset + 60}px 0px 0px 0px`, // 60px is the (average) sticky header height
    });
    observer.observe(cellElement);
    return () => {
      observer.unobserve(cellElement);
    };
  }, [toggletip, offset]);
  return (
    <th className={classes.base} scope="row" {...props} ref={toggletipRef}>
      <div className={clsx(classes.title)}>
        <Compact size="s" className={classes.name}>
          {children}
        </Compact>
        {toggletip && (
          <Toggletip
            {...toggletip}
            placement="right"
            style={{
              visibility: showToggletip ? 'visible' : 'hidden',
            }}
          />
        )}
      </div>
      {description && (
        <Compact className={classes.description} size="s" color="subtle">
          {description}
        </Compact>
      )}
    </th>
  );
};
