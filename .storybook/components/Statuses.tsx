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
import { Unstyled } from '@storybook/addon-docs';
import LinkTo from '@storybook/addon-links/react';
import { css, ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import { Badge, BadgeProps, Body, cx, spacing } from '@sumup/circuit-ui';

type Variant =
  | 'stable'
  | 'under-review'
  | 'experimental'
  | 'legacy'
  | 'deprecated';

interface StatusProps {
  variant: Variant;
  children?: ReactNode;
}

const descriptionStyles = css`
  p {
    display: inline;
  }
`;

const variantMap: Record<
  Variant,
  { variant: BadgeProps['variant']; label: string }
> = {
  'stable': { variant: 'success', label: 'Stable' },
  'experimental': { variant: 'promo', label: 'Experimental' },
  'under-review': { variant: 'warning', label: 'Under Review' },
  'legacy': { variant: 'warning', label: 'Legacy' },
  'deprecated': { variant: 'danger', label: 'Deprecated' },
};

export default function Status({
  variant: status = 'stable',
  children,
  ...props
}: StatusProps) {
  const { variant, label } = variantMap[status];

  const kind = 'Introduction/Component-Lifecycle';
  const name = 'Docs';

  return (
    <ThemeProvider theme={light}>
      <Unstyled {...props}>
        <LinkTo {...props} kind={kind} name={name}>
          <Badge variant={variant}>{label}</Badge>
        </LinkTo>
        {children && (
          <Body
            size="two"
            as="span"
            css={cx(spacing({ left: 'byte' }), descriptionStyles)}
            variant="subtle"
          >
            {children}
          </Body>
        )}
      </Unstyled>
    </ThemeProvider>
  );
}
