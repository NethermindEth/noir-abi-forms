import React, { useState } from "react";
import { IntegerType } from "@aztec/foundation/abi";

interface IntegerTypeInputProps {
  functionArtifact: IntegerType;
  onChange?: (value: unknown[]) => void;
}

export const IntegerTypeInput: React.FC<IntegerTypeInputProps> = ({
  functionArtifact,
  onChange,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validateInput = (value: string) => {
    setError(null);

    // Check if the value is empty
    if (!value) {
      setError("Please enter a value");
      return;
    }

    try {
      // Parse the input value
      const numValue = BigInt(value);

      // Get the maximum value based on width and sign
      const maxWidth = BigInt(functionArtifact.width);
      const maxValue =
        functionArtifact.sign === "signed"
          ? (1n << (maxWidth - 1n)) - 1n // Signed max value
          : (1n << maxWidth) - 1n; // Unsigned max value

      // For signed numbers, also check minimum value
      const minValue =
        functionArtifact.sign === "signed" ? -(1n << (maxWidth - 1n)) : 0n;

      // Validate the range
      if (numValue >= minValue && numValue <= maxValue) {
        onChange?.([numValue]);
      } else {
        setError(`Value must be between ${minValue} and ${maxValue}`);
      }
    } catch {
      setError("Please enter a valid integer");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        onChange={(e) => validateInput(e.target.value)}
        placeholder={`Enter a ${functionArtifact.sign} integer`}
        className="block w-full rounded-md border-gray-600 p-2 bg-gray-800 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 sm:text-sm font-mono"
      />
      {error && <p className="mt-1 text-sm text-red-400 font-mono">{error}</p>}
    </div>
  );
};

export default IntegerTypeInput;
