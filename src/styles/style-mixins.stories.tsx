/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Button from '../components/Button';

import docs from './style-mixins.docs.mdx';
import {
  spacing,
  focusOutline,
  disableVisually,
  clearfix,
  hideVisually,
  hideScrollbar,
} from './style-mixins';

export default {
  title: 'Advanced/Style Mixins',
  parameters: {
    docs: { page: docs },
  },
};

const spaceOptions = {
  control: {
    type: 'select',
    options: [
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
  },
};

const Background = styled.div`
  display: inline-block;
  background-color: #f8cb9c;
`;

export const ApplySpacingOneSide = (args) => (
  <Background>
    <Button css={spacing(args)}>Example</Button>
  </Background>
);

ApplySpacingOneSide.args = { top: 'mega' };

ApplySpacingOneSide.argTypes = {
  top: spaceOptions,
};

export const ApplySpacingFourSides = (args) => (
  <Background>
    <Button css={spacing(args)}>Example</Button>
  </Background>
);

ApplySpacingFourSides.args = {
  top: 'mega',
  right: 'giga',
  bottom: 'mega',
  left: 'giga',
};

ApplySpacingFourSides.argTypes = {
  top: spaceOptions,
  bottom: spaceOptions,
  right: spaceOptions,
};

export const ApplySpacingAllSides = (args) => (
  <Background>
    <Button css={spacing(args.size)}>Example</Button>
  </Background>
);
ApplySpacingAllSides.args = { size: 'kilo' };
ApplySpacingAllSides.argTypes = {
  size: spaceOptions,
};

export const ResetSpacing = (args) => (
  <Background>
    <Button css={spacing(args.size)}>Example</Button>
  </Background>
);
ResetSpacing.args = { size: 'kilo' };
ResetSpacing.argTypes = {
  size: {
    control: {
      type: 'select',
      options: ['kilo', 0],
    },
  },
};

const Parent = styled.div`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid magenta;
`;

const Child = styled.div`
  float: right;
  height: 120px;
  width: 240px;
  background-color: #ccc;
`;

export const Clearfix = () => (
  <Parent css={clearfix}>
    <Child />
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

export const FocusOutline = () => <Focused css={focusOutline} />;

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
