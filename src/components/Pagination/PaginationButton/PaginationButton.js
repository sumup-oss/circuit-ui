import React from 'react';
import PropTypes from 'prop-types';
import PageButton from '../PageButton';

const PaginationButton = ({ value, onClick, active }) => (
  <PageButton primary={active} name={value} onClick={() => onClick(value)}>
    {value}
  </PageButton>
);

PaginationButton.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool
};

PaginationButton.defaultProps = {
  active: false
};

export default PaginationButton;
