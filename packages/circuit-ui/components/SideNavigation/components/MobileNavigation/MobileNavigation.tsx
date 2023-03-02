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

import { Fragment } from 'react';
import ReactModal from 'react-modal';
import { ClassNames, css } from '@emotion/react';
import isPropValid from '@emotion/is-prop-valid';
import { Theme } from '@sumup/design-tokens';
import { ChevronDown } from '@sumup/icons';

import styled, { StyleProps } from '../../../../styles/styled';
import {
  BaseModalProps,
  createUseModal,
  ModalComponent,
} from '../../../ModalContext';
import { StackContext } from '../../../StackContext';
import CloseButton from '../../../CloseButton';
import { useCollapsible } from '../../../../hooks/useCollapsible';
import { useFocusList } from '../../../../hooks/useFocusList';
import { PrimaryLinkProps } from '../../types';
import { PrimaryLink } from '../PrimaryLink';
import { SecondaryLinks } from '../SecondaryLinks';
import { Require } from '../../../../types/util';
import { ClickEvent } from '../../../../types/events';
import {
  ComponentsContext,
  ComponentsContextType,
} from '../../../ComponentsContext';
import { defaultComponents } from '../../../ComponentsContext/ComponentsContext';

const TRANSITION_DURATION = 120;
const HEADER_HEIGHT = 56;

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

type ChevronProps = { isOpen: boolean };

const chevronStyles = ({ theme }: StyleProps) => css`
  transform: rotate(0deg);
  transition: transform ${theme.transitions.default};
`;

const chevronOpenStyles = ({ isOpen }: ChevronProps) =>
  isOpen &&
  css`
    transform: rotate(-180deg);
    color: var(--cui-fg-accent);
  `;

const Chevron = styled(ChevronDown, {
  shouldForwardProp: (prop) => isPropValid(prop),
})<ChevronProps>(chevronStyles, chevronOpenStyles);

const groupStyles = (theme: Theme) => css`
  border-bottom: ${theme.borderWidth.kilo} solid var(--cui-border-divider);
  margin-bottom: -1px;

  > *:last-child {
    padding-bottom: ${theme.spacings.giga};
  }
`;

function Group({
  secondaryGroups,
  href,
  onClose,
  ...props
}: Require<PrimaryLinkProps, 'secondaryGroups'> & {
  onClose: BaseModalProps['onClose'];
}): JSX.Element {
  const { isOpen, getButtonProps, getContentProps } =
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
        isOpen={isOpen}
        suffix={(suffixProps) => (
          <Chevron {...suffixProps} isOpen={isOpen} size="16" />
        )}
      />
      <SecondaryLinks
        {...getContentProps()}
        css={groupStyles}
        secondaryGroups={mappedSecondaryGroups}
      />
    </Fragment>
  );
}

const contentStyles = ({ theme }: StyleProps) => css`
  height: 100%;
  max-width: 480px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 auto;
  padding-top: ${HEADER_HEIGHT}px;
  padding-bottom: calc(env(safe-area-inset-bottom) + ${theme.spacings.tera});
`;

const Content = styled.div(contentStyles);

const headerStyles = ({ theme }: StyleProps) => css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: ${theme.zIndex.absolute};
  padding: ${theme.spacings.bit};
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 1) 60%,
    rgba(255, 255, 255, 0)
  );
`;

const Header = styled.div(headerStyles);

const closeButtonStyles = css`
  background-color: transparent;
`;

const listStyles = css`
  list-style: none;
`;

/**
 * TODO: Update description 👇🏻
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
  ...props
}) => {
  const focusProps = useFocusList();

  return (
    <ComponentsContext.Provider value={UNSAFE_components}>
      <ClassNames>
        {({ css: cssString, theme }) => {
          // React Modal styles
          // https://reactcommunity.org/react-modal/styles/classes/
          const styles = {
            base: cssString`
                position: fixed;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                height: 100%;
                width: 100%;
                opacity: 0;
                transform: translateY(-25%);
                transition: opacity ${TRANSITION_DURATION}ms ease-in-out,
                  transform ${TRANSITION_DURATION}ms ease-in-out;
                outline: none;
                background-color: var(--cui-bg-normal);
                overflow: hidden;

                &::after {
                  content: '';
                  display: block;
                  position: fixed;
                  right: 0;
                  bottom: 0;
                  left: 0;
                  height: ${theme.spacings.mega};
                  background: linear-gradient(
                    rgba(255,255,255,0),
                    rgba(255,255,255,0.66),
                    rgba(255,255,255,1)
                  );
                }
              `,
            // The !important below is necessary because of some weird
            // style specificity issues in Emotion.
            afterOpen: cssString`
                opacity: 1 !important;
                transform: translateY(0) !important;
              `,
            beforeClose: cssString`
                opacity: 0 !important;
                transform: translateY(-25%) !important;
              `,
          };

          const overlayStyles = {
            base: cssString`
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                opacity: 0;
                transition: opacity ${TRANSITION_DURATION}ms ease-in-out;
                background: var(--cui-bg-overlay);
                z-index: ${theme.zIndex.modal};
              `,
            afterOpen: cssString`
                opacity: 1;
              `,
            beforeClose: cssString`
                opacity: 0;
              `,
          };

          const reactModalProps = {
            className: styles,
            overlayClassName: overlayStyles,
            onRequestClose: onClose,
            closeTimeoutMS: TRANSITION_DURATION,
            shouldCloseOnOverlayClick: true,
            shouldCloseOnEsc: true,
            ...props,
          };

          return (
            <StackContext.Provider value={theme.zIndex.modal}>
              <ReactModal {...reactModalProps}>
                <Content>
                  <Header>
                    <CloseButton
                      onClick={onClose}
                      label={closeButtonLabel}
                      css={closeButtonStyles}
                    />
                  </Header>

                  <nav aria-label={primaryNavigationLabel}>
                    <ul css={listStyles}>
                      {primaryLinks.map(
                        ({ secondaryGroups, onClick, ...link }) => (
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
                        ),
                      )}
                    </ul>
                  </nav>
                </Content>
              </ReactModal>
            </StackContext.Provider>
          );
        }}
      </ClassNames>
    </ComponentsContext.Provider>
  );
};

MobileNavigation.TRANSITION_DURATION = TRANSITION_DURATION;

export const useMobileNavigation = createUseModal(MobileNavigation);
