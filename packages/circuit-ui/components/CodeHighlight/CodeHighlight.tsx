/**
 * Copyright 2026, SumUp Ltd.
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

import { useEffect, useState, type HTMLAttributes, type Ref } from 'react';

import { clsx } from '../../styles/clsx.js';
import { useLatest } from '../../hooks/useLatest/index.js';

import type { CodeHighlightOptions } from './types.js';
import type { CodeHighlightComponent } from './CodeHighlightComponent.js';
import { codeHighlightClasses as classes } from './styles.js';

export interface CodeHighlightProps
  extends CodeHighlightOptions,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      'children' | 'dangerouslySetInnerHTML'
    > {
  ref?: Ref<HTMLDivElement>;
  /** Called if syntax highlighting fails to load. The code remains readable. */
  onHighlightError?: (error: unknown) => void;
}

/** Displays plain code first, then loads and applies syntax highlighting. */
export function CodeHighlight({
  code,
  language,
  filename,
  lineNumbers,
  wrap = false,
  highlightedLines,
  className,
  onHighlightError,
  ...props
}: CodeHighlightProps) {
  const [Renderer, setRenderer] = useState<typeof CodeHighlightComponent>();

  const errorHandler = useLatest(onHighlightError);

  useEffect(() => {
    let active = true;
    import('./CodeHighlightComponent.js').then(
      (module) => {
        if (active) {
          setRenderer(() => module.CodeHighlightComponent);
        }
      },
      (error: unknown) => {
        if (active) {
          errorHandler.current?.(error);
        }
      },
    );
    return () => {
      active = false;
    };
  }, [errorHandler]);

  return (
    <div {...props} className={clsx(classes.base, className)}>
      {Renderer ? (
        <Renderer
          {...{ code, language, filename, lineNumbers, wrap, highlightedLines }}
        />
      ) : (
        <pre
          className={clsx(classes.fallback, wrap && classes.wrap)}
          // biome-ignore lint/a11y/noNoninteractiveTabindex: Allow keyboard users to scroll long code lines.
          tabIndex={0}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
