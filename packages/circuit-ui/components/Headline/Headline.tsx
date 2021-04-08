/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

import { FC, HTMLProps } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import deprecate from '../../util/deprecate';

type Size = 'one' | 'two' | 'three' | 'four';

export interface HeadlineProps
  extends Omit<HTMLProps<HTMLHeadingElement>, 'size'> {
  /**
   * A Circuit UI headline size.
   */
  size?: Size;
  /**
   * Removes the default bottom margin from the headline.
   */
  noMargin?: boolean;
  /**
   * The HTML headline element to render.
   */
  as?: string;
}

const baseStyles = ({ theme }: StyleProps) => css`
  label: headline;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacings.giga};
  color: ${theme.colors.black};
`;

const sizeStyles = ({ theme, size = 'one' }: StyleProps & HeadlineProps) => {
  if (!size) {
    return null;
  }

  return css`
    label: ${`headline-${size}`};
    font-size: ${theme.typography.headline[size].fontSize};
    line-height: ${theme.typography.headline[size].lineHeight};
  `;
};
const noMarginStyles = ({ noMargin }: HeadlineProps) => {
  if (!noMargin) {
    deprecate(
      [
        'The default outer spacing in the Headline component is deprecated.',
        'Use the `noMargin` prop to silence this warning.',
        'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
      ].join(' '),
    );
    return null;
  }

  return css`
    label: headline--no-margin;
    margin-bottom: 0;
  `;
};

/**
 * A flexible headline component capable of rendering using any HTML headline tag.
 */
export const Headline: FC<HeadlineProps> = styled('h2', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<HeadlineProps>(baseStyles, sizeStyles, noMarginStyles);
