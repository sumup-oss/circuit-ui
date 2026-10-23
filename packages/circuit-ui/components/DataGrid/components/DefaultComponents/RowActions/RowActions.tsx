import { useState } from 'react';
import {
  ActionMenu,
  type ActionMenuProps,
} from '../../../../ActionMenu/index.js';
import { More } from '@sumup-oss/icons';
import { RowActionButton } from './RowActionButton/RowActionButton.js';

export function RowActions({
  label,
  labelDescription,
  ...props
}: Pick<ActionMenuProps, 'actions'> & {
  label: string;
  labelDescription: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <ActionMenu
      isOpen={open}
      offset={4}
      placement="bottom-end"
      fallbackPlacements={['top-end']}
      onToggle={setOpen}
      component={(btnProps) => (
        <RowActionButton
          {...btnProps}
          tabIndex={-1}
          aria-description={labelDescription}
          icon={More}
        >
          {label}
        </RowActionButton>
      )}
      {...props}
    />
  );
}
