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

import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { css } from '@emotion/core';

import { theme as themes, Badge, Text } from '../../src';

const variants = {
  stable: { color: Badge.SUCCESS, label: 'Stable' },
  deprecated: { color: Badge.DANGER, label: 'Deprecated' },
  inReview: { color: Badge.WARNING, label: 'In Review' },
  experimental: { color: Badge.PRIMARY, label: 'Experimental' }
};

const Status = ({ variant = 'stable' }) => {
  const { color, label } = variants[variant];

  return (
    <ThemeProvider theme={themes.circuit}>
      <Badge
        color={color}
        css={theme => css`
          margin-bottom: ${theme.spacings.mega};
        `}
      >
        {label}
      </Badge>
    </ThemeProvider>
  );
};

Status.Description = ({ children }) => (
  <ThemeProvider theme={themes.circuit}>
    <Text size={Text.KILO} as="span" italic>
      {' '}
      {children}
    </Text>
  </ThemeProvider>
);

Status.propTypes = {
  variant: PropTypes.oneOf(['stable', 'deprecated', 'inReview', 'experimental'])
};

Status.Stable = props => <Status {...props} variant="stable" />;
Status.Deprecated = props => <Status {...props} variant="deprecated" />;
Status.InReview = props => <Status {...props} variant="inReview" />;
Status.Experimental = props => <Status {...props} variant="experimental" />;

/**
 * @component
 */
export default Status;
