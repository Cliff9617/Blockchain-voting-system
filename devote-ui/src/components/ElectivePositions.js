import React from 'react';

const PositionCard = ({ position, level, seats, icon, delay }) => (
  <div 
    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-dark-green-500 to-dark-green-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-dark-green-800 mb-2">{position}</h3>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        {level}
      </span>
      <span className="text-sm font-semibold text-dark-green-600">
        {seats} {seats === '1' ? 'seat' : 'seats'}
      </span>
    </div>
  </div>
);

const ElectivePositions = () => {
  const positions = [
    { 
      position: 'President', 
      level: 'National Level', 
      seats: '1', 
      icon: '🏛️' 
    },
    { 
      position: 'Governor', 
      level: 'County Level', 
      seats: '47', 
      icon: '🏢' 
    },
    { 
      position: 'Senator', 
      level: 'County Level', 
      seats: '47', 
      icon: '📜' 
    },
    { 
      position: 'Woman Representative', 
      level: 'County Level', 
      seats: '47', 
      icon: '👩‍💼' 
    },
    { 
      position: 'Member of Parliament', 
      level: 'Constituency Level', 
      seats: '290', 
      icon: '🏛️' 
    },
    { 
      position: 'Member of County Assembly', 
      level: 'Ward Level', 
      seats: '1,450', 
      icon: '🤝' 
    },
  ];

  return (
    <section id="positions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-green-800 mb-4">
            6 Elective Positions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Every eligible Kenyan votes for six positions, from national to grassroots level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((pos, index) => (
            <PositionCard
              key={index}
              position={pos.position}
              level={pos.level}
              seats={pos.seats}
              icon={pos.icon}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElectivePositions;