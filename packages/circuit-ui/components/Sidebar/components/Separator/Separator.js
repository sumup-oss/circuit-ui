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
import { jsx, css } from '@emotion/core';

import Hr from '../../../Hr';

const hrStyles = (theme) => css`
  label: sidebar-separator;
  border: 1px solid ${theme.colors.n700};
`;

/**
 * A separator for the Sidebar. Extends the Hr component.
 */
const Separator = () => (
  <li role="presentation">
    <Hr css={hrStyles} />
  </li>
);

/**
 * @component
 */
export default Separator;
