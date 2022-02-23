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

import { forwardRef, HTMLAttributes, Ref, useContext } from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';

import styled, { StyleProps } from '../../styles/styled';
import { deprecate } from '../../util/logger';
import { AsPropType } from '../../types/prop-types';
import ThemeContext from '../Theming/ThemeContext';
import { getTheme } from '../../styles/theme';

type Size = 'one' | 'two';
type Variant =
  | 'highlight'
  | 'quote'
  | 'success'
  | 'confirm'
  | 'error'
  | 'alert'
  | 'subtle';

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
   * Remove the default margin below the text.
   */
  noMargin?: boolean;
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

const baseStyles = ({ theme, t }: StyleProps & { t?: 'light' | 'dark' }) => {
  const T = getTheme(t);
  return css`
    font-weight: ${theme.fontWeight.regular};
    margin-bottom: ${theme.spacings.mega};
    color: ${T.neutral.text.default.default};
  `;
};

const sizeStyles = ({ theme, size = 'one' }: BodyProps & StyleProps) => css`
  font-size: ${theme.typography.body[size].fontSize};
  line-height: ${theme.typography.body[size].lineHeight};
`;

const variantStyles = ({
  theme,
  variant,
  t,
}: BodyProps & StyleProps & { t?: 'light' | 'dark' }) => {
  const T = getTheme(t);
  // TODO: remove the legacy variants and this switch statement in v5
  /* eslint-disable no-param-reassign */
  switch (variant) {
    case 'success':
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        deprecate(
          'Body',
          "The Body's `success` variant is deprecated.",
          'Use the `confirm` variant instead.',
        );
      }
      variant = 'confirm';
      break;
    case 'error':
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        deprecate(
          'Body',
          "The Body's `error` variant is deprecated.",
          'Use the `alert` variant instead.',
        );
      }
      variant = 'alert';
      break;
    default:
      break;
  }
  /* eslint-enable no-param-reassign */

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
        border-left: ${theme.borderWidth.mega} solid
          ${T.primary.border.default.default};
      `;
    }
    case 'confirm': {
      return css`
        color: ${T.confirm.text.default.default};
      `;
    }
    case 'alert': {
      return css`
        color: ${T.alert.text.default.default};
      `;
    }
    case 'subtle': {
      return css`
        color: ${T.neutral.text.subtle.default};
      `;
    }
  }
};

const marginStyles = ({ noMargin }: BodyProps & StyleProps) => {
  if (!noMargin) {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      deprecate(
        'Body',
        'The default outer spacing in the Body component is deprecated.',
        'Use the `noMargin` prop to silence this warning.',
        'Read more at https://github.com/sumup-oss/circuit-ui/issues/534.',
      );
    }

    return null;
  }

  return css`
    margin-bottom: 0;
  `;
};

const StyledBody = styled('p', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<BodyProps & { t?: 'light' | 'dark' }>(
  baseStyles,
  sizeStyles,
  marginStyles,
  variantStyles,
);

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
  return (
    <StyledBody {...props} ref={ref} as={as} t={useContext(ThemeContext)} />
  );
});

Body.displayName = 'Body';
