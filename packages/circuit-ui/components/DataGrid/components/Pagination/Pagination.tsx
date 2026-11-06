import { Select } from '../../../Select/index.js';
import type { PaginationConfig } from '../../types.js';
import classes from './Pagination.module.css';
import { IconButton } from '../../../Button/index.js';
import { ChevronLeft, ChevronRight } from '@sumup-oss/icons';
import type { ChangeEvent } from 'react';
import { Body } from '../../../Body/index.js';
import { useTranslations } from '../../../../hooks/useTranslations/useTranslations.js';
import { translations } from './translations/index.js';
import { CircuitError } from '../../../../util/errors.js';
import { useMedia } from '../../../../hooks/useMedia/index.js';

const DEFAULT_OPTIONS = [
  {
    label: '10',
    value: 10,
  },
  {
    label: '25',
    value: 25,
  },
  {
    label: '50',
    value: 50,
  },
];

export function Pagination({
  currentPage = 1,
  itemsPerPage = 10,
  itemsPerPageLabel,
  nextPageLabel,
  previousPageLabel,
  onPageChange,
  onItemsPerPageChange,
  total,
  options,
}: PaginationConfig) {
  const { of } = useTranslations({}, translations);
  const isMobile = useMedia('(max-width: 767px)', true);
  const isValueInOptions = (options ?? DEFAULT_OPTIONS).some(
    (option) => option.value === itemsPerPage,
  );

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !isMobile &&
    !isValueInOptions
  ) {
    throw new CircuitError(
      'DataGrid Pagination',
      'The `itemsPerPage` value must be one of the provided options`',
    );
  }

  const onNextPageClick = () => {
    onPageChange(currentPage + 1);
  };

  const onPreviousPageClick = () => {
    onPageChange(currentPage - 1);
  };

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onItemsPerPageChange(Number(event.target.value));
  };

  return (
    <div className={classes.base}>
      <div className={classes.controls}>
        <Select
          label={itemsPerPageLabel}
          size="s"
          hideLabel
          onChange={onChange}
          options={options ?? DEFAULT_OPTIONS}
          value={
            isValueInOptions
              ? itemsPerPage
              : (options ?? DEFAULT_OPTIONS)[0].value
          }
        />
        <Body aria-hidden size="s">
          {itemsPerPageLabel}
        </Body>
      </div>
      <div className={classes.controls}>
        <Body role="status" aria-live="polite" size="s" color="subtle">
          {currentPage} {of} {total}
        </Body>
        <IconButton
          className={classes.previous}
          disabled={currentPage === 1}
          onClick={onPreviousPageClick}
          icon={ChevronLeft}
          size="s"
        >
          {previousPageLabel}
        </IconButton>
        <IconButton
          className={classes.next}
          disabled={currentPage === total}
          onClick={onNextPageClick}
          icon={ChevronRight}
          size="s"
        >
          {nextPageLabel}
        </IconButton>
      </div>
    </div>
  );
}
