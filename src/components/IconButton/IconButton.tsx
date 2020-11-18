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

/** @jsx jsx */
import React, { Children, cloneElement, ReactElement } from 'react';
import { css, jsx } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import { hideVisually } from '../../styles/style-helpers';
import styled from '../../styles/styled';
import { Button, ButtonProps } from '../Button/Button';

export interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'stretch'> {
  /**
   * A single icon element.
   */
  children: ReactElement;
  /**
   * Short label to describe the function of the button. Displayed as title
   * on hover, and accessible to screen readers.
   */
  label: string;
}

const labelStyles = css`
  label: button__label;
  ${hideVisually()};
`;

const Label = styled('span')(labelStyles);

const sizeStyles = (size: IconButtonProps['size'] = 'mega') => (
  theme: Theme,
) => {
  if (!size) {
    return null;
  }
  const sizeMap = {
    kilo: theme.spacings.byte,
    mega: theme.spacings.kilo,
  };

  return css({
    label: `button--${size}`,
    padding: sizeMap[size],
  });
};

/**
 * The IconButton component displays a button with a single icon
 * as its only child.
 */
export const IconButton = React.forwardRef(
  (
    { children, label, size, ...props }: IconButtonProps,
    ref?: React.Ref<HTMLButtonElement & HTMLAnchorElement>,
  ) => {
    const child = Children.only(children);
    const icon = cloneElement(child, { role: 'presentation' });
    return (
      <Button title={label} css={sizeStyles(size)} {...props} ref={ref}>
        {icon}
        <Label>{label}</Label>
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
