import { DataTable } from './DataTable.js';

export default {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['status:stable'],
  parameters: {
    layout: 'padded',
  },
};

export const Base = () => <DataTable />;
