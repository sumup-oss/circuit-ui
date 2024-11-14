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

import { Card } from '../../components/Card/Card.js';

import { useMedia } from './useMedia.js';

export default {
  title: 'Hooks/useMedia',
  tags: ['status:stable'],
};

export const Example = () => {
  const isMatch = useMedia('(max-width: 800px)');

  const background = isMatch
    ? 'var(--cui-bg-success)'
    : 'var(--cui-bg-warning)';

  return (
    <Card style={{ background }}>
      {`The viewport is ${isMatch ? 'less' : 'more'} than 800px wide.`}
    </Card>
  );
};
