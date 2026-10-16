import { memo, useCallback, type ChangeEvent } from 'react';
import classes from './FilterBar.module.css';
import { SearchInput } from '../../../SearchInput/index.js';
import { debounce } from '../../../../util/helpers.js';
import { ColumnPicker } from './components/ColumnPicker/ColumnPicker.js';
import type { Column, WithColumnPicker } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import { Filter } from '@sumup-oss/icons';
import { TriggerButton } from './components/TriggerButton/TriggerButton.js';

export interface FilterBarProps<P> extends WithColumnPicker {
  onSearch: (query: string) => void;
  onVisibleColumnChange: (value: string[]) => void;
  columns: Column<P>[];
  visibleColumns: Column<P>[];
  isMobile?: boolean;
}

const FilterBarComponent = <P,>({
  onSearch,
  onVisibleColumnChange,
  columns,
  isMobile,
  visibleColumns,
  columnPickerConfig,
}: FilterBarProps<P>) => {
  const onChange = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value),
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
        {isMobile && <TriggerButton icon={Filter}>Filter</TriggerButton>}
        <SearchInput
          /*TODO add labels*/
          label="Search"
          hideLabel
          placeholder="Search"
          size="s"
          onChange={onChange}
          className={classes.search}
        />
        {columnPickerConfig && (
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
