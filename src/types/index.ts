import { NoirCompiledContract } from "@aztec/types/noir";
import { FunctionAbi, ABIVariable } from "@aztec/foundation/abi";
import { ContractService, ContractExecutionResult } from "@/services/ContractService";

export interface FormFieldProps {
  functionArtifact: FunctionAbi;
  onExecute?: (data: ContractExecutionResult) => void;
  contractService: ContractService;
  contractArtifact: ContractArtifact;
}

export interface NoirFormProps {
  abi: NoirCompiledContract;
  skipValidation?: boolean;
  onSubmit: (data: ContractExecutionResult) => void;
  contractService: ContractService;
}

export interface AbiVariableInputProps {
  functionArtifact: ABIVariable;
  onChange?: (value: unknown) => void;
}