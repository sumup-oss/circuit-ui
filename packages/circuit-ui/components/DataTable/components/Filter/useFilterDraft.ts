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

import { useCallback, useEffect, useState } from 'react';

/**
 * Holds an uncommitted value next to the committed one. Filters that need an
 * explicit Apply (ranges) edit the draft, and only `apply` reports it via
 * `onChange`. `discard` drops the draft, and `clear` empties it without
 * committing.
 */
export function useFilterDraft<T>(
  value: T | undefined,
  onChange: (value: T | undefined) => void,
) {
  const [draft, setDraft] = useState<T | undefined>(value);

  // Follow the committed value, e.g. when the table resets all filters.
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const apply = useCallback(() => {
    onChange(draft);
  }, [onChange, draft]);

  const discard = useCallback(() => {
    setDraft(value);
  }, [value]);

  const clear = useCallback(() => {
    setDraft(undefined);
  }, []);

  return { draft, setDraft, apply, discard, clear };
}
