import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  inputStyle?: string;
  containerStyle?: string;
}

const NeuroInputField: React.FC<InputFieldProps> = ({
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
  disabled = false,
  inputStyle,
  containerStyle,
}) => {
  return (
    <div className={`mb-0 ${containerStyle}`}>
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
        onChange={(e)=>onChange(e)}
        onKeyDown={onKeyDown}
        ref={inputRef}
        required={required}
        className={`neuro-input-style ${inputStyle}`}
        disabled={disabled}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default NeuroInputField;