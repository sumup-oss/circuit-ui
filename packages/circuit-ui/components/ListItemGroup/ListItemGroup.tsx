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

import { forwardRef, Ref, HTMLAttributes, ReactNode } from 'react';
import { css } from '@emotion/react';
import { some } from 'lodash/fp';

import styled, { StyleProps } from '../../styles/styled';
import { ReturnType } from '../../types/return-type';
import ListItem, { ListItemProps } from '../ListItem';

type Variant = 'plain' | 'inset';

export type ItemProps = ListItemProps & { key: string | number };

interface BaseProps {
  /**
   * Choose between 'inset' (outer border and dividers) and 'plain' (only dividers) variant.
   * Default: 'inset'.
   */
  variant?: Variant;
  /**
   * List of ListItem props objects to render as a group.
   */
  items: ItemProps[];
  /**
   * Display a label for this group of list items.
   */
  label?: ReactNode;
  /**
   * Display a secondary right-aligned label for this group of list items.
   */
  details?: ReactNode;
  /**
   The ref to the HTML DOM element
   */
  ref?: Ref<HTMLDivElement>;
}

export type ListItemGroupProps = BaseProps & HTMLAttributes<HTMLDivElement>;

const baseStyles = css`
  display: flex;
  flex-direction: column;
`;

const StyledListItemGroup = styled.div(baseStyles);

const headerContainerStyles = ({ theme }: StyleProps) => css`
  flex: none;
  display: flex;
  align-items: flex-end;
  margin: 0 ${theme.spacings.mega} ${theme.spacings.byte};
`;

const headerContainerPlainStyles = ({
  theme,
  isPlain,
}: StyleProps & PlainProps) =>
  isPlain &&
  css`
    margin: 0 calc(${theme.spacings.mega} - ${theme.borderWidth.mega})
      ${theme.spacings.byte};
  `;

const HeaderContainer = styled.div(
  headerContainerStyles,
  headerContainerPlainStyles,
);

const labelContainerStyles = css`
  flex: auto;
  min-width: 0;
`;

const LabelContainer = styled.div(labelContainerStyles);

const detailsContainerStyles = ({ theme }: StyleProps) => css`
  flex: none;
  margin-left: ${theme.spacings.mega};
`;

const DetailsContainer = styled.div(detailsContainerStyles);

type PlainProps = { isPlain: boolean };

const itemsContainerBaseStyles = ({ theme }: StyleProps) => css`
  flex: auto;
  display: flex;
  flex-direction: column;
  border: ${theme.borderWidth.mega} solid ${theme.colors.n200};
  border-radius: ${theme.borderRadius.mega};
`;

const itemsContainerPlainStyles = ({
  theme,
  isPlain,
}: StyleProps & PlainProps) =>
  isPlain &&
  css`
    border-width: ${theme.borderWidth.kilo} 0;
    border-radius: 0;
  `;

const ItemsContainer = styled.div(
  itemsContainerBaseStyles,
  itemsContainerPlainStyles,
);

type InteractiveProps = { isInteractive: boolean };

type StyledListItemProps = ListItemProps & PlainProps & InteractiveProps;

const listItemStyles = ({ theme }: StyleProps) => css`
  border: none;
  border-radius: calc(${theme.borderRadius.mega} - ${theme.borderWidth.mega});

  &:not(:first-of-type) > div:last-of-type {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: -${theme.spacings.kilo};
      left: 0;
      right: -${theme.spacings.mega};
      border-top: ${theme.borderWidth.kilo} solid ${theme.colors.n200};
    }
  }
`;

const listItemInteractiveStyles = ({ isInteractive }: StyledListItemProps) =>
  isInteractive &&
  css`
    &:hover,
    &:active,
    &:focus {
      &,
      & + * {
        &:not(:first-of-type) > div:last-of-type:before {
          border-top-width: 0;
        }
      }
    }
  `;

const listItemSelectedStyles = ({
  theme,
  selected,
}: StyleProps & StyledListItemProps) =>
  selected
    ? css`
        &,
        & + * {
          &:not(:first-of-type) > div:last-of-type:before {
            border-top-width: 0;
          }
        }
      `
    : css`
        &:not(:hover):not(:active) {
          &:focus:not(:focus-visible),
          &:focus:not(:focus-visible) + * {
            &:not(:first-of-type) > div:last-of-type:before {
              border-top-width: ${theme.borderWidth.kilo};
            }
          }
        }
      `;

const listItemPlainStyles = ({
  theme,
  isPlain,
  selected,
}: StyleProps & StyledListItemProps) =>
  isPlain &&
  selected &&
  css`
    &:after {
      top: -${theme.borderWidth.kilo};
      bottom: -${theme.borderWidth.kilo};
      left: 0;
      right: 0;
    }
  `;

const StyledListItem = styled(ListItem)(
  listItemStyles,
  listItemInteractiveStyles,
  listItemSelectedStyles,
  listItemPlainStyles,
);

/**
 * The ListItemGroup component enables the user to render a named list of ListItem components.
 */
export const ListItemGroup = forwardRef(
  (
    { variant = 'inset', items, label, details, ...props }: ListItemGroupProps,
    ref?: BaseProps['ref'],
  ): ReturnType => {
    const isPlain = variant === 'plain';
    const isInteractive = some((item) => !!item.href || !!item.onClick, items);
    return (
      <StyledListItemGroup {...props} ref={ref}>
        {(label || details) && (
          <HeaderContainer isPlain={isPlain}>
            {label && <LabelContainer>{label}</LabelContainer>}
            {details && <DetailsContainer>{details}</DetailsContainer>}
          </HeaderContainer>
        )}
        <ItemsContainer
          isPlain={isPlain}
          role={isInteractive ? 'listbox' : 'list'}
        >
          {items.map(({ key, ...item }) => (
            <StyledListItem
              key={key}
              {...item}
              isPlain={isPlain}
              isInteractive={isInteractive}
              role={isInteractive ? 'option' : 'listitem'}
              aria-selected={
                !isInteractive || item.disabled ? undefined : item.selected
              }
            />
          ))}
        </ItemsContainer>
      </StyledListItemGroup>
    );
  },
);

ListItemGroup.displayName = 'ListItemGroup';
