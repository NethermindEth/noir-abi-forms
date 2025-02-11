import { NoirCompiledContract } from "@aztec/types/noir";
import {
  FunctionAbi,
  ABIVariable,
} from "@aztec/foundation/abi";
import {
  ContractService,
  ContractExecutionResult,
} from "@/services/ContractService";

export interface FormFieldProps {
  functionArtifact: FunctionAbi;
  onExecute?: (data: ContractExecutionResult) => void;
  contractService: ContractService;
  options?: {
    showResult?: boolean;
    showError?: boolean;
  };
}

export interface NoirFormProps {
  abi: NoirCompiledContract;
  onSubmit: (data: ContractExecutionResult) => void;
  contractService: ContractService;
}

export interface AbiVariableInputProps {
  functionArtifact: ABIVariable;
  onChange?: (value: unknown) => void;
}
