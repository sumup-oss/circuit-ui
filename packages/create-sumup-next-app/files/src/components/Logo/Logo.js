import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import LogoIcon from './logo.svg';

const Logo = styled(LogoIcon)(
  ({ theme }) => css`
    display: block;
    fill: ${theme.colors.white};
    margin-bottom: ${theme.spacings.tera};
    margin-top: ${theme.spacings.peta};
  `
);

export default Logo;
