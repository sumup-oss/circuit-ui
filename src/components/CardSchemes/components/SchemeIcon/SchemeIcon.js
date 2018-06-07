import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { keys } from 'lodash';
// eslint-disable-next-line max-len
import schemeMap from '../../../CreditCardDetails/components/scheme-icons/card-scheme-map';

const SchemeIconWrapBaseStyles = () => css`
  height: 32px;
  width: 48px;
`;
const SchemeIconWrap = styled('div')(SchemeIconWrapBaseStyles);
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

  return (
    <SchemeIconWrap>
      <Svg />
    </SchemeIconWrap>
  );
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
