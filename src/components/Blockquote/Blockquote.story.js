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

import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { select, text } from '@storybook/addon-knobs/react';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import Blockquote from './Blockquote';

const Container = styled('div')`
  width: 500px;
  max-width: 90%;
`;

const defaultQuote = `
Lorem ipsum dolor amet echo park activated charcoal banjo deep
crucifix pinterest yr af tumeric literally. Tbh four loko tattooed
kickstarter artisan. Lumbersexual tote bag selfies truffaut, tofu vape
tbh adaptogen green juice lo-fi kombucha.
`;

const sizes = [Blockquote.KILO, Blockquote.MEGA, Blockquote.GIGA];

storiesOf(`${GROUPS.COMPONENTS}|Blockquote`, module).add(
  'Blockquote',
  withInfo()(() => (
    <Container>
      <Blockquote size={select('Size', sizes, sizes[0])}>
        {text('Quote', defaultQuote)}
      </Blockquote>
    </Container>
  ))
);
