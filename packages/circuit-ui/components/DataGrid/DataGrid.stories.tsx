import { DataGrid, type DataGridProps } from './DataGrid.js';
import type { Column } from './types.js';
import {
  Close,
  Crustaceans,
  Delete,
  Edit,
  Eggs,
  Flag,
  type FlagProps,
  Gluten,
  type IconComponentType,
  Milk,
  Nuts,
  Pause,
  Play,
  Refresh,
  Remove,
  Send,
  Soy,
  View,
} from '@sumup-oss/icons';

import styles from './DataGridStories.module.css';
import { action } from 'storybook/actions';
import { clsx } from '../../styles/clsx.js';
import { Compact, type CompactProps } from '../Compact/Compact.js';
import { Status } from '../Status/index.js';
import { screen, userEvent, within } from 'storybook/test';
import { useState } from 'react';
import { Temporal } from 'temporal-polyfill';
import { type Allergy, members, type Member } from './fixtures.js';

export default {
  title: 'Components/DataGrid',
  component: DataGrid,
  tags: ['status:stable'],
  parameters: {
    layout: 'padded',
  },
};

const formattingLocale = 'fr-FR';

const IconMap: Record<Allergy, IconComponentType> = {
  nuts: Nuts,
  eggs: Eggs,
  soy: Soy,
  shellfish: Crustaceans,
  gluten: Gluten,
  dairy: Milk,
};

const ColorMap: Record<Allergy, CompactProps['color']> = {
  nuts: 'warning',
  eggs: 'danger',
  soy: 'on-strong',
  shellfish: 'success',
  gluten: 'normal',
  dairy: 'promo',
};

const columns: Column<Member>[] = [
  {
    id: 'full_name',
    label: 'Full Name',
    type: { name: 'text' },
    isRowHeader: true,
    getValue: ({ firstName, lastName }: Member) => `${firstName} ${lastName}`,
  },
  {
    id: 'dateOfBirth',
    label: 'Date of Birth',
    type: { name: 'date' },
  },
  {
    id: 'age',
    type: { name: 'number' },
    label: 'Age',
  },
  {
    id: 'subscriptionPrice',
    getValue: ({ subscription }: Member) => subscription.price,
    maxWidth: 150,
    type: {
      name: 'number',
      formattingOptions: {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 1,
      },
    },
    label: 'Monthly subscription price',
  },
  {
    id: 'address',
    label: 'Address',
    type: {
      name: 'custom',
      render: ({ address: { countryCode, country, city } }: Member) => (
        <>
          <Flag
            size="s"
            alt={country}
            countryCode={countryCode as FlagProps['countryCode']}
          />{' '}
          {city}{' '}
        </>
      ),
    },
  },
  {
    id: 'status',
    getValue: ({ subscription }: Member) => subscription.status,
    type: {
      name: 'singleSelection',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Canceled', value: 'canceled' },
      ],
      render: ({ value, label }) => {
        if (value === 'active') {
          return (
            <Status variant="line" color="confirm" icon={Play}>
              {label}
            </Status>
          );
        }
        if (value === 'suspended') {
          return (
            <Status variant="line" color="notify" icon={Pause}>
              {label}
            </Status>
          );
        }
        if (value === 'canceled') {
          return (
            <Status variant="line" color="neutral" icon={Close}>
              {label}
            </Status>
          );
        }
        return null;
      },
    },

    label: 'Status',
  },
  {
    id: 'allergies',
    type: {
      name: 'multiSelection',
      options: [
        { label: 'Eggs', value: 'eggs' },
        { label: 'Soy', value: 'soy' },
        { label: 'Shellfish', value: 'shellfish' },
        { label: 'Gluten', value: 'gluten' },
        { label: 'Nuts', value: 'nuts' },
        { label: 'Dairy', value: 'dairy' },
      ],
      render: (allergy, key) => {
        const Icon = IconMap[allergy.value as Allergy];
        return (
          <Compact
            key={key}
            size="s"
            as="div"
            color={ColorMap[allergy.value as Allergy]}
            style={{ display: 'flex', 'alignItems': 'center' }}
            className={clsx(styles.allergy, styles[allergy.value as Allergy])}
          >
            <Icon height="16" width="16" />
            &nbsp;
            {allergy.label}
          </Compact>
        );
      },
    },

    label: 'Allergies',
  },
  {
    id: 'activity',
    label: 'Activity',
    getValue: ({ subscription }: Member) => subscription.frequentMember,
    type: {
      name: 'boolean',
      accessibleLabel: (isActive: boolean) =>
        isActive ? 'Is an active member' : 'Is not an active member',
    },
  },
  {
    id: 'actions',
    label: 'Actions',
    type: {
      name: 'quick-actions',
      actions: (value: Member) => {
        const actions = [
          {
            'aria-description': (member: Member) =>
              `Send payment reminder to ${member.firstName} ${member.lastName}`,
            children: 'Send payment reminder',
            icon: Send,
            onClick: action('Send'),
          },
          {
            'aria-description': (member: Member) =>
              `Cancel subscription of ${member.firstName} ${member.lastName}`,
            children: 'Cancel subscription',
            icon: Remove,
            onClick: action('Cancel'),
          },
        ];
        if (value.subscription.status === 'suspended') {
          actions.splice(0, 0, {
            onClick: action('Resume'),
            'aria-description': (member: Member) =>
              `Resume subscription of ${member.firstName} ${member.lastName}`,
            children: 'Resume',
            icon: Play,
          });
        }
        return actions;
      },
    },
  },

  {
    id: 'row-actions',
    label: 'More actions',
    type: {
      name: 'row-actions',
      labelDescription: (member: Member) =>
        `More actions for ${member.firstName} ${member.lastName}`,
      actions: (value) => {
        const baseRowActions = [
          {
            onClick: action('View'),
            'aria-description': (member: Member) =>
              `View details of ${member.firstName} ${member.lastName}`,
            children: 'View',
            icon: View,
          },
          {
            onClick: action('Edit'),
            'aria-description': (member: Member) =>
              `Edit details of ${member.firstName} ${member.lastName}`,
            children: 'Edit',
            icon: Edit,
          },
          {
            onClick: action('Delete'),
            'aria-description': (member: Member) =>
              `Delete member ${member.firstName} ${member.lastName}`,
            children: 'Delete',
            icon: Delete,
            destructive: true,
          },
        ];
        if (value.subscription.status === 'canceled') {
          baseRowActions.splice(0, 0, {
            onClick: action('Reactivate'),
            'aria-description': (member: Member) =>
              `Reactivate subscription of ${member.firstName} ${member.lastName}`,
            children: 'Reactivate',
            icon: Refresh,
          });
        }
        return baseRowActions;
      },
      label: 'More actions',
    },
  },
];

const buildColumnsWithFilters = (): Column<Member>[] => {
  const columnsWithFilters = [...columns];
  columnsWithFilters[1] = {
    ...columnsWithFilters[1],
    filter: true,
    filterConfig: {
      labels: {
        from: 'From',
        to: 'To',
      },
    },
  };
  columnsWithFilters[2] = {
    ...columnsWithFilters[2],
    filter: true,
    filterConfig: {
      labels: {
        min: 'Greater than',
        max: 'Less than',
      },
    },
  };
  columnsWithFilters[3] = {
    ...columnsWithFilters[3],
    filter: true,
    filterConfig: {
      labels: {
        min: 'Min',
        max: 'Max',
      },
    },
  };
  columnsWithFilters[6] = { ...columnsWithFilters[6], filter: true };
  columnsWithFilters[7] = { ...columnsWithFilters[7], filter: true };
  return columnsWithFilters;
};

const data: Member[] = [
  {
    firstName: 'Elena',
    lastName: 'Martínez',
    age: 30,
    address: {
      city: 'Madrid',
      country: 'Spain',
      countryCode: 'es',
    },
    dateOfBirth: '1996-05-21T00:00[Europe/Berlin]',
    allergies: ['soy', 'shellfish'],
    subscription: {
      status: 'active',
      startDate: '2023-01-15T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Jonas',
    lastName: 'Bergström',
    age: 23,
    address: {
      city: 'Stockholm',
      country: 'Sweden',
      countryCode: 'se',
    },
    dateOfBirth: '2002-11-12T00:00[Europe/Berlin]',
    allergies: [],
    subscription: {
      status: 'canceled',
      startDate: '2022-06-01T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Amira',
    lastName: 'Benali',
    age: 29,
    address: {
      city: 'Paris',
      country: 'France',
      countryCode: 'fr',
    },
    dateOfBirth: '1996-10-06T00:00[Europe/Berlin]',
    allergies: ['shellfish', 'gluten'],
    subscription: {
      status: 'active',
      startDate: '2024-03-10T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Luca',
    lastName: 'Rossi',
    age: 22,
    address: {
      city: 'Milan',
      country: 'Italy',
      countryCode: 'it',
    },
    dateOfBirth: '2004-02-11T00:00[Europe/Berlin]',
    allergies: ['nuts'],
    subscription: {
      status: 'active',
      startDate: '2023-09-20T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Sophie',
    lastName: 'Dubois',
    age: 29,
    address: {
      city: 'Brussels',
      country: 'Belgium',
      countryCode: 'be',
    },
    dateOfBirth: '1996-12-30T00:00[Europe/Berlin]',
    allergies: ['dairy', 'soy', 'shellfish', 'eggs', 'gluten', 'nuts'],
    subscription: {
      status: 'canceled',
      startDate: '2021-11-05T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Marco',
    lastName: 'Silva',
    age: 24,
    address: {
      city: 'Lisbon',
      country: 'Portugal',
      countryCode: 'pt',
    },
    dateOfBirth: '2001-09-17T00:00[Europe/Berlin]',
    allergies: [],
    subscription: {
      status: 'active',
      startDate: '2024-01-08T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Greta',
    lastName: 'Hoffmann',
    age: 26,
    address: {
      city: 'Berlin',
      country: 'Germany',
      countryCode: 'de',
    },
    dateOfBirth: '1999-12-05T00:00[Europe/Berlin]',
    allergies: ['dairy'],
    subscription: {
      status: 'suspended',
      startDate: '2022-04-12T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Nikos',
    lastName: 'Papadopoulos',
    age: 28,
    address: {
      city: 'Athens',
      country: 'Greece',
      countryCode: 'gr',
    },
    dateOfBirth: '1998-04-28T00:00[Europe/Berlin]',
    allergies: ['eggs', 'soy'],
    subscription: {
      status: 'active',
      startDate: '2023-07-22T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
];

const openColumnPicker =
  () =>
  async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: columnPickerConfig.triggerLabel,
    });

    await userEvent.click(button);
    screen.getByLabelText(columnPickerConfig.triggerLabel);
  };

const columnPickerConfig = {
  triggerLabel: 'Toggle column visibility',
  pickerLabel: 'Choose the columns you want to display on this table',
};

const mobileConfig = {
  slots: {
    label: 'full_name',
    details: 'age;allergies',
    trailingLabel: 'subscriptionPrice',
  },
  onClick: action('responsiveClick'),
  menu: {
    label: 'Actions',
    labelDescription: (member: Member) =>
      `More actions for ${member.firstName} ${member.lastName}`,
    actions: [
      {
        onClick: action('View'),
        'aria-description': (member: Member) =>
          `View details of ${member.firstName} ${member.lastName}`,
        children: 'View',
        icon: View,
      },
      {
        onClick: action('Edit'),
        'aria-description': (member: Member) =>
          `Edit details of ${member.firstName} ${member.lastName}`,
        children: 'Edit',
        icon: Edit,
      },
      {
        onClick: action('Delete'),
        'aria-description': (member: Member) =>
          `Delete member ${member.firstName} ${member.lastName}`,
        children: 'Delete',
        icon: Delete,
        destructive: true,
      },
    ],
  },
};

const baseArgs: DataGridProps<Member> = {
  label: 'Gym members 2026',
  columns,
  data: members.slice(0, 10),
  formattingLocale,
};

export const Base = (args: DataGridProps<Member>) => <DataGrid {...args} />;

Base.args = baseArgs;

export const WithSearchBar = (args: DataGridProps<Member>) => {
  const [records, setRecords] = useState(data);

  function onSearch(searchTerm: string) {
    if (!searchTerm) {
      setRecords(data);
      return;
    }
    setRecords(
      data.filter(
        ({ firstName, lastName }) =>
          firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lastName.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }
  return (
    <DataGrid
      {...args}
      data={records}
      searchBarConfig={{
        label: 'Search everywhere...',
        clearLabel: 'Clear',
        onSearch,
      }}
    />
  );
};

WithSearchBar.args = baseArgs;

export const WithFilters = (args: DataGridProps<Member>) => {
  const [records, setRecords] = useState(data);

  function filterRecords(filters: Record<string, unknown>) {
    const entries = Object.entries(filters);
    if (entries.length === 0) {
      setRecords(data);
      return;
    }

    setRecords(
      data.filter((member) =>
        entries.every(([key, value]) => {
          if (key === 'age') {
            const { min, max } = value as { min?: number; max?: number };
            return (
              (min === undefined || member.age >= min) &&
              (max === undefined || member.age <= max)
            );
          }
          if (key === 'subscriptionPrice') {
            const { min, max } = value as { min?: number; max?: number };
            return (
              (min === undefined || member.subscription.price >= min) &&
              (max === undefined || member.subscription.price <= max)
            );
          }
          if (key === 'dateOfBirth') {
            const { from, to } = value as { from?: string; to?: string };
            const birthDate = Temporal.ZonedDateTime.from(
              member.dateOfBirth,
            ).toPlainDate();
            if (
              from &&
              Temporal.PlainDate.compare(
                birthDate,
                Temporal.PlainDate.from(from),
              ) < 0
            ) {
              return false;
            }
            if (
              to &&
              Temporal.PlainDate.compare(
                birthDate,
                Temporal.PlainDate.from(to),
              ) > 0
            ) {
              return false;
            }
            return true;
          }
          if (key === 'activity') {
            return (value as string[]).includes(
              String(member.subscription.frequentMember),
            );
          }
          if (key === 'allergies') {
            return (value as string[]).every((allergy) =>
              member.allergies?.includes(allergy as Allergy),
            );
          }
          return true;
        }),
      ),
    );
  }
  return (
    <DataGrid
      {...args}
      data={records}
      filtersConfig={{
        onFilter: filterRecords,
        clearAllLabel: 'Clear all',
        applyFilterLabel: 'Apply',
        clearFilterLabel: 'Clear',
      }}
    />
  );
};

WithFilters.args = {
  ...baseArgs,
  columns: buildColumnsWithFilters(),
};

export const VisibleColumns = (args: DataGridProps<Member>) => (
  <DataGrid {...args} />
);
VisibleColumns.args = { ...baseArgs, columnPickerConfig };

VisibleColumns.play = openColumnPicker();

export const ResponsiveView = (args: DataGridProps<Member>) => (
  <DataGrid {...args} />
);
ResponsiveView.args = { ...baseArgs, mobileBreakpoint: 1280, mobileConfig };

export const WithPagination = (args: DataGridProps<Member>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  function onItemsPerPageChange(page: number) {
    setItemsPerPage(page);
    setCurrentPage(1);
  }
  return (
    <DataGrid
      {...args}
      data={members.slice(
        itemsPerPage * (currentPage - 1),
        itemsPerPage * (currentPage - 1) + itemsPerPage,
      )}
      pagination={{
        totalPages: Math.ceil(members.length / itemsPerPage),
        itemsPerPage,
        nextPageLabel: 'Next page',
        previousPageLabel: 'Previous page',
        itemsPerPageLabel: 'Items per page',
        currentPage,
        onPageChange,
        onItemsPerPageChange,
      }}
    />
  );
};

WithPagination.args = baseArgs;
