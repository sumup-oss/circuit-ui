import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { keys } from 'lodash';

import { sizes } from '../../../../styles/constants';

// eslint-disable-next-line max-len
import schemeMap from '../../../CreditCardDetails/components/scheme-icons/card-scheme-map';

const { BYTE, KILO, MEGA, GIGA } = sizes;

const SchemeIconWrapBaseStyles = ({ theme, size }) => css`
  height: ${theme.iconSizes[size]};
  width: auto;
`;
const SchemeIconWrap = styled('div')(SchemeIconWrapBaseStyles);
/**
 * A single card scheme icon
 */
const SchemeIcon = ({ schemeId, size }) => {
  const IconSvg = schemeMap[schemeId];

  if (!IconSvg) {
    return null;
  }

  const Svg = styled(IconSvg)`
    width: auto;
    height: 100%;
    display: inline-block;
    line-height: 0;
  `;

  return (
    <SchemeIconWrap size={size}>
      <Svg />
    </SchemeIconWrap>
  );
};

SchemeIcon.BYTE = BYTE;
SchemeIcon.KILO = KILO;
SchemeIcon.MEGA = MEGA;
SchemeIcon.GIGA = GIGA;

SchemeIcon.propTypes = {
  /**
   * The id of the card scheme icon.
   */
  schemeId: PropTypes.oneOf(keys(schemeMap)),
  size: PropTypes.oneOf([
    SchemeIcon.BYTE,
    SchemeIcon.KILO,
    SchemeIcon.MEGA,
    SchemeIcon.GIGA
  ])
};

SchemeIcon.defaultProps = {
  schemeId: '',
  size: SchemeIcon.GIGA
};

/**
 * @component
 */
export default SchemeIcon;
