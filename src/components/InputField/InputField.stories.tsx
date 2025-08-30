import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Label",
    placeholder: "Placeholder",
    variant: "outlined",
    size: "md",
  },
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  render: (args) => {
    const [val, setVal] = useState("");
    return (
      <InputField
        {...args}
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Outlined" placeholder="..." variant="outlined" />
      <InputField label="Filled" placeholder="..." variant="filled" />
      <InputField label="Ghost" placeholder="..." variant="ghost" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <InputField label="Disabled" placeholder="..." disabled />
      <InputField
        label="Invalid"
        placeholder="..."
        invalid
        errorMessage="This field is required"
      />
      <InputField
        label="Loading (simulated)"
        placeholder="..."
        loading
        helperText="Loading state"
      />
      <InputField
        label="Password"
        placeholder="..."
        type="password"
        passwordToggle
      />
      <InputField
        label="Clearable"
        placeholder="..."
        clearable
        value="Text"
        onChange={() => {}}
      />
    </div>
  ),
};
