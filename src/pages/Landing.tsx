import { useState } from "react";
import {
  createPXEClient,
  AccountWallet,
  loadContractArtifact,
} from "@aztec/aztec.js";
import { ContractArtifact } from "@aztec/foundation/abi";
import {
  ContractService,
  ContractExecutionResult,
} from "../services/ContractService";
import { FormContent } from "../components/Form";
import { Button } from "../components/ui/button";
import { getInitialTestAccountsWallets } from "@aztec/accounts/testing";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from 'sonner';

const PXE_URL = "http://localhost:8080";

export const Landing = () => {
  const theme = useTheme();
  const [contractAddress, setContractAddress] = useState("");
  const [contractArtifact, setContractArtifact] =
    useState<ContractArtifact | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<AccountWallet | null>(
    null,
  );
  const [wallets, setWallets] = useState<AccountWallet[]>([]);
  const [contractService, setContractService] =
    useState<ContractService | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectToSandbox = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      const pxe = createPXEClient(PXE_URL);
      const wallets = await getInitialTestAccountsWallets(pxe);

      setWallets(wallets);
      setSelectedWallet(wallets[0]);
      toast.success('Connected to sandbox successfully');
    } catch (error) {
      console.error("Sandbox connection error:", error);
      const errorMessage = "Failed to connect to sandbox: " + (error as Error).message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleContractConnection = async () => {
    if (!selectedWallet || !contractArtifact) {
      const errorMessage = "Please provide the contract ABI";
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    try {
      const service = new ContractService(
        selectedWallet,
        contractArtifact,
        contractAddress,
        "http://localhost:8080",
      );
      await service.init();
      setContractService(service);
      setError(null);
      toast.success(contractAddress 
        ? `Connected to contract at ${contractAddress}` 
        : 'Contract initialized successfully'
      );
    } catch (error) {
      console.error("Contract connection error:", error);
      const errorMessage = "Failed to connect to contract: " + (error as Error).message;
      setError(errorMessage);
      toast.error(errorMessage);
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
        toast.success('Contract artifact loaded successfully');
      } catch (error) {
        console.error("File parsing error:", error);
        const errorMessage = "Invalid contract artifact file";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={cn("space-y-8")}>
      {/* Header */}
      <header className={cn("text-center")}>
        <h1 className={cn(
          theme.typography.font.mono,
          "text-3xl mb-3 font-medium text-purple-300"
        )}>
          Noir Contract Interface
        </h1>
        <p className={cn(
          theme.typography.font.mono,
          "text-sm text-gray-400"
        )}>
          Connect, deploy, and interact with Noir contracts
        </p>
      </header>

      {/* Main Content */}
      <div className={cn(
        "space-y-6",
        "bg-gray-800/30",
        "backdrop-blur-sm",
        "rounded-xl",
        "p-8",
        "shadow-2xl shadow-purple-900/10"
      )}>
        {/* Connection Interface */}
        <div className={cn(
          "space-y-4",
          "bg-gray-800/20",
          "rounded-lg",
          "p-6"
        )}>
          {/* Sandbox Connection */}
          <section className={cn(
            "space-y-6",
            "bg-gray-700/20",
            "rounded-lg p-6",
            "hover:bg-gray-700/30 transition-all duration-300"
          )}>
            <div className={cn("flex items-center", theme.spacing.smallGap)}>
              <span className={cn("font-mono text-purple-300")}>
                [sandbox]
              </span>
              <span className={cn(
                "font-mono font-medium text-gray-200 tracking-tight"
              )}>
                Connection
              </span>
            </div>

            <div className={cn("space-y-6")}>
              <Button
                onClick={connectToSandbox}
                disabled={isConnecting}
                className={cn(
                  "w-full h-12",
                  "bg-purple-600/80 hover:bg-purple-500/80",
                  "text-white font-mono",
                  "transition-all duration-300",
                  "rounded-lg",
                  "shadow-lg shadow-purple-900/20",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isConnecting ? (
                  <>
                    <label className="text-purple-200 mr-2">
                      Connecting
                    </label>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  "Connect to Sandbox"
                )}
              </Button>

              {wallets.length > 0 && (
                <div className="space-y-3">
                  <label className="block text-sm font-mono text-gray-400">
                    Select Account:
                  </label>
                  <select
                    className={cn(
                      "w-full h-12 px-4",
                      "bg-gray-700/30",
                      "rounded-lg",
                      "font-mono text-gray-200",
                      "cursor-pointer",
                      "transition-all duration-300",
                      "focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    )}
                    value={wallets.indexOf(selectedWallet!)}
                    onChange={(e) =>
                      setSelectedWallet(wallets[parseInt(e.target.value)])
                    }
                  >
                    {wallets.map((wallet, index) => (
                      <option 
                        key={index} 
                        value={index}
                        className="bg-gray-800"
                      >
                        Account {index + 1} - {wallet.getAddress().toString()}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <input
                type="text"
                className={cn(
                  "w-full h-12 px-4",
                  "bg-gray-700/30",
                  "rounded-lg",
                  "font-mono text-gray-200",
                  "placeholder-gray-500",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                )}
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                placeholder="Enter contract address or leave empty to deploy"
              />

              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className={cn(
                  "w-full h-12",
                  "bg-gray-700/30",
                  "rounded-lg",
                  "font-mono text-gray-200",
                  "transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
                  "file:h-full file:mr-4 file:px-4",
                  "file:border-0 file:bg-purple-600/80",
                  "file:text-sm file:font-mono file:text-white",
                  "file:cursor-pointer",
                  "file:hover:bg-purple-500/80",
                  "cursor-pointer",
                  "flex items-center"
                )}
              />

              <Button
                onClick={handleContractConnection}
                disabled={!selectedWallet || !contractArtifact}
                className={cn(
                  "w-full h-12",
                  "bg-purple-600/80 hover:bg-purple-500/80",
                  "text-white font-mono",
                  "transition-all duration-300",
                  "rounded-lg",
                  "shadow-lg shadow-purple-900/20",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {contractAddress ? "Connect to Contract" : "Initialize Contract"}
              </Button>
            </div>
          </section>
        </div>

        {/* Error Display */}
        {error && (
          <div className={cn(
            "p-4 rounded-lg",
            "bg-red-900/20",
            "text-red-400 font-mono text-sm",
            "shadow-lg shadow-red-900/10"
          )}>
            {error}
          </div>
        )}

        {/* Contract Interaction */}
        {contractService && contractArtifact && (
          <section className={cn(
            "bg-gray-700/20",
            "rounded-lg p-6",
            "hover:bg-gray-700/30 transition-all duration-300"
          )}>
            <div className={cn("flex items-center", theme.spacing.smallGap)}>
              <span className="font-mono text-purple-300">
                [interaction]
              </span>
              <span className="font-mono font-medium text-gray-200 tracking-tight">
                Contract Functions
              </span>
            </div>

            <div className="mt-6">
              <FormContent
                abi={contractArtifact}
                onSubmit={async (data: ContractExecutionResult) => {
                  try {
                    if (data.type === "deploy" && data.contractAddress) {
                      setContractAddress(data.contractAddress);
                      toast.success(`Contract deployed at ${data.contractAddress}`);
                    } else {
                      toast.success(`${data.type === 'simulate' ? 'Simulation' : 'Interaction'} successful`);
                    }
                    console.log("Execution result:", data);
                  } catch (error) {
                    console.error("Contract execution error:", error);
                    const errorMessage = "Failed to execute contract function: " + (error as Error).message;
                    setError(errorMessage);
                    toast.error(errorMessage);
                  }
                }}
                contractService={contractService}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
