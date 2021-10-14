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

import React from 'react';

import { render, axe, userEvent, act } from '../../util/test-utils';

import {
  NotificationFullscreen,
  NotificationFullscreenProps,
} from './NotificationFullscreen';

describe('NotificationFullscreen', () => {
  const renderNotificationFullscreen = (
    baseProps: NotificationFullscreenProps,
  ) => render(<NotificationFullscreen {...baseProps} />);

  const baseProps: NotificationFullscreenProps = {
    headline: 'Empty box',
    body:
      'Unfortunately, the box is empty. You can either look again, or go elsewhere.',
    image: {
      src:
        "data:image/svg+xml;utf8,%3Csvg width='280' height='160' viewBox='0 0 280 160' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M129.912 89.3736H91.363L80.8357 78.2643C80.6276 78.0421 80.4889 77.7639 80.4365 77.464C80.384 77.1641 80.4202 76.8555 80.5405 76.5758C80.6608 76.2961 80.8601 76.0576 81.1139 75.8894C81.3677 75.7212 81.665 75.6307 81.9694 75.6289H114.978C115.581 75.6286 116.178 75.7515 116.732 75.99C117.287 76.2284 117.787 76.5775 118.201 77.0158L129.912 89.3736Z' fill='%233063E9'/%3E%3Cpath d='M145.933 112.661H200.157C200.613 112.664 201.061 112.54 201.452 112.305C201.842 112.07 202.161 111.731 202.371 111.326C202.582 110.921 202.677 110.467 202.645 110.011C202.614 109.556 202.457 109.119 202.193 108.747L188.646 89.375H129.651L145.933 112.661Z' fill='black'/%3E%3Cpath d='M149.889 89.375H188.615V138.17C188.615 138.755 188.382 139.316 187.968 139.73C187.555 140.143 186.994 140.376 186.408 140.376H149.889V89.375Z' fill='%233063E9'/%3E%3Cpath d='M91.3096 89.375H150.065V140.372H94.1551C93.4004 140.372 92.6766 140.072 92.143 139.538C91.6094 139.005 91.3096 138.281 91.3096 137.526V89.375Z' fill='black'/%3E%3Cpath d='M174.8 98.3242H166.835C165.174 98.3242 163.828 99.6706 163.828 101.331C163.828 102.992 165.174 104.339 166.835 104.339H174.8C176.461 104.339 177.807 102.992 177.807 101.331C177.807 99.6706 176.461 98.3242 174.8 98.3242Z' fill='white'/%3E%3Cpath d='M198.172 75.6289H165.274C164.584 75.6289 163.902 75.7694 163.269 76.0417C162.635 76.314 162.064 76.7125 161.589 77.2128L150.065 89.3736H188.614L199.255 78.1456C199.456 77.934 199.59 77.6682 199.641 77.3812C199.692 77.0942 199.657 76.7985 199.542 76.5307C199.427 76.263 199.236 76.0348 198.992 75.8746C198.749 75.7143 198.464 75.6289 198.172 75.6289Z' fill='%238FBBFF'/%3E%3Cpath d='M131.459 112.661H79.7397C77.8101 112.661 76.6789 110.479 77.7827 108.892L91.3695 89.375H150.065L135.23 110.688C134.807 111.297 134.243 111.794 133.587 112.137C132.93 112.481 132.2 112.66 131.459 112.661Z' fill='%23BEDCFF'/%3E%3Cpath d='M143.355 50.8897C144.381 50.8064 145.406 50.7066 146.43 50.5904C148.77 50.3265 151.105 49.9841 153.413 49.5354C155.4 49.1627 157.364 48.6788 159.296 48.0859L159.298 48.0852C161.218 47.4634 163.086 46.6934 164.886 45.7822C167.358 44.5569 169.872 43.1125 171.843 41.1216C172.758 40.1981 173.612 39.0908 173.873 37.7524L173.873 37.7524C174.154 36.3092 173.804 34.8545 173.21 33.5615L173.21 33.5614C171.869 30.648 169.381 28.4731 166.765 26.7652C163.981 24.9433 160.907 23.6061 157.753 22.5927L157.753 22.5927C154.566 21.5718 151.29 20.8729 148.009 20.287L148.009 20.287C146.408 20.0018 144.804 19.743 143.201 19.4845L143.201 19.4844V19.4844L143.199 19.4841C142.926 19.4434 142.741 19.6408 142.687 19.8307C142.66 19.9279 142.661 20.0415 142.713 20.1414C142.768 20.2468 142.87 20.3169 143.003 20.3358C143.003 20.3358 143.002 20.3357 143.002 20.3356L143.025 20.1875C146.224 20.692 149.424 21.2181 152.583 21.9409C155.742 22.6636 158.84 23.5807 161.791 24.8888C163.264 25.5411 164.688 26.2999 166.05 27.1593C167.356 27.9868 168.626 28.9026 169.731 29.9887L139.811 65.0575M143.355 50.8897C143.95 51.4749 144.526 52.0815 145.079 52.7085L145.079 52.709C146.095 53.8683 147.102 55.3115 147.644 56.8545C148.187 58.4001 148.268 60.0561 147.414 61.6212C146.717 62.901 145.547 63.8953 144.299 64.582C142.926 65.3467 141.385 65.758 139.813 65.7789L139.812 65.7789C139.677 65.7798 139.566 65.7263 139.49 65.6385C139.418 65.5538 139.385 65.446 139.385 65.344C139.386 65.2419 139.418 65.1342 139.491 65.0496C139.565 64.962 139.676 64.9077 139.81 64.9075M143.355 50.8897C143.289 50.8951 143.223 50.9004 143.157 50.9056C143.109 50.8591 143.061 50.8127 143.013 50.7664M139.81 64.9075C139.811 64.9075 139.811 64.9075 139.811 64.9075V65.0575M139.81 64.9075C139.81 64.9075 139.81 64.9075 139.809 64.9075L139.811 65.0575M139.81 64.9075C141.244 64.8888 142.651 64.5103 143.9 63.8066L143.901 63.8063C145.08 63.1495 146.159 62.2129 146.753 61.0029L146.888 61.0689C146.276 62.3151 145.17 63.2713 143.974 63.9373C142.702 64.6535 141.271 65.0387 139.811 65.0575' fill='black' stroke='black' stroke-width='0.3'/%3E%3C/svg%3E",
      alt: 'Empty box',
    },
    actions: {
      primary: {
        children: 'Look again',
        onClick: jest.fn(),
      },
      secondary: {
        children: 'Go elsewhere',
        href: 'https://sumup.com',
        onClick: jest.fn(),
      },
    },
  };

  describe('styles', () => {
    it('should render with default styles', () => {
      const { container } = renderNotificationFullscreen(baseProps);
      expect(container).toMatchSnapshot();
    });
  });

  describe('business logic', () => {
    it('should click on a primary action button', () => {
      const { getByRole } = renderNotificationFullscreen(baseProps);

      act(() => {
        userEvent.click(getByRole('button', { name: /Look again/i }));
      });

      expect(getByRole('button', { name: /Look again/i })).toBeVisible();

      expect(baseProps.actions.primary.onClick).toHaveBeenCalledTimes(1);
    });

    it('should click on a secondary action button', () => {
      const { getAllByRole } = renderNotificationFullscreen(baseProps);

      act(() => {
        userEvent.click(getAllByRole('link', { name: /Go elsewhere/ })[0]);
      });

      expect(getAllByRole('link', { name: /Go elsewhere/ })[0]).toBeVisible();

      expect(baseProps.actions.secondary.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const { container } = renderNotificationFullscreen(baseProps);
      const actual = await axe(container);
      expect(actual).toHaveNoViolations();
    });
  });
});
