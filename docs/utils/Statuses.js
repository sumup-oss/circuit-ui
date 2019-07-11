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
import { css } from '@emotion/core';
import Badge from '../../src/components/Badge';
import Text from '../../src/components/Text';

const Stable = () => <Badge color={Badge.SUCCESS}>Stable</Badge>;

const Deprecated = () => <Badge color={Badge.DANGER}>Deprecated</Badge>;

const InReview = () => <Badge color={Badge.WARNING}>In review</Badge>;

const Experimental = () => <Badge color={Badge.NEUTRAL}>Experimental</Badge>;

const Description = styled(Text)`
  ${({ theme }) => css`
    margin-left: ${theme.spacings.byte};
    display: inline-block;
  `};
`;

export default { Stable, InReview, Deprecated, Experimental, Description };
