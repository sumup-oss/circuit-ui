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
import { ChevronRight, IconProps } from '@sumup/icons';

import isPropValid from '../../styles/is-prop-valid.js';
import styled, { StyleProps } from '../../styles/styled.js';
import { focusVisible, spacing } from '../../styles/style-mixins.js';
import { ReturnType } from '../../types/return-type.js';
import { ClickEvent } from '../../types/events.js';
import { EmotionAsPropType } from '../../types/prop-types.js';
import { isFunction, isString } from '../../util/type-check.js';
import { CircuitError } from '../../util/errors.js';
import { useComponents } from '../ComponentsContext/index.js';
import Body from '../Body/index.js';

type Variant = 'action' | 'navigation';

interface BaseProps {
  /**
   * Choose between 'action' and 'navigation' variant. Default: 'action'.
   * The `navigation` variant renders a chevron in the trailing section.
   */
  variant?: Variant;
  /**
   * Display a leading component.
   * Pass an icon from `@sumup/icons` or a custom component.
   */
  leadingComponent?: FC<IconProps> | ReactNode;
  /**
   * Display a main label.
   */
  label: ReactNode;
  /**
   * Display a details line below the main label.
   */
  details?: ReactNode;
  /**
   * Display a trailing label.
   * If using the `navigation` variant, the chevron icon will be center aligned with this label.
   */
  trailingLabel?: string | ReactNode;
  /**
   * Display a trailing details label.
   */
  trailingDetails?: string | ReactNode;
  /**
   * Display a custom trailing component.
   * If using the `navigation` variant, the chevron icon will be center aligned with this component.
   */
  trailingComponent?: ReactNode;
  /**
   * Visually mark the list item as selected.
   */
  selected?: boolean;
  /**
   * Visually and functionally disable the list item.
   */
  disabled?: boolean;
  /**
   * Function that is called when the list item is clicked.
   */
  onClick?: (event: ClickEvent) => void;
  /**
   * Link to another part of the application or external page.
   */
  href?: string;
  /**
   * The ref to the HTML DOM element
   */
  ref?: Ref<HTMLDivElement & HTMLAnchorElement & HTMLButtonElement>;
}

type DivElProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;
type LinkElProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

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
  background-color: var(--cui-bg-normal);
  color: var(--cui-fg-normal);
  border: ${theme.borderWidth.mega} solid var(--cui-border-subtle);
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
    border-color: var(--cui-border-subtle);
    z-index: auto;
  }

  &:disabled,
  &[disabled] {
    pointer-events: none;
    background-color: var(--cui-bg-normal-disabled);
    border-color: var(--cui-border-subtle-disabled);
    color: var(--cui-fg-normal-disabled);
  }
`;

const interactiveStyles = ({ isInteractive }: StyledListItemProps) =>
  isInteractive &&
  css`
    cursor: pointer;

    &:hover {
      background-color: var(--cui-bg-normal-hovered);
      border-color: var(--cui-border-subtle-hovered);
      color: var(--cui-fg-normal-hovered);
    }

    &:active {
      background-color: var(--cui-bg-normal-pressed);
      border-color: var(--cui-border-subtle-pressed);
      color: var(--cui-fg-normal-pressed);
    }
  `;

const selectedStyles = ({
  theme,
  selected,
}: StyleProps & StyledListItemProps) =>
  selected &&
  css`
    background-color: var(--cui-bg-accent);

    &:hover,
    &:active {
      background-color: var(--cui-bg-accent);
    }

    &:after {
      content: '';
      position: absolute;
      top: -${theme.borderWidth.mega};
      bottom: -${theme.borderWidth.mega};
      left: -${theme.borderWidth.mega};
      right: -${theme.borderWidth.mega};
      border: ${theme.borderWidth.mega} solid var(--cui-border-accent);
      border-radius: ${theme.borderRadius.mega};
      z-index: 1;
      pointer-events: none;
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

const leadingContainerStyles = ({ theme }: StyleProps) => css`
  flex: none;
  display: flex;
  margin-right: ${theme.spacings.mega};
`;

const LeadingContainer = styled.div(leadingContainerStyles);

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

const labelStyles = css`
  max-width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Label = styled(Body)(labelStyles);

const detailsContainerStyles = ({ theme }: StyleProps) =>
  css`
    display: flex;
    align-items: center;
    max-width: 100%;
    min-height: ${theme.typography.body.one.lineHeight};
  `;

const DetailsContainer = styled.div(detailsContainerStyles);

type NavigationProps = { isNavigation: boolean };

type TrailingContainerProps = { hasLabel: boolean } & NavigationProps;

const trailingContainerStyles = ({
  theme,
  hasLabel,
}: StyleProps & TrailingContainerProps) => css`
  flex: none;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: ${hasLabel ? 'flex-start' : 'center'};
  margin-left: ${theme.spacings.mega};
`;

const trailingContainerNavigationStyles = ({
  theme,
  isNavigation,
}: StyleProps & TrailingContainerProps) =>
  isNavigation &&
  css`
    margin-right: -${theme.spacings.bit};
  `;

const TrailingContainer = styled.div(
  trailingContainerStyles,
  trailingContainerNavigationStyles,
);

const trailingChevronContainerStyles = css`
  display: flex;
  align-items: center;
`;

const TrailingChevronContainer = styled.div(trailingChevronContainerStyles);

const trailingDetailsContainerNavigationStyles = ({
  theme,
  isNavigation,
}: StyleProps & NavigationProps) =>
  isNavigation &&
  css`
    margin-right: calc(${theme.spacings.mega} + ${theme.spacings.bit});
    height: ${theme.typography.body.one.lineHeight};
  `;

const TrailingDetailsContainer = styled.div(
  detailsContainerStyles,
  trailingDetailsContainerNavigationStyles,
);

/**
 * The ListItem component enables the user to render a list item with various
 * textual and visual elements.
 */
export const ListItem = forwardRef(
  (
    {
      variant = 'action',
      leadingComponent: LeadingComponent,
      label,
      details,
      trailingLabel,
      trailingDetails,
      trailingComponent,
      ...props
    }: ListItemProps,
    ref?: BaseProps['ref'],
  ): ReturnType => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test'
    ) {
      if (trailingDetails && !trailingLabel) {
        throw new CircuitError(
          'ListItem',
          'Using `trailingDetails` without `trailingLabel` is not supported. Use a custom `trailingComponent` if necessary.',
        );
      }
      if (trailingComponent && trailingLabel) {
        throw new CircuitError(
          'ListItem',
          'Using `trailingLabel` and `trailingComponent` at the same time is not supported. Add a label to the custom `trailingComponent` if necessary.',
        );
      }
    }

    const { Link } = useComponents();
    let as: EmotionAsPropType = 'div';
    if (props.href) {
      as = Link as EmotionAsPropType;
    } else if (props.onClick) {
      as = 'button';
    }

    const isInteractive = !!props.href || !!props.onClick;
    const isNavigation = variant === 'navigation';
    const hasTrailing = !!trailingLabel || !!trailingComponent;
    const shouldRenderTrailingContainer = hasTrailing || isNavigation;

    return (
      <StyledListItem
        {...props}
        ref={ref}
        as={as}
        isInteractive={isInteractive}
      >
        {LeadingComponent && (
          <LeadingContainer>
            {isFunction(LeadingComponent) ? (
              <LeadingComponent size="24" role="presentation" />
            ) : (
              LeadingComponent
            )}
          </LeadingContainer>
        )}
        <ContentContainer>
          <MainContainer>
            {isString(label) ? <Label size="one">{label}</Label> : label}
            {details && (
              <DetailsContainer>
                {isString(details) ? (
                  <Body size="two" variant="subtle">
                    {details}
                  </Body>
                ) : (
                  details
                )}
              </DetailsContainer>
            )}
          </MainContainer>
          {shouldRenderTrailingContainer && (
            <TrailingContainer
              hasLabel={!!trailingLabel}
              isNavigation={isNavigation}
            >
              <TrailingChevronContainer>
                {isString(trailingLabel) ? (
                  <Body size="one" variant="highlight">
                    {trailingLabel}
                  </Body>
                ) : (
                  trailingLabel
                )}
                {trailingComponent}
                {isNavigation && (
                  <ChevronRight
                    size="16"
                    role="presentation"
                    css={hasTrailing && spacing({ left: 'bit' })}
                  />
                )}
              </TrailingChevronContainer>
              {trailingDetails && (
                <TrailingDetailsContainer isNavigation={isNavigation}>
                  {isString(trailingDetails) ? (
                    <Body size="two" variant="subtle">
                      {trailingDetails}
                    </Body>
                  ) : (
                    trailingDetails
                  )}
                </TrailingDetailsContainer>
              )}
            </TrailingContainer>
          )}
        </ContentContainer>
      </StyledListItem>
    );
  },
);

ListItem.displayName = 'ListItem';
