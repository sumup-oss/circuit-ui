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

import { useEffect, useRef, useState, type InputHTMLAttributes } from 'react';

import classes from './Segment.module.css';

export function Segment(props: InputHTMLAttributes<HTMLInputElement>) {
  const sizeRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState('4ch');

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (sizeRef.current) {
      setWidth(`${sizeRef.current.offsetWidth}px`);
    }
  }, [props.value]);

  return (
    <div>
      <input
        type="number"
        className={classes.input}
        autoCorrect="false"
        enterKeyHint="next"
        spellCheck={false}
        style={{ ...props.style, '--width': width }}
        {...props}
      />
      <span ref={sizeRef} className={classes.size} aria-hidden="true">
        {props.value || props.placeholder}
      </span>
    </div>
  );
}
