import React, { useId, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import { InputFieldProps } from "./InputField.types";

const variantClasses: Record<
  NonNullable<InputFieldProps["variant"]>,
  string
> = {
  filled:
    "bg-gray-100 dark:bg-gray-800 border-transparent focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600",
  outlined:
    "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600",
  ghost:
    "bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-gray-500 focus:ring-0 rounded-none",
};

const sizeClasses: Record<NonNullable<InputFieldProps["size"]>, string> = {
  sm: "text-sm px-2 py-1 h-9",
  md: "text-base px-3 py-2 h-10",
  lg: "text-lg px-4 py-3 h-12",
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled,
      invalid,
      loading = false,
      variant = "outlined",
      size = "md",
      type = "text",
      clearable = false,
      passwordToggle = false,
      className,
      ...rest
    },
    ref
  ) {
    const id = useId();
    const [showPassword, setShowPassword] = useState(false);

    const actualType =
      passwordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    const inputClasses = clsx(
      "w-full rounded-md outline-none transition",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      "text-gray-900 dark:text-gray-100",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variantClasses[variant],
      sizeClasses[size],
      invalid && "border-red-500 ring-red-500 focus:ring-red-500",
      className
    );

    const describedBy =
      helperText || (invalid && errorMessage) ? `${id}-desc` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            value={value}
            onChange={onChange}
            type={actualType}
            placeholder={placeholder}
            className={inputClasses}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            aria-busy={loading || undefined}
            disabled={disabled || loading}
            {...rest}
          />

          {/* Clear Button */}
          {clearable && !!value && !disabled && !loading && (
            <button
              type="button"
              aria-label="Clear input"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={(e) => {
                e.preventDefault();
                const ev = {
                  target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange?.(ev);
              }}
            >
              ×
            </button>
          )}

          {/* Password Toggle */}
          {passwordToggle && type === "password" && !loading && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className={clsx(
                "absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors",
                clearable ? "right-8" : "right-2"
              )}
              onClick={(e) => {
                e.preventDefault();
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        {(helperText || (invalid && errorMessage)) && (
          <p
            id={`${id}-desc`}
            className={clsx(
              "mt-1 text-xs",
              invalid ? "text-red-600" : "text-gray-500 dark:text-gray-400"
            )}
          >
            {invalid ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);
