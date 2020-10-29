/**
 * Copyright 2019, SumUp Ltd.
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

import React, { FC, MouseEvent, KeyboardEvent } from 'react';

import { CardHeader } from '../../../Card';
import Heading from '../../../Heading';

export interface ModalHeaderProps {
  /**
   * A concise, descriptive title for the modal.
   */
  title: string;
  /**
   * Callback for the close button. If not specified, the button won't
   * be shown.
   */
  onClose?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Text label for the close button for screen reader users.
   */
  labelCloseButton?: string;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
  title,
  onClose,
  labelCloseButton,
}) => (
  <CardHeader onClose={onClose} labelCloseButton={labelCloseButton}>
    {title && (
      <Heading size="kilo" noMargin>
        {title}
      </Heading>
    )}
  </CardHeader>
);
