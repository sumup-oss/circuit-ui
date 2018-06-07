import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { keys } from 'lodash';

import schemeMap from '../../../CreditCardDetails/components/scheme-icons/card-scheme-map';

/**
 * A single card scheme icon
 */
const SchemeIcon = ({ schemeId }) => {
  const IconSvg = schemeMap[schemeId];

  if (!IconSvg) {
    return null;
  }

  const Svg = styled(IconSvg)`
    width: 100%;
    height: 100%;
    display: block;
    line-height: 0;
    text-align: center;
  `;

  return <Svg />;
};

SchemeIcon.propTypes = {
  /**
   * The id of the card scheme icon.
   */
  schemeId: PropTypes.oneOf(keys(schemeMap))
};

SchemeIcon.defaultProps = {
  schemeId: ''
};

/**
 * @component
 */
export default SchemeIcon;
