import { useState } from 'react';
import { 
  createPXEClient, 
  waitForPXE,
  AccountWallet,
  loadContractArtifact
} from '@aztec/aztec.js';
import { ContractArtifact } from '@aztec/foundation/abi';
import { ContractService, ContractExecutionResult } from '../services/ContractService';
import { FormContent } from '../components/Form';
import { Button } from '../components/ui/button';

export const Landing = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [contractArtifact, setContractArtifact] = useState<ContractArtifact | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<AccountWallet | null>(null);
  const [wallets, setWallets] = useState<AccountWallet[]>([]);
  const [contractService, setContractService] = useState<ContractService | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectToSandbox = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      // Create PXE client
      const pxeClient = createPXEClient('http://localhost:8080');
      await waitForPXE(pxeClient);

      // Get registered accounts
      const accounts = await pxeClient.getRegisteredAccounts();
      console.log('Found accounts:', accounts);

      // For now, we'll just use the first account
      if (accounts.length > 0) {
        const wallet = {
          getAddress: () => accounts[0],
          pxe: pxeClient
        } as unknown as AccountWallet;

        setWallets([wallet]);
        setSelectedWallet(wallet);
      } else {
        setError('No accounts available in the sandbox');
      }
    } catch (error) {
      console.error('Sandbox connection error:', error);
      setError('Failed to connect to sandbox: ' + (error as Error).message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleContractConnection = async () => {
    if (!selectedWallet || !contractArtifact) {
      setError('Please provide the contract ABI');
      return;
    }

    try {
      const service = new ContractService(
        selectedWallet,
        contractArtifact,
        contractAddress,
        'http://localhost:8080'
      );
      await service.init();
      setContractService(service);
      setError(null);
    } catch (error) {
      console.error('Contract connection error:', error);
      setError('Failed to connect to contract: ' + (error as Error).message);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target?.result as string);
        const contractArtifact = loadContractArtifact(content);
        setContractArtifact(contractArtifact);
      } catch (error) {
        console.error('File parsing error:', error);
        setError('Invalid contract artifact file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      {/* Sandbox Connection */}
      <section className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Sandbox Connection</h2>
        <div className="space-y-4">
          <Button 
            onClick={connectToSandbox}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? 'Connecting...' : 'Connect to Sandbox'}
          </Button>

          {wallets.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Select Account:</label>
              <select
                className="w-full p-2 border rounded bg-background"
                value={wallets.indexOf(selectedWallet!)}
                onChange={(e) => setSelectedWallet(wallets[parseInt(e.target.value)])}
              >
                {wallets.map((wallet, index) => (
                  <option key={index} value={index}>
                    Account {index + 1} - {wallet.getAddress().toString()}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Contract Connection */}
      <section className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Contract Connection</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Contract Address (Optional):</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-background"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              placeholder="Enter contract address or leave empty to deploy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contract ABI:</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="w-full p-2 border rounded bg-background"
            />
          </div>

          <Button
            onClick={handleContractConnection}
            disabled={!selectedWallet || !contractArtifact}
            className="w-full"
          >
            {contractAddress ? 'Connect to Contract' : 'Initialize Contract'}
          </Button>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="p-4 border border-destructive/50 bg-destructive/10 text-destructive rounded-lg">
          {error}
        </div>
      )}

      {/* Contract Interaction */}
      {contractService && contractArtifact && (
        <section className="p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Contract Interaction</h2>
          <FormContent
            abi={contractArtifact}
            onSubmit={async (data: ContractExecutionResult) => {
              try {
                const result = await contractService.execute(
                  data.functionName,
                  data.args
                );
                console.log('Execution result:', result);

                // If this was a deployment, update the contract address
                if (data.type === 'deploy' && result.contractAddress) {
                  setContractAddress(result.contractAddress);
                }
              } catch (error) {
                console.error('Contract execution error:', error);
                setError('Failed to execute contract function: ' + (error as Error).message);
              }
            }}
            contractService={contractService}
          />
        </section>
      )}
    </div>
  );
}; 