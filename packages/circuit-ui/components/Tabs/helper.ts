import { type KeyboardEvent, useState } from 'react';
import {
  isArrowDown,
  isArrowLeft,
  isArrowRight,
} from '../../util/key-codes.js';

/**
 * A helper function for managing the state and interactions of tabs.
 *
 * @param {string[]} items - An array of strings representing the IDs of the tabs.
 * @param {number} [initialSelectedId] - An optional index of the initially selected tab. Defaults to 0 if not provided.
 */
export const useTabState = (items: string[], initialSelectedId?: number) => {
  const [selectedId, setSelectedId] = useState(items[initialSelectedId ?? 0]);

  const handleTabKeyDown = (event: KeyboardEvent) => {
    const selectedIndex = items.indexOf(selectedId);

    if (isArrowLeft(event)) {
      const previousIndex = selectedIndex - 1;
      if (previousIndex >= 0) {
        const previousId = items[previousIndex];
        setSelectedId(previousId);
        document.getElementById(`tab-${previousId}`)?.focus();
      }
    } else if (isArrowRight(event)) {
      const nextIndex = selectedIndex + 1;
      if (nextIndex <= items.length - 1) {
        const nextId = items[nextIndex];
        setSelectedId(nextId);

        document.getElementById(`tab-${nextId}`)?.focus();
      }
    } else if (isArrowDown(event)) {
      document.getElementById(`panel-${selectedId}`)?.focus();
    }
  };

  const handleTabClick = (id: string) => {
    setSelectedId(id);
  };

  return {
    handleTabKeyDown,
    handleTabClick,
    selectedId,
  };
};
