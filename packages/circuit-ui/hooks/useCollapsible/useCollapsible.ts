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

import { useState, useRef, useCallback, RefObject, useId } from 'react';

import { ClickEvent } from '../../types/events.js';
import { useAnimation } from '../useAnimation/index.js';

const DEFAULT_HEIGHT = 'auto';

export type CollapsibleOptions = {
  initialOpen?: boolean;
  duration?: number;
  id?: string;
};

type Overflow = 'visible' | 'hidden';

type ButtonProps = {
  'onClick': (event: ClickEvent) => void;
  'aria-controls': string;
  'aria-expanded': 'true' | 'false';
};

type ContentProps<T> = {
  'ref': RefObject<T>;
  'id': string;
  'style': {
    overflowY: Overflow;
    willChange: 'height';
    opacity: 1 | 0;
    height: string | 0;
  };
  'aria-hidden': undefined | 'true';
};

type Collapsible<T> = {
  isOpen: boolean;
  toggleOpen: () => void;
  isAnimating: boolean;
  getButtonProps: (props?: {
    onClick?: (event: ClickEvent) => void;
  }) => ButtonProps;
  getContentProps: (props?: {
    style?: Record<string, string>;
  }) => ContentProps<T>;
};

/**
 * A hook to build accessible and smoothly animated collapsible sections.
 * Based on https://inclusive-components.design/collapsible-sections/
 */
export function useCollapsible<T extends HTMLElement = HTMLElement>({
  initialOpen = false,
  duration = 200,
  id: customId,
}: CollapsibleOptions = {}): Collapsible<T> {
  const id = useId();
  const contentId = customId || id;
  const contentElement = useRef<T>(null);
  const [isOpen, setOpen] = useState(initialOpen);
  const [height, setHeight] = useState(getHeight(contentElement));
  const [overflow, setOverflow] = useState<Overflow>(
    initialOpen ? 'visible' : 'hidden',
  );
  const [isAnimating, setAnimating] = useAnimation();

  const toggleOpen = useCallback(() => {
    setAnimating({
      duration,
      onStart: () => {
        setHeight(getHeight(contentElement));
        setOverflow('hidden');
        // Delaying the state update until the next animation frame ensures that
        // the browsers renders the new height before the animation starts.
        window.requestAnimationFrame(() => {
          setOpen((prev) => !prev);
        });
      },
      onEnd: () => {
        setHeight(DEFAULT_HEIGHT);
        setOverflow('visible');
      },
    });
  }, [setAnimating, duration]);

  return {
    isOpen,
    toggleOpen,
    isAnimating,
    getButtonProps: (props = {}) => ({
      'onClick': (event: ClickEvent) => {
        if (props.onClick) {
          props.onClick(event);
        }
        toggleOpen();
      },
      'aria-controls': contentId,
      'aria-expanded': isOpen ? 'true' : 'false',
    }),
    getContentProps: (props = {}) => ({
      'ref': contentElement,
      'id': contentId,
      'style': {
        overflowY: overflow,
        willChange: 'height',
        opacity: isOpen ? 1 : 0,
        height: isOpen ? height : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transition: `all ${duration}ms ease-in-out`,
        ...props.style,
      },
      'aria-hidden': isOpen ? undefined : 'true',
    }),
  };
}

export function getHeight(element: RefObject<HTMLElement>): string {
  if (!element || !element.current) {
    return DEFAULT_HEIGHT;
  }
  return `${element.current.scrollHeight}px`;
}
