import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import { css } from 'react-emotion';

import withTests from '../../../../util/withTests';
import { reduce } from '../../../../util/fp';
import { CardNumberInput, cardSchemeIcons } from '..';
import { schemes as cardSchemes } from '../..';
import Text from '../../../Text';
import Label from '../../../Label';
import { standard } from '../../../../themes';

const { SCHEMES } = cardSchemes;

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

const marginTopClassName = css`
  width: calc(100vw - ${standard.spacings.byte});

  ${standard.mq.medium`
    width: 75vw;
    max-width: 400px;
  `};
`;

storiesOf('CardNumberInput', module)
  .addDecorator(withTests('CardNumberInput'))
  .add(
    'Empty CardNumberInput',
    withInfo()(() => (
      <CardNumberInput
        acceptedCardSchemes={schemeIcons}
        onChange={action('Changed input value')}
        detectedCardScheme=""
        name="creditCardInput"
        className={marginTopClassName}
      />
    ))
  )
  .add(
    'Empty CardNumberInput with many supported schemes',
    withInfo()(() => (
      <Fragment>
        <Text style={{ width: '95vw' }}>
          Displays card scheme icons below input on mobile, when there are more
          than 5 schemes.
        </Text>
        <CardNumberInput
          acceptedCardSchemes={manySchemeIcons}
          onChange={action('Changed input value')}
          detectedCardScheme=""
          name="creditCardInput"
          className={marginTopClassName}
        />
      </Fragment>
    ))
  )
  .add(
    'CardNumberInput with detected card scheme',
    withInfo()(() => (
      <CardNumberInput
        acceptedCardSchemes={schemeIcons}
        onChange={action('Changed input value')}
        detectedCardScheme={SCHEMES.VISA}
        value="4485 7197 7461 1397"
        name="creditCardInput"
        className={marginTopClassName}
      />
    ))
  );
