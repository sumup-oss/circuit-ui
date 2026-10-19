import { memo, useCallback, useId, type ChangeEvent } from 'react';
import classes from './FilterBar.module.css';
import { SearchInput } from '../../../SearchInput/index.js';
import { debounce } from '../../../../util/helpers.js';
import { ColumnPicker } from './components/ColumnPicker/ColumnPicker.js';
import type { Column, WithColumnPicker, WithSearchBar } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import { Filter } from '@sumup-oss/icons';
import { TriggerButton } from './components/TriggerButton/TriggerButton.js';
import { useTranslations } from '../../../../hooks/useTranslations/useTranslations.js';
import { translations } from './translations/index.js';
import { Status } from '../../../Status/index.js';

export interface FilterBarProps<P> extends WithColumnPicker, WithSearchBar {
  onVisibleColumnChange: (value: string[]) => void;
  columns: Column<P>[];
  visibleColumns: Column<P>[];
  isMobile?: boolean;
}

const FilterBarComponent = <P,>({
  onVisibleColumnChange,
  columns,
  isMobile,
  visibleColumns,
  searchBarConfig,
  columnPickerConfig,
}: FilterBarProps<P>) => {
  const filterCountId = useId();
  const { label: searchLabel, onSearch } = searchBarConfig ?? {};
  const { activeFiltersCount: activeFiltersCountLabel, filtersLabel } =
    useTranslations({ activeFiltersCount: '' }, translations);
  const activeFiltersCount = 3; // fake count
  const onChange = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) => onSearch?.(event.target.value),
      300,
    ),
    [],
  );

  return (
    <div
      role="toolbar"
      className={clsx(classes.base, isMobile && classes['mobile-view'])}
    >
      {!isMobile && (
        <div className={classes['active-filters']}>- Filters go here -</div>
      )}
      <div className={classes['search-config']}>
        {isMobile && (
          <div className={classes.wrapper}>
            {activeFiltersCount && (
              <Status
                aria-hidden
                id={filterCountId}
                className={classes.dot}
                variant="dot"
                color="special"
              >
                {`${activeFiltersCount} ${activeFiltersCountLabel}`}
              </Status>
            )}
            <TriggerButton icon={Filter} aria-describedby={filterCountId}>
              {filtersLabel}
            </TriggerButton>
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
