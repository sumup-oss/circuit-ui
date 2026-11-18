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
  Plus,
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
import { type Allergy, members, type Member } from './fixtures.js';
import { useFakeMembersApi } from './fixtures.js';
import { modes } from '../../../../.storybook/modes.js';

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
          />
          &nbsp;
          {city}
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
    maxWidth: 300,
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
const searchFn =
  () =>
  async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const searchBar = canvas.getByRole('searchbox', {
      name: 'Search everywhere...',
    });

    await userEvent.type(searchBar, 'XX');
  };

const columnPickerConfig = {
  triggerLabel: 'Toggle column visibility',
  pickerLabel: 'Choose the columns you want to display on this table',
};

const mobileConfig = {
  slots: {
    label: 'full_name',
    details: 'age;address',
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
  getRowId: ({ id }) => id,
  formattingLocale,
  noDataConfig: {
    title: 'No data yet',
    description: 'No members in your gym. New members will appear here.',
    action: {
      children: 'Create a new member',
      icon: Plus,
    },
  },
  noResultsConfig: {
    title: 'No Results',
    description: 'We couldn’t find a match for your search criteria.',
    action: {
      children: 'Try again',
      variant: 'tertiary',
    },
  },
};

export const Full = (args: DataGridProps<Member>) => {
  const { isLoading, data, pagination, search } = useFakeMembersApi();

  return (
    <DataGrid
      {...args}
      isLoading={isLoading}
      data={data}
      pagination={{
        totalPages: pagination.total,
        itemsPerPage: pagination.size,
        nextPageLabel: 'Next page',
        previousPageLabel: 'Previous page',
        itemsPerPageLabel: 'Items per page',
        currentPage: pagination.currentPage,
        onPageChange: (page) => search({ page }),
        onItemsPerPageChange: (size) => search({ page: 1, size }),
      }}
      filtersConfig={{
        onFilter: (filters, query) => search({ filters, query }),
        clearAllLabel: 'Clear all',
        applyFilterLabel: 'Apply',
        clearFilterLabel: 'Clear',
      }}
      searchBarConfig={{
        label: 'Search everywhere...',
        clearLabel: 'Clear',
        onSearch: (query) => search({ query, page: 1 }),
      }}
    />
  );
};

Full.args = {
  ...baseArgs,
  columns: buildColumnsWithFilters(),
  columnPickerConfig,
  mobileBreakpoint: 1280,
  mobileConfig,
};

export const Base = (args: DataGridProps<Member>) => <DataGrid {...args} />;

Base.args = baseArgs;

export const InitialLoad = (args: DataGridProps<Member>) => (
  <DataGrid {...args} />
);

InitialLoad.args = {
  ...baseArgs,
  isLoading: true,
  data: [],
};

export const Loading = (args: DataGridProps<Member>) => <DataGrid {...args} />;

Loading.args = {
  ...baseArgs,
  isLoading: true,
};

export const NoData = (args: DataGridProps<Member>) => <DataGrid {...args} />;

NoData.args = {
  ...baseArgs,
  data: [],
};

export const NoResults = (args: DataGridProps<Member>) => {
  const { isLoading, data, search } = useFakeMembersApi({ delay: 0 });

  return (
    <DataGrid
      {...args}
      data={data}
      isLoading={isLoading}
      searchBarConfig={{
        label: 'Search everywhere...',
        clearLabel: 'Clear',
        onSearch: (query) => search({ query }),
      }}
    />
  );
};

NoResults.args = baseArgs;
NoResults.play = searchFn();

export const WithSearchBar = (args: DataGridProps<Member>) => {
  const { isLoading, data, search } = useFakeMembersApi();
  return (
    <DataGrid
      {...args}
      data={data}
      isLoading={isLoading}
      searchBarConfig={{
        label: 'Search everywhere...',
        clearLabel: 'Clear',
        onSearch: (query) => search({ query }),
      }}
    />
  );
};

WithSearchBar.args = baseArgs;

export const WithFilters = (args: DataGridProps<Member>) => {
  const { isLoading, data, search } = useFakeMembersApi();
  return (
    <DataGrid
      {...args}
      isLoading={isLoading}
      data={data}
      filtersConfig={{
        onFilter: (filters) => search({ filters }),
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
ResponsiveView.args = { ...baseArgs, mobileBreakpoint: 4098, mobileConfig };
ResponsiveView.parameters = {
  chromatic: {
    cropToViewport: true,
    modes: {
      // only test the small mobile view
      light: {
        ...modes.light,
        ...modes.tablet,
      },
      dark: {
        ...modes.dark,
        ...modes.tablet,
      },
      consumer: {
        ...modes.consumer,
        ...modes.tablet,
      },
    },
  },
};

export const WithPagination = (args: DataGridProps<Member>) => {
  const { isLoading, data, pagination, search } = useFakeMembersApi();
  return (
    <DataGrid
      {...args}
      data={data}
      isLoading={isLoading}
      pagination={{
        totalPages: pagination.total,
        itemsPerPage: pagination.size,
        nextPageLabel: 'Next page',
        previousPageLabel: 'Previous page',
        itemsPerPageLabel: 'Items per page',
        currentPage: pagination.currentPage,
        onPageChange: (page) => search({ page }),
        onItemsPerPageChange: (size) => search({ page: 1, size }),
      }}
    />
  );
};

WithPagination.args = baseArgs;
