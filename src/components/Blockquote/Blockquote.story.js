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
