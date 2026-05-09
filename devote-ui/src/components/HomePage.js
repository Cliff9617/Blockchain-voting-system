import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ElectionStats from './ElectionStats';
import ElectivePositions from './ElectivePositions';
import FeaturesSection from './FeaturesSection';
import CallToAction from './CallToAction';
import Footer from './Footer';

const HomePage = ({ 
  onConnectWallet, 
  isConnected, 
  account,
  electionStarted,
  electionEnded,
  onNavigate
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onConnectWallet={onConnectWallet}
        isConnected={isConnected}
        account={account}
        onNavigate={onNavigate}
      />
      
      <HeroSection 
        onConnectWallet={onConnectWallet}
        onNavigate={onNavigate}
        electionStarted={electionStarted}
        electionEnded={electionEnded}
      />
      
      <ElectionStats />
      
      <ElectivePositions />
      
      <FeaturesSection />
      
      <CallToAction 
        onConnectWallet={onConnectWallet}
        onNavigate={onNavigate}
      />
      
      <Footer />
    </div>
  );
};

export default HomePage;