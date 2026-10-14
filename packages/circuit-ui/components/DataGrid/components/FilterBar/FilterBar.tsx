import { memo, useCallback, type ChangeEvent } from 'react';
import classes from './FilterBar.module.css';
import { SearchInput } from '../../../SearchInput/index.js';
import { debounce } from '../../../../util/helpers.js';
import { ColumnPicker } from './components/ColumnPicker/ColumnPicker.js';
import type { Column } from '../../types.js';
import { clsx } from '../../../../styles/clsx.js';
import { IconButton } from '../../../Button/index.js';
import { Filter } from '@sumup-oss/icons';

export interface FilterBarProps<P> {
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
}: FilterBarProps<P>) => {
  const onChange = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value),
      300,
    ),
    [],
  );

  return (
    <div className={clsx(classes.base, isMobile && classes['mobile-view'])}>
      {!isMobile && (
        <div className={classes['active-filters']}>- Filters go here -</div>
      )}
      <div className={classes['search-config']}>
        {isMobile && (
          <IconButton
            size="s"
            style={{
              borderRadius: 'var(--cui-border-radius-pill)',
            }}
            icon={Filter}
          >
            Filter
          </IconButton>
        )}
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
