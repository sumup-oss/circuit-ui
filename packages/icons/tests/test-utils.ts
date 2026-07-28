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

import '@testing-library/jest-dom/vitest';
import { afterEach, expect } from 'vitest';
import { configureAxe, toHaveNoViolations } from 'jest-axe';
// `vitest.config.ts` uses `globals: false`, so `@testing-library/react`'s
// automatic cleanup (which relies on a global `afterEach`) never registers.
// eslint-disable-next-line testing-library/no-manual-cleanup -- required because globals is disabled
import { cleanup } from '@testing-library/react';

// biome-ignore lint/performance/noReExportAll: We re-export the package to override specific functions below
export * from '@testing-library/react';

afterEach(cleanup);

expect.extend(toHaveNoViolations);

const axe = configureAxe({
  rules: {
    // disabled landmark rules when testing isolated components.
    region: { enabled: false },
  },
});

export { axe };
