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

import { useRef, useState, useEffect } from 'react';

type Animation = {
  duration: number;
  onStart: () => void;
  onEnd: () => void;
};

type Timeout = ReturnType<typeof setTimeout>;

/**
 * Helper to animate between complex states. It calls callback functions
 * at the start and end of the animation duration.
 */
export function useAnimation(): [boolean, (animation: Animation) => void] {
  const timerId = useRef<Timeout | null>(null);
  const [animation, setAnimation] = useState<Animation | null>(null);

  useEffect(() => {
    if (!animation) {
      return undefined;
    }

    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    if (animation.onStart) {
      animation.onStart();
    }

    timerId.current = setTimeout(() => {
      if (animation.onEnd) {
        animation.onEnd();
      }
      setAnimation(null);
    }, animation.duration);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [animation]);

  const isAnimating = Boolean(animation);

  return [isAnimating, setAnimation];
}
