import { useId, useRef } from 'react';
import classes from './QuickActions.module.css';
import { RowActionButton } from '../RowActions/RowActionButton/RowActionButton.js';
import type { IconButtonProps } from '../../../../Button/index.js';
import type { ClickEvent } from '../../../../../types/events.js';

export type CustomAction<P> = Omit<
  IconButtonProps,
  'onClick' | 'aria-description'
> & {
  /**
   * Required description to be announced by screen readers
   * with details about the current row to ensure accessibility.
   * For example, an action with the "Edit details" label should be announced
   * "Edit details for Jane Doe" for screen reader users.
   */
  'aria-description': (value: P) => string;
  onClick: (event: ClickEvent, value: P) => void;
};

export function QuickActions<P>({
  actions,
  value,
}: {
  actions: CustomAction<P>[];
  value: P;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.base} ref={ref}>
      {actions.map(({ 'aria-description': description, ...action }, index) => (
        <RowActionButton
          {...action}
          onClick={(event) => action.onClick?.(event, value)}
          key={`quick-actions-${id}-${index}`}
          aria-description={description(value)}
        />
      ))}
    </div>
  );
}
