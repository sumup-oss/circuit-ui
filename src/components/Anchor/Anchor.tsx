/**
 * Copyright 2020, SumUp Ltd.
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

import React, { HTMLProps, ReactNode, ReactElement } from 'react';
import { css } from '@emotion/core';

import styled, { StyleProps } from '../../styles/styled';
import { focusOutline } from '../../styles/style-helpers';
import Text from '../Text';
import { TextProps } from '../Text/Text';
import { useComponents } from '../ComponentsContext';

interface BaseProps extends TextProps {
  children: ReactNode;
  /**
   * The ref to the html dom element, it can be a button an anchor or a span, typed as any for now because of complex js manipulation with styled components
   */
  ref?: React.Ref<any>;
}
type LinkElProps = Omit<HTMLProps<HTMLAnchorElement>, 'size'>;
type ButtonElProps = Omit<HTMLProps<HTMLButtonElement>, 'size'>;

export type AnchorProps = BaseProps & LinkElProps & ButtonElProps;

type ReturnType = ReactElement<any, any> | null;

const baseStyles = ({ theme }: StyleProps) => css`
  display: inline-block;
  text-decoration: underline;
  text-decoration-skip-ink: auto;
  border: 0;
  outline: none;
  background: none;
  padding: 0;
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  color: ${theme.colors.p700};

  &:hover,
  &:active {
    color: ${theme.colors.p900};
    cursor: pointer;
  }

  &:visited {
    color: ${theme.colors.v700};

    &:hover,
    &:active {
      color: ${theme.colors.v900};
    }
  }

  &:focus {
    ${focusOutline({ theme })};
    border-radius: ${theme.borderRadius.giga};
  }
`;

const BaseAnchor = styled(Text)<AnchorProps>(baseStyles);

function AnchorComponent(props: AnchorProps, ref?: React.Ref<any>): ReturnType {
  const { Link } = useComponents();
  const AnchorLink = BaseAnchor.withComponent(Link);

  if (!props.href && !props.onClick) {
    return <Text as="span" {...props} ref={ref} />;
  }

  if (props.href) {
    // typing issues with with
    return <AnchorLink {...props} ref={ref as React.Ref<any>} />;
  }

  return <BaseAnchor as="button" {...props} ref={ref as React.Ref<any>} />;
}

/**
 * The Anchor is used to display a link or button that visually looks like
 * a hyperlink. Based on the Text component, so it also supports its props.
 */
export const Anchor = React.forwardRef(AnchorComponent);
