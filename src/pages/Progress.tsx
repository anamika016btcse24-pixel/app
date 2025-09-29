import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { progressData } from '../data/mockData';

const Progress: React.FC = () => {
  const [activeChart, setActiveChart] = useState('overview');

  const chartTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'vertical', label: 'Vertical Jump' },
    { id: 'situps', label: 'Sit-ups' },
    { id: 'shuttle', label: 'Shuttle Run' },
    { id: 'endurance', label: 'Endurance' },
    { id: 'radar', label: 'Overall Performance' }
  ];

  const enduranceData = progressData.monthly.map(item => ({
    ...item,
    enduranceMinutes: parseFloat(item.endurance.split(':')[0]) + parseFloat(item.endurance.split(':')[1]) / 60
  }));

  const radarData = [
    { subject: 'Speed', A: progressData.radarLatest.speed, fullMark: 10 },
    { subject: 'Agility', A: progressData.radarLatest.agility, fullMark: 10 },
    { subject: 'Endurance', A: progressData.radarLatest.endurance, fullMark: 10 },
    { subject: 'Strength', A: progressData.radarLatest.strength, fullMark: 10 },
    { subject: 'Flexibility', A: progressData.radarLatest.flexibility, fullMark: 10 },
    { subject: 'Core', A: progressData.radarLatest.core, fullMark: 10 }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'vertical':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="verticalJump" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'situps':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="situps" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'shuttle':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="shuttle" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'endurance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enduranceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${Math.floor(value)}:${Math.round((value % 1) * 60).toString().padStart(2, '0')}`, 'Time']} />
              <Line type="monotone" dataKey="enduranceMinutes" stroke="#8B5CF6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 10]} />
              <Radar name="Performance" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        );

      default: // overview
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Vertical Jump</span>
                <TrendingUp className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">42 cm</div>
              <div className="text-sm text-blue-600">+4 cm this month</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-700">Sit-ups</span>
                <Target className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600">50 /min</div>
              <div className="text-sm text-green-600">+10 reps improvement</div>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-700">Shuttle Run</span>
                <Award className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="text-2xl font-bold text-yellow-600">10.2 s</div>
              <div className="text-sm text-yellow-600">-0.6s improvement</div>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-700">Endurance</span>
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-purple-600">6:45</div>
              <div className="text-sm text-purple-600">-20s improvement</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Progress Tracking</h1>
        <div className="flex items-center text-sm text-green-600">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>+5% overall improvement</span>
        </div>
      </div>

      {/* Retest Timeline */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Retest Timeline</h3>
          <Calendar className="w-5 h-5 text-gray-500" />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
              <span>Last retest: Sep 28, 2025</span>
              <span>Next due: Oct 28, 2025</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full w-4/5"></div>
            </div>
          </div>
          <div className="text-sm font-medium text-red-600">5 days left</div>
        </div>
      </div>

      {/* Chart Navigation */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto">
          {chartTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${
                activeChart === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chart Content */}
        <div className="p-4">
          {renderChart()}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Performance Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-sm">Strength Improvement</div>
              <div className="text-sm text-gray-600">Your vertical jump has improved by 10% over the last 3 months</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-sm">Speed Enhancement</div>
              <div className="text-sm text-gray-600">Shuttle run times are consistently improving, showing better agility</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <div className="font-medium text-sm">Focus Area</div>
              <div className="text-sm text-gray-600">Consider working on flexibility to improve overall performance balance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;