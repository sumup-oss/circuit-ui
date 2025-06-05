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

import type { AutocompleteSuggestion } from './components/Suggestion/Suggestion.js';

export const mochi: AutocompleteSuggestion = {
  label: 'Mochi',
  value: 'mochi',
  description: 'A gentle giant',
  image: '/images/illustration-cat-mochi.jpg',
};

export const luna: AutocompleteSuggestion = {
  label: 'Luna',
  value: 'luna',
  description: 'Mischievous night owl',
  image: '/images/illustration-cat-luna.jpg',
};

export const oliver: AutocompleteSuggestion = {
  label: 'Oliver',
  value: 'oliver',
  description: 'Distinguished gentleman',
  image: '/images/illustration-cat-oliver.jpg',
};

const sushi: AutocompleteSuggestion = {
  label: 'Sushi',
  value: 'sushi',
  description: 'Playful acrobat',
  image: '/images/illustration-cat-sushi.jpg',
};

const shadow: AutocompleteSuggestion = {
  label: 'Shadow',
  value: 'shadow',
  description: 'Mysterious introvert',
  image: '/images/illustration-cat-shadow.jpg',
};

const maple: AutocompleteSuggestion = {
  label: 'Maple',
  value: 'maple',
  description: 'Sweet and clingy',
  image: '/images/illustration-cat-maple.jpg',
};

const ziggy: AutocompleteSuggestion = {
  label: 'Ziggy',
  value: 'ziggy',
  description: 'High-energy troublemaker',
  image: '/images/illustration-cat-ziggy.jpg',
};

const bella: AutocompleteSuggestion = {
  label: 'Bella',
  value: 'bella',
  description: 'Expects royal treatment at all times',
  image: '/images/illustration-cat-bella.jpg',
};

const winston: AutocompleteSuggestion = {
  label: 'Winston',
  value: 'winston',
  description: 'Loves contemplating sunbeams',
  image: '/images/illustration-cat-winston.jpg',
};

const pepper: AutocompleteSuggestion = {
  label: 'Pepper',
  value: 'pepper',
  description: 'Spicy personality',
  image: '/images/illustration-cat-pepper.jpg',
};

export const suggestions = [
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

export const groupedSuggestions = [
  {
    label: 'Kittens',
    suggestions: [mochi, luna, oliver],
  },
  {
    label: 'Adult Cats',
    suggestions: [sushi, shadow, maple],
  },
  {
    label: 'Senior Cats',
    suggestions: [ziggy, bella, winston, pepper],
  },
];

export const catNames: AutocompleteSuggestion[] = [
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
  {
    label: 'Loki',
    value: 'loki',
  },
  {
    label: 'Lily',
    value: 'lily',
  },
  {
    label: 'Oscar',
    value: 'oscar',
  },
  {
    label: 'Lucy',
    value: 'lucy',
  },
  {
    label: 'Milo',
    value: 'milo',
  },
  {
    label: 'Coco',
    value: 'coco',
  },
  {
    label: 'Oreo',
    value: 'oreo',
  },
  {
    label: 'Princess',
    value: 'princess',
  },
  {
    label: 'Smokey',
    value: 'smokey',
  },
  {
    label: 'Ginger',
    value: 'ginger',
  },
];
