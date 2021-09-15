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

import { Children, cloneElement, ReactElement, forwardRef, Ref } from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import { hideVisually } from '../../styles/style-mixins';
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

const Label = styled('span')(hideVisually);

const sizeStyles = (size: IconButtonProps['size'] = 'giga') => (
  theme: Theme,
): SerializedStyles => {
  const sizeMap = {
    kilo: theme.spacings.byte,
    giga: theme.spacings.kilo,
  };

  return css({
    padding: `calc(${sizeMap[size]} - 1px)`,
  });
};

/**
 * The IconButton component displays a button with a single icon
 * as its only child.
 */
export const IconButton = forwardRef(
  ({ children, label, size, ...props }: IconButtonProps, ref?: Ref<any>) => {
    const child = Children.only(children);
    const icon = cloneElement(child, { role: 'presentation' });
    if (
      process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new Error(
        'The IconButton component is missing a `label` prop. This is an accessibility requirement.',
      );
    }
    return (
      <Button title={label} css={sizeStyles(size)} {...props} ref={ref}>
        {icon}
        <Label>{label}</Label>
      </Button>
    );
  },
);

IconButton.displayName = 'IconButton';
