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

import { ReactNode, forwardRef, Ref, HTMLProps, FC } from 'react';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import { ChevronRight, IconProps } from '@sumup/icons';
import { Dispatch as TrackingProps } from '@sumup/collector';

import styled, { StyleProps } from '../../styles/styled';
import { disableVisually, focusVisible } from '../../styles/style-mixins';
import { ReturnType } from '../../types/return-type';
import { ClickEvent } from '../../types/events';
import { isFunction } from '../../util/type-check';
import { useComponents } from '../ComponentsContext';
import { useClickEvent } from '../../hooks/useClickEvent';

type Variant = 'action' | 'navigation';

interface BaseProps {
  /**
   * Choose between 'action' and 'navigation' variant.
   * Default: 'navigation' if 'href' prop is present, otherwise 'action'.
   */
  variant?: Variant;
  /**
   * Display a leading icon or status image in addition to the text to help to identify the type or status.
   */
  icon?: FC<IconProps> | ReactNode;
  /**
   * Display a main label for this list item.
   */
  label: ReactNode;
  /**
   * Display a status line for this list item.
   */
  status?: ReactNode;
  /**
   * Display a trailing label or action for this list item.
   * An additional chevron icon will be rendered when using the 'navigation' variant.
   */
  suffix?: ReactNode;
  /**
   * Visually mark the list item as selected.
   */
  selected?: boolean;
  /**
   * Visually and functionally disable the list item.
   */
  disabled?: boolean;
  /**
   * Visually highlight the list item.
   */
  highlighted?: boolean;
  /**
   * Function that's called when the list item is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   The ref to the HTML DOM element
   */
  ref?: Ref<HTMLDivElement & HTMLAnchorElement & HTMLButtonElement>;
}

type DivElProps = Omit<
  HTMLProps<HTMLDivElement>,
  'label' | 'suffix' | 'onClick'
>;
type LinkElProps = Omit<
  HTMLProps<HTMLAnchorElement>,
  'label' | 'suffix' | 'onClick'
>;
type ButtonElProps = Omit<
  HTMLProps<HTMLButtonElement>,
  'label' | 'suffix' | 'onClick'
>;

type RootProps = Pick<BaseProps, 'selected' | 'highlighted'> &
  DivElProps &
  LinkElProps &
  ButtonElProps & { as: string };

export type ListItemProps = BaseProps &
  DivElProps &
  LinkElProps &
  ButtonElProps;

const baseStyles = ({ theme }: StyleProps) => css`
  background-color: ${theme.colors.white};
  color: ${theme.colors.bodyColor};
  border: ${theme.borderWidth.mega} solid ${theme.colors.n200};
  border-radius: ${theme.borderRadius.mega};
  display: flex;
  align-items: center;
  padding: ${theme.spacings.kilo} ${theme.spacings.mega};
  width: 100%;
  text-align: left;
  text-decoration: none;
  position: relative;

  &:focus-visible {
    border-color: transparent;
    z-index: 2;
  }

  &:disabled,
  &[disabled] {
    ${disableVisually()};
  }
`;

const interactiveStyles = ({ theme, as }: StyleProps & RootProps) =>
  as !== 'div' &&
  css`
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.n200};
    }

    &:active {
      background-color: ${theme.colors.n300};
      border-color: ${theme.colors.n300};
    }
  `;

const selectedStyles = ({ theme, selected }: StyleProps & RootProps) =>
  selected &&
  css`
    background-color: ${theme.colors.b100};

    &:after {
      content: '';
      position: absolute;
      top: -${theme.borderWidth.mega};
      bottom: -${theme.borderWidth.mega};
      left: -${theme.borderWidth.mega};
      right: -${theme.borderWidth.mega};
      border: ${theme.borderWidth.mega} solid ${theme.colors.b500};
      border-radius: ${theme.borderRadius.mega};
      z-index: 1;
    }
  `;

const highlightedStyles = ({ theme, highlighted }: StyleProps & RootProps) =>
  highlighted &&
  css`
    background-color: ${theme.colors.b100};
  `;

const StyledListItem = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'label',
})(
  focusVisible,
  baseStyles,
  interactiveStyles,
  selectedStyles,
  highlightedStyles,
);

const iconContainerStyles = ({ theme }: StyleProps) => css`
  flex: none;
  display: flex;
  margin-right: ${theme.spacings.mega};
`;

const IconContainer = styled.div(iconContainerStyles);

const contentContainerStyles = css`
  flex: auto;
  display: flex;
`;

const ContentContainer = styled.div(contentContainerStyles);

const mainContainerStyles = css`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MainContainer = styled.div(mainContainerStyles);

const suffixContainerStyles = ({
  theme,
  justify,
}: StyleProps & { justify: string }) => css`
  flex: none;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: ${justify};
  margin-left: ${theme.spacings.mega};
`;

const SuffixContainer = styled.div(suffixContainerStyles);

/**
 * The ListItem component enables the user to render a list item with various
 * textual and visual elements.
 */
export const ListItem = forwardRef(
  (
    {
      variant: variantOverride,
      icon: Icon,
      label,
      status,
      suffix,
      selected,
      tracking,
      ...props
    }: ListItemProps,
    ref?: BaseProps['ref'],
  ): ReturnType => {
    const components = useComponents();

    let variant = variantOverride || 'action';
    let as = 'div';
    if (props.href) {
      variant = variantOverride || 'navigation';
      // Need to typecast here because the styled component types restrict the
      // `as` prop to a string. It's safe to ignore that constraint here.
      const Link = (components.Link as unknown) as string;
      as = Link;
    } else if (props.onClick) {
      as = 'button';
    }

    const handleClick = useClickEvent(props.onClick, tracking, 'ListItem');

    const isNavigation = variant === 'navigation';
    const shouldRenderSuffixContainer = !!suffix || isNavigation;

    return (
      <StyledListItem
        {...props}
        role="listitem"
        ref={ref}
        as={as}
        selected={selected}
        data-selected={selected}
        onClick={handleClick}
      >
        {Icon && (
          <IconContainer>
            {isFunction(Icon) ? (
              <Icon role="presentation" size="large" />
            ) : (
              Icon
            )}
          </IconContainer>
        )}
        <ContentContainer>
          <MainContainer>
            {label}
            {status}
          </MainContainer>
          {shouldRenderSuffixContainer && (
            <SuffixContainer justify={suffix ? 'space-between' : 'center'}>
              {suffix}
              {isNavigation && <ChevronRight role="presentation" />}
            </SuffixContainer>
          )}
        </ContentContainer>
      </StyledListItem>
    );
  },
);

ListItem.displayName = 'ListItem';
