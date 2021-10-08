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

import {
  ReactNode,
  forwardRef,
  Ref,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  HTMLAttributes,
  FC,
} from 'react';
import { css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';
import { ChevronRight, IconProps } from '@sumup/icons';

import styled, { StyleProps } from '../../styles/styled';
import { disableVisually, focusVisible } from '../../styles/style-mixins';
import { ReturnType } from '../../types/return-type';
import { ClickEvent } from '../../types/events';
import { AsPropType } from '../../types/prop-types';
import { isFunction } from '../../util/type-check';
import { warn } from '../../util/logger';
import { useComponents } from '../ComponentsContext';
import { useClickEvent, TrackingProps } from '../../hooks/useClickEvent';

type Variant = 'action' | 'navigation';

interface BaseProps {
  /**
   * Choose between 'action' and 'navigation' variant.
   * The `navigation` variant renders a chevron in the trailing section.
   */
  variant: Variant;
  /**
   * Display a leading icon, status image, checkbox, etc. in addition to the text content.
   */
  prefix?: FC<IconProps> | ReactNode;
  /**
   * Display a main label for this list item.
   */
  label: ReactNode;
  /**
   * Display a details line below the main label for this list item.
   */
  details?: ReactNode;
  /**
   * Display a trailing label this list item.
   * If using the 'navigation' variant, the chevron icon will be center aligned with this label.
   */
  suffixLabel?: ReactNode;
  /**
   * Display a trailing details label for this list item.
   */
  suffixDetails?: ReactNode;
  /**
   * Display a custom trailing component for this list item.
   * If using the 'navigation' variant, the chevron icon will be center aligned with this component.
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
   * Function that's called when the list item is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLDivElement & HTMLAnchorElement & HTMLButtonElement>;
}

type DivElProps = Omit<HTMLAttributes<HTMLDivElement>, 'prefix' | 'onClick'>;
type LinkElProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'prefix' | 'onClick'
>;
type ButtonElProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'prefix' | 'onClick'
>;

export type ListItemProps = BaseProps &
  DivElProps &
  LinkElProps &
  ButtonElProps;

type InteractiveProps = { isInteractive: boolean };

type StyledListItemProps = Pick<BaseProps, 'selected'> &
  InteractiveProps &
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
  margin: 0;
  width: 100%;
  text-align: left;
  text-decoration: none;
  position: relative;

  &:focus {
    border-color: transparent;
    z-index: 2;
  }

  &:focus:not(:focus-visible) {
    border-color: ${theme.colors.n200};
    z-index: auto;
  }

  &:disabled,
  &[disabled] {
    ${disableVisually()};
  }
`;

const interactiveStyles = ({
  theme,
  isInteractive,
}: StyleProps & StyledListItemProps) =>
  isInteractive &&
  css`
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.n100};
    }

    &:active {
      background-color: ${theme.colors.n200};
      border-color: ${theme.colors.n200};
    }
  `;

const selectedStyles = ({
  theme,
  selected,
}: StyleProps & StyledListItemProps) =>
  selected &&
  css`
    background-color: ${theme.colors.b100};

    &:hover,
    &:active {
      background-color: ${theme.colors.b100};
    }

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

const StyledListItem = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'label',
})<StyledListItemProps>(
  focusVisible,
  baseStyles,
  interactiveStyles,
  selectedStyles,
);

const prefixContainerStyles = ({ theme }: StyleProps) => css`
  flex: none;
  display: flex;
  margin-right: ${theme.spacings.mega};
`;

const PrefixContainer = styled.div(prefixContainerStyles);

const contentContainerStyles = css`
  flex: auto;
  display: flex;
  align-items: center;
  min-width: 0;
`;

const ContentContainer = styled.div(contentContainerStyles);

const mainContainerStyles = css`
  flex: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
`;

const MainContainer = styled.div(mainContainerStyles);

type NavigationProps = { isNavigation: boolean };

type SuffixContainerProps = { hasLabel: boolean } & NavigationProps;

const suffixContainerStyles = ({
  theme,
  hasLabel,
}: StyleProps & SuffixContainerProps) => css`
  flex: none;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: ${hasLabel ? 'flex-start' : 'center'};
  margin-left: ${theme.spacings.mega};
`;

const suffixContainerNavigationStyles = ({
  theme,
  isNavigation,
}: StyleProps & SuffixContainerProps) =>
  isNavigation &&
  css`
    margin-right: -${theme.spacings.bit};
  `;

const SuffixContainer = styled.div(
  suffixContainerStyles,
  suffixContainerNavigationStyles,
);

const suffixChevronContainerStyles = css`
  display: flex;
  align-items: center;
`;

const SuffixChevronContainer = styled.div(suffixChevronContainerStyles);

const suffixDetailsContainerStyles = ({
  theme,
  isNavigation,
}: StyleProps & NavigationProps) =>
  isNavigation &&
  css`
    margin-right: ${theme.spacings.mega};
  `;

const SuffixDetailsContainer = styled.div(suffixDetailsContainerStyles);

/**
 * The ListItem component enables the user to render a list item with various
 * textual and visual elements.
 */
export const ListItem = forwardRef(
  (
    {
      variant,
      prefix: Prefix,
      label,
      details,
      suffixLabel,
      suffixDetails,
      suffix,
      tracking,
      ...props
    }: ListItemProps,
    ref?: BaseProps['ref'],
  ): ReturnType => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      // TODO: Print warning only once similar to `deprecate`
      if (suffixDetails && !suffixLabel) {
        warn(
          'ListItem',
          'Using `suffixDetails` without `suffixLabel` is not supported.',
        );
      }
      if (suffixLabel && suffix) {
        warn(
          'ListItem',
          'Using `suffixLabel` and `suffix` at the same time is not supported.',
        );
      }
    }

    const components = useComponents();
    let as: AsPropType = 'div';
    if (props.href) {
      as = components.Link as AsPropType;
    } else if (props.onClick) {
      as = 'button';
    }

    const handleClick = useClickEvent(props.onClick, tracking, 'ListItem');

    const isInteractive = !!props.href || !!props.onClick;
    const isNavigation = variant === 'navigation';
    const hasSuffix = !!suffixLabel || !!suffix;
    const shouldRenderSuffixContainer = hasSuffix || isNavigation;

    return (
      <StyledListItem
        {...props}
        ref={ref}
        as={as}
        isInteractive={isInteractive}
        onClick={handleClick}
      >
        {Prefix && (
          <PrefixContainer>
            {isFunction(Prefix) ? (
              <Prefix size="24" role="presentation" />
            ) : (
              Prefix
            )}
          </PrefixContainer>
        )}
        <ContentContainer>
          <MainContainer>
            {label}
            {details}
          </MainContainer>
          {shouldRenderSuffixContainer && (
            <SuffixContainer
              hasLabel={!!suffixLabel}
              isNavigation={isNavigation}
            >
              <SuffixChevronContainer>
                {suffixLabel}
                {suffix}
                {isNavigation && <ChevronRight size="16" role="presentation" />}
              </SuffixChevronContainer>
              <SuffixDetailsContainer isNavigation={isNavigation}>
                {suffixDetails}
              </SuffixDetailsContainer>
            </SuffixContainer>
          )}
        </ContentContainer>
      </StyledListItem>
    );
  },
);

ListItem.displayName = 'ListItem';
