import { memo, useCallback, useId, useState, type ChangeEvent } from 'react';
import classes from './FilterBar.module.css';
import { SearchInput } from '../../../SearchInput/index.js';
import { ColumnPicker } from './components/ColumnPicker/ColumnPicker.js';
import type { Column, WithColumnPicker, WithSearchBar } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import { Filter, Refresh } from '@sumup-oss/icons';
import { TriggerButton } from './components/TriggerButton/TriggerButton.js';
import { useTranslations } from '../../../../hooks/useTranslations/useTranslations.js';
import { translations } from './translations/index.js';
import { Status } from '../../../Status/index.js';
import type { FilterValue } from '../Filters/Filter/types.js';
import { FilterWrapper } from '../Filters/Filter/index.js';
import { Button } from '../../../Button/index.js';
import {
  FilterSheet,
  type FilterValues,
} from '../Filters/FilterSheet/index.js';

export interface FilterBarProps<P> extends WithColumnPicker, WithSearchBar {
  onVisibleColumnChange: (value: string[]) => void;
  columns: Column<P>[];
  visibleColumns: Column<P>[];
  isMobile?: boolean;
  onFilter?: (value: Record<string, unknown>) => void;
  searchQuery: string;
}

const FilterBarComponent = <P,>({
  onVisibleColumnChange,
  columns,
  isMobile,
  visibleColumns,
  searchBarConfig,
  searchQuery,
  columnPickerConfig,
  onFilter,
}: FilterBarProps<P>) => {
  const filterCountId = useId();
  const { label: searchLabel, onSearch, clearLabel } = searchBarConfig ?? {};
  const [open, setOpen] = useState(false);
  const { filtersLabel } = useTranslations({}, translations);
  const [value, setValue] = useState<FilterValues>({});
  const activeFiltersCount = Object.keys(value).length;

  const onChange = useCallback(
    ({ target: { value: searchTerm } }: ChangeEvent<HTMLInputElement>) => {
      onSearch?.(searchTerm);
    },
    [onSearch],
  );

  const onFilterChange = (column: string, filter?: FilterValue) => {
    setValue((prev) => {
      const newValue = { ...prev };
      if (filter === undefined) {
        delete newValue[column];
      } else {
        newValue[column] = filter;
      }
      onFilter?.(newValue);
      return newValue;
    });
  };

  function onMobileFiltersChange(filters: FilterValues) {
    setValue(filters);
    onFilter?.(filters);
  }
  function clearAllFilters() {
    setValue({});
    onFilter?.({});
  }

  return (
    <div
      role="toolbar"
      className={clsx(classes.base, isMobile && classes['mobile-view'])}
    >
      {!isMobile && (
        <div className={classes['filters-wrapper']}>
          <div className={classes.filters}>
            {visibleColumns.map(({ type, id, filter, label, filterConfig }) => (
              <FilterWrapper
                key={`${id}-filter`}
                labels={filterConfig?.labels}
                column={{ type, label, filter }}
                value={value[id]}
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
              Clear all
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
            <TriggerButton
              icon={Filter}
              onClick={() => setOpen(true)}
              aria-describedby={filterCountId}
            >
              {filtersLabel}
            </TriggerButton>
            <FilterSheet
              open={open}
              onClose={() => setOpen(false)}
              columns={visibleColumns}
              values={value}
              onApply={onMobileFiltersChange}
              title={filtersLabel}
              clearAllButtonLabel="Clear all"
            />
          </div>
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
            onClear={() => onSearch('')}
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
