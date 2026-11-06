import { describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { Add, Delete } from '@sumup-oss/icons';

import { render, screen, userEvent } from '../../util/test-utils.js';
import { CircuitError } from '../../util/errors.js';

import {
  defaultFormatFn,
  getAllFocusableElements,
  getListItemFragmentContent,
  isOptionArray,
  isValidZonedDateTimeInput,
} from './DataGridService.js';
import type { ColumnType, MobileSlots, Option } from './types.js';
import { member, columns, type Member } from './fixtures.js';

describe('DataGridService', () => {
  describe('isOptionArray', () => {
    it.each([
      { value: [] },
      { value: [{ label: 'Active', value: 'active' }] },
      { value: [{ label: 'Active', value: 1 }] },
      {
        value: [
          { label: 'Active', value: 'active' },
          { label: 'Inactive', value: 'inactive' },
        ],
      },
    ])('should return true for $value', ({ value }) => {
      expect(isOptionArray(value)).toBe(true);
    });

    it.each([
      { value: undefined },
      { value: null },
      { value: 'active' },
      { value: 1 },
      { value: true },
      { value: {} },
      { value: { label: 'Active', value: 'active' } },
      { value: [{ label: 'Active' }] },
      { value: [{ value: 'active' }] },
      {
        value: [{ label: 'Active', value: 'active' }, { label: 'Inactive' }],
      },
    ])('should return false for $value', ({ value }) => {
      expect(isOptionArray(value)).toBe(false);
    });
  });

  describe('isValidZonedDateTimeInput', () => {
    it.each([
      '2020-01-01T00:00+01:00[Europe/Berlin]',
      '2020-03-15T10:00:00+01:00[Europe/Berlin]',
      '2020-01-01T00:00:00Z[UTC]',
      '2020-01-01T00:00:00+00:00[UTC]',
    ])('should return true for %s', (value) => {
      const actual = isValidZonedDateTimeInput(value);
      expect(actual).toBe(true);
    });

    it.each([
      '',
      'invalid',
      'not-a-date',
      '2020-01-01',
      '2020-01-01T00:00:00',
      '2020-01-01T00:00:00Z',
      '2020-13-01T00:00+01:00[Europe/Berlin]',
      '2020-01-32T00:00+01:00[Europe/Berlin]',
    ])('should return false for %s', (value) => {
      const actual = isValidZonedDateTimeInput(value);
      expect(actual).toBe(false);
    });
  });

  describe('defaultFormatFn', () => {
    const locale = 'en-US';
    const uniqueId = 'row-0';

    type Row = {
      text: string;
      age: number;
      price: number;
      hasFilledHealthData: boolean;
      invalidNumber: boolean;
      status: string;
      invalidStatus: number;
      tags: string[];
      emptyTags: string[];
      invalidTags: string;
      date: string;
      invalidDate: string;
    };

    const row: Row = {
      text: 'Hello',
      hasFilledHealthData: false,
      age: 32,
      price: 39.99,
      invalidNumber: true,
      status: 'active',
      invalidStatus: 1,
      tags: ['eggs', 'soy'],
      emptyTags: [],
      invalidTags: 'eggs',
      date: '2020-01-01T00:00+01:00[Europe/Berlin]',
      invalidDate: 'not-a-date',
    };

    const statusOptions: Option[] = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ];

    const tagOptions: Option[] = [
      { label: 'Eggs', value: 'eggs' },
      { label: 'Soy', value: 'soy' },
      { label: 'Nuts', value: 'nuts' },
    ];

    function renderResult(result: ReactNode) {
      return render(<div data-testid="result">{result}</div>);
    }
    it('should return null with nil value', () => {
      const result = defaultFormatFn(
        { name: 'text' },
        row,
        undefined,
        locale,
        uniqueId,
      );
      expect(result).toBeNull();
    });

    describe('text (default)', () => {
      it('should return raw text', () => {
        const result = defaultFormatFn(
          { name: 'text' },
          row,
          'Hello',
          locale,
          uniqueId,
        );

        expect(result).toBe('Hello');
      });
    });

    describe('boolean', () => {
      it('should format true value with icon and label', () => {
        const result = defaultFormatFn(
          {
            name: 'boolean',
            accessibleLabel: (value) => (value ? 'Yes' : 'No'),
          },
          row,
          true,
          locale,
          uniqueId,
        );
        renderResult(result);
        expect(screen.getByLabelText('Yes')).toBeVisible();
      });
      it('should format false value with icon and label', () => {
        const result = defaultFormatFn(
          {
            name: 'boolean',
            accessibleLabel: (value) => (value ? 'Yes' : 'No'),
          },
          row,
          false,
          locale,
          uniqueId,
        );
        renderResult(result);
        expect(screen.getByLabelText('No')).toBeVisible();
      });
      it('should throw CircuitError for an invalid value', () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'Column type `boolean` must either be boolean or "true"/"false" strings.',
        );

        expect(() =>
          defaultFormatFn(
            {
              name: 'boolean',
              accessibleLabel: (value) => (value ? 'Yes' : 'No'),
            },
            row,
            'truthy',
            locale,
            uniqueId,
          ),
        ).toThrow(expectedError);
      });
    });

    describe('date', () => {
      it('should format a valid ZonedDateTime date', () => {
        const result = defaultFormatFn(
          { name: 'date', formatStyle: 'long', includeTime: true },
          row,
          '2020-01-01T00:00+01:00[Europe/Berlin]',
          locale,
          uniqueId,
        );

        renderResult(result);
        expect(screen.getByTestId('result').textContent).toBe(
          'January 1, 2020 at 12:00 AM',
        );
      });

      it('should throw CircuitError for an invalid date', () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'The date provided is not a valid ZonedDateTime date.',
        );

        expect(() =>
          defaultFormatFn(
            { name: 'date' },
            row,
            'invalidDate',
            locale,
            uniqueId,
          ),
        ).toThrow(expectedError);
      });
    });

    describe('number', () => {
      it('should return an unformatted number', () => {
        const result = defaultFormatFn(
          { name: 'number' },
          row,
          row.age,
          locale,
          uniqueId,
        );

        expect(result).toBe('32');
      });

      it('should apply formattingOptions', () => {
        const type: ColumnType<Row> = {
          name: 'number',
          formattingOptions: {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 1,
          },
        };

        const result = defaultFormatFn(type, row, '39.99', locale, uniqueId);

        renderResult(result);
        expect(screen.getByText('€39.99')).toBeVisible();
      });

      it('should throw CircuitError for a non-numeric string', () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'The value provided is not a valid number.',
        );

        expect(() =>
          defaultFormatFn({ name: 'number' }, row, 'false', locale, uniqueId),
        ).toThrow(expectedError);
      });

      it('should throw CircuitError for a non-numeric value', () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'The value provided is not a number or string.',
        );

        expect(() =>
          defaultFormatFn({ name: 'number' }, row, false, locale, uniqueId),
        ).toThrow(expectedError);
      });
    });

    describe('singleSelection', () => {
      it('should return the matching option label', () => {
        const result = defaultFormatFn(
          { name: 'singleSelection', options: statusOptions },
          row,
          row.status,
          locale,
          uniqueId,
        );

        renderResult(result);
        expect(screen.getByTestId('result').textContent).toBe('Active');
      });

      it('should fall back to the raw value when no option matches', () => {
        const result = defaultFormatFn(
          { name: 'singleSelection', options: statusOptions },
          row,
          'unknown',
          locale,
          uniqueId,
        );

        renderResult(result);
        expect(screen.getByTestId('result').textContent).toBe('unknown');
      });

      it('should use a custom render function when provided', () => {
        const renderOption = vi.fn(
          (option: Option) => `rendered:${option.label}`,
        );

        const result = defaultFormatFn(
          {
            name: 'singleSelection',
            options: statusOptions,
            render: renderOption,
          },
          row,
          row.status,
          locale,
          uniqueId,
        );

        renderResult(result);
        expect(screen.getByTestId('result').textContent).toBe(
          'rendered:Active',
        );
        expect(renderOption).toHaveBeenCalledWith(statusOptions[0]);
      });

      it('should map options with getOptionLabel and getOptionValue', () => {
        const getOptionLabel = vi
          .fn()
          .mockImplementation(
            (option: { code: string; name: string }) => option.name,
          );
        const getOptionValue = vi
          .fn()
          .mockImplementation(
            (option: { code: string; name: string }) => option.code,
          );
        const result = defaultFormatFn(
          {
            name: 'singleSelection',
            options: [{ name: 'foo', code: 'bar' }],
            getOptionLabel,
            getOptionValue,
          },
          row,
          'bar',
          locale,
          uniqueId,
        );
        renderResult(result);
        expect(screen.getByText('foo')).toBeVisible();
        expect(getOptionLabel).toHaveBeenCalledExactlyOnceWith({
          name: 'foo',
          code: 'bar',
        });
        expect(getOptionValue).toHaveBeenCalledExactlyOnceWith({
          name: 'foo',
          code: 'bar',
        });
      });

      it('should throw CircuitError for a non-string or non-number value', () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'Column type `singleSelection` requires a string or number value.',
        );

        expect(() =>
          defaultFormatFn(
            { name: 'singleSelection', options: statusOptions },
            row,
            false,
            locale,
            uniqueId,
          ),
        ).toThrow(expectedError);
      });

      it('should throw CircuitError when `getOptionValue` and `getOptionLabel` are not provided', () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'Column type `singleSelection` options requires both `getOptionValue` and `getOptionLabel`.',
        );

        expect(() =>
          defaultFormatFn(
            // @ts-expect-error
            {
              name: 'singleSelection',
              options: [{ name: 'foo', code: 'bar' }],
            },
            row,
            false,
            locale,
            uniqueId,
          ),
        ).toThrow(expectedError);
      });
    });

    describe('multiSelection', () => {
      it('should join matching option labels', () => {
        const result = defaultFormatFn(
          { name: 'multiSelection', options: tagOptions },
          row,
          row.tags,
          locale,
          uniqueId,
        );

        expect(result).toBe('Eggs, Soy');
      });

      it('should return null for an empty array', () => {
        const result = defaultFormatFn(
          { name: 'multiSelection', options: tagOptions },
          row,
          row.emptyTags,
          locale,
          uniqueId,
        );

        expect(result).toBeNull();
      });

      it('should use a custom render function when provided', () => {
        const renderOption = vi.fn((option: Option, key: string) => (
          <span key={`${key}-${option.value}`}>{option.label}</span>
        ));

        const result = defaultFormatFn(
          {
            name: 'multiSelection',
            options: tagOptions,
            render: renderOption,
          },
          row,
          row.tags,
          locale,
          uniqueId,
        );

        renderResult(result);
        expect(screen.getByText('Eggs')).toBeVisible();
        expect(screen.getByText('Soy')).toBeVisible();
        expect(renderOption).toHaveBeenCalledTimes(2);
        expect(renderOption).toHaveBeenCalledWith(
          tagOptions[0],
          `${uniqueId}-${tagOptions[0].value}`,
        );
      });

      it('should map options with getOptionLabel and getOptionValue', () => {
        const getOptionLabel = vi
          .fn()
          .mockImplementation(
            (option: { code: string; name: string }) => option.name,
          );
        const getOptionValue = vi
          .fn()
          .mockImplementation(
            (option: { code: string; name: string }) => option.code,
          );
        const result = defaultFormatFn(
          {
            name: 'multiSelection',
            options: [{ name: 'foo', code: 'bar' }],
            getOptionLabel,
            getOptionValue,
          },
          row,
          ['bar'],
          locale,
          uniqueId,
        );
        renderResult(result);
        expect(screen.getByText('foo')).toBeVisible();
        expect(getOptionLabel).toHaveBeenCalledExactlyOnceWith({
          name: 'foo',
          code: 'bar',
        });
        expect(getOptionValue).toHaveBeenCalledExactlyOnceWith({
          name: 'foo',
          code: 'bar',
        });
      });

      it('should throw CircuitError for a non-string or non-number array value', () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'Column type `multiSelection` requires an array of string or number values.',
        );

        expect(() =>
          defaultFormatFn(
            { name: 'multiSelection', options: tagOptions },
            row,
            'invalidTags',
            locale,
            uniqueId,
          ),
        ).toThrow(expectedError);
      });

      it('should throw CircuitError when `getOptionValue` and `getOptionLabel` are not provided', () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'Column type `multiSelection` options requires both `getOptionValue` and `getOptionLabel`.',
        );

        expect(() =>
          defaultFormatFn(
            // @ts-expect-error
            { name: 'multiSelection', options: [{ name: 'foo', code: 'bar' }] },
            row,
            ['bar'],
            locale,
            uniqueId,
          ),
        ).toThrow(expectedError);
      });
    });

    describe('quick-actions', () => {
      it('should render QuickActions', async () => {
        const onClick = vi.fn();
        const type: ColumnType<Member> = {
          name: 'quick-actions',
          actions: [
            {
              icon: Add,
              onClick,
              children: 'Add',
              'aria-description': (value: Member) => `Add ${value.firstName}`,
            },
          ],
        };

        const result = defaultFormatFn(
          type,
          member,
          undefined,
          locale,
          uniqueId,
        );

        renderResult(result);
        expect(screen.getByRole('button', { name: 'Add' })).toBeVisible();
        await userEvent.click(screen.getByRole('button', { name: 'Add' }));
        expect(onClick).toHaveBeenCalledWith(expect.any(Object), member);
      });

      it('should throw an error if actions length is superior to 4', async () => {
        const expectedError = new CircuitError(
          'DataGrid',
          'The number of quick actions must not surpass 4.',
        );
        const type: ColumnType<Member> = {
          name: 'quick-actions',
          actions: [
            {
              icon: Add,
              onClick: vi.fn(),
              children: 'Add',
              'aria-description': (value: Member) => `Add ${value.firstName}`,
            },
            {
              icon: Add,
              onClick: vi.fn(),
              children: 'Add',
              'aria-description': (value: Member) => `Add ${value.firstName}`,
            },
            {
              icon: Add,
              onClick: vi.fn(),
              children: 'Add',
              'aria-description': (value: Member) => `Add ${value.firstName}`,
            },
            {
              icon: Add,
              onClick: vi.fn(),
              children: 'Add',
              'aria-description': (value: Member) => `Add ${value.firstName}`,
            },
            {
              icon: Add,
              onClick: vi.fn(),
              children: 'Add',
              'aria-description': (value: Member) => `Add ${value.firstName}`,
            },
          ],
        };

        expect(() =>
          defaultFormatFn(type, member, undefined, locale, uniqueId),
        ).toThrow(expectedError);
      });
    });

    describe('row-actions', () => {
      it('should render RowActions with a resolved label', async () => {
        const onClick = vi.fn();
        const type: ColumnType<Member> = {
          name: 'row-actions',
          label: 'More actions',
          labelDescription: (value) =>
            `More actions for ${value.firstName} ${value.lastName}`,
          actions: [
            {
              children: 'Delete',
              icon: Delete,
              onClick,
              'aria-description': (value) => `Delete ${value.firstName}`,
            },
          ],
        };

        const result = defaultFormatFn(
          type,
          member,
          'status',
          locale,
          uniqueId,
        );

        renderResult(result);
        const menuTrigger = screen.getByRole('button', {
          name: 'More actions',
        });

        expect(menuTrigger).toBeVisible();
        expect(menuTrigger).toHaveAccessibleDescription(
          `More actions for Jane Doe`,
        );

        await userEvent.click(menuTrigger);
        await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(onClick).toHaveBeenCalledWith(expect.any(Object), member);
      });
    });
  });

  describe('getListItemFragmentContent', () => {
    const locale = 'en-US';
    const uniqueId = 'row-0';

    function renderFragment(content: ReactNode) {
      return render(<div data-testid="fragment">{content}</div>);
    }

    it('should map a single column id to the corresponding fragment key', () => {
      const mobileConfig: MobileSlots = {
        label: 'full_name',
      };

      const actual = getListItemFragmentContent(
        columns,
        member,
        locale,
        mobileConfig,
        uniqueId,
      );

      expect(actual.label).toBe('Jane Doe');
    });

    it('should join multiple column values with a middot separator', () => {
      const mobileConfig: MobileSlots = {
        label: 'full_name',
        details: 'age;status',
      };

      const actual = getListItemFragmentContent(
        columns,
        member,
        locale,
        mobileConfig,
        uniqueId,
      );

      renderFragment(actual.details);
      expect(screen.getByTestId('fragment')).toHaveTextContent('32 · Active');
    });

    it('should populate all configured fragment keys', () => {
      const mobileConfig: MobileSlots = {
        leadingComponent: 'status',
        label: 'full_name',
        details: 'age',
        trailingDetails: 'status',
        trailingLabel: 'subscriptionPrice',
      };

      const actual = getListItemFragmentContent(
        columns,
        member,
        locale,
        mobileConfig,
        uniqueId,
      );

      expect(actual.leadingComponent).toBe('Active');
      expect(actual.label).toBe('Jane Doe');
      expect(actual.details).toBe('32');
      expect(actual.trailingDetails).toBe('Active');
      renderFragment(actual.trailingLabel);
      expect(screen.getByTestId('fragment')).toHaveTextContent(/\$39\.99|€39/);
    });

    it('should skip falsy mobile config values', () => {
      const mobileConfig: MobileSlots = {
        label: 'full_name',
        details: undefined,
        trailingLabel: '',
      };

      const actual = getListItemFragmentContent(
        columns,
        member,
        locale,
        mobileConfig,
        uniqueId,
      );

      expect(actual).toEqual({ label: 'Jane Doe' });
    });

    it('should omit a key when the referenced column does not exist', () => {
      const mobileConfig: MobileSlots = {
        label: 'missing_column',
      };

      const actual = getListItemFragmentContent(
        columns,
        member,
        locale,
        mobileConfig,
        uniqueId,
      );

      expect(actual).toEqual({});
    });

    it('should ignore missing columns when joining multiple values', () => {
      const mobileConfig: MobileSlots = {
        label: 'full_name',
        details: 'age;missing_column;status',
      };

      const actual = getListItemFragmentContent(
        columns,
        member,
        locale,
        mobileConfig,
        uniqueId,
      );

      renderFragment(actual.details);
      expect(screen.getByTestId('fragment')).toHaveTextContent('32 · Active');
    });
  });

  describe('getAllFocusableElements', () => {
    function tagNames(elements: ArrayLike<Element>) {
      return Array.from(elements, (element) => element.tagName);
    }

    it('should return an empty array when the parent is null', () => {
      expect(getAllFocusableElements(null)).toEqual([]);
    });

    it('should return an empty list when the parent has no focusable descendants', () => {
      render(
        <div data-testid="parent">
          <span>Name</span>
          <p>Details</p>
        </div>,
      );

      expect(
        getAllFocusableElements(screen.getByTestId('parent')),
      ).toHaveLength(0);
    });

    it('should not include the parent element', () => {
      render(
        <button type="button" data-testid="parent">
          Save
        </button>,
      );

      expect(
        getAllFocusableElements(screen.getByTestId('parent')),
      ).toHaveLength(0);
    });

    it('should return focusable descendants', () => {
      render(
        <div data-testid="parent">
          <div>
            <button type="button">Save</button>
            <button type="button" tabIndex={-1}>
              Secondary
            </button>
          </div>
          <a href="/members">Members</a>
          <input aria-label="Name" />
          <select aria-label="Status">
            <option value="active">Active</option>
          </select>
          <textarea aria-label="Notes" />
          <div role="button" tabIndex={0}>
            Custom
          </div>
          <details>
            <summary>More</summary>
          </details>
        </div>,
      );

      expect(
        tagNames(getAllFocusableElements(screen.getByTestId('parent'))),
      ).toEqual([
        'BUTTON',
        'BUTTON',
        'A',
        'INPUT',
        'SELECT',
        'TEXTAREA',
        'DIV',
        'DETAILS',
        'SUMMARY',
      ]);
    });

    it('should exclude disabled controls, anchors without href, and tabindex -1', () => {
      render(
        <div data-testid="parent">
          <button type="button" disabled>
            Save
          </button>
          {/* biome-ignore lint/a11y/useValidAnchor: a missing href is the case under test */}
          <a>Members</a>
          <input aria-label="Name" disabled />
          <select aria-label="Status" disabled>
            <option value="active">Active</option>
          </select>
          <textarea aria-label="Notes" disabled />
          <div role="button" tabIndex={-1}>
            Skipped
          </div>
          <div role="button" tabIndex={0}>
            Custom
          </div>
          <details>
            <summary>More</summary>
          </details>
        </div>,
      );

      const parent = screen.getByTestId('parent');
      parent.querySelector('details')?.setAttribute('disabled', '');
      parent.querySelector('[tabindex="0"]')?.setAttribute('disabled', '');

      expect(tagNames(getAllFocusableElements(parent))).toEqual(['SUMMARY']);
    });
  });
});
