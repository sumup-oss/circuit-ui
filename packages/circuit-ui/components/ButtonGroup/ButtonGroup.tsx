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
import { Theme } from '@sumup/design-tokens';
import { useTheme } from 'emotion-theming';

import styled, { StyleProps } from '../../styles/styled';
import Button, { ButtonProps } from '../Button';
import { useMedia } from '../../hooks/useMedia';

type Action = Omit<ButtonProps, 'variant'>;

export interface ButtonGroupProps {
  /**
   * Buttons to group.
   */
  children: ReactElement<ButtonProps>[] | ReactElement<ButtonProps>;
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
  action?: {
    primary: Action;
    secondary: Action;
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

const actionStyles = ({ theme }: StyleProps) => css`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;

  > button,
  > a {
    width: auto;

    &:not(:last-child) {
      margin-right: ${theme.spacings.mega};
      margin-bottom: 0;
    }
  }

  ${theme.mq.untilKilo} {
    grid-template-columns: 1fr;

    > button,
    > a {
      width: 100%;

      &:last-child {
        grid-row: 1;
        margin-bottom: ${theme.spacings.mega};
      }
    }
  }
`;

const Wrapper = styled('div')<ButtonGroupProps>(
  baseStyles,
  alignmentStyles,
  inlineMobileStyles,
);

const ActionsWrapper = styled('div')<ButtonGroupProps>(actionStyles);

/**
 * Groups its Button children into a list and adds margins between.
 */
export const ButtonGroup = forwardRef(
  (
    { children, action, ...props }: ButtonGroupProps,
    ref: ButtonGroupProps['ref'],
  ) => {
    const theme = useTheme<Theme>();
    const isMobile = useMedia(theme.breakpoints.untilKilo, true);

    if (action) {
      return (
        <ActionsWrapper {...props}>
          <Button
            variant={isMobile ? 'tertiary' : 'secondary'}
            onClick={action.secondary.onClick}
            href={action.secondary.href}
          >
            {action.secondary.children}
          </Button>
          <Button
            variant="primary"
            onClick={action.primary.onClick}
            href={action.primary.href}
          >
            {action.primary.children}
          </Button>
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
