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

import { atom, onSet } from 'nanostores';
import { useEffect } from 'react';

const instances = atom(0);

onSet(instances, ({ newValue }) => {
  const oldValue = instances.get();

  // Lock scroll on the first active instance
  if (oldValue === 0 && newValue === 1) {
    // Read the layout before modifying styles to avoid conflicts
    const top = `-${window.scrollY}px`;
    const width = `${document.body.offsetWidth}px`;

    document.body.style.position = 'fixed';
    document.body.style.top = top;
    // When its position is set to fixed, the body element is taken out of
    // the normal document flow and this may cause it to change size.
    // To prevent this, we set the width of the body to its current width.
    document.body.style.width = width;
  }

  // Unlock scroll when there are no active instances
  if (newValue === 0) {
    const scrollY = document.body.style.top
      ? Number.parseInt(document.body.style.top, 10)
      : 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY * -1);
  }
});

export const useScrollLock = (isActive: boolean): void => {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    instances.set(instances.get() + 1);
    return () => {
      instances.set(instances.get() - 1);
    };
  }, [isActive]);
};
