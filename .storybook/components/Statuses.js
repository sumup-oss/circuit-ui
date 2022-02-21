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

/* eslint-disable react/prop-types, react/display-name */

import PropTypes from 'prop-types';
import { css, ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';
import { Badge, Body, spacing } from '@sumup/circuit-ui';

const variants = {
  stable: { variant: 'confirm', label: 'Stable' },
  deprecated: { variant: 'alert', label: 'Deprecated' },
  inReview: { variant: 'notify', label: 'In Review' },
  experimental: { variant: 'notify', label: 'Experimental' },
};

const Status = ({ variant: status = 'stable' }) => {
  const { variant, label } = variants[status];

  return (
    <ThemeProvider theme={light}>
      <Badge
        variant={variant}
        css={(theme) => css`
          margin-bottom: ${theme.spacings.mega};
        `}
      >
        {label}
      </Badge>
    </ThemeProvider>
  );
};

Status.Description = ({ children }) => (
  <ThemeProvider theme={light}>
    <Body size="two" as="span" noMargin css={spacing({ bottom: 'giga' })}>
      {children}
    </Body>
  </ThemeProvider>
);

Status.propTypes = {
  variant: PropTypes.oneOf([
    'stable',
    'deprecated',
    'inReview',
    'experimental',
  ]),
};

Status.Stable = (props) => <Status {...props} variant="stable" />;
Status.Deprecated = (props) => <Status {...props} variant="deprecated" />;
Status.InReview = (props) => <Status {...props} variant="inReview" />;
Status.Experimental = (props) => <Status {...props} variant="experimental" />;

/**
 * @component
 */
export default Status;
