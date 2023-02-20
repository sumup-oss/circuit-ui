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

import { Unstyled } from '@storybook/addon-docs';
import { css, ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import { Badge, Body, cx, spacing } from '@sumup/circuit-ui';
import { ReactNode } from 'react';

interface StatusProps {
  variant: 'stable' | 'deprecated' | 'inReview' | 'experimental';
  children?: ReactNode;
}

const descriptionStyles = css`
  p {
    display: inline;
  }
`;

const variants = {
  stable: { variant: 'confirm', label: 'Stable' },
  deprecated: { variant: 'alert', label: 'Deprecated' },
  inReview: { variant: 'notify', label: 'In Review' },
  experimental: { variant: 'notify', label: 'Experimental' },
} as const;

const Status = ({ variant: status = 'stable', children }: StatusProps) => {
  const { variant, label } = variants[status];

  return (
    <ThemeProvider theme={light}>
      <Unstyled>
        <Badge variant={variant}>{label}</Badge>
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
};

/**
 * @deprecated Use `<Status variant="stable" />` instead.
 */
Status.Stable = (props: Pick<StatusProps, 'children'>) => (
  <Status variant="stable" {...props} />
);
/**
 * @deprecated Use `<Status variant="deprecated" />` instead.
 */
Status.Deprecated = (props: Pick<StatusProps, 'children'>) => (
  <Status variant="deprecated" {...props} />
);
/**
 * @deprecated Use `<Status variant="inReview" />` instead.
 */
Status.InReview = (props: Pick<StatusProps, 'children'>) => (
  <Status variant="inReview" {...props} />
);
/**
 * @deprecated Use `<Status variant="experimental" />` instead.
 */
Status.Experimental = (props: Pick<StatusProps, 'children'>) => (
  <Status variant="experimental" {...props} />
);

export default Status;
