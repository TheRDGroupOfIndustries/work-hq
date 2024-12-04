import React from "react";

interface InputFieldProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  error?: string;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  required?: boolean;
  label?: string;
  disabled?: boolean;
  inputStyle?: string;
  containerStyle?: string;
}

const NeuroTextarea: React.FC<InputFieldProps> = ({
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
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={5}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>onChange(e)}
        onKeyDown={onKeyDown}
        ref={inputRef}
        required={required}
        className={`neuro-input-style min-h-[150px] ${inputStyle}`}
        disabled={disabled}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default NeuroTextarea;