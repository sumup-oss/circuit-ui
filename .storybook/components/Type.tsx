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

import { Unstyled } from '@storybook/addon-docs';
import { Fragment, createElement, ComponentType } from 'react';
import styled from '@emotion/styled';
import { css, ThemeProvider } from '@emotion/react';
import { light } from '@sumup/design-tokens';

import { Body } from '@sumup/circuit-ui';

interface TypeProps {
  component: ComponentType;
  name: string;
  size?: string;
  fontWeight?: string;
}

const TypePx = styled(Body)(
  ({ theme }) => css`
    margin-left: ${theme.spacings.mega};
    margin-bottom: ${theme.spacings.giga};
    text-transform: lowercase;
  `,
);

const Type = ({ size, component, name, fontWeight, ...props }: TypeProps) => {
  // The fontSize can be either on typography[name][size] (body, headline) or
  // on typography[name] directly (subHeadline).
  const { fontSize, lineHeight } =
    light.typography[name][size] || light.typography[name];
  const weight = light.fontWeight[fontWeight];

  return (
    <Unstyled>
      <ThemeProvider theme={light}>
        {createElement(component, {
          children: (
            <Fragment>
              This is {name} {size ? `size ${size}` : ''}
              <TypePx as="span" variant="subtle" size="two">
                {weight ? `${weight}` : `${fontSize}, ${lineHeight}`}
              </TypePx>
            </Fragment>
          ),
          size,
          ...props,
        })}
      </ThemeProvider>
    </Unstyled>
  );
};

export default Type;
