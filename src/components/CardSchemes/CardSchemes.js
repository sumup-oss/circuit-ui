import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import styled from '@emotion/styled';
import { css } from 'emotion';
import PaymentMethodIcon from './components/PaymentMethodIcon';
import { sizes } from '../../styles/constants';

const { BYTE, KILO, MEGA, GIGA } = sizes;

const CardSchemeBaseStyles = ({ theme }) => css`
  box-sizing: content-box;
  display: inline-block;
  padding: ${theme.spacings.byte};
`;

const listWrapperBaseStyles = () => css`
  display: block;
  line-height: 0;
  text-align: center;
`;

const CardSchemeWrapper = styled('ul')(listWrapperBaseStyles);
const PaymentMethodIconWrap = styled('li')(CardSchemeBaseStyles);

/**
 *   Displays a row of available or active card scheme icons
 */
const CardSchemes = ({ iconIds, size }) => {
  if (isEmpty(iconIds)) {
    return null;
  }

  return (
    <CardSchemeWrapper>
      {iconIds.map(iconId => (
        <PaymentMethodIconWrap key={iconId}>
          <PaymentMethodIcon size={size} iconId={iconId} />
        </PaymentMethodIconWrap>
      ))}
    </CardSchemeWrapper>
  );
};

CardSchemes.BYTE = BYTE;
CardSchemes.KILO = KILO;
CardSchemes.MEGA = MEGA;
CardSchemes.GIGA = GIGA;

CardSchemes.propTypes = {
  /**
   * An array of scheme ids corresponding to the names of the scheme icons.
   */
  iconIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * The optional sizes of the icons of the card scheme
   */
  size: PropTypes.oneOf([BYTE, KILO, MEGA, GIGA])
};

CardSchemes.defaultProps = {
  size: GIGA
};

/**
 * @component
 */
export default CardSchemes;
