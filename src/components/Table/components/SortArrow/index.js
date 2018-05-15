import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import ArrowIcon from './arrow.svg';

import { ASCENDING, DESCENDING } from '../../constants';

const baseStyles = ({ theme }) => css`
  display: flex;
  flex-direction: column;
  left: ${theme.spacings.byte};
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity ${theme.transitions.default};
`;

const StyledWrapper = styled.span`
  ${baseStyles};
`;

const DownArrow = styled(ArrowIcon)`
  margin-top: 2px;
  transform: rotate(180deg);
`;

const SortArrow = ({ direction }) => (
  <StyledWrapper>
    {direction !== DESCENDING && <ArrowIcon />}
    {direction !== ASCENDING && <DownArrow />}
  </StyledWrapper>
);

SortArrow.propTypes = {
  direction: PropTypes.oneOf([ASCENDING, DESCENDING])
};

SortArrow.defaultProps = {
  direction: null
};

export default SortArrow;
