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

import {
  HTMLProps,
  Ref,
  FC,
  SVGProps,
  MouseEvent,
  KeyboardEvent,
  forwardRef,
} from 'react';
import { css } from '@emotion/core';
import { Dispatch as TrackingProps } from '@sumup/collector';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import { typography, focusVisible } from '../../styles/style-mixins';
import { useClickHandler } from '../../hooks/useClickHandler';
import { CloseButton, CloseButtonProps } from '../CloseButton/CloseButton';

type BaseProps = {
  /**
   * Render prop that should render a leading-aligned icon or element.
   */
  prefix?: FC<SVGProps<SVGSVGElement>>;
  /**
   * Render prop that should render a trailing-aligned icon or element.
   */
  suffix?: FC<SVGProps<SVGSVGElement>>;
  /**
   * Triggers selected styles on the tag.
   */
  selected?: boolean;
  /**
   * Function that's called when the button is clicked.
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Additional data that is dispatched with the tracking event.
   */
  tracking?: TrackingProps;
  /**
   *  The ref to the DOM element
   */
  ref?: Ref<HTMLDivElement & HTMLButtonElement>;
};

type RemoveProps =
  | {
      /**
       * Renders a close button inside the tag and calls the provided function
       * when the button is clicked.
       */
      onRemove: (event: MouseEvent | KeyboardEvent) => void;
      /**
       * Text label for the remove icon for screen readers.
       * Important for accessibility.
       */
      removeButtonLabel: string;
    }
  | { onRemove?: never; removeButtonLabel?: never };

type DivElProps = Omit<HTMLProps<HTMLDivElement>, 'prefix' | 'onClick'>;
type ButtonElProps = Omit<HTMLProps<HTMLButtonElement>, 'prefix' | 'onClick'>;

export type TagProps = BaseProps & RemoveProps & DivElProps & ButtonElProps;

const BORDER_WIDTH = '1px';

type TagElProps = Omit<TagProps, 'prefix' | 'suffix' | 'removeButtonLabel'> & {
  removable: boolean;
};

const tagBaseStyles = ({ theme }: StyleProps) => css`
  label: tag;
  display: inline-flex;
  align-items: center;
  margin: 0;
  word-break: break-word;
  border: ${BORDER_WIDTH} solid ${theme.colors.n300};
  border-radius: ${theme.borderRadius.byte};
  padding: calc(${theme.spacings.bit} - 1px) ${theme.spacings.kilo};
  cursor: default;
  background-color: ${theme.colors.white};
  transition: opacity ${theme.transitions.default},
    color ${theme.transitions.default},
    background-color ${theme.transitions.default},
    border-color ${theme.transitions.default};
`;

const tagRemovableStyles = ({ theme, removable }: StyleProps & TagElProps) =>
  removable &&
  css`
    label: tag--removable;
    padding-right: calc(${theme.spacings.bit} + ${theme.spacings.tera});
  `;

const tagClickableStyles = ({ theme, onClick }: StyleProps & TagElProps) =>
  onClick &&
  css`
    label: tag--clickable;
    cursor: pointer;
    outline: 0;
    text-align: left;

    &:active {
      color: ${theme.colors.bodyColor};
    }

    &:hover {
      background-color: ${theme.colors.n200};
      border-color: ${theme.colors.n500};
    }

    ${focusVisible(theme)};
  `;

const tagSelectedStyles = ({ theme, selected }: StyleProps & TagElProps) =>
  selected &&
  css`
    label: tag--selected;
    background-color: ${theme.colors.p500};
    border-color: ${theme.colors.p700};
    color: ${theme.colors.white};
  `;

const tagSelectedClickableStyles = ({
  theme,
  selected,
  onClick,
}: StyleProps & TagElProps) =>
  selected &&
  onClick &&
  css`
    label: tag--selected--clickable;

    &:active {
      color: ${theme.colors.white};
    }

    &:hover {
      background-color: ${theme.colors.p700};
      border-color: ${theme.colors.p700};
    }
  `;

const TagElement = styled('div')<TagElProps>(
  typography('one'),
  tagBaseStyles,
  tagRemovableStyles,
  tagClickableStyles,
  tagSelectedStyles,
  tagSelectedClickableStyles,
);

const prefixStyles = (theme: Theme) => css`
  label: tag__prefix;
  flex-shrink: 0;
  margin-left: -${theme.spacings.bit};
  margin-right: ${theme.spacings.bit};
`;

const suffixStyles = (theme: Theme) => css`
  label: tag__suffix;
  flex-shrink: 0;
  margin-left: ${theme.spacings.bit};
  margin-right: -${theme.spacings.bit};
`;

const closeButtonStyles = ({ theme }: StyleProps) => css`
  label: tag__close-button;
  position: absolute;
  top: 50%;
  right: ${BORDER_WIDTH};
  transform: translateY(-50%);
  border-radius: ${theme.borderRadius.byte};
`;

const RemoveButton = styled(CloseButton)<CloseButtonProps>(closeButtonStyles);

const Container = styled.div`
  label: tag__container;
  position: relative;
`;

export const Tag = forwardRef(
  (
    {
      children,
      prefix: Prefix,
      suffix: Suffix,
      onRemove,
      removeButtonLabel,
      selected,
      onClick,
      tracking,
      className,
      style,
      ...props
    }: TagProps,
    ref: BaseProps['ref'],
  ) => {
    const as = onClick ? 'button' : 'div';
    const handleClick = useClickHandler<MouseEvent | KeyboardEvent>(
      onClick,
      tracking,
      'tag',
    );

    return (
      <Container className={className} style={style}>
        <TagElement
          removable={Boolean(onRemove)}
          selected={selected}
          onClick={handleClick}
          type={onClick && 'button'}
          as={as}
          ref={ref}
          {...props}
        >
          {Prefix && <Prefix css={prefixStyles} />}

          {children}

          {Suffix && <Suffix css={suffixStyles} />}
        </TagElement>

        {onRemove && removeButtonLabel && (
          <RemoveButton
            type="button"
            variant={selected ? 'primary' : 'secondary'}
            selected={selected}
            label={removeButtonLabel}
            data-testid="tag-close"
            size="kilo"
            onClick={onRemove}
            tracking={{
              component: 'tag-remove',
              ...tracking,
            }}
          />
        )}
      </Container>
    );
  },
);

Tag.displayName = 'Tag';
