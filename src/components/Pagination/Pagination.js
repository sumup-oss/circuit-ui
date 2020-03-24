/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import * as PaginationService from './PaginationService';
import PaginationContainer from './PaginationContainer';
import PaginationButton from './PaginationButton';
import PageButton from './PageButton';
import Separator from './Separator';

const PAGINATION = {
  INITIAL_PAGE: 1,
  ITEMS_PER_PAGE: 50,
  PAGES_TO_SHOW: 5,
  LABEL_NEXT: '>',
  LABEL_PREVIOUS: '<',
  FOOTER: null,
  ALIGN: 'center',
  JUSTIFY: 'center'
};

const PaginationButtonContainer = ({ currentPage, page, onChange }) => {
  const active = page === currentPage;
  return (
    <PaginationButton
      active={active}
      currentPage={currentPage}
      onClick={onChange}
      key={currentPage}
      data-testid="pagination-button-page"
    />
  );
};

PaginationButtonContainer.propTypes = {
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  page: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

/**
 * Pagination is a component to show pages numbers calculate dynamically.
 */
const Pagination = ({
  page,
  perPage,
  total,
  pagesToShow,
  onChange,
  nextLabel,
  previousLabel,
  footer,
  ...props
}) => {
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
        {...props}
      >
        {Array.from({ length: totalPages }).map((item, index) => (
          <PaginationButtonContainer
            key={item}
            currentPage={index + 1}
            page={page}
            onChange={onChange}
          />
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
      {...props}
    >
      <PaginationButtonContainer
        currentPage={1}
        page={page}
        onChange={onChange}
      />
      {hasOmittedPreviousPages && (
        <PageButton disabled>{Separator()}</PageButton>
      )}
      {previousValues.map(item => (
        <PaginationButtonContainer
          key={item}
          currentPage={item}
          page={page}
          onChange={onChange}
        />
      ))}
      {!isFirstOrLastPage && (
        <PaginationButtonContainer
          key={page}
          currentPage={page}
          page={page}
          onChange={onChange}
        />
      )}
      {nextValues.map(item => (
        <PaginationButtonContainer
          key={item}
          currentPage={item}
          page={page}
          onChange={onChange}
        />
      ))}
      {hasOmittedNextPages && <PageButton disabled>{Separator()}</PageButton>}
      <PaginationButtonContainer
        currentPage={totalPages}
        page={page}
        onChange={onChange}
      />
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
  nextLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * Label to be used on button of previous
   */
  previousLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
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
