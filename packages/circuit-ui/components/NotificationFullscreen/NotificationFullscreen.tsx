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

/** @jsxRuntime classic */
/** @jsx jsx */
import { HTMLProps, MouseEvent } from 'react';
import { jsx, css } from '@emotion/core';

import Body from '../Body';
import Headline from '../Headline';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import { spacing } from '../../styles/style-mixins';
import Image from '../Image';

type Action = {
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  text: string;
};

export interface NotificationFullscreenProps extends HTMLProps<HTMLDivElement> {
  /**
   * A concise description of the imageSrc prop.
   */
  imageSrc: string;
  /**
   * A concise description of the headline prop.
   */
  headline: string;
  /**
   * A concise description of the body prop.
   */
  body?: string;
  /**
   * A concise description of the actions prop.
   */
  actions: {
    primary: Action;
    secondary: Action;
  };
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
 * Describe NotificationFullscreen here.
 */
export const NotificationFullscreen = ({
  imageSrc,
  headline,
  body,
  actions,
  ...props
}: NotificationFullscreenProps): JSX.Element => (
  <div css={wrapperStyles} {...props}>
    <Image css={imageStyles} src={imageSrc} alt="" />
    <Headline css={spacing({ top: 'giga', bottom: 'byte' })} size="two">
      {headline}
    </Headline>
    {body && <Body css={bodyStyles}>{body}</Body>}
    <ButtonGroup css={spacing({ top: 'giga' })} align="center">
      <Button
        variant="secondary"
        onClick={actions.secondary.onClick}
        href={actions.secondary.href}
      >
        {actions.secondary.text}
      </Button>
      <Button
        variant="primary"
        onClick={actions.primary.onClick}
        href={actions.primary.href}
      >
        {actions.primary.text}
      </Button>
    </ButtonGroup>
  </div>
);
