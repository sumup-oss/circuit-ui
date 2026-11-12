'use client';

import {
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  useId,
  type Ref,
  useState,
  useMemo,
} from 'react';
import { TableHeader } from './components/TableHeader/TableHeader.js';
import { Row } from './components/Row/Row.js';
import {
  isArrowDown,
  isArrowLeft,
  isArrowRight,
  isArrowUp,
  isControlEnd,
  isControlHome,
  isEnd,
  isHome,
  isPageDown,
  isPageUp,
} from '../../util/key-codes.js';
import classes from './DataGrid.module.css';
import { clsx } from '../../styles/clsx.js';
import { applyMultipleRefs } from '../../util/refs.js';
import type {
  Column,
  MobileConfig,
  WithColumnPicker,
  WithFilters,
  WithSearchBar,
  WithPagination,
} from './types.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import type { Locale } from '../../util/i18n.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { utilClasses } from '../../styles/utility.js';
import { FilterBar } from './components/FilterBar/FilterBar.js';
import { debounce } from '../../util/helpers.js';
import type { FilterValues } from './components/FilterBar/components/Filters/FilterSheet/index.js';
import { Pagination } from './components/Pagination/Pagination.js';

import { MobileRow } from './components/MobileRow/MobileRow.js';
import { isStringArray } from '../../util/type-check.js';

export interface DataGridProps<P>
  extends WithPagination,
    HTMLAttributes<HTMLTableElement>,
    WithSearchBar,
    WithFilters,
    WithColumnPicker {
  /**
   * The columns to display, in order. Each column defines its header label,
   * data type, and how to read and render the cell value from a row.
   */
  columns: Column<P>[];
  /**
   * The rows of the grid, one object per row. Columns use this data to
   * render their cell values.
   */
  data: P[];
  /**
   * A function that computes a unique id per record.
   * Recommended for optimizing performance
   */
  getRowId?: (row: P) => string;
  /**
   * Label to be used as the table's caption.
   * Captions help screen reader users understand what the table is about
   * and decide if they want to read it.
   */
  label: string;
  /**
   * Configuration for the mobile layout. When provided, the grid renders as
   * a list of items on viewports at or below `mobileBreakpoint`. Use `slots`
   * to map column ids to the list item's content areas.
   * If omitted, the grid is displayed as a table on all viewports.
   */
  mobileConfig?: MobileConfig<P>;
  /**
   * The maximum viewport width (in pixels) at which the mobile layout is
   * used. Only applies when `mobileConfig` is provided.
   * @default 768
   */
  mobileBreakpoint?: number;
  /**
   * One or more [IETF BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
   * locale identifiers such as `'de-DE'` or `['GB', 'en-US']`.
   * When passing an array, the first supported locale is used.
   */
  formattingLocale?: Locale;
  /**
   * A ref forwarded to the underlying `table` element (or to the list
   * element when the mobile layout is rendered).
   */
  ref?: Ref<HTMLTableElement>;
}

/**
 * The DataGrid component displays tabular data and allows users to navigate,
 * edit, and act on records directly within the table.
 */
export function DataGrid<P>({
  data,
  columns,
  getRowId,
  className,
  label,
  mobileConfig,
  formattingLocale: customFormattingLocale,
  mobileBreakpoint = 768,
  searchBarConfig,
  ref,
  filtersConfig,
  columnPickerConfig,
  pagination,
  ...props
}: DataGridProps<P>) {
  const gridId = useId();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterValues>({});
  const [visibleColumns, setVisibleColumns] = useState(columns);

  useEffect(() => {
    const storedColumns = sessionStorage
      .getItem(`cui-grid-${columnPickerConfig?.gridId}-visible-columns`)
      ?.split('|');
    const isValid = isStringArray(storedColumns) && storedColumns.length > 0;
    setVisibleColumns(
      isValid
        ? columns.filter(({ id }) => storedColumns.includes(id))
        : columns,
    );
  }, [columns, columnPickerConfig?.gridId]);

  const isMobile = useMedia(`(max-width: ${mobileBreakpoint}px)`);
  const isMobileView = isMobile && mobileConfig;
  const { formattingLocale } = useI18n({
    formattingLocale: customFormattingLocale,
  });
  const internalRef = useRef<HTMLTableElement>(null);

  const debouncedOnSearch = useMemo(
    () =>
      searchBarConfig?.onSearch
        ? debounce(searchBarConfig.onSearch, 300)
        : undefined,
    [searchBarConfig?.onSearch],
  );

  const onSearchChange = useCallback(
    (query: string) => {
      if (searchBarConfig) {
        setSearchQuery(query);
        debouncedOnSearch?.(query);
      }
      return () => {
        if (debouncedOnSearch) {
          debouncedOnSearch.cancel();
        }
      };
    },
    [debouncedOnSearch, searchBarConfig],
  );

  const onActiveFiltersChange: NonNullable<
    WithFilters['filtersConfig']
  >['onFilter'] = useCallback(
    (...args) => {
      const [filters] = args;
      setActiveFilters(filters);
      filtersConfig?.onFilter(...args);
    },
    [filtersConfig],
  );

  const handleClickEvent = useCallback((event: MouseEvent) => {
    const table = internalRef.current;
    const target = (event.target as HTMLTableCellElement).closest('th, td');
    if (!target || !table) {
      return;
    }
    const activeCell = table?.querySelector(':is(td, th)[tabindex="0"]');
    const currentX = Number(activeCell?.getAttribute('data-x'));
    const currentY = Number(activeCell?.getAttribute('data-y'));
    const newX = Number(target?.getAttribute('data-x'));
    const newY = Number(target?.getAttribute('data-y'));
    if (newX !== currentX || newY !== currentY) {
      const newActiveCell = table.querySelector(
        `[data-x="${newX}"][data-y="${newY}"]`,
      ) as HTMLTableCellElement;

      activeCell?.setAttribute('tabindex', '-1');
      newActiveCell?.setAttribute('tabindex', '0');
      if (!newActiveCell.contains(document.activeElement)) {
        newActiveCell?.focus();
      }
    }
  }, []);

  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      const table = internalRef.current;
      if (!table) {
        return;
      }
      const totalRows = isMobileView ? data.length - 1 : data.length;
      const activeCell = table?.querySelector(':is(td, th)[tabindex="0"]');
      // ignore event when navigating inside a built-in interactive cell elements
      // that use `useFocusList`, like row actions.
      if ((event.target as HTMLElement).hasAttribute('data-focus-list')) {
        return;
      }
      const currentX = Number(activeCell?.getAttribute('data-x'));
      const currentY = Number(activeCell?.getAttribute('data-y'));
      let newX = currentX;
      let newY = currentY;
      if (isArrowUp(event) && currentY > 0) {
        newY = currentY - 1;
      }
      if (isArrowDown(event) && currentY < totalRows) {
        newY = currentY + 1;
      }
      if (!isMobileView) {
        if (isArrowRight(event) && currentX < visibleColumns.length - 1) {
          newX = currentX + 1;
        }
        if (isArrowLeft(event) && currentX > 0) {
          newX = currentX - 1;
        }
        if (isHome(event)) {
          newX = 0;
        }
        if (isEnd(event)) {
          newX = visibleColumns.length - 1;
        }
      }

      if (isPageUp(event)) {
        newY = Math.max(0, currentY - 5);
      }
      if (isPageDown(event)) {
        newY = Math.min(totalRows, currentY + 5);
      }

      if (isControlHome(event)) {
        newY = 0;
        newX = 0;
      }
      if (isControlEnd(event)) {
        newY = totalRows;
        newX = isMobileView ? 1 : visibleColumns.length - 1;
      }
      if (newX !== currentX || newY !== currentY) {
        const newActiveCell = table.querySelector(
          `[data-x="${newX}"][data-y="${newY}"]`,
        ) as HTMLTableCellElement;

        activeCell?.setAttribute('tabindex', '-1');
        newActiveCell?.setAttribute('tabindex', '0');
        newActiveCell?.focus();
      }
    },
    [data, visibleColumns, isMobileView],
  );

  useEffect(() => {
    internalRef.current?.addEventListener('keydown', handleKeyboardEvent);
    internalRef.current?.addEventListener('click', handleClickEvent);
    return () => {
      internalRef.current?.removeEventListener('keydown', handleKeyboardEvent);
      internalRef.current?.removeEventListener('click', handleClickEvent);
    };
  }, [handleKeyboardEvent, handleClickEvent]);

  useEffect(() => {
    columns.forEach(({ maxWidth, minWidth, id, type }) => {
      if (type.name === 'row-actions' || type.name === 'quick-actions') {
        return;
      }
      if (maxWidth) {
        internalRef.current?.style.setProperty(
          `--${id}-col-max-width`,
          `${maxWidth}px`,
        );
      }
      if (minWidth) {
        internalRef.current?.style.setProperty(
          `--${id}-col-min-width`,
          `${minWidth}px`,
        );
      }
    });
  }, [columns]);

  const onVisibleColumnChange = useCallback(
    (value: string[]) => {
      const newValue = columns.filter(({ id }) => value.includes(id));
      setVisibleColumns(newValue);
      sessionStorage.setItem(
        `cui-grid-${columnPickerConfig?.gridId}-visible-columns`,
        value.join('|'),
      );
    },
    [columns, columnPickerConfig?.gridId],
  );

  const showFilterBar = filtersConfig || searchBarConfig || columnPickerConfig;

  return (
    <div
      className={clsx(
        classes.wrapper,
        isMobileView && classes['mobile-wrapper'],
      )}
    >
      {showFilterBar && (
        <FilterBar
          searchBarConfig={
            searchBarConfig
              ? { ...searchBarConfig, onSearch: onSearchChange }
              : undefined
          }
          onVisibleColumnChange={onVisibleColumnChange}
          columns={columns}
          visibleColumns={visibleColumns}
          isMobile={isMobile}
          activeFilters={activeFilters}
          filtersConfig={
            filtersConfig
              ? { ...filtersConfig, onFilter: onActiveFiltersChange }
              : undefined
          }
          searchQuery={searchQuery}
          columnPickerConfig={columnPickerConfig}
        />
      )}
      <div className={classes.table}>
        <table
          ref={applyMultipleRefs(ref, internalRef)}
          className={clsx(classes.base, className)}
          // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: grid is valid role for table
          role="grid"
          {...props}
        >
          <caption className={utilClasses.hideVisually}>{label}</caption>
          {!isMobileView && <TableHeader columns={visibleColumns} />}

          <tbody>
            {data.map((value, index) =>
              isMobileView ? (
                <MobileRow
                  columns={columns}
                  formattingLocale={formattingLocale}
                  key={getRowId ? getRowId(value) : `${gridId}-${index}`}
                  rowIndex={index}
                  rowId={getRowId ? getRowId(value) : `${gridId}-${index}`}
                  data={value}
                  mobileConfig={mobileConfig}
                />
              ) : (
                <Row
                  rowIndex={index}
                  key={getRowId ? getRowId(value) : `${gridId}-${index}`}
                  columns={visibleColumns}
                  formattingLocale={formattingLocale}
                  data={value}
                  className={classes.row}
                />
              ),
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination {...pagination} />
      )}
    </div>
  );
}
