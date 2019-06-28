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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { toBool } from '../../util/fp';
import InlineInputs from '../InlineElements';

const baseContainerStyles = css`
  label: credit-card-details;
  width: 100%;
`;

const CardDetailsContainer = styled('div')(baseContainerStyles);

/**
 * A container for showing card details. Optionally handles
 * state for showing and hiding info on the security code
 * input.
 */
export default class CreditCardDetails extends Component {
  static propTypes = {
    /**
     * React element for the name on card input.
     */
    nameOnCard: PropTypes.element.isRequired,
    /**
     * React element for the card number input.
     */
    cardNumber: PropTypes.element.isRequired,
    /**
     * React element for the expiry date.
     */
    expiryDate: PropTypes.element.isRequired,
    /**
     * Render prop for the security code input. Receives
     * an 'onShowInfo' prop.
     */
    renderSecurityCodeInput: PropTypes.func.isRequired,
    /**
     * Render prop for the security code modal. Receives
     * an 'onShowInfo' prop.
     */
    renderSecurityCodeInfo: PropTypes.func
  };

  static defaultProps = {
    renderSecurityCodeInfo: null
  };

  state = { isShowingInfo: false };

  getSecurityCodeInputProps = () => {
    const canShowSecurityCodeInfo = toBool(this.props.renderSecurityCodeInfo);

    return canShowSecurityCodeInfo ? { onShowInfo: this.handleToggleInfo } : {};
  };

  handleToggleInfo = () => {
    this.setState(({ isShowingInfo }) => ({
      isShowingInfo: !isShowingInfo
    }));
  };

  render() {
    const {
      nameOnCard,
      cardNumber,
      expiryDate,
      renderSecurityCodeInput,
      renderSecurityCodeInfo
    } = this.props;
    const { isShowingInfo } = this.state;
    const securityCodeInputProps = this.getSecurityCodeInputProps();

    return (
      <CardDetailsContainer>
        {nameOnCard}
        {cardNumber}
        <InlineInputs inlineMobile>
          <div>{expiryDate}</div>
          <div>{renderSecurityCodeInput(securityCodeInputProps)}</div>
        </InlineInputs>
        {renderSecurityCodeInfo &&
          renderSecurityCodeInfo({
            isShowingInfo,
            onHideInfo: this.handleToggleInfo
          })}
      </CardDetailsContainer>
    );
  }
}
