import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  label?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  error,
  inputRef,
  required = false,
  label,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
        required={required}
        className="input-style"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default InputField;