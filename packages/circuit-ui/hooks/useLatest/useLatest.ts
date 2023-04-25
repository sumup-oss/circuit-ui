/**
 * Copyright 2023, SumUp Ltd.
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

import { useRef, useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect =
  typeof document !== 'undefined' ? useLayoutEffect : useEffect;

export function useLatest<T>(value: T) {
  const ref = useRef(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}
