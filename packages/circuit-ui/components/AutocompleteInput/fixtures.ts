/**
 * Copyright 2025, SumUp Ltd.
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

import { Location } from '@sumup-oss/icons';

import type { AutocompleteInputOption } from './components/Option/Option.js';

export const mochi: AutocompleteInputOption = {
  label: 'Mochi',
  value: 'mochi',
  description: 'A gentle giant',
  image: '/images/illustration-cat.jpg',
};

export const luna: AutocompleteInputOption = {
  label: 'Luna',
  value: 'luna',
  description: 'Mischievous night owl',
  image: '/images/illustration-cat.jpg',
};

export const oliver: AutocompleteInputOption = {
  label: 'Oliver',
  value: 'oliver',
  description: 'Distinguished gentleman',
  image: '/images/illustration-cat.jpg',
};

const sushi: AutocompleteInputOption = {
  label: 'Sushi',
  value: 'sushi',
  description: 'Playful acrobat',
  image: '/images/illustration-cat.jpg',
};

const shadow: AutocompleteInputOption = {
  label: 'Shadow',
  value: 'shadow',
  description: 'Mysterious introvert',
  image: '/images/illustration-cat.jpg',
};

const maple: AutocompleteInputOption = {
  label: 'Maple',
  value: 'maple',
  description: 'Sweet and clingy',
  image: '/images/illustration-cat.jpg',
};

const ziggy: AutocompleteInputOption = {
  label: 'Ziggy',
  value: 'ziggy',
  description: 'High-energy troublemaker',
  image: '/images/illustration-cat.jpg',
};

const bella: AutocompleteInputOption = {
  label: 'Bella',
  value: 'bella',
  description: 'Expects royal treatment at all times',
  image: '/images/illustration-cat.jpg',
};

const winston: AutocompleteInputOption = {
  label: 'Winston',
  value: 'winston',
  description: 'Loves contemplating sunbeams',
  image: '/images/illustration-cat.jpg',
};

const pepper: AutocompleteInputOption = {
  label: 'Pepper',
  value: 'pepper',
  description: 'Spicy personality',
  image: '/images/illustration-cat.jpg',
};

export const options: AutocompleteInputOption[] = [
  mochi,
  luna,
  oliver,
  sushi,
  shadow,
  maple,
  ziggy,
  bella,
  winston,
  pepper,
];

export const groupedOptions = [
  {
    label: 'Kittens',
    options: [mochi, luna, oliver],
  },
  {
    label: 'Adult Cats',
    options: [sushi, shadow, maple],
  },
  {
    label: 'Senior Cats',
    options: [ziggy, bella, winston, pepper],
  },
];

export const catNames: AutocompleteInputOption[] = [
  {
    label: 'Whiskers',
    value: 'whiskers',
  },
  {
    label: 'Felix',
    value: 'felix',
  },
  {
    label: 'Simba',
    value: 'simba',
  },
  {
    label: 'Nala',
    value: 'nala',
  },
  {
    label: 'Tiger',
    value: 'tiger',
  },
  {
    label: 'Mittens',
    value: 'mittens',
  },
  {
    label: 'Charlie',
    value: 'charlie',
  },
  {
    label: 'Leo',
    value: 'leo',
  },
  {
    label: 'Kitty',
    value: 'kitty',
  },
  {
    label: 'Max',
    value: 'max',
  },
];

export const addresses: AutocompleteInputOption[] = [
  {
    label: '123 Main St',
    value: '123 Main St, Springfield, IL',
    description: 'Springfield, IL',
    image: Location,
  },
  {
    label: '456 Elm St',
    value: '456 Elm St, Shelbyville, IL',
    description: 'Shelbyville, IL',
    image: Location,
  },
  {
    label: '789 Oak St',
    value: '789 Oak St, Capital City, IL',
    description: 'Capital City, IL',
    image: Location,
  },
  {
    label: '101 Maple Ave',
    value: '101 Maple Ave, Smalltown, IL',
    description: 'Smalltown, IL',
    image: Location,
  },
  {
    label: '202 Pine Rd, Big City, IL',
    value: '202 Pine Rd, Big City, IL',
    description: 'Big City, IL',
    image: Location,
  },
];
