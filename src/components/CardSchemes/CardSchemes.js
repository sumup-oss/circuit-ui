import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import styled, { css } from 'react-emotion';
import SchemeIcon from './components/SchemeIcon';

const CardSchemeBaseStyles = ({ theme }) => css`
  box-sizing: content-box;
  display: inline-block;
  height: 32px;
  padding: ${theme.spacings.byte};
  width: 48px;
`;

const listWrapperBaseStyles = () => css`
  display: block;
  line-height: 0;
  text-align: center;
`;

const CardScheme = styled('li')(CardSchemeBaseStyles);
const CardSchemeWrapper = styled('ul')(listWrapperBaseStyles);

/**
 *   Displays a row of available or active card scheme icons
 */
const CardSchemes = ({ schemeIds }) => {
  if (isEmpty(schemeIds)) {
    return null;
  }

  return (
    <CardSchemeWrapper>
      {schemeIds.map(schemeId => (
        <CardScheme key={schemeId}>
          <SchemeIcon schemeId={schemeId} />
        </CardScheme>
      ))}
    </CardSchemeWrapper>
  );
};

CardSchemes.propTypes = {
  /**
   * An array of scheme ids corresponding to the names of the scheme icons.
   */
  schemeIds: PropTypes.arrayOf(PropTypes.string).isRequired
};

/**
 * @component
 */
export default CardSchemes;
