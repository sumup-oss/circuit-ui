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

import React, { useState } from 'react';

import { Hamburger, HamburgerProps } from './Hamburger';

export default {
  title: 'Components/Hamburger',
  component: Hamburger,
};

export const Base = (args: HamburgerProps) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive((prev) => !prev);
  };
  return <Hamburger isActive={active} onClick={handleClick} {...args} />;
};

Base.args = {
  labelActive: 'Close menu',
  labelInActive: 'Open menu',
};
