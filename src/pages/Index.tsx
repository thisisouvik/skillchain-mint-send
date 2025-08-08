import { WalletConnection } from "@/components/WalletConnection";
import { MintBadgeForm } from "@/components/MintBadgeForm";
import { SendTokensForm } from "@/components/SendTokensForm";
import { NetworkStatus } from "@/components/NetworkStatus";
import { useWeb3 } from "@/hooks/useWeb3";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Shield, BookOpen } from "lucide-react";

const Index = () => {
  const { error } = useWeb3();

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary to-accent glow">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">SkillChain</h1>
              <p className="text-sm text-muted-foreground">Web3 Education Platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <NetworkStatus />
            <WalletConnection />
          </div>
        </div>
      </header>

      {/* Error Alert */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6">
          <Alert className="glass border-destructive/50">
            <Shield className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto mb-12 text-center">
        <div className="glass p-8 rounded-2xl card-shadow">
          <div className="mb-6">
            <BookOpen className="h-16 w-16 mx-auto text-primary mb-4" />
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Decentralized Learning Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Issue NFT badges to students and reward them with SkillTokens for their achievements. 
              Built on Polygon Mumbai for fast, low-cost transactions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🏆 NFT Badges</h3>
              <p className="text-sm text-muted-foreground">Issue verifiable achievement badges</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🪙 Skill Tokens</h3>
              <p className="text-sm text-muted-foreground">Reward students with transferable tokens</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <h3 className="font-semibold mb-2">⚡ Fast & Cheap</h3>
              <p className="text-sm text-muted-foreground">Powered by Polygon network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Forms */}
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MintBadgeForm />
          <SendTokensForm />
        </div>
      </main>

      {/* Instructions */}
      <section className="max-w-6xl mx-auto mt-12">
        <div className="glass p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Setup Requirements:</h4>
              <ul className="space-y-1">
                <li>• Install MetaMask browser extension</li>
                <li>• Switch to Polygon Mumbai testnet</li>
                <li>• Get free MATIC from Mumbai faucet</li>
                <li>• Deploy contracts (see documentation)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Contract Addresses:</h4>
              <ul className="space-y-1">
                <li>• NFT Badge: <code className="bg-muted px-1 rounded text-xs">0x1234...7890</code></li>
                <li>• Skill Token: <code className="bg-muted px-1 rounded text-xs">0x0987...4321</code></li>
                <li>• Mumbai Explorer: <a href="https://mumbai.polygonscan.com" className="text-primary hover:underline">polygonscan.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;