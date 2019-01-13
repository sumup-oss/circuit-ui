import React from 'react';
import PropTypes from 'prop-types';
import * as PaginationService from './PaginationService';
import PaginationContainer from './PaginationContainer';
import PaginationButton from './PaginationButton';
import PageButton from './PageButton';
import Separator from './Separator';

/**
 * Pagination is a component to show pages numbers calculate dynamically.
 */

const PAGINATION = {
  INITIAL_PAGE: 1,
  ITEMS_PER_PAGE: 50,
  PAGES_TO_SHOW: 5,
  LABEL_NEXT: '>',
  LABEL_PREVIOUS: '<',
  FOOTER: null
};

const Pagination = ({
  page,
  perPage,
  total,
  pagesToShow,
  onChange,
  nextLabel,
  previousLabel,
  footer
}) => {
  const PaginationButtonContainer = ({ currentPage }) => {
    const active = page === currentPage;
    return (
      <PaginationButton
        active={active}
        currentPage={currentPage}
        onClick={onChange}
        key={currentPage}
      />
    );
  };

  PaginationButtonContainer.propTypes = {
    currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired
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
        footer={footer}
      >
        {Array.from({ length: totalPages }).map((item, index) => (
          <PaginationButtonContainer key={item} currentPage={index + 1} />
        ))}
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
      footer={footer}
    >
      <PaginationButtonContainer currentPage={1} />
      {hasOmittedPreviousPages && (
        <PageButton disabled>{Separator()}</PageButton>
      )}
      {previousValues.map(item => (
        <PaginationButtonContainer key={item} currentPage={item} />
      ))}
      {!isFirstOrLastPage && (
        <PaginationButtonContainer key={page} currentPage={page} />
      )}
      {nextValues.map(item => (
        <PaginationButtonContainer key={item} currentPage={item} />
      ))}
      {hasOmittedNextPages && <PageButton disabled>{Separator()}</PageButton>}
      <PaginationButtonContainer currentPage={totalPages} />
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
   * Label to be used on button of next
   */
  nextLabel: PropTypes.string,
  /**
   * Label to be used on button of previous
   */
  previousLabel: PropTypes.string,
  /**
   * Text to be shown on the pagination footer
   */
  footer: PropTypes.string
};

Pagination.defaultProps = {
  page: PAGINATION.INITIAL_PAGE,
  perPage: PAGINATION.ITEMS_PER_PAGE,
  pagesToShow: PAGINATION.PAGES_TO_SHOW,
  nextLabel: PAGINATION.LABEL_NEXT,
  previousLabel: PAGINATION.LABEL_PREVIOUS,
  footer: PAGINATION.FOOTER
};
/**
 * @component Pagination
 */
export default Pagination;
