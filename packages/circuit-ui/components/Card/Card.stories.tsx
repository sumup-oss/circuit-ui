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

import { Fragment } from 'react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/react';
import { Theme } from '@sumup/design-tokens';

import { Stack } from '../../../../.storybook/components';
import Headline from '../Headline';
import Body from '../Body';
import ButtonGroup from '../ButtonGroup';

import docs from './Card.docs.mdx';

import Card, { CardHeader, CardFooter } from '.';

export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: { CardHeader, CardFooter },
  parameters: {
    docs: { page: docs },
  },
};

const cardStyles = () => css`
  width: 400px;
  min-height: 120px;
  max-width: 90vw;
  max-height: 90vh;
  margin-bottom: 1rem;
`;

const squareStyles = () => css`
  width: 150px;
  min-height: 150px;
  max-width: 90vw;
  max-height: 90vh;
`;

const contentStyles = (theme: Theme) => css`
  background: ${theme.colors.n300};
  width: 100%;
  height: 118px;
`;

const Header = () => (
  <Headline size="four" as="h2">
    Card heading
  </Headline>
);

const Content = () => <Body>This is some text showing in my card</Body>;

export const Base = () => <Card css={cardStyles} />;

export const Spacings = () => (
  <Stack>
    <Card spacing={'mega'} css={squareStyles}>
      <div css={contentStyles} />
    </Card>
    <Card spacing={'giga'} css={squareStyles}>
      <div css={contentStyles} />
    </Card>
  </Stack>
);

export const WithHeader = () => (
  <Fragment>
    <Card css={cardStyles}>
      <CardHeader>
        <Header />
      </CardHeader>
      <Content />
    </Card>

    <Card css={cardStyles}>
      <CardHeader
        onClose={action('CloseButton clicked')}
        closeButtonLabel="Close"
        tracking={{ label: 'trackingId' }}
      >
        <Header />
      </CardHeader>
      <Content />
    </Card>
  </Fragment>
);

export const WithFooter = () => (
  <Fragment>
    <Card css={cardStyles}>
      <Content />
      <CardFooter>
        <ButtonGroup
          align="right"
          actions={{
            primary: {
              children: 'Confirm',
            },
            secondary: {
              children: 'Cancel',
            },
          }}
        />
      </CardFooter>
    </Card>

    <Card css={cardStyles}>
      <Content />
      <CardFooter align="left">
        <ButtonGroup
          align="left"
          actions={{
            primary: {
              children: 'Confirm',
            },
            secondary: {
              children: 'Cancel',
            },
          }}
        />
      </CardFooter>
    </Card>
  </Fragment>
);
