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

import { useEffect, useRef } from 'react';

export const useScrollLock = (isLocked: boolean): void => {
  const busy = useRef(false);

  useEffect(() => {
    function setScrollProperty() {
      if (!busy.current) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty(
            '--scroll-y',
            `${window.scrollY}px`,
          );
          busy.current = false;
        });
        busy.current = true;
      }
    }
    window.addEventListener('scroll', setScrollProperty);

    return () => {
      window.removeEventListener('scroll', setScrollProperty);
    };
  }, []);

  useEffect(() => {
    if (isLocked) {
      const scrollY =
        document.documentElement.style.getPropertyValue('--scroll-y');
      const { body } = document;
      const bodyWidth = body.offsetWidth;
      // when position is set to fixed, the body element is taken out of
      // the normal document flow and this may cause it to change size.
      // To prevent this, we set the width of the body to its current width.
      body.style.position = 'fixed';
      body.style.width = `${bodyWidth}px`;
      body.style.top = `-${scrollY}`;
    } else {
      // restore scroll to page
      const { body } = document;
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      window.scrollTo(0, Number.parseInt(scrollY || '0', 10) * -1);
    }
  }, [isLocked]);
};
