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
import Badge from '../../src/components/Badge';

const Stable = () => (
  <Badge color={Badge.SUCCESS} style={{ display: 'inline-block' }}>
    Stable
  </Badge>
);

const Deprecated = () => (
  <Badge color={Badge.DANGER} style={{ display: 'inline-block' }}>
    Deprecated
  </Badge>
);

const InReview = () => (
  <Badge color={Badge.WARNING} style={{ display: 'inline-block' }}>
    In review
  </Badge>
);

export default { Stable, InReview, Deprecated };
