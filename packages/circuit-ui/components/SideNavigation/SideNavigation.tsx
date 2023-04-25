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

import { useEffect } from 'react';
import { useTheme } from '@emotion/react';

import { useMedia } from '../../hooks/useMedia/index.js';
import { AccessibilityError } from '../../util/errors.js';
import { usePrevious } from '../../hooks/usePrevious/index.js';

import { DesktopNavigation } from './components/DesktopNavigation/index.js';
import { DesktopNavigationProps } from './components/DesktopNavigation/DesktopNavigation.jsx';
import {
  MobileNavigationProps,
  useMobileNavigation,
} from './components/MobileNavigation/index.js';

export interface SideNavigationProps
  extends MobileNavigationProps,
    DesktopNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideNavigation({
  isLoading,
  isOpen,
  onClose,
  primaryLinks,
  closeButtonLabel,
  primaryNavigationLabel,
  secondaryNavigationLabel,
  UNSAFE_components,
}: SideNavigationProps): JSX.Element {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    if (!closeButtonLabel) {
      throw new AccessibilityError(
        'SideNavigation',
        'The `closeButtonLabel` prop is missing.',
      );
    }
    if (!primaryNavigationLabel) {
      throw new AccessibilityError(
        'SideNavigation',
        'The `primaryNavigationLabel` prop is missing.',
      );
    }
    if (!secondaryNavigationLabel) {
      throw new AccessibilityError(
        'SideNavigation',
        'The `secondaryNavigationLabel` prop is missing.',
      );
    }
  }

  const theme = useTheme();
  const isMobile = useMedia(theme.breakpoints.untilTera, true);

  const { setModal, removeModal } = useMobileNavigation();

  const prevOpen = usePrevious(isOpen);

  useEffect(() => {
    if (!prevOpen && isOpen && isMobile) {
      setModal({
        onClose,
        primaryLinks,
        closeButtonLabel,
        primaryNavigationLabel,
        UNSAFE_components,
      });
    }
  }, [
    prevOpen,
    isOpen,
    isMobile,
    setModal,
    primaryLinks,
    onClose,
    closeButtonLabel,
    primaryNavigationLabel,
    UNSAFE_components,
  ]);

  // Close the modal when the user resizes the window.
  useEffect(() => {
    if (!isMobile) {
      removeModal();
    }
  }, [isMobile, removeModal]);

  return (
    <DesktopNavigation
      isLoading={isLoading}
      primaryLinks={primaryLinks}
      primaryNavigationLabel={primaryNavigationLabel}
      secondaryNavigationLabel={secondaryNavigationLabel}
    />
  );
}
