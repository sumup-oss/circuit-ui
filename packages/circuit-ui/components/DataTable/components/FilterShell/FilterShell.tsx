/**
 * Copyright 2026, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import { type ReactNode, useCallback, useState } from 'react';
import { ChevronDown } from '@sumup-oss/icons';

import { Button } from '../../../Button/index.js';
import {
  Popover,
  type PopoverReferenceProps,
} from '../../../Popover/Popover.js';
import type { I18nConfig } from '../../../I18nContext/I18nContext.js';
import { useTranslations } from '../../../../hooks/useTranslations/useTranslations.js';

import classes from './FilterShell.module.css';
import { translations } from './translations/index.js';

export interface FilterShellProps extends Partial<I18nConfig> {
  /**
   * The name of the filter, shown on the trigger button.
   */
  label: string;
  /**
   * The number of active selections. Shown next to the label when it is
   * greater than 0.
   */
  count?: number;
  /**
   * The filter controls.
   */
  children: ReactNode;
  /**
   * Called when the Apply button is clicked. Providing it turns on the
   * footer with the Apply and Clear buttons, for filters that only commit
   * their value on request.
   */
  onApply?: () => void;
  /**
   * Called when the Clear button is clicked. Only shown alongside `onApply`.
   */
  onClear?: () => void;
  /**
   * Called when the popover closes without applying, e.g. on Escape or when
   * clicking outside.
   */
  onDiscard?: () => void;
  /**
   * Label for the Apply button.
   */
  applyButtonLabel?: string;
  /**
   * Label for the Clear button.
   */
  clearButtonLabel?: string;
  className?: string;
}

/**
 * The popover shell shared by all filter types: a trigger button, the
 * filter controls and, optionally, Apply and Clear actions.
 */
export function FilterShell(props: FilterShellProps) {
  const {
    label,
    count = 0,
    children,
    onApply,
    onClear,
    onDiscard,
    applyButtonLabel,
    clearButtonLabel,
    className,
  } = useTranslations(props, translations);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = useCallback(
    (open: boolean | ((prevOpen: boolean) => boolean)) => {
      const next = typeof open === 'function' ? open(isOpen) : open;
      // Popover also reports closing once its animation ends
      if (!next && isOpen) {
        onDiscard?.();
      }
      setOpen(next);
    },
    [isOpen, onDiscard],
  );

  const handleApply = () => {
    onApply?.();
    setOpen(false);
  };

  const triggerLabel = count > 0 ? `${label} (${count})` : label;

  const Trigger = useCallback(
    (triggerProps: PopoverReferenceProps) => (
      <Button
        {...triggerProps}
        type="button"
        variant="secondary"
        size="s"
        navigationIcon={ChevronDown}
        className={className}
      >
        {triggerLabel}
      </Button>
    ),
    [triggerLabel, className],
  );

  return (
    <Popover
      isOpen={isOpen}
      onToggle={handleToggle}
      component={Trigger}
      placement="bottom-start"
      hideCloseButton
    >
      <div className={classes.content}>
        {children}
        {onApply && (
          <div className={classes.footer}>
            <Button
              type="button"
              size="s"
              variant="secondary"
              onClick={onClear}
            >
              {clearButtonLabel}
            </Button>
            <Button
              type="button"
              size="s"
              variant="primary"
              onClick={handleApply}
            >
              {applyButtonLabel}
            </Button>
          </div>
        )}
      </div>
    </Popover>
  );
}
