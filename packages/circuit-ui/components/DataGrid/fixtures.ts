import type { Column } from './types.js';

export type Allergy =
  | 'eggs'
  | 'soy'
  | 'shellfish'
  | 'gluten'
  | 'nuts'
  | 'dairy';

export type Member = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  address: {
    city: string;
    country: string;
    countryCode: string;
  };
  subscription: {
    status: 'active' | 'canceled' | 'suspended';
    startDate: string;
    price: number;
    frequentMember?: boolean;
  };
  allergies?: Allergy[];
};

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
export const columnsWithFilters: Column<Member>[] = [
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
    filter: true,
    filterConfig: {
      labels: {
        min: 'Older than',
        max: 'Younger than',
      },
    },
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
    filter: true,
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
    filter: true,
    filterConfig: {
      labels: {
        min: 'Min',
        max: 'Max',
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

export const members: Member[] = [
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
  {
    firstName: 'Ingrid',
    lastName: 'Nilsen',
    age: 34,
    address: {
      city: 'Oslo',
      country: 'Norway',
      countryCode: 'no',
    },
    dateOfBirth: '1992-03-14T00:00[Europe/Berlin]',
    allergies: ['gluten'],
    subscription: {
      status: 'active',
      startDate: '2021-02-01T00:00[Europe/Berlin]',
      price: 49.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Mateo',
    lastName: 'Herrera',
    age: 41,
    address: {
      city: 'Barcelona',
      country: 'Spain',
      countryCode: 'es',
    },
    dateOfBirth: '1985-08-09T00:00[Europe/Berlin]',
    allergies: ['nuts', 'dairy'],
    subscription: {
      status: 'canceled',
      startDate: '2020-11-18T00:00[Europe/Berlin]',
      price: 29.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Aisha',
    lastName: 'Khan',
    age: 27,
    address: {
      city: 'London',
      country: 'United Kingdom',
      countryCode: 'gb',
    },
    dateOfBirth: '1999-01-23T00:00[Europe/Berlin]',
    allergies: [],
    subscription: {
      status: 'active',
      startDate: '2024-05-02T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Pieter',
    lastName: 'de Vries',
    age: 45,
    address: {
      city: 'Amsterdam',
      country: 'Netherlands',
      countryCode: 'nl',
    },
    dateOfBirth: '1981-06-30T00:00[Europe/Berlin]',
    allergies: ['shellfish'],
    subscription: {
      status: 'suspended',
      startDate: '2019-09-14T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Clara',
    lastName: 'Moreau',
    age: 31,
    address: {
      city: 'Lyon',
      country: 'France',
      countryCode: 'fr',
    },
    dateOfBirth: '1995-04-17T00:00[Europe/Berlin]',
    allergies: ['eggs', 'gluten'],
    subscription: {
      status: 'active',
      startDate: '2022-08-25T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Andreas',
    lastName: 'Keller',
    age: 38,
    address: {
      city: 'Vienna',
      country: 'Austria',
      countryCode: 'at',
    },
    dateOfBirth: '1988-12-02T00:00[Europe/Berlin]',
    allergies: ['soy'],
    subscription: {
      status: 'active',
      startDate: '2023-03-11T00:00[Europe/Berlin]',
      price: 29.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Freya',
    lastName: 'Olsen',
    age: 21,
    address: {
      city: 'Copenhagen',
      country: 'Denmark',
      countryCode: 'dk',
    },
    dateOfBirth: '2005-07-19T00:00[Europe/Berlin]',
    allergies: ['dairy', 'nuts'],
    subscription: {
      status: 'canceled',
      startDate: '2024-01-30T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Tomasz',
    lastName: 'Kowalski',
    age: 33,
    address: {
      city: 'Warsaw',
      country: 'Poland',
      countryCode: 'pl',
    },
    dateOfBirth: '1993-02-08T00:00[Europe/Berlin]',
    allergies: [],
    subscription: {
      status: 'active',
      startDate: '2021-10-05T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Chiara',
    lastName: 'Bianchi',
    age: 36,
    address: {
      city: 'Rome',
      country: 'Italy',
      countryCode: 'it',
    },
    dateOfBirth: '1990-09-27T00:00[Europe/Berlin]',
    allergies: ['shellfish', 'eggs'],
    subscription: {
      status: 'suspended',
      startDate: '2022-12-16T00:00[Europe/Berlin]',
      price: 49.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Liam',
    lastName: 'Murphy',
    age: 25,
    address: {
      city: 'Dublin',
      country: 'Ireland',
      countryCode: 'ie',
    },
    dateOfBirth: '2001-05-04T00:00[Europe/Berlin]',
    allergies: ['gluten', 'soy'],
    subscription: {
      status: 'active',
      startDate: '2023-06-19T00:00[Europe/Berlin]',
      price: 29.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Helena',
    lastName: 'Novak',
    age: 42,
    address: {
      city: 'Prague',
      country: 'Czechia',
      countryCode: 'cz',
    },
    dateOfBirth: '1984-11-11T00:00[Europe/Berlin]',
    allergies: ['nuts'],
    subscription: {
      status: 'canceled',
      startDate: '2018-04-22T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Rafael',
    lastName: 'Costa',
    age: 29,
    address: {
      city: 'Porto',
      country: 'Portugal',
      countryCode: 'pt',
    },
    dateOfBirth: '1997-03-03T00:00[Europe/Berlin]',
    allergies: ['dairy'],
    subscription: {
      status: 'active',
      startDate: '2024-02-14T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Maja',
    lastName: 'Lindqvist',
    age: 24,
    address: {
      city: 'Gothenburg',
      country: 'Sweden',
      countryCode: 'se',
    },
    dateOfBirth: '2002-08-21T00:00[Europe/Berlin]',
    allergies: ['eggs', 'shellfish', 'gluten'],
    subscription: {
      status: 'active',
      startDate: '2023-11-08T00:00[Europe/Berlin]',
      price: 29.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Hugo',
    lastName: 'Lambert',
    age: 47,
    address: {
      city: 'Geneva',
      country: 'Switzerland',
      countryCode: 'ch',
    },
    dateOfBirth: '1979-01-16T00:00[Europe/Berlin]',
    allergies: [],
    subscription: {
      status: 'suspended',
      startDate: '2017-07-01T00:00[Europe/Berlin]',
      price: 49.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Noor',
    lastName: 'El Amrani',
    age: 32,
    address: {
      city: 'Marseille',
      country: 'France',
      countryCode: 'fr',
    },
    dateOfBirth: '1994-06-25T00:00[Europe/Berlin]',
    allergies: ['soy', 'nuts'],
    subscription: {
      status: 'active',
      startDate: '2022-05-09T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Felix',
    lastName: 'Wagner',
    age: 39,
    address: {
      city: 'Munich',
      country: 'Germany',
      countryCode: 'de',
    },
    dateOfBirth: '1987-10-13T00:00[Europe/Berlin]',
    allergies: ['dairy', 'eggs'],
    subscription: {
      status: 'canceled',
      startDate: '2020-03-28T00:00[Europe/Berlin]',
      price: 29.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Sofia',
    lastName: 'Petrov',
    age: 26,
    address: {
      city: 'Sofia',
      country: 'Bulgaria',
      countryCode: 'bg',
    },
    dateOfBirth: '2000-02-29T00:00[Europe/Berlin]',
    allergies: ['gluten'],
    subscription: {
      status: 'active',
      startDate: '2024-07-03T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Elias',
    lastName: 'Virtanen',
    age: 44,
    address: {
      city: 'Helsinki',
      country: 'Finland',
      countryCode: 'fi',
    },
    dateOfBirth: '1982-12-19T00:00[Europe/Berlin]',
    allergies: ['shellfish', 'soy'],
    subscription: {
      status: 'active',
      startDate: '2019-01-20T00:00[Europe/Berlin]',
      price: 49.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Ana',
    lastName: 'Popescu',
    age: 35,
    address: {
      city: 'Bucharest',
      country: 'Romania',
      countryCode: 'ro',
    },
    dateOfBirth: '1991-07-07T00:00[Europe/Berlin]',
    allergies: [],
    subscription: {
      status: 'suspended',
      startDate: '2021-08-15T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Owen',
    lastName: 'Clarke',
    age: 23,
    address: {
      city: 'Edinburgh',
      country: 'United Kingdom',
      countryCode: 'gb',
    },
    dateOfBirth: '2003-04-12T00:00[Europe/Berlin]',
    allergies: ['nuts', 'eggs', 'dairy'],
    subscription: {
      status: 'active',
      startDate: '2025-01-06T00:00[Europe/Berlin]',
      price: 29.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Leila',
    lastName: 'Haddad',
    age: 40,
    address: {
      city: 'Nice',
      country: 'France',
      countryCode: 'fr',
    },
    dateOfBirth: '1986-09-01T00:00[Europe/Berlin]',
    allergies: ['soy'],
    subscription: {
      status: 'canceled',
      startDate: '2018-10-10T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Karl',
    lastName: 'Schneider',
    age: 52,
    address: {
      city: 'Hamburg',
      country: 'Germany',
      countryCode: 'de',
    },
    dateOfBirth: '1974-05-18T00:00[Europe/Berlin]',
    allergies: ['gluten', 'dairy'],
    subscription: {
      status: 'active',
      startDate: '2016-06-27T00:00[Europe/Berlin]',
      price: 49.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Ivana',
    lastName: 'Horvat',
    age: 28,
    address: {
      city: 'Zagreb',
      country: 'Croatia',
      countryCode: 'hr',
    },
    dateOfBirth: '1998-03-22T00:00[Europe/Berlin]',
    allergies: ['shellfish'],
    subscription: {
      status: 'active',
      startDate: '2023-04-04T00:00[Europe/Berlin]',
      price: 19.99,
      frequentMember: false,
    },
  },
  {
    firstName: 'Daniel',
    lastName: 'Santos',
    age: 37,
    address: {
      city: 'Valencia',
      country: 'Spain',
      countryCode: 'es',
    },
    dateOfBirth: '1989-11-30T00:00[Europe/Berlin]',
    allergies: ['eggs'],
    subscription: {
      status: 'suspended',
      startDate: '2022-02-17T00:00[Europe/Berlin]',
      price: 29.99,
      frequentMember: true,
    },
  },
  {
    firstName: 'Eva',
    lastName: 'Jensen',
    age: 30,
    address: {
      city: 'Aarhus',
      country: 'Denmark',
      countryCode: 'dk',
    },
    dateOfBirth: '1996-08-08T00:00[Europe/Berlin]',
    allergies: ['nuts', 'gluten', 'soy'],
    subscription: {
      status: 'active',
      startDate: '2024-09-12T00:00[Europe/Berlin]',
      price: 39.99,
      frequentMember: true,
    },
  },
];
