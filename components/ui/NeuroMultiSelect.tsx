import React, { useState } from "react";

interface MultiSelectProps {
  name: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  containerStyle?: string;
  inputStyle?: string;
}

const NeuroMultiSelect: React.FC<MultiSelectProps> = ({
  name,
  options,
  selectedOptions,
  onChange,
  placeholder = "Select options",
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
    const updatedSelection = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    onChange(updatedSelection);
  };

  return (
    <div className={`mb-0 ${containerStyle}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
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
          <div className="flex flex-wrap gap-2">
            {selectedOptions.length > 0 ? (
              selectedOptions.map((option, index) => (
                <span
                  key={index}
                  className="bg-primary-sky-blue text-blue-700 px-6 py-2 rounded-md text-sm flex items-center shadow-neuro-11"
                >
                  {option}
                  {!disabled && (
                    <button
                      className="ml-1 text-red-500 hover:text-red-700 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(option);
                      }}
                    >
                      ✕
                    </button>
                  )}
                </span>
              ))
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          {!disabled && (
            <span className="ml-2 text-gray-500">
              {isOpen ? "▲" : "▼"}
            </span>
          )}
        </div>
        {isOpen && (
          <div className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-auto">
            {options.map((option, index) => (
              <div
                key={index}
                className={`px-4 py-2 hover:bg-blue-100 ${
                  selectedOptions.includes(option) ? "bg-blue-50" : ""
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

export default NeuroMultiSelect;
