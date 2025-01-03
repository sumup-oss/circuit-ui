/**
 * Copyright 2024, SumUp Ltd.
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

import { forwardRef, useCallback, useId, useState } from 'react';

import type { ClickEvent } from '../../types/events.js';
import { clsx } from '../../styles/clsx.js';
import { useMedia } from '../../hooks/useMedia/index.js';
import { useStackContext } from '../StackContext/index.js';
import { CloseButton } from '../CloseButton/index.js';
import { Headline } from '../Headline/index.js';
import { Body } from '../Body/index.js';
import { Button, type ButtonProps } from '../Button/index.js';
import { useI18n } from '../../hooks/useI18n/useI18n.js';
import { Popover, type PopoverProps } from '../Popover/index.js';

import classes from './Toggletip.module.css';
import { translations } from './translations/index.js';

export type ToggletipProps = Omit<
  PopoverProps,
  'actions' | 'isOpen' | 'onToggle'
> & {
  /**
   * The optional headline acts as the toggletip's [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
   * Keep it short and under 120 characters.
   */
  headline?: string;
  /**
   * Use the body text to provide additional help or to define a term.
   * The body acts as the toggletip's [accessible description](https://w3c.github.io/accname/#dfn-accessible-description)
   * or as its [accessible name](https://w3c.github.io/accname/#dfn-accessible-name)
   * when no headline is present.
   */
  body: string;
  /**
   * Use the optional action button to point the user to additional information
   * or enable a contextual action. Use one strong, clear imperative verb and
   * follow with a one-word object if needed to clarify.
   */
  action?: Omit<ButtonProps, 'variant' | 'size'>;
  /**
   * Whether the toggletip is initially open. Default: 'false'.
   */
  defaultOpen?: boolean;
};

export const Toggletip = forwardRef<HTMLDialogElement, ToggletipProps>(
  (props, ref) => {
    const {
      defaultOpen = false,
      placement = 'top',
      offset = 12,
      headline,
      body,
      action,
      closeButtonLabel,
      className,
      style,
      locale,
      ...rest
    } = useI18n(props, translations);
    const zIndex = useStackContext();
    const isMobile = useMedia('(max-width: 479px)');
    const headlineId = useId();
    const bodyId = useId();
    const [open, setOpen] = useState(defaultOpen);

    const closeDialog = useCallback(() => {
      setOpen(false);
    }, []);

    const handleActionClick = (event: ClickEvent) => {
      action?.onClick?.(event);
      closeDialog();
    };

    const handleToggle = useCallback(() => {
      setOpen((prev) => !prev);
    }, []);
    return (
      <Popover
        ref={ref}
        className={clsx(classes.base, className)}
        placement={placement}
        offset={offset}
        aria-labelledby={headline ? headlineId : bodyId}
        aria-describedby={headline ? bodyId : undefined}
        hasArrow
        style={{
          ...style,
          zIndex: zIndex || 'var(--cui-z-index-modal)',
        }}
        closeButtonLabel={closeButtonLabel}
        locale={locale}
        onToggle={handleToggle}
        isOpen={open}
        {...rest}
      >
        <div className={classes.content}>
          {headline && (
            <Headline
              as="h2"
              size="s"
              id={headlineId}
              className={classes.headline}
            >
              {headline}
            </Headline>
          )}
          <Body size="s" id={bodyId} className={classes.body}>
            {body}
          </Body>
          {/* eslint-disable jsx-a11y/no-autofocus */}
          {action && (
            <Button
              {...action}
              onClick={handleActionClick}
              variant="secondary"
              size="s"
              className={classes.action}
              autoFocus
            />
          )}
          {!isMobile && (
            <CloseButton
              size="s"
              variant="tertiary"
              className={classes.close}
              onClick={closeDialog}
              autoFocus={!action}
            >
              {closeButtonLabel}
            </CloseButton>
          )}
          {/* eslint-enable jsx-a11y/no-autofocus */}
        </div>
      </Popover>
    );
  },
);

Toggletip.displayName = 'Toggletip';
