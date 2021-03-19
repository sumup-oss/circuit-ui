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

/** @jsx jsx */
import { Fragment } from 'react';
import { action } from '@storybook/addon-actions';
import { css, jsx } from '@emotion/core';
import { Theme } from '@sumup/design-tokens';

import { Stack } from '../../../.storybook/components';
import CardList from '../CardList';
import Heading from '../Heading';
import Text from '../Text';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';

import docs from './Card.docs.mdx';

import Card, { CardHeader, CardFooter } from '.';

export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: { CardList },
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
  <Heading size="kilo" noMargin>
    Card heading
  </Heading>
);

const Content = () => (
  <Text noMargin>This is some text showing in my card</Text>
);

export const Base = () => <Card css={cardStyles} />;

export const Shadows = () => (
  <Stack>
    <Card shadow={'single'} css={squareStyles} />
    <Card shadow={'double'} css={squareStyles} />
    <Card shadow={'triple'} css={squareStyles} />
  </Stack>
);

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
        <ButtonGroup>
          <Button>Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>

    <Card css={cardStyles}>
      <Content />
      <CardFooter align="left">
        <ButtonGroup align="left">
          <Button>Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  </Fragment>
);
