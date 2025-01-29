import React, { useState } from 'react';
import { BasicType } from '@aztec/foundation/abi';

type BasicTypeVariant = 'field' | 'boolean';

interface BasicTypeInputProps<T extends BasicTypeVariant> {
  functionArtifact: BasicType<T>;
  onChange?: (value: unknown[]) => void;
}

export const BasicTypeInput: React.FC<BasicTypeInputProps<BasicTypeVariant>> = ({ functionArtifact, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const validateInput = (value: string | boolean) => {
    setError(null);

    if (functionArtifact.kind === 'field') {
      if (typeof value === 'string') {
        const isValid = /^-?\d*\.?\d*$/.test(value);
        if (!isValid) {
          setError('Please enter a valid number');
          return;
        }
        // Convert string to BigInt for field type
        try {
          const bigIntValue = BigInt(value);
          onChange?.([bigIntValue]);
        } catch {
          setError('Invalid number format');
        }
      }
    } else if (functionArtifact.kind === 'boolean') {
      if (typeof value === 'boolean') {
        setChecked(value);
        onChange?.([value]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {functionArtifact.kind === 'boolean' ? (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => validateInput(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
          <span className="ms-3 text-sm font-medium text-gray-300 font-mono">
            {checked ? 'True' : 'False'}
          </span>
        </label>
      ) : (
        <input 
          type="text"
          onChange={(e) => validateInput(e.target.value)}
          placeholder="Enter a number"
          className="block w-full rounded-md border-gray-600 p-3 bg-gray-800 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm font-mono"
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-400 font-mono">{error}</p>
      )}
    </div>
  );
};

export default BasicTypeInput;

