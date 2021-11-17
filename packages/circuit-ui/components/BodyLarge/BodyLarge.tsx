/**
 * Copyright 2021, SumUp Ltd.
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

import { forwardRef, HTMLAttributes, Ref } from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { AsPropType } from '../../types/prop-types';

type Variant = 'highlight' | 'quote' | 'success' | 'error' | 'subtle';

export interface BodyLargeProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Choose from style variants.
   */
  variant?: Variant;
  /**
   * Render the text using any HTML element.
   */
  as?: AsPropType;
  /**
   * The ref to the HTML DOM element.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: Ref<any>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  font-weight: ${theme.fontWeight.regular};
  font-size: ${theme.typography.bodyLarge.fontSize};
  line-height: ${theme.typography.bodyLarge.lineHeight};
`;

const variantStyles = ({ theme, variant }: BodyLargeProps & StyleProps) => {
  switch (variant) {
    default: {
      return null;
    }
    case 'highlight': {
      return css`
        font-weight: ${theme.fontWeight.bold};
      `;
    }
    case 'quote': {
      return css`
        font-style: italic;
        padding-left: ${theme.spacings.kilo};
        border-left: ${theme.borderWidth.mega} solid ${theme.colors.p500};
      `;
    }
    case 'success': {
      return css`
        color: ${theme.colors.success};
      `;
    }
    case 'error': {
      return css`
        color: ${theme.colors.danger};
      `;
    }
    case 'subtle': {
      return css`
        color: ${theme.colors.n700};
      `;
    }
  }
};

const StyledBodyLarge = styled('p', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<BodyLargeProps>(baseStyles, variantStyles);

function getHTMLElement(variant?: Variant): AsPropType {
  if (variant === 'highlight') {
    return 'strong';
  }
  if (variant === 'quote') {
    return 'blockquote';
  }
  return 'p';
}

/**
 * The BodyLarge component is used to present the core textual content
 * to our users.
 */
export const BodyLarge = forwardRef(
  (props: BodyLargeProps, ref?: BodyLargeProps['ref']) => {
    const as = props.as || getHTMLElement(props.variant);
    return <StyledBodyLarge {...props} ref={ref} as={as} />;
  },
);

BodyLarge.displayName = 'BodyLarge';
