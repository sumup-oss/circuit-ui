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

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import CreditCardDetails, {
  CardNumberInput,
  ExpiryDateInput,
  SecurityCodeInput,
  NameOnCardInput,
  cardSchemeIcons,
  schemes
} from '.';
import Button from '../Button';
import Text from '../Text';

const { SCHEMES } = schemes;

const acceptedCardSchemes = {
  [SCHEMES.VISA]: cardSchemeIcons[SCHEMES.VISA],
  [SCHEMES.MASTERCARD]: cardSchemeIcons[SCHEMES.MASTERCARD],
  [SCHEMES.JCB]: cardSchemeIcons[SCHEMES.JCB]
};

class YourFavoriteFormLibrary extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  state = {
    values: {
      name: '',
      cardNumber: '',
      expiryDate: '',
      securityCode: ''
    }
  };

  handleChange = (field, parse) => ({ target: { value } }) => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [field]: parse ? parse(value) : value
      }
    }));
  };

  render() {
    return this.props.children({
      values: this.state.values,
      handleChange: this.handleChange
    });
  }
}

storiesOf('CreditCardDetails', module)
  .addParameters({ jest: ['CreditCardDetails'] })
  .add('Default CreditCardDetails', () => (
    <YourFavoriteFormLibrary>
      {({ values, handleChange }) => (
        <div style={{ width: '95vw', maxWidth: '600px', margin: '0 auto' }}>
          <CreditCardDetails
            nameOnCard={
              <NameOnCardInput
                value={values.name}
                onChange={handleChange('name')}
              />
            }
            cardNumber={
              <CardNumberInput
                {...{ acceptedCardSchemes }}
                value={values.cardNumber}
                onChange={handleChange('cardNumber')}
              />
            }
            expiryDate={
              <ExpiryDateInput
                value={values.expiryDate}
                onChange={handleChange('expiryDate')}
              />
            }
            renderSecurityCodeInput={() => (
              <SecurityCodeInput
                value={values.securityCode}
                onChange={handleChange('securityCode')}
              />
            )}
          />
        </div>
      )}
    </YourFavoriteFormLibrary>
  ))
  .add('CreditCardDetails with security code info', () => (
    <YourFavoriteFormLibrary>
      {({ values, handleChange }) => (
        <div style={{ width: '95vw', maxWidth: '600px', margin: '0 auto' }}>
          <CreditCardDetails
            nameOnCard={
              <NameOnCardInput
                value={values.name}
                onChange={handleChange('name')}
              />
            }
            cardNumber={
              <CardNumberInput
                {...{ acceptedCardSchemes }}
                value={values.cardNumber}
                onChange={handleChange('cardNumber')}
              />
            }
            expiryDate={
              <ExpiryDateInput
                value={values.expiryDate}
                onChange={handleChange('expiryDate')}
              />
            }
            renderSecurityCodeInput={({ onShowInfo }) => (
              <SecurityCodeInput
                value={values.securityCode}
                onChange={handleChange('securityCode')}
                onShowInfo={onShowInfo}
              />
            )}
            renderSecurityCodeInfo={({ isShowingInfo, onHideInfo }) =>
              isShowingInfo && (
                <Fragment>
                  <Text>
                    Display some information regarding security codes. We do
                    this with a Modal.
                  </Text>
                  <Button onClick={onHideInfo} type="button">
                    Hide
                  </Button>
                </Fragment>
              )
            }
          />
        </div>
      )}
    </YourFavoriteFormLibrary>
  ));
