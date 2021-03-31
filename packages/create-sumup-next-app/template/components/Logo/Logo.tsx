import React from 'react';
import { css } from '@emotion/core';
import { SumUpLogo } from '@sumup/icons';
import { Theme } from '@sumup/design-tokens';

export const Logo = () => (
  <a
    href="https://sumup.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open SumUp's homepage in a new tab"
    title="Open SumUp's homepage in a new tab"
  >
    <SumUpLogo
      css={(theme: Theme) => css`
        display: block;
        max-width: 120px;
        color: ${theme.colors.black};
        margin: ${theme.spacings.tera} 0;
      `}
    />
  </a>
);
