/**
 * Copyright 2022, SumUp Ltd.
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

import ReactModal, { Props as ReactModalProps } from 'react-modal';

import { StackContext } from '../../../StackContext/index.js';
import type { SidePanelProps } from '../../SidePanel.js';
import { clsx } from '../../../../styles/clsx.js';

import classes from './DesktopSidePanel.module.css';

export type DesktopSidePanelProps = ReactModalProps &
  Pick<SidePanelProps, 'isInstantOpen'>;

export function DesktopSidePanel({
  children,
  isInstantOpen,
  ...props
}: DesktopSidePanelProps) {
  const reactModalProps: ReactModalProps = {
    ariaHideApp: false,
    className: {
      base: classes.base,
      afterOpen: clsx(classes.open, isInstantOpen && classes.instant),
      beforeClose: classes.closed,
    },
    overlayClassName: classes.overlay,
    shouldCloseOnOverlayClick: false,
    closeTimeoutMS: 300,
    ...props,
  };

  return (
    <StackContext.Provider value={'var(--cui-z-index-absolute)'}>
      <ReactModal {...reactModalProps}>{children}</ReactModal>
    </StackContext.Provider>
  );
}
