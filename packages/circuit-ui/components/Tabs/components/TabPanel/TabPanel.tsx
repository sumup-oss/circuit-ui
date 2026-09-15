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

import { forwardRef, type HTMLAttributes } from 'react';
import { AccessibilityError } from '../../../../util/errors.js';

export type TabPanelProps = HTMLAttributes<HTMLDivElement>;

function hasMissingAccessibilityProps(props: Partial<TabPanelProps>) {
  return !props.id || !props['aria-labelledby'];
}

/**
 * TabPanel wrapping content being showed by tabs
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  (props, ref) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      hasMissingAccessibilityProps(props)
    ) {
      // biome-ignore lint/suspicious/noConsole: Logging an accessibility warning is intentional.
      console.warn(
        new AccessibilityError(
          'TabPanel',
          'Missing some accessibility props which will become required in the next major version. Read more about tab accessibility here: https://circuit.sumup.com/?path=/docs/navigation-tabs--docs#use-subcomponents-independently',
        ),
      );
    }

    return <div ref={ref} {...props} role="tabpanel" tabIndex={-1} />;
  },
);

TabPanel.displayName = 'TabPanel';
