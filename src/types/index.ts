import { NoirCompiledContract } from "@aztec/types/noir";
import { FunctionAbi, ABIVariable } from "@aztec/foundation/abi";

export interface FormFieldProps {
  functionArtifact: FunctionAbi;
  onExecute?: (data: Record<string, unknown>) => void;
}

export interface NoirFormProps {
  abi: NoirCompiledContract;
  skipValidation?: boolean;
  onSubmit: (data: Record<string, unknown>) => void;
}

export interface AbiVariableInputProps {
  functionArtifact: ABIVariable;
  onChange?: (value: unknown) => void;
}