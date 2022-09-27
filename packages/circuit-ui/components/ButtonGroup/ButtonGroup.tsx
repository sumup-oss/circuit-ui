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

import { Ref, forwardRef, HTMLAttributes, useState, useEffect } from 'react';
import { css, useTheme } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import styled, { StyleProps } from '../../styles/styled';
import Button, { ButtonProps } from '../Button';

type Action = Omit<ButtonProps, 'variant'>;

export interface ButtonGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'align'> {
  /**
   * The buttons to group. Expects a primary and optionally a secondary button.
   */
  actions: {
    primary: Action;
    secondary?: Action;
  };
  /**
   * Direction to align the buttons. Defaults to `center`.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * The ref to the HTML DOM element.
   */
  ref?: Ref<HTMLDivElement>;
}

const alignmentMap = {
  left: 'flex-end',
  center: 'center',
  right: 'flex-start',
} as const;

type WrapperProps = Omit<ButtonGroupProps, 'actions'>;

const wrapperStyles = ({ theme }: StyleProps) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${theme.spacings.mega};

  ${theme.mq.kilo} {
    flex-direction: row-reverse;
  }
`;

const alignmentStyles = ({ align = 'center' }: WrapperProps) => css`
  justify-content: ${alignmentMap[align]};
`;

const Wrapper = styled('div')<WrapperProps>(wrapperStyles, alignmentStyles);

const getCurrentVariant = (theme: Theme) =>
  window.matchMedia(theme.breakpoints.kilo).matches ? 'secondary' : 'tertiary';
/**
 * The ButtonGroup component groups and formats two buttons.
 */
export const ButtonGroup = forwardRef(
  ({ actions, ...props }: ButtonGroupProps, ref: ButtonGroupProps['ref']) => {
    const theme = useTheme();

    const [secondaryButtonVariant, setSecondaryButtonVariant] = useState<
      ButtonProps['variant']
    >(getCurrentVariant(theme));

    useEffect(() => {
      const callback = () =>
        setSecondaryButtonVariant(getCurrentVariant(theme));

      window
        .matchMedia(theme.breakpoints.kilo)
        .addEventListener('change', callback);

      return window
        .matchMedia(theme.breakpoints.kilo)
        .removeEventListener('change', callback);
    }, [theme.breakpoints.kilo, theme]);

    return (
      <Wrapper {...props} ref={ref}>
        <Button {...actions.primary} variant="primary" />
        {actions.secondary && (
          // key passed to avoid transitions at macthMedia change event
          <Button
            {...actions.secondary}
            variant={secondaryButtonVariant}
            key={secondaryButtonVariant}
          />
        )}
      </Wrapper>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
