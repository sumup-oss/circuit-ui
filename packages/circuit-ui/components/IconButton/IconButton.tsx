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
import { css, SerializedStyles } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';
import { IconProps } from '@sumup/icons';

import { hideVisually } from '../../styles/style-mixins.js';
import styled from '../../styles/styled.js';
import { Button, ButtonProps } from '../Button/Button.jsx';
import { AccessibilityError } from '../../util/errors.js';

export interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'stretch'> {
  /**
   * A single icon element.
   */
  children: ReactElement<IconProps>;
  /**
   * Short label to describe the function of the button. Displayed as title
   * on hover, and accessible to screen readers.
   */
  label: string;
}

const Label = styled('span')(hideVisually);

const sizeStyles =
  (size: IconButtonProps['size'] = 'giga') =>
  (theme: Theme): SerializedStyles => {
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
  (
    { children, label, size, ...props }: IconButtonProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref?: Ref<any>,
  ) => {
    const child = Children.only(children);
    const iconSize = size === 'kilo' ? '16' : '24';
    const icon = cloneElement(child, {
      role: 'presentation',
      size: child.props.size || iconSize,
    });
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      !label
    ) {
      throw new AccessibilityError(
        'IconButton',
        'The `label` prop is missing.',
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
