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

import React, { Fragment } from 'react';
import { select, text } from '@storybook/addon-knobs/react';

import docs from './Blockquote.docs.mdx';
import { Blockquote } from './Blockquote';

const defaultQuote = `
Lorem ipsum dolor amet echo park activated charcoal banjo deep
crucifix pinterest yr af tumeric literally. Tbh four loko tattooed
kickstarter artisan. Lumbersexual tote bag selfies truffaut, tofu vape
tbh adaptogen green juice lo-fi kombucha.
`;

const sizes = ['kilo', 'mega', 'giga'];

export default {
  title: 'Typography/Blockquote',
  component: Blockquote,
  parameters: {
    docs: { page: docs },
    jest: ['Blockquote']
  }
};

export const base = () => (
  <Blockquote size={select('Size', sizes, sizes[0])}>
    {text('Quote', defaultQuote)}
  </Blockquote>
);

export const size = () => (
  <Fragment>
    <Blockquote size={'kilo'}>
      Kilo - The ability to accept credit card payments that are EMV-compliant
      is essentially an insurance policy against fraud and an impressively
      economical one at that.
    </Blockquote>
    <Blockquote size={'mega'}>
      Mega - The ability to accept credit card payments that are EMV-compliant
      is essentially an insurance policy against fraud and an impressively
      economical one at that.
    </Blockquote>
    <Blockquote size={'giga'}>
      Giga - The ability to accept credit card payments that are EMV-compliant
      is essentially an insurance policy against fraud and an impressively
      economical one at that.
    </Blockquote>
  </Fragment>
);
