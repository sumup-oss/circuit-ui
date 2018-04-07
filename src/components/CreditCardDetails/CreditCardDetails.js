import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { toBool } from '../../util/fp';
import InlineInputs from '../InlineElements';

import {
  ACTIONS,
  INITIAL_STATE,
  stateReducer
} from './CreditCardDetailsService';

const baseContainerStyles = css`
  label: credit-card-details;
  width: 100%;
`;

const CardDetailsContainer = styled('div')(baseContainerStyles);

/**
 * Describe your component here.
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
    renderSecurityCodeModal: PropTypes.func
  };

  static defaultProps = {
    renderSecurityCodeModal: null
  };

  state = INITIAL_STATE;

  getSecurityCodeInputProps = () => {
    const canShowSecurityCodeInfo = toBool(this.props.renderSecurityCodeModal);

    return canShowSecurityCodeInfo ? { onShowInfo: this.handleShowInfo } : {};
  };

  handleShowInfo = () => {
    this.setState(stateReducer(ACTIONS.TOGGLE_INFO));
  };

  render() {
    const {
      nameOnCard,
      cardNumber,
      expiryDate,
      renderSecurityCodeInput,
      renderSecurityCodeModal
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
        {renderSecurityCodeModal &&
          renderSecurityCodeModal({
            isOpen: isShowingInfo,
            onClose: this.handleToggleModal
          })}
      </CardDetailsContainer>
    );
  }
}
