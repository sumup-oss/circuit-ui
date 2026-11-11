import { memo, useCallback, useId, useState, type ChangeEvent } from 'react';
import classes from './FilterBar.module.css';
import { SearchInput } from '../../../SearchInput/index.js';
import { ColumnPicker } from './components/ColumnPicker/ColumnPicker.js';
import type {
  Column,
  SortValue,
  WithColumnPicker,
  WithFilters,
  WithSearchBar,
  WithSorting,
} from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import { Filter as FilterIcon, Refresh, Sort } from '@sumup-oss/icons';
import { TriggerButton } from './components/TriggerButton/TriggerButton.js';
import { useTranslations } from '../../../../hooks/useTranslations/useTranslations.js';
import { translations } from './translations/index.js';
import { Status } from '../../../Status/index.js';
import type { FilterValue } from './components/Filters/Filter/types.js';
import { Filter } from './components/Filters/Filter/index.js';
import { Button } from '../../../Button/index.js';
import {
  FilterSheet,
  type FilterValues,
} from './components/Filters/FilterSheet/index.js';
import { SortSheet } from './components/SortSheet/index.js';

export interface FilterBarProps<P>
  extends WithColumnPicker,
    WithSearchBar,
    WithFilters,
    WithSorting {
  onVisibleColumnChange: (value: string[]) => void;
  columns: Column<P>[];
  visibleColumns: Column<P>[];
  isMobile?: boolean;
  activeFilters: FilterValues;
  searchQuery: string;
  sort?: SortValue;
}

const FilterBarComponent = <P,>({
  onVisibleColumnChange,
  columns,
  isMobile,
  visibleColumns,
  searchBarConfig,
  searchQuery,
  columnPickerConfig,
  activeFilters,
  filtersConfig,
  sortConfig,
  sort,
}: FilterBarProps<P>) => {
  const filterCountId = useId();
  const { label: searchLabel, onSearch, clearLabel } = searchBarConfig ?? {};
  const [open, setOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const { filtersLabel } = useTranslations({}, translations);
  const activeFiltersCount = Object.keys(activeFilters).length;

  const onChange = useCallback(
    ({ target: { value: searchTerm } }: ChangeEvent<HTMLInputElement>) => {
      onSearch?.(searchTerm);
      // reset active filters if there are any
      if (filtersConfig && activeFiltersCount > 0) {
        filtersConfig?.onFilter?.({}, searchTerm);
      }
    },
    [onSearch, filtersConfig, activeFiltersCount],
  );
  const onClear = useCallback(() => {
    onSearch?.('');
    // reset active filters if there are any
    if (filtersConfig && activeFiltersCount > 0) {
      filtersConfig.onFilter?.({}, '');
    }
  }, [onSearch, filtersConfig, activeFiltersCount]);

  const onFilterChange = (column: string, filter?: FilterValue) => {
    const newValue = { ...activeFilters };
    if (filter === undefined) {
      delete newValue[column];
    } else {
      newValue[column] = filter;
    }
    if (searchBarConfig) {
      filtersConfig?.onFilter(newValue, searchQuery);
      return;
    }
    filtersConfig?.onFilter(newValue);
  };

  function onMobileFiltersChange(value: FilterValues) {
    if (searchBarConfig) {
      filtersConfig?.onFilter(value, searchQuery);
      return;
    }
    filtersConfig?.onFilter?.(value);
  }
  function clearAllFilters() {
    if (searchBarConfig) {
      filtersConfig?.onFilter({}, searchQuery);
      return;
    }
    filtersConfig?.onFilter?.({});
  }
  return (
    <div
      role="toolbar"
      className={clsx(
        classes.base,
        isMobile && classes['mobile-view'],
        (searchBarConfig || columnPickerConfig) &&
          !filtersConfig &&
          classes['flex-end'],
      )}
    >
      {!isMobile && filtersConfig && (
        <div className={classes['filters-wrapper']}>
          <div className={classes.filters}>
            {visibleColumns.map(({ type, id, filter, label, filterConfig }) => (
              <Filter
                key={`${id}-filter`}
                labels={filterConfig?.labels}
                applyFilterLabel={filtersConfig.applyFilterLabel}
                clearFilterLabel={filtersConfig.clearFilterLabel}
                column={{ type, label, filter }}
                value={activeFilters[id]}
                variant="popover"
                onChange={(filterValue) => onFilterChange(id, filterValue)}
              />
            ))}
          </div>
          {activeFiltersCount > 0 && (
            <Button
              icon={Refresh}
              onClick={clearAllFilters}
              className={classes['clear-button']}
              size="s"
              variant="tertiary"
            >
              {filtersConfig.clearAllLabel}
            </Button>
          )}
        </div>
      )}
      <div className={classes.tools}>
        {isMobile && (
          <div className={classes.wrapper}>
            {activeFiltersCount > 0 && (
              <Status
                aria-hidden
                id={filterCountId}
                className={classes.dot}
                variant="dot"
                color="special"
              >
                {`${activeFiltersCount} ${filtersLabel}`}
              </Status>
            )}
            {filtersConfig && (
              <>
                <TriggerButton
                  icon={FilterIcon}
                  onClick={() => setOpen(true)}
                  aria-describedby={filterCountId}
                >
                  {filtersLabel}
                </TriggerButton>
                <FilterSheet
                  open={open}
                  onClose={() => setOpen(false)}
                  columns={visibleColumns}
                  values={activeFilters}
                  onApply={onMobileFiltersChange}
                  title={filtersLabel}
                  clearAllButtonLabel={filtersConfig.clearAllLabel}
                  applyButtonLabel={filtersConfig.applyFilterLabel}
                />
              </>
            )}
          </div>
        )}
        {isMobile && sortConfig && (
          <>
            <TriggerButton icon={Sort} onClick={() => setSortOpen(true)}>
              {sortConfig.title}
            </TriggerButton>
            <SortSheet
              open={sortOpen}
              onClose={() => setSortOpen(false)}
              columns={columns}
              value={sort}
              onApply={sortConfig.onSort}
              title={sortConfig.title}
              description={sortConfig.description}
              parametersLabel={sortConfig.parametersLabel}
              orderLabel={sortConfig.orderLabel}
              applyLabel={sortConfig.applyLabel}
              clearLabel={sortConfig.clearLabel}
            />
          </>
        )}
        {searchLabel && onSearch && (
          <SearchInput
            label={searchLabel}
            hideLabel
            placeholder={searchLabel}
            size="s"
            onChange={onChange}
            className={classes.search}
            clearLabel={clearLabel}
            value={searchQuery}
            onClear={onClear}
          />
        )}
        {!isMobile && columnPickerConfig && (
          <ColumnPicker
            columns={columns}
            visibleColumns={visibleColumns}
            onChange={onVisibleColumnChange}
            {...columnPickerConfig}
          />
        )}
      </div>
    </div>
  );
};

export const FilterBar = memo(FilterBarComponent) as typeof FilterBarComponent;
