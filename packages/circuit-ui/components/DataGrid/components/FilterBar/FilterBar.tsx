import { memo, useCallback, type ChangeEvent } from 'react';
import classes from './FilterBar.module.css';
import { SearchInput } from '../../../SearchInput/index.js';
import { debounce } from '../../../../util/helpers.js';
import { ColumnPicker } from './components/ColumnPicker/ColumnPicker.js';
import type { Column } from '../../types.js';

export interface FilterBarProps<P> {
  onSearch: (query: string) => void;
  onVisibleColumnChange: (value: string[]) => void;
  columns: Column<P>[];
  visibleColumns: Column<P>[];
}

const FilterBarComponent = <P,>({
  onSearch,
  onVisibleColumnChange,
  columns,
  visibleColumns,
}: FilterBarProps<P>) => {
  const onChange = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value),
      300,
    ),
    [],
  );
  return (
    <div className={classes.base}>
      <div className={classes['active-filters']}>- Filters go here -</div>
      <div className={classes['search-config']}>
        <SearchInput
          /*TODO add labels*/
          label="Search"
          hideLabel
          placeholder="Search"
          size="s"
          onChange={onChange}
          className={classes.search}
        />
        <ColumnPicker
          columns={columns}
          visibleColumns={visibleColumns}
          onChange={onVisibleColumnChange}
        />
      </div>
    </div>
  );
};

export const FilterBar = memo(FilterBarComponent) as typeof FilterBarComponent;
