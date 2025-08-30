import { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";
import { Column } from "./components/DataTable/DataTable.types";
import { Moon, Sun } from "lucide-react";

type User = { id: number; name: string; email: string; age: number };

const sample: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 28 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 35 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 22 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export default function App() {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState<User[]>([]);
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-700 
      bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-100 
      dark:from-gray-900 dark:via-gray-800 dark:to-black"
    >
      <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm text-center sm:text-left">
            Parth Ahuja Assignment
          </h1>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full 
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
              text-white text-xs sm:text-sm md:text-base font-semibold shadow-lg hover:shadow-xl 
              transform hover:scale-105 transition-all duration-500 w-full sm:w-auto"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Input Fields */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 border-l-4 border-gradient-to-r from-pink-500 to-indigo-500 pl-3">
            InputField
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <InputField
              label="Your name"
              placeholder="Type here..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              helperText="This is helper text"
              variant="outlined"
              size="md"
              clearable
            />
            <InputField
              label="Password"
              placeholder="Enter password"
              type="password"
              variant="filled"
              size="md"
              passwordToggle
            />
            <InputField
              label="Disabled"
              placeholder="Can't type here"
              disabled
              variant="ghost"
              size="lg"
            />
            <InputField
              label="With error"
              placeholder="..."
              invalid
              errorMessage="This field is required"
            />
          </div>
        </section>

        {/* Data Table */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 border-l-4 border-gradient-to-r from-indigo-500 to-purple-500 pl-3">
            DataTable
          </h2>
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md overflow-x-auto">
            <DataTable<User>
              data={sample}
              columns={columns}
              selectable
              onRowSelect={setSelected}
            />
          </div>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Selected: {selected.map((u) => u.name).join(", ") || "None"}
          </div>
        </section>
      </div>
    </div>
  );
}
