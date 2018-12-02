import React from 'react';
import PropTypes from 'prop-types';
import * as PaginationService from './PaginationService';
import PaginationContainer from './PaginationContainer';
import PaginationButton from './PaginationButton';
import PageButton from './PageButton';

/**
 * Pagination is a component to show pages numbers calculate dinamically.
 */

const Pagination = ({
  page,
  perPage,
  total,
  pagesToShow,
  onChange,
  nextLabel,
  previousLabel
}) => {
  const PaginationButtonContainer = ({ value }) => {
    const active = page === value;
    return (
      <PaginationButton active={active} value={value} onClick={onChange} />
    );
  };

  PaginationButtonContainer.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  };

  const totalPages = PaginationService.calculatePages(total, perPage);

  if (totalPages < 2) {
    return null;
  }

  if (totalPages <= pagesToShow) {
    return (
      <PaginationContainer
        page={page}
        totalPages={totalPages}
        onChange={onChange}
        nextLabel={nextLabel}
        previousLabel={previousLabel}
      >
        {PaginationService.createEmptyArrayFromNumber(totalPages).map(
          (item, index) => (
            <PaginationButtonContainer key={item} value={index + 1} />
          )
        )}
      </PaginationContainer>
    );
  }
  const previousValues = PaginationService.arrayOfPreviousValues(
    page,
    totalPages
  );
  const nextValues = PaginationService.arrayOfNextValues(page, totalPages);

  const shouldHavePreviousDots = PaginationService.shouldHavePreviousDots(
    previousValues
  );
  const shouldHaveNextDots = PaginationService.shouldHaveNextDots(
    nextValues,
    totalPages
  );

  const isNotFirstOrLastPage = page !== totalPages && page !== 1;

  return (
    <PaginationContainer
      page={page}
      totalPages={totalPages}
      onChange={onChange}
      nextLabel={nextLabel}
      previousLabel={previousLabel}
    >
      <PaginationButtonContainer value={1} />
      {shouldHavePreviousDots && <PageButton>...</PageButton>}
      {previousValues.map(item => (
        <PaginationButtonContainer key={item} value={item} />
      ))}
      {isNotFirstOrLastPage && (
        <PaginationButtonContainer key={page} value={page} />
      )}
      {nextValues.map(item => (
        <PaginationButtonContainer key={item} value={item} />
      ))}
      {shouldHaveNextDots && <PageButton>...</PageButton>}
      <PaginationButtonContainer value={totalPages} />
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  /**
   * Active page of pagination
   */
  page: PropTypes.number,
  /**
   * Number of items per page
   */
  perPage: PropTypes.number,
  /**
   * Total of items inside the pagination
   */
  total: PropTypes.number.isRequired,
  /**
   * Callback for when an page is changed
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Number of buttons/pages is gonna show on pagination
   */
  pagesToShow: PropTypes.number,
  /**
   * Label to be used on buttomn of next
   */
  nextLabel: PropTypes.string,
  /**
   * Label to be used on buttomn of previous
   */
  previousLabel: PropTypes.string
};

Pagination.defaultProps = {
  page: 1,
  perPage: 50,
  pagesToShow: 5,
  nextLabel: '>',
  previousLabel: '<'
};

/**
 * @component Pagination
 */
export default Pagination;
