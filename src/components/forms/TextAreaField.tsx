import React from 'react';

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors resize-vertical ${
          error 
            ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800' 
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
        } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
      />
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default TextAreaField;