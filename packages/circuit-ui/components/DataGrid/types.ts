import type { ActionMenuItemProps } from '../ActionMenu/index.js';
import type { ReactNode } from 'react';
import type { CustomAction } from './components/DefaultComponents/QuickActions/QuickActions.js';
import type { ClickEvent } from '../../types/events.js';

export type BasicType =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | undefined;

export type Column<P> = {
  /**
   * Unique identifier for the column.
   */
  id: string;
  /**
   * Label for the column header.
   */
  label: string;
  /**
   * the type of data the column contains.
   */
  type: ColumnType<P>;
  /**
   * The maximum column width
   */
  maxWidth?: number;
  /**
   * The minimum column width
   */
  minWidth?: number;
  /**
   * Custom function to retrieve the value for the cell from the data object.
   * if a render function is provided, `getValue()` will not be used.
   */
  getValue?: (row: P) => BasicType;
  /**
   * Whether to display a filter for this column.
   * Depending on the column type, the filter may be a text input, a dropdown with single or multi selection, or a date range.
   */
  filter?: boolean;
  /**
   * A sort function for the column.
   */
  sortFn?: (a: P, b: P) => number;
  isRowHeader?: boolean;
};

type RowActions<P> = {
  name: 'row-actions';
  actions:
    | CustomActionMenuActions<P>[]
    | ((value: P) => CustomActionMenuActions<P>[]);
  label: string;
  labelDescription: (value: P) => string;
};

type QuickActions<P> = {
  name: 'quick-actions';
  /**
   * IconButton actions that are inlined in the cell.
   * Limit the number of actions to 4
   */
  actions: CustomAction<P>[] | ((value: P) => CustomAction<P>[]);
};

type SingleSelectionBase = {
  name: 'singleSelection';
  render?: (value: Option) => ReactNode;
};

type MultiSelectionBase = {
  name: 'multiSelection';
  /**
   * Custom renders the selected options.
   * @param value: the row data
   * @param key: a unique React key prop that should be added to the resulting ReactNode
   * @returns ReactNode
   */
  render?: (value: Option, key: string) => ReactNode;
};

type SelectionStringOptions = {
  options: Options;
  getOptionLabel?: never;
  getOptionValue?: never;
};

type SelectionUnknownOptions = {
  options: any[];
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
};

type SingleSelection = SingleSelectionBase &
  (SelectionStringOptions | SelectionUnknownOptions);
type MultiSelection = MultiSelectionBase &
  (SelectionStringOptions | SelectionUnknownOptions);

export type Option = { label: string; value: string | number };
type Options = Option[];

export type ColumnType<P> =
  | { name: 'text' }
  | { name: 'boolean'; accessibleLabel: (value: boolean) => string }
  | {
      name: 'number';
      /**
       * Formatting options for the number column as per the [Intl.NumberFormatOptions interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options).
       */
      formattingOptions?: Intl.NumberFormatOptions;
    }
  | {
      name: 'date';
      /**
       * The verbosity of the displayed datetime value.
       * @default 'short'
       */
      formatStyle?: 'long' | 'short' | 'narrow';

      /**
       * Whether to include the time when displaying the datetime as an absolute
       * value.
       * @default false
       */
      includeTime?: boolean;
    }
  | SingleSelection
  | MultiSelection
  | RowActions<P>
  | QuickActions<P>
  | {
      name: 'custom';
      render?: (value: P) => ReactNode;
    };

type CustomActionMenuActions<P> = Omit<
  ActionMenuItemProps,
  'aria-description' | 'children' | 'onClick'
> & {
  onClick: (event: ClickEvent, value: P) => void;
  children: string;
  /**
   * Required description to be announced by screen readers
   * with details about the current row to ensure accessibility.
   * For example, an action with the "Edit details" label should be announced
   * "Edit details for Jane Doe" for screen reader users.
   */
  'aria-description': (value: P) => string;
};
