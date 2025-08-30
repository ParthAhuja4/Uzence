import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import { Column } from "./DataTable.types";

type User = { id: number; name: string; email: string; age: number };
const data: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 35 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 22 },
];
const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  render: () => <DataTable<User> data={data} columns={columns} />,
};

export const Selectable: Story = {
  render: () => (
    <DataTable<User>
      data={data}
      columns={columns}
      selectable
      onRowSelect={(rows) => console.log(rows)}
    />
  ),
};

export const Loading: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} loading />,
};

export const Empty: Story = {
  render: () => <DataTable<User> data={[]} columns={columns} />,
};
