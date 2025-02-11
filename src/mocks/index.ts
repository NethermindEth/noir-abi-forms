import { ContractExecutionResult, ContractService } from "@/services/ContractService";

export class MockContractService implements ContractService {
    async init(): Promise<void> {
        return Promise.resolve();
    }

    async deploy(functionName: string, args: unknown[]): Promise<ContractExecutionResult> {
        return Promise.resolve({
            type: "deploy",
            functionName,
            contractAddress: "0x123",
            args,
        });
    }

    async call(functionName: string, args: unknown[]): Promise<ContractExecutionResult> {
        return Promise.resolve({
            type: "call",
            functionName,
            contractAddress: "0x123",
            args,
        });
    }

    async simulate(functionName: string, args: unknown[]): Promise<ContractExecutionResult> {
        return Promise.resolve({
            type: "simulate",
            functionName,
            contractAddress: "0x123",
            args,
        });
    }
}

export const mockContractService = new MockContractService();
