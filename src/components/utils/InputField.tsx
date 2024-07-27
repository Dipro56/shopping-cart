'use client';
import React from 'react';

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-white">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        autoComplete={type === 'password' ? 'current-password' : 'name'}
        required
      />
    </div>
  </div>
);

export default InputField;
