/**
 * Copyright 2022, SumUp Ltd.
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

import { light } from '@sumup/design-tokens';

type Type = 'background' | 'border' | 'text';

type NVariant = 'default' | 'subtle' | 'highlighted' | 'inverted'; // switch inverted for on*?
type State = 'default' | 'hover' | 'active';
type Neutrals = {
  [t in Type]: {
    [v in NVariant]: {
      [s in State]: string;
    };
  };
};

type CVariant = 'default';
type Colors = {
  [t in Type]: {
    [v in CVariant]: {
      [s in State]: string;
    };
  };
};

type C = 'primary' | 'confirm' | 'notify' | 'alert';
export type SemanticTheme = { neutral: Neutrals } & {
  [key in C]: Colors;
};

const L: SemanticTheme = {
  neutral: {
    background: {
      default: {
        default: light.colors.white,
        hover: light.colors.n100,
        active: light.colors.n200,
      },
      subtle: {
        default: '',
        hover: '',
        active: '',
      },
      highlighted: {
        default: '',
        hover: '',
        active: '',
      },
      inverted: {
        default: '',
        hover: '',
        active: '',
      },
    },
    border: {
      default: {
        default: light.colors.n500,
        hover: light.colors.n700,
        active: light.colors.n800,
      },
      subtle: {
        default: '',
        hover: '',
        active: '',
      },
      highlighted: {
        default: '',
        hover: '',
        active: '',
      },
      inverted: {
        default: '',
        hover: '',
        active: '',
      },
    },
    text: {
      default: {
        default: light.colors.bodyColor,
        hover: '', // does text need states?
        active: '',
      },
      subtle: {
        default: light.colors.n700,
        hover: '',
        active: '',
      },
      highlighted: {
        // for black/high contrast text (e.g. button secondary)
        default: light.colors.black,
        hover: '',
        active: '',
      },
      // ... other variants
      inverted: {
        default: light.colors.white,
        hover: '',
        active: '',
      },
    },
  },
  primary: {
    background: {
      default: {
        default: light.colors.p500,
        hover: light.colors.p700,
        active: light.colors.p900,
      },
    },
    border: {
      default: {
        default: light.colors.p500, // same as bg for now
        hover: light.colors.p700,
        active: light.colors.p900,
      },
    },
    text: {
      default: {
        default: light.colors.p500,
        hover: light.colors.p700,
        active: light.colors.p900,
      },
    },
  },
  confirm: {
    background: {
      default: {
        default: light.colors.confirm,
        hover: '',
        active: '',
      },
    },
    border: {
      default: {
        default: light.colors.confirm,
        hover: '',
        active: '',
      },
    },
    text: {
      default: {
        default: light.colors.confirm,
        hover: '',
        active: '',
      },
    },
  },
  notify: {
    background: {
      default: {
        default: light.colors.notify,
        hover: '',
        active: '',
      },
    },
    border: {
      default: {
        default: light.colors.notify,
        hover: '',
        active: '',
      },
    },
    text: {
      default: {
        default: light.colors.notify,
        hover: '',
        active: '',
      },
    },
  },
  alert: {
    background: {
      default: {
        default: light.colors.alert,
        hover: light.colors.r700,
        active: light.colors.r900,
      },
    },
    border: {
      default: {
        default: light.colors.alert,
        hover: light.colors.r700,
        active: light.colors.r900,
      },
    },
    text: {
      default: {
        default: light.colors.alert,
        hover: light.colors.r700,
        active: light.colors.r900,
      },
    },
  },
  // immutable?
};

export function getTheme(theme?: 'light' | 'dark'): SemanticTheme {
  switch (theme) {
    case 'light':
      return L;
    case 'dark':
      return L; // TODO
    default:
      return L;
  }
}
