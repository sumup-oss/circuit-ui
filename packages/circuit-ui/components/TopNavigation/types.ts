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

import type { AvatarProps } from '../Avatar/index.js';

export type UserProps = {
  /**
   * A unique user id such as the SumUp merchant code.
   */
  id?: string;
  /**
   * A user's name. Can be the first or last name or a combination of both.
   */
  name: string;
  /**
   * A user's profile photo.
   */
  avatar?: AvatarProps;
};
