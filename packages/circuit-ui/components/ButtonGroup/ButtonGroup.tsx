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

import { ReactElement, Ref, forwardRef } from 'react';
import { css } from '@emotion/react';

import styled, { StyleProps } from '../../styles/styled';
import Button, { ButtonProps } from '../Button';

type Action = Omit<ButtonProps, 'variant'>;

export interface ButtonGroupProps {
  /**
   * @deprecated Use the `actions` prop instead.
   */
  children?:
    | (ReactElement<ButtonProps> | null | undefined)[]
    | ReactElement<ButtonProps>;
  /**
   * Direction to align the content. Either left/right
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Whether to display buttons inline on mobile.
   */
  inlineMobile?: boolean;
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLDivElement>;
  /**
   * Action Buttons
   */
  actions?: {
    primary: Action;
    secondary?: Action;
  };
}

const getInlineStyles = ({ theme }: StyleProps) => css`
  flex-wrap: wrap;
  > button,
  > a {
    width: auto;

    &:not(:last-child) {
      margin-right: ${theme.spacings.mega};
      margin-bottom: 0;
    }
  }
`;

const baseStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;

  > button,
  > a {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: ${theme.spacings.mega};
    }
  }

  ${theme.mq.kilo} {
    ${getInlineStyles({ theme })};
  }
`;

const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
} as const;

const alignmentStyles = ({ align = 'right' }: ButtonGroupProps) => css`
  justify-content: ${alignmentMap[align]};
`;

const inlineMobileStyles = ({
  theme,
  inlineMobile = false,
}: StyleProps & ButtonGroupProps) =>
  inlineMobile &&
  css`
    ${getInlineStyles({ theme })}
  `;

const actionWrapperStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${theme.mq.kilo} {
    flex-direction: row;
  }
`;

const actionAlignmentStyles = ({ align = 'center' }: ButtonGroupProps) => css`
  justify-content: ${alignmentMap[align]};
`;

const secondaryButtonStyles = ({ theme }: StyleProps) => css`
  margin-right: ${theme.spacings.mega};
  ${theme.mq.untilKilo} {
    display: none;
  }
`;

const SecondaryButton = styled(Button)<ButtonProps>(secondaryButtonStyles);

const tertiaryButtonStyles = ({ theme }: StyleProps) => css`
  margin-top: ${theme.spacings.mega};
  ${theme.mq.kilo} {
    display: none;
  }
`;

const TertiaryButton = styled(Button)<ButtonProps>(tertiaryButtonStyles);

const Wrapper = styled('div')<ButtonGroupProps>(
  baseStyles,
  alignmentStyles,
  inlineMobileStyles,
);

const ActionsWrapper = styled('div')<ButtonGroupProps>(
  actionWrapperStyles,
  actionAlignmentStyles,
);

/**
 * Groups its Button children into a list and adds margins between.
 */
export const ButtonGroup = forwardRef(
  (
    { children, actions, ...props }: ButtonGroupProps,
    ref: ButtonGroupProps['ref'],
  ) => {
    if (actions) {
      return (
        <ActionsWrapper {...props} ref={ref}>
          {actions.secondary && (
            <SecondaryButton {...actions.secondary} variant="secondary" />
          )}

          <Button {...actions.primary} variant="primary" />

          {actions.secondary && (
            <TertiaryButton {...actions.secondary} variant="tertiary" />
          )}
        </ActionsWrapper>
      );
    }
    return (
      <Wrapper {...props} ref={ref}>
        {children}
      </Wrapper>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
