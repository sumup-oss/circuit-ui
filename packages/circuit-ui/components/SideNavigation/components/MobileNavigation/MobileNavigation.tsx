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

import { Fragment } from 'react';
import ReactModal from 'react-modal';
import { ChevronDown } from '@sumup-oss/icons';

import {
  createUseModal,
  type BaseModalProps,
  type ModalComponent,
} from '../../../ModalContext/index.js';
import { StackContext } from '../../../StackContext/index.js';
import { CloseButton } from '../../../CloseButton/index.js';
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
import { SkipLink } from '../../../SkipLink/index.js';

import classes from './MobileNavigation.module.css';

const TRANSITION_DURATION = 120;

export interface MobileNavigationProps extends BaseModalProps {
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
  /**
   * Hash link to the page's main content to enable keyboard and screen reader
   * users to skip over the navigation links. Required to comply with
   * [WCAG 2.1 SC 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html)
   */
  skipNavigationHref?: string;
  /**
   * label for the skip navigation link.
   */
  skipNavigationLabel?: string;
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
  onClose: BaseModalProps['onClose'];
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

/**
 * TODO: Update description 👇
 * The modal component displays self-contained tasks in a focused window that
 * overlays the page content.
 * Built on top of [`react-modal`](https://reactcommunity.org/react-modal/).
 */
export const MobileNavigation: ModalComponent<MobileNavigationProps> = ({
  onClose,
  closeButtonLabel,
  primaryLinks,
  primaryNavigationLabel,
  UNSAFE_components = defaultComponents,
  skipNavigationHref,
  skipNavigationLabel,
  ...props
}) => {
  const focusProps = useFocusList();

  const reactModalProps = {
    className: {
      base: classes.base,
      afterOpen: classes.open,
      beforeClose: classes.closed,
    },
    overlayClassName: {
      base: classes.overlay,
      afterOpen: classes['overlay-open'],
      beforeClose: classes['overlay-closed'],
    },
    onRequestClose: onClose,
    closeTimeoutMS: TRANSITION_DURATION,
    shouldCloseOnOverlayClick: true,
    shouldCloseOnEsc: true,
    ...props,
  };

  return (
    <ComponentsContext.Provider value={UNSAFE_components}>
      <StackContext.Provider value={'var(--cui-z-index-modal)'}>
        <ReactModal {...reactModalProps}>
          <div className={classes.content}>
            {skipNavigationHref && skipNavigationLabel && (
              <SkipLink href={skipNavigationHref}>
                {skipNavigationLabel}
              </SkipLink>
            )}
            <div className={classes.header}>
              <CloseButton onClick={onClose}>{closeButtonLabel}</CloseButton>
            </div>

            <nav aria-label={primaryNavigationLabel}>
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
        </ReactModal>
      </StackContext.Provider>
    </ComponentsContext.Provider>
  );
};

MobileNavigation.TRANSITION_DURATION = TRANSITION_DURATION;

export const useMobileNavigation = createUseModal(MobileNavigation);
