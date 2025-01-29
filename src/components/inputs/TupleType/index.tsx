import React, { useState } from 'react';
import { TupleType } from '@aztec/foundation/abi';
import TypeInput from '../TypeInput';
import { minTypeLength, getDefaultValue } from '@/lib/utils';

interface TupleTypeInputProps {
  functionArtifact: TupleType;
  onChange?: (value: unknown[]) => void;
}

export const TupleTypeInput: React.FC<TupleTypeInputProps> = ({ functionArtifact, onChange }) => {
  const [values, setValues] = useState<unknown[][]>(functionArtifact.fields.map((field) => Array(minTypeLength(field)).fill(getDefaultValue(field))));

  const handleFieldChange = (index: number, value: unknown[]) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange?.(newValues.flat());
  };

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
      <label className="text-sm font-medium text-gray-300">
        Tuple <span className="text-purple-400">[{functionArtifact.fields.length}]</span>
      </label>
      <div className="space-y-4">
        {functionArtifact.fields.map((field, index) => (
          <div key={index} className="hover:bg-gray-700/50 transition-colors duration-200 rounded-md p-2">
            <TypeInput
              functionArtifact={{
                name: `[${index}]`,
                type: field
              }}
              onChange={(value) => handleFieldChange(index, value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TupleTypeInput;
