import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Upload, FileText, CircleCheck as CheckCircle, Clock, TriangleAlert as AlertTriangle, Calendar, Camera } from 'lucide-react';
import { tests } from '../data/mockData';

const MyTests: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending_analysis':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <div className="w-5 h-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'validated':
        return 'Validated';
      case 'pending_analysis':
        return 'Analyzing';
      case 'failed':
        return 'Failed';
      default:
        return 'Not Done';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated':
        return 'text-green-600 bg-green-50';
      case 'pending_analysis':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Tests</h1>
        <Link
          to="/record"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Camera className="w-4 h-4" />
          <span>Record</span>
        </Link>
      </div>

      {/* Retest Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-5 h-5 text-yellow-600" />
          <span className="font-semibold text-yellow-800">Compulsory Retest Policy</span>
        </div>
        <p className="text-sm text-yellow-700">
          You must retest after 30 days to remain ranked — next retest due: <strong>Oct 28, 2025</strong> (mock)
        </p>
      </div>

      {/* Test Progress Overview */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Test Progress</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {tests.filter(t => t.status === 'validated').length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {tests.filter(t => t.status === 'pending_analysis').length}
            </div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
            <span>Overall Progress</span>
            <span>{Math.round((tests.filter(t => t.status === 'validated').length / tests.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(tests.filter(t => t.status === 'validated').length / tests.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tests List */}
      <div className="space-y-3">
        {tests.map((test, index) => (
          <div key={test.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-lg font-bold text-gray-400">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {test.type === 'video' && test.videoThumb && (
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://images.pexels.com/photos/416838/pexels-photo-416838.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop`}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{test.name}</h3>
                    {getStatusIcon(test.status)}
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(test.status)}`}>
                      {getStatusText(test.status)}
                    </span>
                    {test.best && (
                      <span className="text-sm font-medium text-blue-600">
                        Best: {test.best}
                      </span>
                    )}
                    {test.confidence && (
                      <span className="text-xs text-gray-500">
                        {Math.round(test.confidence * 100)}% confidence
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {test.type === 'video' ? (
                  <>
                    <Link
                      to={`/record/${test.id}`}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                      title="Record"
                    >
                      <Camera className="w-4 h-4" />
                    </Link>
                    {test.status !== 'not_done' && (
                      <Link
                        to={`/analysis/${test.id}`}
                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg"
                        title="View Analysis"
                      >
                        <FileText className="w-4 h-4" />
                      </Link>
                    )}
                  </>
                ) : (
                  <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTests;