import React from 'react';

const CallToAction = ({ onConnectWallet, onNavigate, onViewResults }) => {
  const handleViewResults = () => {
    const element = document.getElementById('results');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (onViewResults) {
      onViewResults();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-dark-green-700 via-dark-green-800 to-dark-green-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to Exercise Your Democratic Right?
        </h2>
        <p className="text-xl text-dark-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join millions of Kenyans in shaping the future of our nation. Your vote matters — cast it with confidence.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('vote');
              } else {
                window.location.hash = 'vote';
              }
            }}
            className="px-8 py-4 bg-white text-dark-green-700 font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Sign In to Vote
          </button>
          <button
            onClick={handleViewResults}
            className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            View Results
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;