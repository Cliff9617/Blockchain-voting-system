import React from 'react';

const FeatureCard = ({ icon, title, description, delay }) => (
  <div 
    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-dark-green-50 to-dark-green-100 flex items-center justify-center mb-5">
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-dark-green-800 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: '🔒',
      title: 'Blockchain Security',
      description: 'Every vote is cryptographically secured on the blockchain, making it immutable and tamper-proof.',
    },
    {
      icon: '✅',
      title: 'Zero Double Voting',
      description: 'Smart contracts ensure each registered voter can cast exactly one vote, eliminating fraud.',
    },
    {
      icon: '🌍',
      title: 'Region-Locked Ballots',
      description: 'Voters only see candidates relevant to their county, constituency, and ward.',
    },
    {
      icon: '👁️',
      title: 'Full Transparency',
      description: 'All votes are publicly verifiable on the blockchain while maintaining voter privacy.',
    },
    {
      icon: '🆔',
      title: 'Identity Verification',
      description: 'Integration with national ID systems ensures only eligible Kenyans can vote.',
    },
    {
      icon: '⚡',
      title: 'Instant Results',
      description: 'Real-time vote counting and result publication as soon as voting ends.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-green-800 mb-4">
            Built for Kenya's Democracy
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            DeVote combines cutting-edge blockchain technology with electoral best practices to deliver a voting system Kenyans can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;