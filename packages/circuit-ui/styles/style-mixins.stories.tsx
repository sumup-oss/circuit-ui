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

import styled from '@emotion/styled';

import { Stack } from '../../../.storybook/components';
import Button from '../components/Button';

import docs from './style-mixins.docs.mdx';
import {
  spacing,
  focusVisible,
  disableVisually,
  clearfix,
  hideVisually,
  hideScrollbar,
  SpacingValue,
} from './style-mixins';

export default {
  title: 'Features/Style Mixins',
  parameters: {
    docs: { page: docs },
  },
};

const spaceOptions = {
  options: [
    0,
    'auto',
    'bit',
    'byte',
    'kilo',
    'mega',
    'giga',
    'tera',
    'peta',
    'exa',
    'zetta',
  ],
  control: {
    type: 'select',
  },
};

const Background = styled.div`
  display: inline-block;
  background-color: #f8cb9c;
`;

type SpacingArgs = {
  all: SpacingValue;
  top: SpacingValue;
  right: SpacingValue;
  bottom: SpacingValue;
  left: SpacingValue;
};

export const Spacing = ({ all, top, left, bottom, right }: SpacingArgs) => (
  <Stack>
    <Background>
      <Button css={spacing(all)}>All sides</Button>
    </Background>
    <Background>
      <Button css={spacing({ top, left, bottom, right })}>
        Individual sides
      </Button>
    </Background>
  </Stack>
);

Spacing.args = {
  all: 'kilo',
  top: 'kilo',
  right: 'giga',
  bottom: 'peta',
  left: 'zetta',
};

Spacing.argTypes = {
  all: spaceOptions,
  top: spaceOptions,
  right: spaceOptions,
  bottom: spaceOptions,
  left: spaceOptions,
};

const Parent = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid magenta;
`;

const Floated = styled.div`
  float: right;
  height: 120px;
  width: 240px;
  background-color: #ccc;
`;

export const Clearfix = () => (
  <Parent css={clearfix}>
    <Floated />
    An electronic circuit is composed of individual electronic components, such
    as resistors, transistors, capacitors, inductors and diodes, connected by
    conductive wires or traces through which electric current can flow.
  </Parent>
);

const Focused = styled.div`
  display: inline-block;
  height: 48px;
  width: 480px;
  max-width: 100%;
  background-color: white;
`;

export const FocusVisible = () => (
  <Stack>
    <Focused css={focusVisible} />
    <Focused css={focusVisible('inset')} />
  </Stack>
);

export const DisableVisually = () => (
  <div css={disableVisually}>This element is visually disabled.</div>
);

export const HideVisually = () => (
  <div css={hideVisually}>This element is visually hidden.</div>
);

const Scrollable = styled.div`
  overflow-x: scroll;
`;

const Overflow = styled.div`
  width: 120%;
`;

export const HideScrollbar = () => (
  <Scrollable css={hideScrollbar}>
    <Overflow>
      An electronic circuit is composed of individual electronic components,
      such as resistors, transistors, capacitors, inductors and diodes,
      connected by conductive wires or traces through which electric current can
      flow.
    </Overflow>
  </Scrollable>
);
