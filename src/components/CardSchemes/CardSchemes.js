import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import styled, { css } from 'react-emotion';
import SchemeIcon from './components/SchemeIcon';

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
const CardScheme = styled('li')(CardSchemeBaseStyles);

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
