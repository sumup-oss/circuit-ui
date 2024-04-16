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

import ReactModal, { type Props as ReactModalProps } from 'react-modal';

import { StackContext } from '../../../StackContext/index.js';
import type { SidePanelProps } from '../../SidePanel.js';
import { TRANSITION_DURATION } from '../../constants.js';

import classes from './MobileSidePanel.module.css';

export type MobileSidePanelProps = ReactModalProps &
  Pick<SidePanelProps, 'isBottomPanelClosing' | 'isStacked'>;

export function MobileSidePanel({
  children,
  isBottomPanelClosing,
  isStacked,
  ...props
}: MobileSidePanelProps) {
  const reactModalProps: ReactModalProps = {
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
    closeTimeoutMS: TRANSITION_DURATION,
    ...props,
  };

  return (
    <StackContext.Provider value={'var(--cui-z-index-modal)'}>
      <ReactModal {...reactModalProps}>{children}</ReactModal>
    </StackContext.Provider>
  );
}
