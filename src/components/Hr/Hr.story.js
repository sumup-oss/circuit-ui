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

import React from 'react';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import { GROUPS } from '../../../.storybook/hierarchySeparators';
import Text from '../Text';
import Hr from './Hr';

const Container = styled('div')`
  width: 500px;
  max-width: 90%;
`;

storiesOf(`${GROUPS.COMPONENTS}|Hr`, module)
  .add(
    'Hr',
    withInfo()(() => (
      <Container>
        <Hr />
      </Container>
    ))
  )
  .add(
    'Hr with Text',
    withInfo()(() => (
      <Container>
        <Text>
          Lorem ipsum dolor amet echo park XOXO activated charcoal banjo deep v
          crucifix pinterest yr af tumeric literally. Tbh four loko tattooed
          kickstarter artisan. Lumbersexual tote bag selfies truffaut, tofu vape
          tbh adaptogen green juice lo-fi kombucha.
        </Text>
        <Hr />
        <Text>
          Roof party cronut seitan pitchfork keytar small batch migas ugh XOXO
          kickstarter pork belly tumblr. Taiyaki brunch vegan XOXO meggings.
          Kinfolk air plant edison bulb vexillologist helvetica chambray disrupt
          mixtape man braid banjo viral.
        </Text>
      </Container>
    ))
  );
