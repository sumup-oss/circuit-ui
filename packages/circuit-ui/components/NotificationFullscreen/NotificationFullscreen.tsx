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

import { HTMLAttributes, ReactNode } from 'react';
import { css } from '@emotion/react';

import Body from '../Body';
import Headline from '../Headline';
import ButtonGroup, { ButtonGroupProps } from '../ButtonGroup';
import { spacing, cx } from '../../styles/style-mixins';
import Image, { ImageProps } from '../Image';
import { isString } from '../../util/type-check';

export interface NotificationFullscreenProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * An image to communicate message.
   */
  image: ImageProps;
  /**
   * Notification fullscreen headline to provide information.
   * It can be either a string or an object (if the headline is 'h1')
   * (Default is 'h2')
   */
  headline:
    | string
    | {
        as: 'h1' | 'h2';
        label: string;
      };
  /**
   * An optional body copy.
   */
  body?: string | ReactNode;
  /**
   * An optional action prop to allow users to follow up on the content.
   */
  actions?: ButtonGroupProps['actions'];
}

const wrapperStyles = css`
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const imageStyles = css`
  height: 160px;
  max-width: 280px;
  object-fit: contain;
`;

const centeredStyles = css`
  text-align: center;
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
}: NotificationFullscreenProps): JSX.Element => {
  const headlineLabel = isString(headline) ? headline : headline.label;
  const headlineElement = isString(headline) ? 'h2' : headline.as;
  return (
    <div css={wrapperStyles} {...props}>
      <Image {...image} css={imageStyles} />
      <Headline
        noMargin
        css={cx(spacing({ top: 'giga', bottom: 'byte' }), centeredStyles)}
        size="two"
        as={headlineElement}
      >
        {headlineLabel}
      </Headline>
      {body && (
        <Body css={centeredStyles} noMargin>
          {body}
        </Body>
      )}
      {actions && (
        <ButtonGroup
          align={'center'}
          actions={actions}
          css={spacing({ top: 'giga' })}
        />
      )}
    </div>
  );
};
