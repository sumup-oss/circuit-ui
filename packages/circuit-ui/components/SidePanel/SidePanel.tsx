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

import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';
import { Props as ReactModalProps } from 'react-modal';

import { isFunction } from '../../util/type-check';
import CloseButton from '../CloseButton';

import { MobileSidePanel } from './components/MobileSidePanel';
import { DesktopSidePanel } from './components/DesktopSidePanel';

export const TRANSITION_DURATION = 240;

export type CloseCallback = () => void;

export type SidePanelProps = {
  /**
   * Text label for the back button for screen readers.
   * Important for accessibility.
   */
  backButtonLabel?: string;
  /**
   * The side panel content. Use a render function when you need access to the
   * `onClose` function.
   */
  children:
    | ReactNode
    | ((props: Pick<SidePanelProps, 'onBack' | 'onClose'>) => ReactNode);
  /**
   * Text label for the close button for screen readers.
   * Important for accessibility.
   */
  closeButtonLabel: string;
  /**
   * The headline/title of the side panel.
   */
  headline: string;
  /**
   * Boolean indicating whether the side panel should be in desktop or mobile mode.
   */
  isMobile: boolean;
  /**
   * Boolean indicating whether the side panel should be shown or not.
   */
  isOpen: boolean;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onBack?: CloseCallback;
  /**
   * Callback function that is called when the side panel is closed.
   */
  onClose: CloseCallback;
  /**
   * The top offset in 'px' applied to the side panel in desktop mode.
   */
  top: string;
} & Pick<ReactModalProps, 'shouldReturnFocusAfterClose' | 'closeTimeoutMS'>;

const closeButtonStyles = (theme: Theme) => css`
  position: absolute;
  top: ${theme.spacings.byte};
  right: ${theme.spacings.byte};
  z-index: ${theme.zIndex.absolute};
`;

export const SidePanel = ({
  backButtonLabel,
  children,
  closeButtonLabel,
  headline,
  isMobile,
  ...props
}: SidePanelProps): JSX.Element => {
  if (
    process.env.UNSAFE_DISABLE_ACCESSIBILITY_ERRORS !== 'true' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test' &&
    !closeButtonLabel
  ) {
    throw new Error(
      'The side panel is missing a `closeButtonLabel` prop. This is an accessibility requirement.',
    );
  }

  const { onBack, onClose } = props;
  const SidePanelComponent = isMobile ? MobileSidePanel : DesktopSidePanel;

  // TODO: side panel header, close and back buttons, max-width and padding on mobile
  return (
    <SidePanelComponent {...props}>
      {closeButtonLabel && (
        <CloseButton
          onClick={onClose}
          label={closeButtonLabel}
          css={closeButtonStyles}
        />
      )}

      {isFunction(children) ? children({ onBack, onClose }) : children}
    </SidePanelComponent>
  );
};
