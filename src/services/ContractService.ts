import {
  Contract,
  Wallet,
  createPXEClient,
  waitForPXE,
  PXE,
  AztecAddress,
} from "@aztec/aztec.js";
import { type ContractArtifact } from "@aztec/foundation/abi";

export type ContractExecutionResult = {
  type: "deploy" | "call" | "simulate";
  contractAddress?: string;
  functionName: string;
  args: unknown[];
  result?: unknown;
};

export interface ContractService {
  init(): Promise<void>;
  deploy(functionName: string, args: unknown[]): Promise<ContractExecutionResult>;
  call(functionName: string, args: unknown[]): Promise<ContractExecutionResult>;
  simulate(functionName: string, args: unknown[]): Promise<ContractExecutionResult>;
}

export class DefaultContractService implements ContractService {
  private contractArtifact: ContractArtifact | null = null;
  private pxe: PXE;
  private contractAddressAztec: AztecAddress | null = null;

  constructor(
    private wallet: Wallet,
    contractArtifact: ContractArtifact,
    contractAddress?: string,
    pxeUrl: string = "http://localhost:8080",
  ) {
    this.pxe = createPXEClient(pxeUrl);
    if (contractAddress) {
      this.contractAddressAztec = AztecAddress.fromString(contractAddress);
    }
    this.contractArtifact = contractArtifact;
  }

  async init() {
    await waitForPXE(this.pxe);
  }

  async deploy(
    functionName: string,
    args: unknown[],
  ): Promise<ContractExecutionResult> {
    if (!this.contractArtifact) {
      throw new Error("Contract artifact is required");
    }

    const contract = await Contract.deploy(
      this.wallet,
      this.contractArtifact,
      args,
      functionName,
    )
      .send()
      .deployed();

    // Update the current contract instance
    this.contractAddressAztec = contract.address;

    return {
      type: "deploy",
      contractAddress: this.contractAddressAztec.toString(),
      functionName,
      args,
    };
  }

  async call(
    functionName: string,
    args: unknown[],
  ): Promise<ContractExecutionResult> {
    if (!this.contractAddressAztec || !this.contractArtifact) {
      throw new Error("Contract address and artifact is required");
    }

    const contract = await Contract.at(
      this.contractAddressAztec,
      this.contractArtifact,
      this.wallet,
    );

    const tx = await contract.methods[functionName](...args)
      .send()
      .wait();

    return {
      type: "call",
      contractAddress: contract.address.toString(),
      functionName,
      args,
      result: tx,
    };
  }

  async simulate(
    functionName: string,
    args: unknown[],
  ): Promise<ContractExecutionResult> {
    if (!this.contractAddressAztec || !this.contractArtifact) {
      throw new Error("Contract address and artifact is required");
    }

    const contract = await Contract.at(
      this.contractAddressAztec,
      this.contractArtifact,
      this.wallet,
    );

    const tx = await contract.methods[functionName](...args).simulate();

    return {
      type: "simulate",
      contractAddress: contract.address.toString(),
      functionName,
      args,
      result: tx,
    };
  }
}
