import { memo, useCallback, type ChangeEvent } from 'react';
import classes from './FilterBar.module.css';
import { SearchInput } from '../../../SearchInput/index.js';
import { debounce } from '../../../../util/helpers.js';

export interface FilterBarProps {
  onSearch: (query: string) => void;
}

export const FilterBar = memo(({ onSearch }: FilterBarProps) => {
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
      </div>
    </div>
  );
});
