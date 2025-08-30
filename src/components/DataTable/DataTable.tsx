import { useMemo, useState } from "react";
import clsx from "clsx";
import { Column, DataTableProps } from "./DataTable.types";

type SortState<T> = { column?: Column<T>; direction: "asc" | "desc" } | null;

function sortData<T>(data: T[], sort: SortState<T>): T[] {
  if (!sort?.column) return data;
  const key = sort.column.dataIndex as keyof T;
  const dir = sort.direction === "asc" ? 1 : -1;
  return [...data].sort((a, b) => {
    const va = a[key];
    const vb = b[key];
    if (va == null && vb == null) return 0;
    if (va == null) return -dir;
    if (vb == null) return dir;
    if (typeof va === "number" && typeof vb === "number")
      return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const sorted = useMemo(() => sortData(data, sort), [data, sort]);

  function toggleSort(col: Column<T>) {
    if (!col.sortable) return;
    setSort((prev) => {
      if (!prev || prev.column?.key !== col.key)
        return { column: col, direction: "asc" };
      return {
        column: col,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    });
  }

  function toggleRow(idx: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      onRowSelect?.(Array.from(next).map((i) => sorted[i]));
      return next;
    });
  }

  return (
    <div className="w-full overflow-auto rounded-md border border-gray-200 dark:border-gray-700">
      {loading && (
        <div className="p-4 text-sm text-gray-600 dark:text-gray-300">
          Loading…
        </div>
      )}
      {!loading && sorted.length === 0 && (
        <div className="p-6 text-center text-sm text-gray-600 dark:text-gray-300">
          No data available
        </div>
      )}
      {!loading && sorted.length > 0 && (
        <table
          className="w-full text-left text-sm"
          role="table"
          aria-label="Data table"
        >
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {selectable && <th className="w-10 px-3 py-2"></th>}
              {columns.map((col) => {
                const isSorted = sort?.column?.key === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={clsx(
                      "px-3 py-2 font-semibold text-gray-700 dark:text-gray-200",
                      col.sortable && "cursor-pointer select-none"
                    )}
                    onClick={() => toggleSort(col)}
                    aria-sort={
                      isSorted
                        ? sort!.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.title}
                      {col.sortable && (
                        <span aria-hidden="true">
                          {isSorted
                            ? sort!.direction === "asc"
                              ? "▲"
                              : "▼"
                            : "↕"}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={i}
                className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60"
              >
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${i + 1}`}
                      checked={selected.has(i)}
                      onChange={() => toggleRow(i)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-3 py-2 text-gray-800 dark:text-gray-100"
                  >
                    {String(row[col.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
