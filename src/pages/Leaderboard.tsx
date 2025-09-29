import React, { useState } from 'react';
import { Trophy, Medal, Award, ListFilter as Filter, Users } from 'lucide-react';
import { leaderboardData, currentAthlete } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('national');
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');

  const filters = [
    { id: 'national', label: 'National' },
    { id: 'state', label: 'State' },
    { id: 'district', label: 'District' }
  ];

  const sports = [
    { id: 'all', label: 'All Sports' },
    { id: 'athletics', label: 'Athletics' },
    { id: 'football', label: 'Football' },
    { id: 'kabaddi', label: 'Kabaddi' },
    { id: 'wrestling', label: 'Wrestling' }
  ];

  const ageGroups = [
    { id: 'all', label: 'All Ages' },
    { id: 'u12', label: 'U-12' },
    { id: 'u16', label: 'U-16' },
    { id: 'u19', label: 'U-19' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600">{rank}</span>
          </div>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-500">{leaderboardData.length} athletes</span>
        </div>
      </div>

      {/* Your Rank Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90">Your Current Rank</div>
            <div className="text-3xl font-bold">#{currentAthlete.rank}</div>
            <div className="text-sm opacity-90">{currentAthlete.sport} • {currentAthlete.region}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{currentAthlete.aiScore}</div>
            <div className="text-sm opacity-90">AI Score</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        
        <div className="space-y-3">
          {/* Location Filter */}
          <div>
            <div className="text-sm font-medium text-gray-600 mb-2">Location</div>
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedFilter === filter.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sport Filter */}
          <div>
            <div className="text-sm font-medium text-gray-600 mb-2">Sport</div>
            <div className="flex flex-wrap gap-2">
              {sports.map(sport => (
                <button
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedSport === sport.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {sport.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group Filter */}
          <div>
            <div className="text-sm font-medium text-gray-600 mb-2">Age Group</div>
            <div className="flex flex-wrap gap-2">
              {ageGroups.map(age => (
                <button
                  key={age.id}
                  onClick={() => setSelectedAge(age.id)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedAge === age.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {age.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold">Rankings</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {leaderboardData.map((athlete, index) => (
            <div
              key={athlete.rank}
              className={`p-4 ${
                athlete.name === currentAthlete.name
                  ? 'bg-blue-50 border-l-4 border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRankIcon(athlete.rank)}
                  
                  <img
                    src={`https://images.pexels.com/photos/${1040880 + athlete.rank}/${athlete.name.replace(' ', '-')}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                    alt={athlete.name}
                    className="w-10 h-10 rounded-full"
                  />
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="font-semibold">{athlete.name}</div>
                      {athlete.name === currentAthlete.name && (
                        <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">You</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {athlete.sport} • Age {athlete.age} • {athlete.region}
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(athlete.aiScore)}`}>
                    {athlete.aiScore}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">AI Score</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compare Button */}
      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold">
        Compare with Selected Athletes
      </button>
    </div>
  );
};

export default Leaderboard;