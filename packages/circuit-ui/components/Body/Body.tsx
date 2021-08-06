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

import { forwardRef, HTMLProps, Ref } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { deprecate } from '../../util/logger';

type Size = 'one' | 'two';
type Variant = 'highlight' | 'quote' | 'success' | 'error' | 'subtle';

export interface BodyProps
  extends Omit<HTMLProps<HTMLParagraphElement>, 'size'> {
  /**
   * Choose from 2 font sizes. Default `one`.
   */
  size?: Size;
  /**
   * Choose from style variants.
   */
  variant?: Variant;
  /**
   * Remove the default margin below the text.
   */
  noMargin?: boolean;
  /**
   * Render the text using any HTML element.
   */
  as?: string;
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<any>;
}

const baseStyles = ({ theme }: StyleProps) => css`
  font-weight: ${theme.fontWeight.regular};
  margin-bottom: ${theme.spacings.mega};
`;

const sizeStyles = ({ theme, size = 'one' }: BodyProps & StyleProps) => {
  if (!size) {
    return null;
  }

  return css`
    font-size: ${theme.typography.body[size].fontSize};
    line-height: ${theme.typography.body[size].lineHeight};
  `;
};

const variantStyles = ({ theme, variant }: BodyProps & StyleProps) => {
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

const marginStyles = ({ noMargin }: BodyProps & StyleProps) => {
  if (!noMargin) {
    deprecate(
      'Body',
      'The default outer spacing in the Body component is deprecated.',
      'Use the `noMargin` prop to silence this warning.',
      'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
    );
    return null;
  }

  return css`
    margin-bottom: 0;
  `;
};

const StyledBody = styled('p', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<BodyProps>(baseStyles, sizeStyles, marginStyles, variantStyles);

function getHTMLElement(variant?: Variant): string {
  if (variant === 'highlight') {
    return 'strong';
  }
  if (variant === 'quote') {
    return 'blockquote';
  }
  return 'p';
}

/**
 * The Body component is used to present the core textual content
 * to our users.
 */
export const Body = forwardRef((props: BodyProps, ref?: BodyProps['ref']) => {
  const as = props.as || getHTMLElement(props.variant);
  return <StyledBody {...props} ref={ref} as={as} />;
});

Body.displayName = 'Body';
