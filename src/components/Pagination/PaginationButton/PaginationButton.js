import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import Button from '../../Button';

const PageButtons = styled(Button)`
  ${({ theme }) => `
    margin: ${theme.spacings.kilo};
  `};
`;

const PaginationButton = ({ value, onClick, plain }) => {
  const size = plain ? Button.MEGA : Button.KILO;
  return (
    <PageButtons
      name={value}
      size={size}
      plain={plain}
      onClick={() => onClick(value)}
    >
      {value}
    </PageButtons>
  );
};

PaginationButton.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  plain: PropTypes.bool
};

PaginationButton.defaultProps = {
  plain: false
};

export default PaginationButton;
