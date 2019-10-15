import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

/**
 * SVG files can be imported and used as React components.
 */
import LogoIcon from './logo.svg';

const Logo = styled(LogoIcon)(
  ({ theme }) => css`
    display: block;
    max-width: 120px;
    fill: ${theme.colors.n900};
    margin-bottom: ${theme.spacings.tera};
    margin-top: ${theme.spacings.peta};
  `
);

export default Logo;
