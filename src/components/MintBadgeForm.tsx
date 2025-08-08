import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge, Award } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";
import { useToast } from "@/hooks/use-toast";

const NFT_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"; // Replace with actual contract
const NFT_CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "string", "name": "badgeName", "type": "string"}
    ],
    "name": "mintBadge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const MintBadgeForm = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [badgeName, setBadgeName] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const { web3, account, isConnected } = useWeb3();
  const { toast } = useToast();

  const handleMintBadge = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !web3) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    if (!recipientAddress || !badgeName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsMinting(true);

    try {
      const contract = new web3.eth.Contract(NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS);
      
      const gasEstimate = await contract.methods
        .mintBadge(recipientAddress, badgeName)
        .estimateGas({ from: account });

      const tx = await contract.methods
        .mintBadge(recipientAddress, badgeName)
        .send({ 
          from: account,
          gas: gasEstimate.toString()
        });

      toast({
        title: "Badge Minted Successfully! 🎉",
        description: `Transaction hash: ${tx.transactionHash}`,
        variant: "default"
      });

      // Reset form
      setRecipientAddress('');
      setBadgeName('');
    } catch (error: any) {
      console.error('Minting error:', error);
      toast({
        title: "Minting Failed",
        description: error.message || "Failed to mint badge",
        variant: "destructive"
      });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Card className="glass card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Mint NFT Badge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleMintBadge} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Student Wallet Address</Label>
            <Input
              id="recipient"
              type="text"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="glass"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="badgeName">Badge Name</Label>
            <Input
              id="badgeName"
              type="text"
              placeholder="e.g., JavaScript Fundamentals"
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              className="glass"
            />
          </div>

          <Button 
            type="submit" 
            disabled={!isConnected || isMinting}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <Badge className="mr-2 h-4 w-4" />
            {isMinting ? 'Minting Badge...' : 'Mint Badge'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};