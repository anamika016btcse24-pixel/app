import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, BarChart3, Award, AlertTriangle, CheckCircle, ArrowLeft } from 'lucide-react';
import { tests } from '../data/mockData';

const VideoAnalysis: React.FC = () => {
  const { testId } = useParams();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const test = tests.find(t => t.id === testId);
  
  if (!test) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold text-gray-600">Test not found</h1>
        <Link to="/tests" className="text-blue-500 hover:text-blue-700">
          Back to Tests
        </Link>
      </div>
    );
  }

  const mockAnalysisData = {
    athlete: "Arjun Singh",
    test: test.name,
    best: test.best,
    analysis: {
      jumpHeight_cm: test.name.includes('Jump') ? 42 : undefined,
      reps: test.name.includes('Sit Ups') ? 50 : undefined,
      time_seconds: test.name.includes('Run') || test.name.includes('Shuttle') ? 9.8 : undefined,
      confidence: test.confidence || 0.92,
      faceMatch: true,
      technique: 'good',
      form_score: 85
    },
    video: "placeholder.mp4",
    status: test.status,
    uploadedAt: "2025-01-15T10:30:00Z",
    processedAt: "2025-01-15T10:32:45Z"
  };

  const recordings = [
    {
      id: 1,
      date: "2025-01-15",
      time: "10:30 AM",
      score: mockAnalysisData.analysis.jumpHeight_cm || mockAnalysisData.analysis.reps || 9.8,
      confidence: mockAnalysisData.analysis.confidence,
      status: 'validated'
    },
    {
      id: 2,
      date: "2025-01-10",
      time: "2:15 PM", 
      score: (mockAnalysisData.analysis.jumpHeight_cm || mockAnalysisData.analysis.reps || 9.8) * 0.95,
      confidence: 0.89,
      status: 'validated'
    },
    {
      id: 3,
      date: "2025-01-05",
      time: "9:45 AM",
      score: (mockAnalysisData.analysis.jumpHeight_cm || mockAnalysisData.analysis.reps || 9.8) * 0.9,
      confidence: 0.87,
      status: 'failed'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  const getMetricUnit = () => {
    if (test.name.includes('Jump')) return 'cm';
    if (test.name.includes('Sit Ups')) return 'reps/min';
    if (test.name.includes('Run') || test.name.includes('Shuttle')) return 's';
    return 'units';
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Link to="/tests" className="text-blue-500 hover:text-blue-700">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{test.name} Analysis</h1>
          <p className="text-sm text-gray-500">Performance breakdown and insights</p>
        </div>
      </div>

      {/* Best Performance Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90">Personal Best</div>
            <div className="text-2xl font-bold">{test.best}</div>
            <div className="text-sm opacity-90">
              Confidence: {Math.round((mockAnalysisData.analysis.confidence || 0.9) * 100)}%
            </div>
          </div>
          <div className="text-center">
            <Award className="w-12 h-12 mb-2 mx-auto opacity-75" />
            <div className="text-sm opacity-90">Validated</div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Recording History</h3>
        </div>
        
        <div className="p-4 grid grid-cols-1 gap-3">
          {recordings.map((recording) => (
            <div
              key={recording.id}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedVideo(recording.id.toString())}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-16 h-12 bg-gray-200 rounded overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/416838/pexels-photo-416838.jpeg?auto=compress&cs=tinysrgb&w=100&h=75&fit=crop"
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium">{recording.date}</div>
                    <div className="text-sm text-gray-500">{recording.time}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">
                      {typeof recording.score === 'number' ? recording.score.toFixed(1) : recording.score} {getMetricUnit()}
                    </span>
                    {getStatusIcon(recording.status)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.round(recording.confidence * 100)}% confidence
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analysis Details */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold">Detailed Analysis</h3>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-sm text-blue-600 mb-1">Performance Score</div>
              <div className="text-xl font-bold text-blue-700">
                {mockAnalysisData.analysis.jumpHeight_cm || mockAnalysisData.analysis.reps || mockAnalysisData.analysis.time_seconds}
                <span className="text-sm ml-1">{getMetricUnit()}</span>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-sm text-green-600 mb-1">Form Score</div>
              <div className="text-xl font-bold text-green-700">
                {mockAnalysisData.analysis.form_score}/100
              </div>
            </div>
          </div>

          {/* Analysis Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">AI Confidence</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${mockAnalysisData.analysis.confidence * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">
                  {Math.round(mockAnalysisData.analysis.confidence * 100)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Face Match</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Verified ✓</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Technique</span>
              <span className="text-sm font-medium text-blue-600 capitalize">
                {mockAnalysisData.analysis.technique}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium">
              Re-record Test
            </button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium">
              Appeal Result
            </button>
          </div>
        </div>
      </div>

      {/* Processing Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold mb-2 text-gray-700">Processing Details</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Uploaded: {new Date(mockAnalysisData.uploadedAt).toLocaleString()}</div>
          <div>Analyzed: {new Date(mockAnalysisData.processedAt).toLocaleString()}</div>
          <div>Processing Time: 2.3 seconds</div>
          <div>Status: {mockAnalysisData.status.replace('_', ' ').toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysis;