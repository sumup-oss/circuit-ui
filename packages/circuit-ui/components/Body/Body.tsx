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

import { forwardRef, HTMLAttributes, Ref } from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { AsPropType } from '../../types/prop-types';

type Size = 'one' | 'two';
type Variant = 'highlight' | 'quote' | 'confirm' | 'alert' | 'subtle';

export interface BodyProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Choose from 2 font sizes. Default `one`.
   */
  size?: Size;
  /**
   * Choose from style variants.
   */
  variant?: Variant;
  /**
   * We're moving away from built-in margins. The `noMargin` prop is now
   * required and will be removed in v6 using codemods. Use the `spacing()`
   * mixin to add margin.
   */
  noMargin: true;
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
`;

const sizeStyles = ({ theme, size = 'one' }: BodyProps & StyleProps) => css`
  font-size: ${theme.typography.body[size].fontSize};
  line-height: ${theme.typography.body[size].lineHeight};
`;

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
    case 'confirm': {
      return css`
        color: ${theme.colors.confirm};
      `;
    }
    case 'alert': {
      return css`
        color: ${theme.colors.alert};
      `;
    }
    case 'subtle': {
      return css`
        color: ${theme.colors.n700};
      `;
    }
  }
};

const marginStyles = ({ theme, noMargin }: BodyProps & StyleProps) => {
  if (!noMargin) {
    if (
      process.env.UNSAFE_DISABLE_NO_MARGIN_ERRORS !== 'true' &&
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      throw new Error(
        'The Body component requires the `noMargin` prop to be passed. Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
      );
    }
    return css`
      margin-bottom: ${theme.spacings.mega};
    `;
  }

  return null;
};

const StyledBody = styled('p', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<BodyProps>(baseStyles, sizeStyles, marginStyles, variantStyles);

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
 * The Body component is used to present the core textual content
 * to our users.
 */
export const Body = forwardRef((props: BodyProps, ref?: BodyProps['ref']) => {
  const as = props.as || getHTMLElement(props.variant);
  return <StyledBody {...props} ref={ref} as={as} />;
});

Body.displayName = 'Body';
