import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import ArrowIcon from './arrow.svg';

import SvgButton from '../../../../components/SvgButton';
import { ASCENDING, DESCENDING } from '../../constants';

const baseStyles = ({ theme }) => css`
  display: flex;
  flex-direction: column;
  left: ${theme.spacings.kilo};
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity ${theme.transitions.default};
`;

const StyledWrapper = styled(SvgButton)`
  ${baseStyles};
`;

const DownArrow = styled(ArrowIcon)`
  margin-top: 2px;
  transform: rotate(180deg);
`;

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
