import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/hooks/useWeb3";
import { Wallet, LogOut } from "lucide-react";

export const WalletConnection = () => {
  const { account, isConnecting, connectWallet, disconnectWallet, isConnected } = useWeb3();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-4">
      {!isConnected ? (
        <Button 
          onClick={connectWallet} 
          disabled={isConnecting}
          variant="default"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity glow"
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="glass px-4 py-2 rounded-lg">
            <span className="text-sm text-muted-foreground">Connected:</span>
            <span className="ml-2 font-mono text-primary">{formatAddress(account)}</span>
          </div>
          <Button 
            onClick={disconnectWallet}
            variant="outline"
            size="sm"
            className="glass border-destructive/50 hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};