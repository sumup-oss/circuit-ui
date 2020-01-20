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
import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';

import { reduce } from '../../../../util/fp';
import { CardNumberInput, cardSchemeIcons } from '..';
import { schemes as cardSchemes } from '../..';
import Text from '../../../Text';
import { circuit } from '../../../../themes';

export default {
  title: 'Forms/CreditCardDetails/CardNumberInput',
  component: CardNumberInput,
  parameters: {
    jest: ['CardNumberInput']
  }
};

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
  width: calc(100vw - ${circuit.spacings.byte});
`;

export const emptyCardNumberInput = () => (
  <CardNumberInput
    acceptedCardSchemes={schemeIcons}
    onChange={action('Changed input value')}
    detectedCardScheme=""
    name="creditCardInput"
    value=""
    css={marginTopClassName}
  />
);

export const emptyWithManySupportedSchemes = () => (
  <Fragment>
    <Text style={{ width: '95vw' }}>
      Displays card scheme icons below input on mobile, when there are more than
      5 schemes.
    </Text>
    <CardNumberInput
      acceptedCardSchemes={manySchemeIcons}
      onChange={action('Changed input value')}
      detectedCardScheme=""
      name="creditCardInput"
      css={marginTopClassName}
    />
  </Fragment>
);

export const withDetectedCardScheme = () => (
  <CardNumberInput
    acceptedCardSchemes={schemeIcons}
    onChange={action('Changed input value')}
    detectedCardScheme={SCHEMES.VISA}
    value="4485 7197 7461 1397"
    name="creditCardInput"
    css={marginTopClassName}
  />
);
