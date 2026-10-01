import type { ReactNode } from 'react';

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
  type: ColumnType;
  /**
   * Custom render function for the cell.
   * When no render function is provided, default formatting is applied based on the column type.
   */
  render?: (value: P) => ReactNode;
  /**
   * Whether to display a filter for this column.
   * Depending on the column type, the filter may be a text input, a dropdown with single or multi selection, or a date range.
   */
  filter?: boolean;
  /**
   * A sort function for the column.
   */
  sortFn?: (a: P, b: P) => number;
};

export type Option = { label: string; value: string };

export type ColumnType =
  | { name: 'text' }
  | { name: 'boolean' }
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
  | {
      name: 'singleSelection';
      options: Option[];
      /**
       * Custom render function the individual option.
       * If not provided, the default render function will be used, rendering the value's label.
       */
      render?: (value: Option, options: Option[], key: string) => ReactNode;
    }
  | {
      name: 'multiSelection';
      options: Option[];

      /**
       * Custom render function the individual option.
       * If not provided, the default render function will be used, rendering a comma-separated list of the values' labels.
       */
      render?: (value: Option[], options: Option[], key: string) => ReactNode;
    };
