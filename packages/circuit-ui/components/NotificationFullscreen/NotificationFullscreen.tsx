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

import { HTMLAttributes } from 'react';
import { css } from '@emotion/react';

import Body from '../Body';
import Headline from '../Headline';
import ButtonGroup, { ButtonGroupProps } from '../ButtonGroup';
import { spacing } from '../../styles/style-mixins';
import Image, { ImageProps } from '../Image';

export interface NotificationFullscreenProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * An image to communicate message.
   */
  image: ImageProps;
  /**
   * Notification fullscreen headline to provide information.
   */
  headline: string;
  /**
   * An optional body copy.
   */
  body?: string;
  /**
   * An optional action prop to allow users to follow up on the content.
   */
  actions?: ButtonGroupProps['actions'];
}

const wrapperStyles = css`
  max-width: 420px;
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const imageStyles = css`
  height: 160px;
  max-width: 280px;
  object-fit: contain;
`;

const bodyStyles = css`
  text-align: center;
  margin-bottom: 0;
`;

/**
 * NotificationFullscreen provides important information or feedback as part of a process flow.
 */
export const NotificationFullscreen = ({
  image,
  headline,
  body,
  actions,
  ...props
}: NotificationFullscreenProps): JSX.Element => (
  <div css={wrapperStyles} {...props}>
    <Image {...image} css={imageStyles} />
    <Headline css={spacing({ top: 'giga', bottom: 'byte' })} size="two" as="h2">
      {headline}
    </Headline>
    {body && <Body css={bodyStyles}>{body}</Body>}
    <ButtonGroup actions={actions} css={spacing({ top: 'giga' })} />
  </div>
);
