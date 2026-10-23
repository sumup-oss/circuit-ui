import {
  type HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import classes from './Cell.module.css';
import { clsx } from '../../../../styles/clsx.js';
import { getAllFocusableElements } from '../../DataGridService.js';

export interface CellProps
  extends HTMLAttributes<HTMLTableCellElement | HTMLTableHeaderCellElement> {
  as?: 'td' | 'th';
}

export const Cell = memo(
  ({ as: Element = 'td', className, ...props }: CellProps) => {
    const ref = useRef<HTMLTableCellElement>(null);

    useEffect(() => {
      const focusableElements = getAllFocusableElements(ref.current);
      focusableElements.forEach((element) => {
        element.setAttribute('tabindex', '-1');
      });
    }, []);

    const onCellFocused = useCallback(() => {
      const focusableElements = getAllFocusableElements(ref.current);

      focusableElements.forEach((element) => {
        element.setAttribute('tabindex', '0');
      });
    }, []);

    const onCellBlurred = useCallback(() => {
      const focusableElements = getAllFocusableElements(ref.current);
      focusableElements.forEach((element) => {
        element.setAttribute('tabindex', '-1');
      });
    }, []);

    return (
      <Element
        ref={ref}
        role="gridcell"
        onFocus={onCellFocused}
        onBlur={onCellBlurred}
        className={clsx(classes.base, className)}
        {...props}
      />
    );
  },
);
