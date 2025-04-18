import React, { useState, useEffect } from "react";
import { NoirFormProps } from "../../types";
import { ContractArtifact } from "@aztec/foundation/abi";
import { loadContractArtifact } from "@aztec/types/abi";
import FormField from "../FormField";

export function FormContent({
  abi,
  onSubmit,
  contractService,
}: {
  abi: ContractArtifact | undefined;
  onSubmit: NoirFormProps["onSubmit"];
  contractService: NoirFormProps["contractService"];
}) {
  useEffect(() => {
    contractService.init().catch(console.error);
  }, [contractService]);

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {abi?.functions.map((func) => (
        <div
          key={func.name}
          className="rounded-lg bg-gray-800/50 border border-gray-700"
        >
          <div className="p-4">
            <FormField
              functionArtifact={func}
              onExecute={onSubmit}
              contractService={contractService}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export const NoirForm: React.FC<NoirFormProps> = ({
  abi: rawAbi,
  onSubmit,
  contractService,
}) => {
  const [abi, setAbi] = useState<ContractArtifact | undefined>();

  useEffect(() => {
    try {
      const parsedAbi = loadContractArtifact(rawAbi);
      setAbi(parsedAbi);
    } catch (error) {
      console.error("Error parsing ABI:", error);
    }
  }, [rawAbi]);

  return (
    <FormContent
      abi={abi}
      onSubmit={onSubmit}
      contractService={contractService}
    />
  );
};
