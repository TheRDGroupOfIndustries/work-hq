import React, { useState } from "react";

interface SelectProps {
  name: string;
  options: string[];
  value: string;
  onChange: (selected: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  containerStyle?: string;
  inputStyle?: string;
}

const NeuroSelect: React.FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  label,
  disabled = false,
  containerStyle,
  inputStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className={`mb-0 ${containerStyle}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div
        className={`relative ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={toggleDropdown}
      >
        <div
          className={`neuro-input-style flex items-center justify-between ${inputStyle} ${
            disabled ? "bg-gray-200 text-gray-400" : ""
          }`}
        >
          <span className={`${value ? "text-gray-700" : "text-gray-400"}`}>
            {value || placeholder}
          </span>
          {!disabled && (
            <span className="ml-2 text-gray-500">{isOpen ? "▲" : "▼"}</span>
          )}
        </div>
        {isOpen && (
          <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-auto">
            {options.map((option, index) => (
              <div
                key={index}
                className={`px-4 py-2 hover:bg-blue-100 ${
                  value === option ? "bg-blue-50" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default NeuroSelect;
