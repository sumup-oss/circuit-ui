import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import ArrowIcon from './arrow.svg';

import SvgButton from '../../../SvgButton';
import { ASCENDING, DESCENDING } from '../../constants';

const baseStyles = ({ theme }) => css`
  display: flex;
  flex-direction: column;
  height: 10px;
  left: ${theme.spacings.kilo};
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity ${theme.transitions.default};
  width: 5px;
`;

const StyledWrapper = styled(SvgButton)`
  ${baseStyles};
`;

const DownArrow = styled(ArrowIcon)`
  margin-top: 2px;
  transform: rotate(180deg);
`;

/**
 * [PRIVATE] Arrow component for TableHeader sorting
 */
const SortArrow = ({ direction }) => (
  <StyledWrapper>
    <Fragment>
      {direction !== DESCENDING && <ArrowIcon />}
      {direction !== ASCENDING && <DownArrow />}
    </Fragment>
  </StyledWrapper>
);

SortArrow.propTypes = {
  direction: PropTypes.oneOf([ASCENDING, DESCENDING])
};

SortArrow.defaultProps = {
  direction: null
};

export default SortArrow;
