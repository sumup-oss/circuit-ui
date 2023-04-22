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

import {
  forwardRef,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from 'react';
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import { focusVisible } from '../../styles/style-mixins';
import { ReturnType } from '../../types/return-type';
import { ClickEvent } from '../../types/events';
import { AsPropType } from '../../types/prop-types';
import { Body, BodyProps } from '../Body/Body';
import { useComponents } from '../ComponentsContext';

export interface BaseProps extends BodyProps {
  children: ReactNode;
  /**
   * Function that's called when the button is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * The ref to the HTML DOM element, it can be a button an anchor or a span, typed as any for now because of complex js manipulation with styled components
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: Ref<any>;
}
type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type AnchorProps = BaseProps & LinkElProps & ButtonElProps;

const anchorStyles = (theme: Theme) => css`
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
  color: var(--cui-fg-accent);
  border-radius: ${theme.borderRadius.byte};
  transition: opacity ${theme.transitions.default},
    color ${theme.transitions.default},
    background-color ${theme.transitions.default},
    border-color ${theme.transitions.default};

  &:hover {
    color: var(--cui-fg-accent-hovered);
    cursor: pointer;
  }

  &:active {
    color: var(--cui-fg-accent-pressed);
  }

  ${focusVisible()};
`;

/**
 * The Anchor is used to display a link or button that visually looks like
 * a hyperlink. Based on the Body component, so it also supports its props.
 */
export const Anchor = forwardRef(
  (props: AnchorProps, ref?: BaseProps['ref']): ReturnType => {
    const components = useComponents();
    const Link = components.Link as AsPropType;

    if (!props.href && !props.onClick) {
      return <Body as="span" {...props} ref={ref} />;
    }

    if (props.href) {
      return <Body {...props} css={anchorStyles} as={Link} ref={ref} />;
    }

    return <Body as="button" {...props} css={anchorStyles} ref={ref} />;
  },
);

Anchor.displayName = 'Anchor';
