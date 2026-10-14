import { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Popover } from '../../../../../Popover/Popover.js';
import { WeekView } from '@sumup-oss/icons';
import classes from './ColumnPicker.module.css';
import { CheckboxGroup } from '../../../../../CheckboxGroup/index.js';
import type { Column } from '../../../../types.js';
import { TriggerButton } from '../TriggerButton/TriggerButton.js';

export interface ColumnPickerProps<P> {
  onChange: (value: string[]) => void;
  columns: Column<P>[];
  visibleColumns: Column<P>[];
}

export const ColumnPicker = <P,>({
  columns,
  onChange,
  visibleColumns,
}: ColumnPickerProps<P>) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = useMemo(
    () =>
      columns.map(({ id, label }) => ({
        value: id,
        label,
        disabled: visibleColumns.length === 1 && visibleColumns[0].id === id,
      })),
    [columns, visibleColumns],
  );
  const value = useMemo(
    () => visibleColumns.map(({ id }) => id),
    [visibleColumns],
  );

  const onColumnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const activeValues = new Set(value);
      const { checked, value: inputValue } = event.target;
      if (checked) {
        activeValues.add(inputValue);
      } else {
        activeValues.delete(inputValue);
      }
      onChange(Array.from(activeValues));
    },
    [value, onChange],
  );

  return (
    <Popover
      isOpen={isOpen}
      onToggle={setIsOpen}
      hideCloseButton
      offset={10}
      placement="bottom-end"
      contentClassName={classes.picker}
      component={(props) => (
        <TriggerButton {...props} icon={WeekView}>
          Pick Columns
        </TriggerButton>
      )}
    >
      <CheckboxGroup
        label="Choose the column you want to display on this table"
        name="column-picker"
        value={value}
        onChange={onColumnChange}
        options={options}
      />
    </Popover>
  );
};
