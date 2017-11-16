import React from 'react';
import { storiesOf } from '@storybook/react';

import { Price } from '..';

storiesOf('Prices', module).add('Price', () => (
  <div>
    <p>A regular Price for a currency with postpended symbol.</p>
    <Price currency="EUR" locale="de-DE" amount={9.99} />
    <p>An installments Price for a currency with postpended symbol.</p>
    <Price currency="EUR" locale="de-DE" installments={9} amount={9.99} />
    <p>A regular Price for a currency with prepended symbol.</p>
    <Price currency="USD" locale="en-US" amount={9.99} />
    <p>An installments Price for a currency with prepended symbol.</p>
    <Price currency="BRL" locale="pt-BR" installments={12} amount={9.99}>
      <p style={{ color: 'red', fontWeight: 500, margin: 0 }}>
        Disclaimer, passed in as child.
      </p>
    </Price>
    <p>A Price without a fractional part.</p>
    <Price currency="USD" locale="en-US" amount={49} />
    <p>A huge Price requiring a thousands separator.</p>
    <Price currency="USD" locale="en-US" amount={9999999} />
    <p>A Price with a disclaimer asterisk.</p>
    <Price currency="BRL" locale="pt-BR" amount={9.99} hasDisclaimer={true} />
  </div>
));
