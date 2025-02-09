import React, { useState } from "react";
import { StructType } from "@aztec/foundation/abi";
import TypeInput from "../TypeInput";
import { getDefaultValue, minTypeLength } from "@/lib/utils";

interface StructTypeInputProps {
  functionArtifact: StructType;
  onChange?: (value: unknown[]) => void;
}

export const StructTypeInput: React.FC<StructTypeInputProps> = ({
  functionArtifact,
  onChange,
}) => {
  const [values, setValues] = useState<unknown[][]>(
    functionArtifact.fields.map((field) =>
      Array(minTypeLength(field.type)).fill(getDefaultValue(field.type)),
    ),
  );

  const handleFieldChange = (index: number, value: unknown[]) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
    onChange?.(newValues.flat());
  };

  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
      <label className="text-sm font-medium text-gray-300">
        <span className="text-purple-400">{functionArtifact.path}</span>
      </label>
      <div className="space-y-4">
        {functionArtifact.fields.map((field, index) => (
          <TypeInput
            key={field.name}
            functionArtifact={field}
            onChange={(value) => handleFieldChange(index, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default StructTypeInput;
