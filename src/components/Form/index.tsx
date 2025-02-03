import React, { useState, useEffect } from 'react';
import { NoirFormProps } from '../../types';
import { ContractArtifact } from '@aztec/foundation/abi';
import { loadContractArtifact, contractArtifactFromBuffer } from '@aztec/types/abi';
import FormField from '../FormField';

export function FormContent({ abi, onSubmit, contractService }: { 
  abi: ContractArtifact | undefined, 
  onSubmit: NoirFormProps['onSubmit'], 
  contractService: NoirFormProps['contractService']
}) {
  useEffect(() => {
    // Initialize the contract service
    contractService.init().catch(console.error);
  }, [contractService]);

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen">
      {abi?.functions.map((func) => (
        <div key={func.name} className="rounded-lg bg-gray-800/50 border border-gray-700">
          <div className="p-4">
            <FormField 
              functionArtifact={func} 
              onExecute={onSubmit}
              contractService={contractService}
              contractArtifact={abi}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export const NoirForm: React.FC<NoirFormProps> = ({
  abi: rawAbi,
  skipValidation,
  onSubmit,
  contractService,
}) => {
  const [abi, setAbi] = useState<ContractArtifact | undefined>();

  useEffect(() => {
    try {
      if (skipValidation) {
        const parsedAbi = loadContractArtifact(rawAbi);
        setAbi(parsedAbi);
      } else {
        const parsedAbi = contractArtifactFromBuffer(Buffer.from(JSON.stringify(rawAbi)));
        setAbi(parsedAbi);
      }
    } catch (error) {
      console.error('Error parsing ABI:', error);
    }
  }, [rawAbi, skipValidation]);

  return (
    <FormContent 
      abi={abi} 
      onSubmit={onSubmit} 
      contractService={contractService} 
    />
  );
};