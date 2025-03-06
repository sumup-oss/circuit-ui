import { forwardRef } from 'react';

export interface ComparisonTableProps {
  caption: string;
  rows: string[];
  cols: string[];
}

export const ComparisonTable = forwardRef<
  HTMLTableElement,
  ComparisonTableProps
>(({ caption, ...props }, ref) => {
  return (
    <div>
      <table ref={ref} {...props}>
        <caption>{caption}</caption>
      </table>
    </div>
  );
});
