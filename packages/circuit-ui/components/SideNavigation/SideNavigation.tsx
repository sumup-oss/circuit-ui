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
import usePrevious from 'use-previous';

import { DesktopNavigation } from './components/DesktopNavigation';
import { DesktopNavigationProps } from './components/DesktopNavigation/DesktopNavigation';
import {
  MobileNavigationProps,
  useMobileNavigation,
} from './components/MobileNavigation';

export interface SideNavigationProps
  extends MobileNavigationProps,
    DesktopNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideNavigation({
  isOpen,
  onClose,
  primaryLinks,
  closeButtonLabel,
  primaryNavigationLabel,
  secondaryNavigationLabel,
}: SideNavigationProps): JSX.Element {
  if (
    process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    (!closeButtonLabel || !primaryNavigationLabel || !secondaryNavigationLabel)
  ) {
    throw new Error(
      'The SideNavigation component is missing a `closeButtonLabel`, `primaryNavigationLabel`, or `secondaryNavigationLabel` prop. This is an accessibility requirement.',
    );
  }

  const { setModal } = useMobileNavigation();

  const prevOpen = usePrevious(isOpen);

  useEffect(() => {
    if (isOpen && !prevOpen) {
      setModal({
        onClose,
        primaryLinks,
        closeButtonLabel,
        primaryNavigationLabel,
      });
    }
  }, [
    isOpen,
    prevOpen,
    setModal,
    primaryLinks,
    onClose,
    closeButtonLabel,
    primaryNavigationLabel,
  ]);

  return (
    <DesktopNavigation
      primaryLinks={primaryLinks}
      primaryNavigationLabel={primaryNavigationLabel}
      secondaryNavigationLabel={secondaryNavigationLabel}
    />
  );
}
