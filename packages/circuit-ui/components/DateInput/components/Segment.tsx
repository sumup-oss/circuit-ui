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
  useLayoutEffect,
  useRef,
  useState,
  type InputHTMLAttributes,
} from 'react';

import classes from './Segment.module.css';

export interface SegmentProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Triggers error styles on the component. Important for accessibility.
   */
  invalid?: boolean;
  /**
   * Triggers warning styles on the component.
   */
  hasWarning?: boolean;
  /**
   * Enables valid styles on the component.
   */
  showValid?: boolean;
}

export function Segment({ invalid, ...props }: SegmentProps) {
  const sizeRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState('4ch');

  // biome-ignore lint/correctness/useExhaustiveDependencies: The width needs to be recalculated when the value changes
  useLayoutEffect(() => {
    if (sizeRef.current) {
      setWidth(`${sizeRef.current.offsetWidth}px`);
    }
  }, [props.value]);

  return (
    <>
      <input
        type="number"
        className={classes.base}
        aria-invalid={invalid}
        autoCorrect="false"
        enterKeyHint="next"
        spellCheck={false}
        style={{ ...props.style, '--width': width }}
        {...props}
      />
      <span ref={sizeRef} className={classes.size} aria-hidden="true">
        {props.value || props.placeholder}
      </span>
    </>
  );
}
