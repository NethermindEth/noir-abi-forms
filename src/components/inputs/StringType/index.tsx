import React, { useState } from 'react';
import { StringType } from '@aztec/foundation/abi';

interface StringTypeInputProps {
  functionArtifact: StringType;
  onChange?: (value: unknown[]) => void;
}

export const StringTypeInput: React.FC<StringTypeInputProps> = ({ functionArtifact, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const validateInput = (value: string) => {
    setError(null);

    // Validate string length
    if (functionArtifact.length && value.length > functionArtifact.length) {
      setError(`Maximum length is ${functionArtifact.length} characters`);
      return;
    }

    onChange?.([value]);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        onChange={(e) => validateInput(e.target.value)}
        placeholder="Enter text"
        className="block w-full rounded-md border-gray-600 bg-gray-800 p-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm font-mono"
      />
      {error && (
        <p className="mt-1 text-sm text-red-400 font-mono">{error}</p>
      )}
    </div>
  );
};

export default StringTypeInput;
