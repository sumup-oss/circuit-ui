import React from 'react';
import PropTypes from 'prop-types';
import * as PaginationService from './PaginationService';
import PaginationContainer from './PaginationContainer';
import PaginationButton from './PaginationButton';
import PageButton from './PageButton';

/**
 * Pagination is a component to show pages numbers calculate dinamically.
 */

const PAGINATION = {
  INITIAL_PAGE: 1,
  ITEMS_PER_PAGE: 50,
  PAGES_TO_SHOW: 5,
  LABEL_NEXT: '>',
  LABEL_PREVIOUS: '<'
};

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

  const hasOmittedPreviousPages = PaginationService.hasOmittedPreviousPages(
    previousValues
  );
  const hasOmittedNextPages = PaginationService.hasOmittedNextPages(
    nextValues,
    totalPages
  );

  const isFirstOrLastPage = page === totalPages || page === 1;

  return (
    <PaginationContainer
      page={page}
      totalPages={totalPages}
      onChange={onChange}
      nextLabel={nextLabel}
      previousLabel={previousLabel}
    >
      <PaginationButtonContainer value={1} />
      {hasOmittedPreviousPages && <PageButton>...</PageButton>}
      {previousValues.map(item => (
        <PaginationButtonContainer key={item} value={item} />
      ))}
      {!isFirstOrLastPage && (
        <PaginationButtonContainer key={page} value={page} />
      )}
      {nextValues.map(item => (
        <PaginationButtonContainer key={item} value={item} />
      ))}
      {hasOmittedNextPages && <PageButton>...</PageButton>}
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
  page: PAGINATION.INITIAL_PAGE,
  perPage: PAGINATION.ITEMS_PER_PAGE,
  pagesToShow: PAGINATION.PAGES_TO_SHOW,
  nextLabel: PAGINATION.LABEL_NEXT,
  previousLabel: PAGINATION.LABEL_PREVIOUS
};
/**
 * @component Pagination
 */
export default Pagination;
