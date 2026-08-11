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
