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

import type { SideNavigationProps } from '../../types.js';
import classes from './DesktopNavigation.module.css';
import { NavigationContent } from '../NavigationContent/NavigationContent.js';
import { useEffect } from 'react';
import { clsx } from '../../../../styles/clsx.js';

const SIDE_NAVIGATION_WIDTH = '240px';

export const DesktopNavigation = ({
  className,
  label,
  ...props
}: Omit<SideNavigationProps, 'isOpen' | 'closeButtonLabel' | 'onClose'>) => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--side-navigation-width',
      SIDE_NAVIGATION_WIDTH,
    );
    return () => {
      document.documentElement.style.removeProperty('--side-navigation-width');
    };
  }, []);
  return (
    <div className={clsx(classes.base, className)}>
      <NavigationContent {...props} suffix="desktop" />
    </div>
  );
};
