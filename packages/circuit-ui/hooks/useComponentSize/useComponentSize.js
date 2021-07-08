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

import { useCallback, useState, useEffect } from 'react';
import throttle from 'lodash/fp/throttle';

function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}

export function useComponentSize(ref = {}) {
  const [componentSize, setComponentSize] = useState(getSize(ref.current));
  const handleResize = useCallback(
    throttle(500)(() => {
      if (ref.current) {
        setComponentSize(getSize(ref.current));
      }
    }),
    [ref],
  );

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    handleResize();

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(node);

      // eslint-disable-next-line consistent-return
      return function cleanup() {
        resizeObserver.disconnect(node);
        resizeObserver = null;
      };
    }

    window.addEventListener('resize', handleResize);

    // eslint-disable-next-line consistent-return
    return function cleanup() {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return componentSize;
}
