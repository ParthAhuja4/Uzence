import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "./DataTable";
import { Column } from "./DataTable.types";

type Row = { id: number; name: string; age: number };
const data: Row[] = [
  { id: 1, name: "Bob", age: 35 },
  { id: 2, name: "Alice", age: 28 },
];
const columns: Column<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

it("renders rows and sorts by column", () => {
  render(<DataTable<Row> data={data} columns={columns} />);
  const cells = screen.getAllByText(/Bob|Alice/);
  expect(cells.length).toBeGreaterThan(0);
  const header = screen.getByText("Name");
  fireEvent.click(header);
  // After sorting asc, Alice should be before Bob in DOM order
  const rows = screen.getAllByRole("row");
  const text = rows.map((r) => r.textContent).join(" ");
  expect(text.indexOf("Alice")).toBeLessThan(text.indexOf("Bob"));
});

it("selects rows when selectable", () => {
  let selected: Row[] = [];
  render(
    <DataTable<Row>
      data={data}
      columns={columns}
      selectable
      onRowSelect={(s) => {
        selected = s;
      }}
    />
  );
  const cb = screen.getAllByRole("checkbox")[0];
  fireEvent.click(cb);
  expect(selected.length).toBe(1);
});
