/**
 * Copyright 2021, SumUp Ltd.
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

import { Fragment, useCallback, useState } from 'react';
import { ChevronDown } from '@sumup-oss/icons';

import { StackContext } from '../../../StackContext/index.js';
import { useCollapsible } from '../../../../hooks/useCollapsible/index.js';
import { useFocusList } from '../../../../hooks/useFocusList/index.js';
import type { PrimaryLinkProps } from '../../types.js';
import { PrimaryLink } from '../PrimaryLink/index.js';
import { SecondaryLinks } from '../SecondaryLinks/index.js';
import type { Require } from '../../../../types/util.js';
import type { ClickEvent } from '../../../../types/events.js';
import {
  ComponentsContext,
  type ComponentsContextType,
} from '../../../ComponentsContext/index.js';
import { defaultComponents } from '../../../ComponentsContext/ComponentsContext.js';
import { clsx } from '../../../../styles/clsx.js';
import { Dialog, type DialogProps } from '../../../Dialog/Dialog.js';
import { sharedClasses } from '../../../../styles/shared.js';

import classes from './MobileNavigation.module.css';

const TRANSITION_DURATION = 120;

export interface MobileNavigationProps
  extends Omit<
    DialogProps,
    | 'children'
    | 'isModal'
    | 'onCloseStart'
    | 'animationDuration'
    | 'preventClose'
    | 'initialFocusRef'
    | 'preventOutsideClickRefs'
  > {
  /**
   * A collection of links with nested secondary groups.
   */
  primaryLinks: PrimaryLinkProps[];
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel: string;
  /**
   * Text label for the primary navigation for screen readers.
   * Important for accessibility.
   */
  primaryNavigationLabel: string;
  /**
   * @private
   *
   * **DO NOT USE.** This prop is not stable and can be removed at any time.
   */
  UNSAFE_components?: ComponentsContextType;
}

function combineClickHandlers(
  ...fns: (undefined | ((event: ClickEvent) => void))[]
) {
  return (event: ClickEvent) => {
    fns.forEach((fn) => {
      if (fn) {
        fn(event);
      }
    });
  };
}

function Group({
  secondaryGroups,
  href,
  onClose,
  ...props
}: Require<PrimaryLinkProps, 'secondaryGroups'> & {
  onClose: DialogProps['onCloseEnd'];
}) {
  const { getButtonProps, getContentProps } =
    useCollapsible<HTMLUListElement>();

  const mappedSecondaryGroups = secondaryGroups.map(
    ({ secondaryLinks, ...group }) => ({
      ...group,
      secondaryLinks: secondaryLinks.map(({ onClick, ...link }) => ({
        ...link,
        onClick: combineClickHandlers(onClick, onClose),
      })),
    }),
  );

  return (
    <Fragment>
      <PrimaryLink
        {...props}
        {...getButtonProps()}
        suffix={({ className, ...suffixProps }) => (
          <ChevronDown
            {...suffixProps}
            className={clsx(className, classes.chevron)}
            size="16"
          />
        )}
      />
      <SecondaryLinks
        {...getContentProps()}
        className={classes.group}
        secondaryGroups={mappedSecondaryGroups}
      />
    </Fragment>
  );
}

export const MobileNavigation = ({
  onCloseEnd: onClose,
  closeButtonLabel,
  primaryLinks,
  primaryNavigationLabel,
  UNSAFE_components = defaultComponents,
  ...props
}: MobileNavigationProps) => {
  const focusProps = useFocusList();

  const [isClosing, setIsClosing] = useState(false);

  const handleDialogCloseEnd = useCallback(() => {
    setIsClosing(false);
    onClose?.();
  }, [onClose]);

  const handleDialogCloseStart = useCallback(() => {
    setIsClosing(true);
  }, []);

  return (
    <ComponentsContext.Provider value={UNSAFE_components}>
      <StackContext.Provider value={'var(--cui-z-index-modal)'}>
        <Dialog
          onCloseStart={handleDialogCloseStart}
          onCloseEnd={handleDialogCloseEnd}
          isModal
          className={clsx(
            classes.base,
            isClosing
              ? sharedClasses.animationSlideDownOut
              : sharedClasses.animationSlideDownIn,
          )}
          closeButtonLabel={closeButtonLabel}
          animationDuration={120} /* .12s */
          {...props}
        >
          <div className={classes.content}>
            <nav
              aria-label={primaryNavigationLabel}
              className={classes.navigation}
            >
              <ul className={classes.list}>
                {primaryLinks.map(({ secondaryGroups, onClick, ...link }) => (
                  <li key={link.label}>
                    {secondaryGroups && secondaryGroups.length > 0 ? (
                      <Group
                        {...link}
                        secondaryGroups={secondaryGroups}
                        onClose={onClose}
                        {...focusProps}
                      />
                    ) : (
                      <PrimaryLink
                        {...link}
                        {...focusProps}
                        onClick={combineClickHandlers(onClick, onClose)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Dialog>
      </StackContext.Provider>
    </ComponentsContext.Provider>
  );
};

MobileNavigation.TRANSITION_DURATION = TRANSITION_DURATION;
