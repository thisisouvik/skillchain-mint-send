import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";

export const NetworkStatus = () => {
  const [chainId, setChainId] = useState<string>('');
  const [networkName, setNetworkName] = useState<string>('');
  const { web3, isConnected } = useWeb3();

  useEffect(() => {
    const getNetworkInfo = async () => {
      if (web3 && isConnected) {
        try {
          const chainId = await web3.eth.getChainId();
          setChainId(chainId.toString());
          
          // Check if we're on Mumbai testnet
          if (Number(chainId) === 80001) {
            setNetworkName('Polygon Mumbai');
          } else {
            setNetworkName('Unknown Network');
          }
        } catch (error) {
          console.error('Error getting network info:', error);
        }
      }
    };

    getNetworkInfo();
  }, [web3, isConnected]);

  if (!isConnected) {
    return (
      <Badge variant="secondary" className="glass">
        <WifiOff className="mr-1 h-3 w-3" />
        Not Connected
      </Badge>
    );
  }

  const isCorrectNetwork = chainId === '80001';

  return (
    <Badge 
      variant={isCorrectNetwork ? "default" : "destructive"} 
      className={isCorrectNetwork ? "glass bg-success/20 text-success" : ""}
    >
      <Wifi className="mr-1 h-3 w-3" />
      {networkName || `Chain ${chainId}`}
    </Badge>
  );
};