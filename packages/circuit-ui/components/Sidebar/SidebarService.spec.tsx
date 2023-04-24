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

import { describe, expect, it } from 'vitest';
import { SecurePayments } from '@sumup/icons';

import {
  hasSelectedChild,
  getSelectedChildIndex,
  getSecondaryChildren,
  getChildrenLength,
  getIcon,
} from './SidebarService.jsx';

describe('SidebarService', () => {
  describe('hasSelectedChild', () => {
    it('should return true for an array with a selected child', () => {
      const children = [
        { props: { selected: false } },
        { props: { selected: true } },
        { props: { selected: false } },
      ];

      const hasSelected = hasSelectedChild(children);
      expect(hasSelected).toBe(true);
    });

    it('should return false for an array with no selected child', () => {
      const children = [
        { props: { selected: false } },
        { props: { selected: false } },
        { props: { selected: false } },
      ];

      const hasSelected = hasSelectedChild(children);
      expect(hasSelected).toBe(false);
    });

    it('should return false for an unselected single child', () => {
      const children = { props: { selected: false } };

      const hasSelected = hasSelectedChild(children);
      expect(hasSelected).toBe(false);
    });

    it('should return true for an selected single child', () => {
      const children = { props: { selected: true } };

      const hasSelected = hasSelectedChild(children);
      expect(hasSelected).toBe(true);
    });
  });

  describe('getSelectedChildIndex', () => {
    it('should return the correct index of the selected child on an array', () => {
      const children = [
        { props: { selected: false } },
        { props: { selected: true } },
        { props: { selected: false } },
      ];
      const selectedChild = getSelectedChildIndex(children);

      expect(selectedChild).toEqual(1);
    });

    it('should return 0 for a single child', () => {
      const children = { props: { selected: true } };
      const selectedChild = getSelectedChildIndex(children);

      expect(selectedChild).toEqual(0);
    });

    it('should return the first selected index for multiple selected children', () => {
      const children = [
        { props: { selected: true } },
        { props: { selected: false } },
        { props: { selected: true } },
      ];
      const selectedChild = getSelectedChildIndex(children);

      expect(selectedChild).toEqual(0);
    });
  });

  describe('getSecondaryChildren', () => {
    it('should return all secondary children for an array of items', () => {
      const children = [
        { props: { secondary: false } },
        { props: { secondary: false } },
      ];
      expect(getSecondaryChildren(children)[0].props.secondary).toBe(true);
      expect(getSecondaryChildren(children)[1].props.secondary).toBe(true);
    });

    it('should return null when no children is received', () => {
      expect(getSecondaryChildren()).toBeUndefined();
    });

    it('should return a visible secondary child when it should be visible', () => {
      const children = { props: { secondary: false } };
      expect(getSecondaryChildren(children, true)[0].props).toEqual({
        secondary: true,
        visible: true,
      });
    });
  });

  describe('getChildrenLength', () => {
    it('should return the number of children', () => {
      // eslint-disable-next-line react/jsx-key
      const children = [<div />, <div />, <div />, <div />];
      expect(getChildrenLength(children)).toBe(4);
    });

    it('should return 0 if no children are passed', () => {
      const children = null;
      expect(getChildrenLength(children)).toBe(0);
    });
  });

  describe('getIcon', () => {
    const mockDefaultIcon = <svg id="default-icon" />;
    const mockSelectedIcon = <svg id="selected-icon" />;
    const disabledIcon = <SecurePayments />;

    describe('if there is no default icon', () => {
      it('should not return an icon', () => {
        const icon = getIcon({});
        expect(icon).toBeNull();
      });

      it('should not return the disabled icon', () => {
        const icon = getIcon({ disabled: true });
        expect(icon).toBeNull();
      });
    });

    describe('if there is a default icon', () => {
      describe('if the item is disabled', () => {
        it('should return the disabled icon', () => {
          const icon = getIcon({
            defaultIcon: mockDefaultIcon,
            disabled: true,
          });
          expect(icon).toStrictEqual(disabledIcon);
        });
      });

      describe('if the item is not disabled', () => {
        describe("if the item isn't selected", () => {
          it('should return the default icon', () => {
            const icon = getIcon({
              defaultIcon: mockDefaultIcon,
            });
            expect(icon).toBe(mockDefaultIcon);
          });
        });

        describe('if the item is selected', () => {
          it('should return the selected icon if there is a selected icon', () => {
            const icon = getIcon({
              defaultIcon: mockDefaultIcon,
              selected: true,
              selectedIcon: mockSelectedIcon,
            });
            expect(icon).toBe(mockSelectedIcon);
          });

          it('should return the default icon if there is no selected icon', () => {
            const icon = getIcon({
              defaultIcon: mockDefaultIcon,
              selected: true,
            });
            expect(icon).toBe(mockDefaultIcon);
          });
        });
      });
    });
  });
});
