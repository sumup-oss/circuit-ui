import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';

import withTests from '../../util/withTests';
import { reduce } from '../../util/fp';
import CardNumberInput, { SCHEMES, cardSchemeIcons } from '.';
import Text from '../Text';

const getIconComponents = reduce(
  (acc, scheme) => ({ ...acc, [scheme]: cardSchemeIcons[scheme] }),
  {}
);

const schemes = [SCHEMES.MASTERCARD, SCHEMES.VISA, SCHEMES.DINERS, SCHEMES.JCB];
const schemeIcons = getIconComponents(schemes);

const manySchemes = [
  SCHEMES.MASTERCARD,
  SCHEMES.VISA,
  SCHEMES.DINERS,
  SCHEMES.DISCOVER,
  SCHEMES.JCB,
  SCHEMES.ELO,
  SCHEMES.MAESTRO
];
const manySchemeIcons = getIconComponents(manySchemes);

storiesOf('CardNumberInput', module)
  .addDecorator(withTests('CardNumberInput'))
  .add(
    'Empty CardNumberInput',
    withInfo()(() => (
      <CardNumberInput
        supportedCardSchemes={schemeIcons}
        onChange={action('Changed input value')}
        detectedCardScheme=""
        name="creditCardInput"
      />
    ))
  )
  .add(
    'Empty CardNumberInput with many supported schemes',
    withInfo()(() => (
      <Fragment>
        <Text>Displays icons below input on mobile.</Text>
        <CardNumberInput
          supportedCardSchemes={manySchemeIcons}
          onChange={action('Changed input value')}
          detectedCardScheme=""
          name="creditCardInput"
        />
      </Fragment>
    ))
  )
  .add(
    'CardNumberInput with detected card scheme',
    withInfo()(() => (
      <CardNumberInput
        supportedCardSchemes={schemeIcons}
        onChange={action('Changed input value')}
        detectedCardScheme={SCHEMES.VISA}
        value="4485 7197 7461 1397"
        name="creditCardInput"
      />
    ))
  );
