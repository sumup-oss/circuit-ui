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

import { Ref, forwardRef, HTMLAttributes, ButtonHTMLAttributes } from 'react';
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import { ClickEvent } from '../../types/events';
import styled, { StyleProps } from '../../styles/styled';
import { typography, focusVisible } from '../../styles/style-mixins';
import CloseButton, { CloseButtonProps } from '../CloseButton';
import { AccessibilityError } from '../../util/errors';

type BaseProps = {
  /**
   * Render prop that should render a leading-aligned icon or element.
   */
  prefix?: ({ className }: { className?: string }) => JSX.Element;
  /**
   * Render prop that should render a trailing-aligned icon or element.
   */
  suffix?: ({ className }: { className?: string }) => JSX.Element;
  /**
   * Triggers selected styles on the tag.
   */
  selected?: boolean;
  /**
   * Function that's called when the button is clicked.
   */
  onClick?: (event: ClickEvent) => void;
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
      onRemove: (event: ClickEvent) => void;
      /**
       * Text label for the remove icon for screen readers.
       * Important for accessibility.
       */
      removeButtonLabel: string;
    }
  | { onRemove?: never; removeButtonLabel?: never };

type DivElProps = Omit<HTMLAttributes<HTMLDivElement>, 'onClick'>;
type ButtonElProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

export type TagProps = BaseProps & RemoveProps & DivElProps & ButtonElProps;

const BORDER_WIDTH = '1px';

type TagElProps = Omit<TagProps, 'prefix' | 'suffix' | 'removeButtonLabel'> & {
  removable: boolean;
};

const tagBaseStyles = ({ theme }: StyleProps) => css`
  display: inline-flex;
  align-items: center;
  margin: 0;
  word-break: break-word;
  border: ${BORDER_WIDTH} solid var(--cui-border-normal);
  border-radius: ${theme.borderRadius.byte};
  padding: calc(${theme.spacings.bit} - 1px) ${theme.spacings.kilo};
  cursor: default;
  background-color: var(--cui-bg-normal);
  transition: opacity ${theme.transitions.default},
    color ${theme.transitions.default},
    background-color ${theme.transitions.default},
    border-color ${theme.transitions.default};
`;

const tagRemovableStyles = ({ theme, removable }: StyleProps & TagElProps) =>
  removable &&
  css`
    padding-right: calc(${theme.spacings.bit} + ${theme.spacings.tera});
  `;

const tagClickableStyles = ({ onClick }: TagElProps) =>
  onClick &&
  css`
    cursor: pointer;
    outline: 0;
    text-align: left;

    &:hover {
      color: var(--cui-fg-normal-hovered);
      background-color: var(--cui-bg-normal-hovered);
      border-color: var(--cui-border-normal-hovered);
    }

    &:active {
      color: var(--cui-fg-normal-pressed);
      background-color: var(--cui-bg-normal-pressed);
      border-color: var(--cui-border-normal-pressed);
    }

    ${focusVisible()};
  `;

const tagSelectedStyles = ({ selected }: TagElProps) =>
  selected &&
  css`
    background-color: var(--cui-bg-accent-strong);
    border-color: var(--cui-border-accent);
    color: var(--cui-fg-on-strong);
  `;

const tagSelectedClickableStyles = ({ selected, onClick }: TagElProps) =>
  selected &&
  onClick &&
  css`
    &:hover {
      color: var(--cui-fg-on-strong-hovered);
      background-color: var(--cui-bg-accent-strong-hovered);
      border-color: var(--cui-border-accent-hovered);
    }

    &:active {
      color: var(--cui-fg-on-strong-pressed);
      background-color: var(--cui-bg-accent-strong-pressed);
      border-color: var(--cui-border-accent-pressed);
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
  flex-shrink: 0;
  margin-left: -${theme.spacings.bit};
  margin-right: ${theme.spacings.bit};
`;

const suffixStyles = (theme: Theme) => css`
  flex-shrink: 0;
  margin-left: ${theme.spacings.bit};
  margin-right: -${theme.spacings.bit};
`;

const closeButtonStyles = ({ theme }: StyleProps) => css`
  position: absolute;
  top: 50%;
  right: ${BORDER_WIDTH};
  transform: translateY(-50%);
  border-radius: ${theme.borderRadius.byte};
  border: 0;
`;

const RemoveButton = styled(CloseButton)<CloseButtonProps>(closeButtonStyles);

const Container = styled.div`
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
      className,
      style,
      ...props
    }: TagProps,
    ref: BaseProps['ref'],
  ) => {
    if (
      process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      onRemove &&
      !removeButtonLabel
    ) {
      throw new AccessibilityError(
        'Tag',
        'The `removeButtonLabel` prop is missing. Omit the `onRemove` prop if you intend to disable the tag removing functionality.',
      );
    }
    const as = onClick ? 'button' : 'div';

    return (
      <Container className={className} style={style}>
        <TagElement
          removable={Boolean(onRemove)}
          selected={selected}
          type={onClick && 'button'}
          onClick={onClick}
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
            label={removeButtonLabel}
            data-testid="tag-close"
            size="kilo"
            onClick={onRemove}
          />
        )}
      </Container>
    );
  },
);

Tag.displayName = 'Tag';
