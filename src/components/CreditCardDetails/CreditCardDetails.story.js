import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import withTests from '../../util/withTests';
import CreditCardDetails, {
  CardNumberInput,
  ExpiryDateInput,
  SecurityCodeInput,
  NameOnCardInput,
  cardSchemeIcons,
  schemes
} from '.';

const { SCHEMES } = schemes;

const supportedCardSchemes = {
  [SCHEMES.VISA]: cardSchemeIcons[SCHEMES.VISA],
  [SCHEMES.MASTERCARD]: cardSchemeIcons[SCHEMES.MASTERCARD],
  [SCHEMES.JCB]: cardSchemeIcons[SCHEMES.JCB]
};

storiesOf('CreditCardDetails', module)
  .addDecorator(withTests('CreditCardDetails'))
  .add(
    'Default CreditCardDetails',
    withInfo()(() => (
      <div style={{ width: '95vw', maxWidth: '600px', margin: '0 auto' }}>
        <CreditCardDetails
          nameOnCard={<NameOnCardInput />}
          cardNumber={<CardNumberInput {...{ supportedCardSchemes }} />}
          expiryDate={<ExpiryDateInput />}
          renderSecurityCodeInput={() => <SecurityCodeInput />}
        />
      </div>
    ))
  );
