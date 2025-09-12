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

import { useCallback, useRef, type TouchEvent } from 'react';

import { useLatest } from '../useLatest/useLatest.js';

type Direction = 'up' | 'right' | 'down' | 'left';

/**
 * Detects swipe gestures on touchscreen devices.
 */
export function useSwipe<T = Element>(
  onSwipe: (direction: Direction) => void,
  minSwipeDistance = 50,
) {
  const touchStart = useRef<{ clientX: number; clientY: number } | null>(null);
  const touchEnd = useRef<{ clientX: number; clientY: number } | null>(null);
  const swipeHandler = useLatest(onSwipe);

  const onTouchStart = useCallback((event: TouchEvent<T>) => {
    // Some browsers re-use touch objects between events, so it's best to copy
    // the properties we care about, rather than referencing the entire object.
    const { clientX, clientY } = event.targetTouches[0];
    touchStart.current = { clientX, clientY };
    touchEnd.current = null;
  }, []);

  const onTouchMove = useCallback((event: TouchEvent<T>) => {
    // Some browsers re-use touch objects between events, so it's best to copy
    // the properties we care about, rather than referencing the entire object.
    const { clientX, clientY } = event.targetTouches[0];
    touchEnd.current = { clientX, clientY };
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) {
      return;
    }
    const distanceX = touchStart.current.clientX - touchEnd.current.clientX;
    const distanceY = touchStart.current.clientY - touchEnd.current.clientY;

    // Horizontal
    if (
      Math.abs(distanceX) > Math.abs(distanceY) &&
      Math.abs(distanceX) > minSwipeDistance
    ) {
      const direction = distanceX > 0 ? 'left' : 'right';
      swipeHandler.current(direction);
    }

    // Vertical
    if (Math.abs(distanceY) > minSwipeDistance) {
      const direction = distanceY > 0 ? 'up' : 'down';
      swipeHandler.current(direction);
    }
  }, [swipeHandler, minSwipeDistance]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
