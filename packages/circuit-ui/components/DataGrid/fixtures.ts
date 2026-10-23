import type { Column } from './types.js';

export type Member = {
  firstName: string;
  lastName: string;
  age: number;
  subscription: {
    status: 'active' | 'canceled' | 'suspended';
    startDate: string;
    price: number;
    frequentMember: boolean;
  };
};

export const member: Member = {
  firstName: 'Jane',
  lastName: 'Doe',
  age: 32,
  subscription: {
    status: 'active',
    startDate: '2022-01-01',
    price: 39.99,
    frequentMember: true,
  },
};

export const members: Member[] = [
  member,
  {
    firstName: 'John',
    lastName: 'Smith',
    age: 45,
    subscription: {
      status: 'canceled',
      startDate: '2023-06-01',
      price: 19.99,
      frequentMember: false,
    },
  },
];

export const columns: Column<Member>[] = [
  {
    id: 'full_name',
    label: 'Full Name',
    type: { name: 'text' },
    getValue: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
  {
    id: 'age',
    label: 'Age',
    type: { name: 'number' },
  },
  {
    id: 'status',
    label: 'Subscription status',
    getValue: ({ subscription }) => subscription.status,
    type: {
      name: 'singleSelection',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Cancelled', value: 'canceled' },
        { label: 'Suspended', value: 'suspended' },
      ],
    },
  },
  {
    id: 'subscriptionPrice',
    label: 'Subscription Price',
    getValue: ({ subscription }) => subscription.price,
    type: {
      name: 'number',
      formattingOptions: {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 1,
      },
    },
  },
  {
    id: 'frequentMember',
    label: 'Frequent Member',
    getValue: ({ subscription }) => subscription.frequentMember,
    type: {
      name: 'boolean',
      accessibleLabel: (value) => (value ? 'Yes' : 'No'),
    },
  },
];
