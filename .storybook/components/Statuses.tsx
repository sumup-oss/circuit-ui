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

import type { ReactNode } from 'react';
import { Unstyled } from '@storybook/blocks';
import LinkTo from '@storybook/addon-links/react';
import {
  Status as StatusPill,
  type StatusProps as StatusPillProps,
} from '../../packages/circuit-ui/components/Status/Status.js';
import { Body } from '../../packages/circuit-ui/components/Body/Body.js';

import classes from './Statuses.module.css';

type Variant =
  | 'stable'
  | 'under-review'
  | 'experimental'
  | 'legacy'
  | 'deprecated'
  | 'internal';

interface StatusProps {
  variant: Variant;
  children?: ReactNode;
}

const variantMap: Record<
  Variant,
  Pick<StatusPillProps, 'color' | 'children'>
> = {
  stable: { color: 'confirm', children: 'Stable' },
  experimental: { color: 'promo', children: 'Experimental' },
  'under-review': { color: 'notify', children: 'Under Review' },
  legacy: { color: 'notify', children: 'Legacy' },
  deprecated: { color: 'alert', children: 'Deprecated' },
  internal: { color: 'neutral', children: 'Internal' },
};

export function Status({
  variant: status = 'stable',
  children,
  ...props
}: StatusProps) {
  const kind = 'Introduction/Component-Lifecycle';
  const name = 'Docs';

  return (
    <Unstyled {...props}>
      <LinkTo {...props} kind={kind} name={name}>
        <StatusPill {...variantMap[status]} />
      </LinkTo>
      {children && (
        <Body size="s" as="span" className={classes.description} color="subtle">
          {children}
        </Body>
      )}
    </Unstyled>
  );
}
