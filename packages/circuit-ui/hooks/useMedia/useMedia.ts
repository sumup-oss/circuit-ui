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

import { useEffect, useState } from 'react';

/**
 * Tracks the state of a media query.
 */
export function useMedia(query: string, initialState = false): boolean {
  // The initial state has to be static to support server-side rendering.
  // Dynamic initialization could cause a hydration mismatch.
  const [isMatch, setMatch] = useState<boolean>(initialState);

  useEffect(() => {
    const mqList = window.matchMedia(query);

    // Update the state on mount.
    setMatch(mqList.matches);

    // Update the state on change.
    const onChange = () => {
      setMatch(mqList.matches);
    };

    /**
     * We are using the deprecated addListener here because Safari <14 doesn't
     * support addEventListener for MediaQueryLists.
     */
    mqList.addListener(onChange);

    return () => {
      mqList.removeListener(onChange);
    };
  }, [query]);

  return isMatch;
}
