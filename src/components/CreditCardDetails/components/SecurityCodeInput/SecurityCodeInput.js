import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { size } from 'polished';

import Label from '../../../Label';
import Input from '../../../Input';
import { getPlaceholder } from './SecurityCodeInputService';
import InfoIcon from '../../../InfoIcon';
import SvgButton from '../../../SvgButton/SvgButton';

const baseInfoButtonStyles = ({ theme }) => css`
  label: security-code-input__info-button;
  margin-left: ${theme.spacings.bit};
  align-self: center;
  ${size(theme.iconSizes.byte)};
`;

const InfoButton = styled(SvgButton)(baseInfoButtonStyles);

const SecurityCodeLabel = styled(Label)`
  display: flex;
`;

/**
 * A specialized input for credit card security codes (CVV, etc.).
 */
const SecurityCodeInput = ({ label, id, cardScheme, onShowInfo, ...props }) => (
  <Fragment>
    <SecurityCodeLabel htmlFor={id}>
      {label}
      {onShowInfo && (
        <InfoButton type="button" onClick={onShowInfo}>
          <InfoIcon />
        </InfoButton>
      )}
    </SecurityCodeLabel>
    <Input
      autoComplete="cc-csc"
      type="tel"
      placeholder={getPlaceholder(cardScheme)}
      {...{ ...props, id }}
    />
  </Fragment>
);

SecurityCodeInput.propTypes = {
  /**
   * The label to be used (for i18n purposes).
   */
  label: PropTypes.string,
  /**
   * Id to be used for the input.
   */
  id: PropTypes.string,
  /**
   * The card scheme the code is being entered for. Used
   * to determine whether to show a three or four digit
   * placeholder. The component defaults to a three-digit
   * placeholder.
   */
  cardScheme: PropTypes.string,
  onShowInfo: PropTypes.func
};

SecurityCodeInput.defaultProps = {
  label: 'Security code',
  id: 'cui-cc-security-code',
  cardScheme: '',
  onShowInfo: null
};

export default SecurityCodeInput;
