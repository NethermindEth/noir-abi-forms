import { 
  Contract, 
  Wallet, 
  createPXEClient, 
  waitForPXE, 
  PXE, 
  AztecAddress
} from '@aztec/aztec.js';
import { type ContractArtifact } from '@aztec/foundation/abi';
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
export type ContractExecutionResult = {
  type: 'deploy' | 'call';
  contractAddress?: string;
  functionName: string;
  args: unknown[];
  result?: unknown;
};

export class ContractService {
  private contract: Contract | null = null;
  private contractArtifact: ContractArtifact | null = null;
  private pxe: PXE;
  private contractAddressAztec: AztecAddress | null = null;

  constructor(
    private wallet: Wallet,
    contractArtifact: ContractArtifact,
    contractAddress?: string,
    pxeUrl: string = 'http://localhost:8080'
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

  private async initializeContract() {
    if (!this.contractAddressAztec || !this.contractArtifact) {
      throw new Error('Contract address or artifact is required');
    }


    this.contract = await Contract.at(
      this.contractAddressAztec,
      this.contractArtifact,
      this.wallet
    );
  }

  async deploy(functionName: string, args: unknown[]): Promise<ContractExecutionResult> {

    const PXE_URL = 'http://localhost:8080';

    console.log('Connecting to PXE...');

    const pxe = createPXEClient(PXE_URL);
    const { l1ChainId } = await pxe.getNodeInfo();

    console.log(`Connected to chain ${l1ChainId}`);

    const wallet = (await getInitialTestAccountsWallets(pxe))[0];

    if (!this.contractArtifact) {
      throw new Error('Contract artifact is required');
    }

    console.log('Trying to deploy', functionName, 'with args', args);

    for (const arg of args) {
      console.log(typeof arg);
    }

    const contract = await Contract.deploy(wallet, this.contractArtifact, args, functionName)
      .send()
      .deployed();

    // Update the current contract instance
    this.contract = contract;
    this.contractAddressAztec = contract.address;

    return {
      type: 'deploy',
      contractAddress: this.contractAddressAztec.toString(),
      functionName,
      args,
    };
  }

  async call(functionName: string, args: unknown[]): Promise<ContractExecutionResult> {
    if (!this.contractAddressAztec || !this.contractArtifact) {
      throw new Error('Contract address or artifact is required');
    }

    const PXE_URL = 'http://localhost:8080';

    console.log('Connecting to PXE...');

    const pxe = createPXEClient(PXE_URL);
    const { l1ChainId } = await pxe.getNodeInfo();

    console.log(`Connected to chain ${l1ChainId}`);

    const wallet = (await getInitialTestAccountsWallets(pxe))[0];

    if (!this.contractArtifact) {
      throw new Error('Contract artifact is required');
    }

    const contract = await Contract.at(this.contractAddressAztec, this.contractArtifact, wallet);

    const tx = await contract.methods[functionName](...args)
      .send()
      .wait();

    return {
      type: 'call',
      contractAddress: contract.address.toString(),
      functionName,
      args,
      result: tx,
    };
  }

  async execute(functionName: string, args: unknown[]): Promise<ContractExecutionResult> {
    if (functionName === 'constructor') {
      return this.deploy(functionName, args);
    }
    return this.call(functionName, args);
  }
}