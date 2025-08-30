import { render, screen, fireEvent } from "@testing-library/react";
import { InputField } from "./InputField";

it("renders label and updates value", () => {
  let val = "";
  render(
    <InputField
      label="Name"
      value={val}
      onChange={(e) => {
        val = e.target.value;
      }}
      placeholder="Type..."
    />
  );
  const input = screen.getByPlaceholderText("Type...") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "Alice" } });
  expect(val).toBe("Alice");
  expect(screen.getByText("Name")).toBeInTheDocument();
});

it("shows error message when invalid", () => {
  render(<InputField label="Email" invalid errorMessage="Required" />);
  expect(screen.getByText("Required")).toBeInTheDocument();
  const input = screen.getByLabelText("Email");
  expect(input).toHaveAttribute("aria-invalid", "true");
});

it("applies loading state", () => {
  render(<InputField label="Search" loading />);
  const input = screen.getByLabelText("Search");
  expect(input).toHaveAttribute("aria-busy", "true");
  expect(input).toBeDisabled();
});
