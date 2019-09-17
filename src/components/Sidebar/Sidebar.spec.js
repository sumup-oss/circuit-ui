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

import React from 'react';
import Sidebar from './Sidebar';

describe('<Sidebar />', () => {
  it('should render and match the snapshot when closed', () => {
    const props = {
      open: false,
      onClose: jest.fn()
    };
    const actual = create(<Sidebar {...props} />);
    expect(actual).toMatchSnapshot();
  });

  it('should render and match snapshot when open', () => {
    const props = {
      open: true,
      onClose: jest.fn()
    };
    const actual = create(<Sidebar {...props} />);
    expect(actual).toMatchSnapshot();
  });

  it('should dispatch onClose when CloseButton is clicked', () => {
    const props = {
      open: true,
      onClose: jest.fn()
    };
    const { getByTestId } = render(<Sidebar {...props} />);
    act(() => {
      fireEvent.click(getByTestId('sidebar-close-button'));
    });
    expect(props.onClose).toHaveBeenCalled();
  });

  it('should dispatch onClose when the Backdrop is clicked', () => {
    const props = {
      open: true,
      onClose: jest.fn()
    };
    const { getByTestId } = render(<Sidebar {...props} />);
    act(() => {
      fireEvent.click(getByTestId('sidebar-backdrop'));
    });
    expect(props.onClose).toHaveBeenCalled();
  });

  describe('accessibility', () => {
    it('should meet accessibility guidelines', async () => {
      const wrapper = renderToHtml(<Sidebar />);
      const actual = await axe(wrapper);
      expect(actual).toHaveNoViolations();
    });
  });
});
