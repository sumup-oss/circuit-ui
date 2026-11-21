/**
 * Copyright 2026, SumUp Ltd.
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

import type { CodeHighlightProps } from './CodeHighlight.js';
import { CodeHighlight } from './CodeHighlight.js';

const source = `async function fetchProfile(id: string) {
  const response = await fetch('/api/profiles/' + id);
  if (!response.ok) {
    throw new Error('Could not load profile');
  }
  return response.json();
}`;

export default {
  title: 'Components/CodeHighlight',
  component: CodeHighlight,
  tags: ['status:experimental'],
  args: {
    language: 'typescript',
    code: source,
  },
  parameters: { chromatic: { delay: 2000 } },
};

export const Base = (args: CodeHighlightProps) => <CodeHighlight {...args} />;

export const LineNumbers = (args: CodeHighlightProps) => (
  <CodeHighlight {...args} />
);

LineNumbers.storyName = 'Line numbers';
LineNumbers.args = { lineNumbers: true };

export const HighlightedLines = (args: CodeHighlightProps) => (
  <CodeHighlight {...args} />
);

HighlightedLines.args = { highlightedLines: [3, 4, 6] };

export const Wrapped = (args: CodeHighlightProps) => (
  <div style={{ maxWidth: '400px' }}>
    <CodeHighlight {...args} />
  </div>
);

Wrapped.args = {
  wrap: true,
  code: '// A long comment that wraps within the available space. '.repeat(8),
};
