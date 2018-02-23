import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';

import { Input } from '../Input';
import { disableVisually } from '../../styles/style-helpers';

const schemeListStyles = ({ theme }) => css`
  label: card-number-input__scheme-list;
`;

const SchemeList = styled('ul')`
  ${schemeListStyles};
`;

const schemeIconWrapperStyles = ({ theme }) => css`
  label: card-number-input__scheme-icon-wrapper;
`;

const schemeIconWrapperDisabledStyles = ({ disabled }) =>
  disabled &&
  css`
    label: card-number-input__scheme-icon-wrapper--disabled;
    ${disableVisually()};
  `;

const SchemeIconWrapper = styled('li')`
  ${schemeIconWrapperStyles};
  ${schemeIconWrapperDisabledStyles};
`;

const cardNumberWrapperStyles = ({ theme }) => css`
  label: card-number-input__card-number-wrapper;
`;

const CardNumberWrapper = styled('div')`
  ${cardNumberWrapperStyles};
`;
/**
 * Describe your component here.
 */
class CardNumberInput extends Component {
  state = {
    detectedCardScheme: ''
  };

  componentWillReceiveProps({ value: nextValue }) {
    const { value } = this.props;
    if (value === nextValue) {
      return;
    }
    console.log();
  }

  render() {
    const { supportedCardSchemes, value, ...props } = this.props;
    const { detectedCardScheme } = this.state;
    return (
      <CardNumberWrapper>
        <Input value={value} {...props} />
        <SchemeList>
          {supportedCardSchemes.entries().map(([cardScheme, IconComponent]) => {
            const disabled =
              value &&
              (!detectedCardScheme || detectedCardScheme !== cardScheme);
            return (
              <SchemeIconWrapper {...{ disabled }}>
                <IconComponent />
              </SchemeIconWrapper>
            );
          })}
        </SchemeList>
      </CardNumberWrapper>
    );
  }
}

CardNumberInput.propTypes = {
  /**
   * Card scheme icon components.
   */
  supportedCardSchemes: PropTypes.objectOf(PropTypes.element).isRequired,
  /**
   * The detected card scheme.
   */
  detectedCardScheme: PropTypes.string.isRequired,
  /**
   * The card number.
   */
  value: PropTypes.string.isRequired
};

CardNumberInput.defaultProps = {};
/**
 * @component
 */
export default CardNumberInput;
