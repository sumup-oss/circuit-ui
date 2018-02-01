import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import { ZETTA, EXA, PETA, TERA, GIGA, MEGA, KILO } from '../../util/sizes';
import Heading from '.';

storiesOf('Heading', module)
  .addDecorator(withTests('Heading'))
  .add(
    'Zetta Heading with h1',
    withInfo()(() => (
      <Heading element="h1" size={ZETTA}>
        This is a zetta heading with an h1 element
      </Heading>
    ))
  )
  .add(
    'Exa Heading with h2',
    withInfo()(() => (
      <Heading element="h2" size={EXA}>
        This is an exa heading with an h2 element
      </Heading>
    ))
  )
  .add(
    'Peta Heading with h3',
    withInfo()(() => (
      <Heading element="h3" size={PETA}>
        This is a peta heading with an h3 element
      </Heading>
    ))
  )
  .add(
    'Tera Heading with h4',
    withInfo()(() => (
      <Heading element="h4" size={TERA}>
        This is a tera heading with an h4 element
      </Heading>
    ))
  )
  .add(
    'Giga Heading with h5',
    withInfo()(() => (
      <Heading element="h5" size={GIGA}>
        This is a giga heading with an h5 element
      </Heading>
    ))
  )
  .add(
    'Meta Heading with h6',
    withInfo()(() => (
      <Heading element="h6" size={MEGA}>
        This is a mega heading with an h6 element
      </Heading>
    ))
  )
  .add(
    'Kilo Heading with h6',
    withInfo()(() => (
      <Heading element="h6" size={KILO}>
        This is a kilo heading with an h6 element
      </Heading>
    ))
  );
