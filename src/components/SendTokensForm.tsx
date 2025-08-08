import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Coins, Send } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";
import { useToast } from "@/hooks/use-toast";

const TOKEN_CONTRACT_ADDRESS = "0x0987654321098765432109876543210987654321"; // Replace with actual contract
const TOKEN_CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const SendTokensForm = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { web3, account, isConnected } = useWeb3();
  const { toast } = useToast();

  const handleSendTokens = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !web3) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive"
      });
      return;
    }

    if (!recipientAddress || !tokenAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(tokenAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid token amount",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);

    try {
      const contract = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS);
      
      // Convert to wei (assuming 18 decimals)
      const amountInWei = web3.utils.toWei(tokenAmount, 'ether');
      
      const gasEstimate = await contract.methods
        .transfer(recipientAddress, amountInWei)
        .estimateGas({ from: account });

      const tx = await contract.methods
        .transfer(recipientAddress, amountInWei)
        .send({ 
          from: account,
          gas: gasEstimate.toString()
        });

      toast({
        title: "Tokens Sent Successfully! 🚀",
        description: `Transaction hash: ${tx.transactionHash}`,
        variant: "default"
      });

      // Reset form
      setRecipientAddress('');
      setTokenAmount('');
    } catch (error: any) {
      console.error('Transfer error:', error);
      toast({
        title: "Transfer Failed",
        description: error.message || "Failed to send tokens",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="glass card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          Send SkillTokens
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendTokens} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tokenRecipient">Recipient Wallet Address</Label>
            <Input
              id="tokenRecipient"
              type="text"
              placeholder="0x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="glass"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Token Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="100"
              step="0.01"
              min="0"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              className="glass"
            />
          </div>

          <Button 
            type="submit" 
            disabled={!isConnected || isSending}
            className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSending ? 'Sending Tokens...' : 'Send Tokens'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};