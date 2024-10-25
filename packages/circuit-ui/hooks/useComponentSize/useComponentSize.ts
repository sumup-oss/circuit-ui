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

import { useCallback, useState, useEffect, type RefObject } from 'react';

import { throttle } from '../../util/helpers';

function getSize(element?: HTMLElement | null) {
  if (!element) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: element.offsetWidth,
    height: element.offsetHeight,
  };
}

export function useComponentSize(
  ref: RefObject<HTMLElement>,
  initialSize = { width: 0, height: 0 },
) {
  const [componentSize, setComponentSize] = useState(initialSize);

  const handleResize = useCallback(() => {
    throttle(() => {
      setComponentSize(getSize(ref.current));
    }, 500)();
  }, [ref]);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    handleResize();

    if (typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(node);

      return () => {
        resizeObserver.disconnect();
      };
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, ref]);

  return componentSize;
}
