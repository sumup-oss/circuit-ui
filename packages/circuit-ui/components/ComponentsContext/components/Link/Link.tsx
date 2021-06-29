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

import { forwardRef, HTMLProps, Ref } from 'react';

export interface LinkProps extends HTMLProps<HTMLAnchorElement> {
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * A barebones Link component that's basically just an `<a>` tag
 */
export const Link = forwardRef(
  ({ children, ...props }: LinkProps, ref: LinkProps['ref']) => (
    <a {...props} ref={ref}>
      {children}
    </a>
  ),
);

Link.displayName = 'Link';
