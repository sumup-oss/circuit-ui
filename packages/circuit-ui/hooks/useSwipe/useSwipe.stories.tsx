/**
 * Copyright 2024, SumUp Ltd.
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

import { useState, type CSSProperties } from 'react';

import { useSwipe } from './useSwipe.js';

export default {
  title: 'Hooks/useSwipe',
  tags: ['status:stable'],
};

const styles = {
  width: '75vw',
  maxWidth: '640px',
  height: '75vh',
  maxHeight: '640px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid var(--cui-border-normal)',
  marginBottom: 'var(--cui-spacings-kilo)',
} satisfies CSSProperties;

export const Example = (args: { minSwipeDistance: number }) => {
  const [direction, setDirection] = useState('');
  const eventHandlers = useSwipe(setDirection, args.minSwipeDistance);

  return (
    <>
      <div {...eventHandlers} style={styles}>
        Swipe me!
      </div>
      <p>
        {direction ? `You swiped ${direction}.` : "You haven't swiped yet."}
      </p>
    </>
  );
};

Example.args = {
  minSwipeDistance: 50,
};
