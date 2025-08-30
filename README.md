# React Component Assignment By Parth Ahuja

Tech Stack: **React + TypeScript + TailwindCSS + Storybook + Vitest**

This repository delivers two reusable UI components with documentation, tests, and a demo.

- **InputField** – labeled input with variants (filled/outlined/ghost), sizes (sm/md/lg), states (disabled/invalid), helper & error text, loading state, optional clear button and password toggle, light/dark support.
- **DataTable** – generic table with sorting, multi-row selection, loading and empty states.

## Quick Start

```bash
npm install
npm run dev           # Vite dev server
npm run test          # Unit tests (Vitest + RTL)
npm run storybook     # Storybook
npm run build-storybook
```

## Structure

```text
src/
  components/
    InputField/
    DataTable/
  App.tsx                # demo usage
  main.tsx
  index.css
.storybook/
```

### InputField

```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  clearable?: boolean;
  passwordToggle?: boolean;
}
```

### DataTable

```ts
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}
```

## Tests

Each component includes at least one unit test covering core functionality.

## Accessibility

- Semantic elements and ARIA where appropriate (`aria-invalid`, labels, roles).
- Keyboard-accessible controls for clear and password toggle.

## Theming

Dark mode enabled via Tailwind’s `dark` class. Use the "Toggle Dark" button in the demo or wrap your app with `class="dark"`.

## Approach

- Strong typing with generics for `DataTable<T>`.
- Variant/size patterns via conditional Tailwind classes.
- Storybook for states/variants and interactive controls.
- Minimal, dependency-light implementation.

## Deploying Storybook (Chromatic or Vercel)

- **Vercel**: Import the repo and set the build command to `npm run build-storybook` and output directory `storybook-static`.

## Screenshots Of Website

Light Mode:
![Light-Mode]("./screenshots/light-mode.png")

Dark Mode:
![Dark-Mode]("./screenshots/dark-mode.png")
