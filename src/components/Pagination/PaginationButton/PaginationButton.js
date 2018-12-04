import React from 'react';
import PropTypes from 'prop-types';
import PageButton from '../PageButton';

const PaginationButton = ({ currentPage, onClick, active }) => (
  <PageButton
    primary={active}
    name={currentPage}
    onClick={() => onClick(currentPage)}
  >
    {currentPage}
  </PageButton>
);

PaginationButton.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool
};

PaginationButton.defaultProps = {
  active: false
};

export default PaginationButton;
