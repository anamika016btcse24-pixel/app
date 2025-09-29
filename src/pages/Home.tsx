import React from 'react';
import { Heart, MessageCircle, Share2, TrendingUp, Award, Target } from 'lucide-react';
import { currentAthlete, athletes } from '../data/mockData';

const Home: React.FC = () => {
  // Get recent posts from all athletes
  const allPosts = athletes.flatMap(athlete => 
    athlete.posts.map(post => ({ ...post, athlete }))
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="p-4 space-y-4">
      {/* Progress Overview */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Your Progress</h2>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+5% this month</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{currentAthlete.level}</div>
            <div className="text-sm text-gray-500">Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">#{currentAthlete.rank}</div>
            <div className="text-sm text-gray-500">Rank</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{currentAthlete.xp}</div>
            <div className="text-sm text-gray-500">XP</div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
            <span>Level {currentAthlete.level}</span>
            <span>{currentAthlete.xp}/2500 XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentAthlete.xp / 2500) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold">Next Retest</div>
              <div className="text-sm text-gray-500">5 days left</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold">Badges</div>
              <div className="text-sm text-gray-500">{currentAthlete.badges.length} earned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Activity Feed</h3>
        
        {allPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Post Header */}
            <div className="p-4 pb-3">
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={`https://images.pexels.com/photos/${1040880 + parseInt(post.athlete.id.slice(1))}/${post.athlete.id}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                  alt={post.athlete.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="font-semibold">{post.athlete.name}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <span>{post.athlete.sport}</span>
                    <span>•</span>
                    <span>{post.timestamp}</span>
                  </div>
                </div>
              </div>
              
              {/* Post Content */}
              <p className="text-gray-800 mb-3">{post.text}</p>
            </div>

            {/* Post Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-48 object-cover"
              />
            )}

            {/* Post Actions */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;