import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, Award, Calendar, Settings } from 'lucide-react';
import { notifications } from '../data/mockData';

const Notifications: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'tests', label: 'Tests', count: notifications.filter(n => n.type === 'warning').length },
    { id: 'achievements', label: 'Achievements', count: notifications.filter(n => n.type === 'success').length }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success':
        return <Award className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (selectedTab) {
      case 'unread':
        return !notification.read;
      case 'tests':
        return notification.type === 'warning';
      case 'achievements':
        return notification.type === 'success';
      default:
        return true;
    }
  });

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map(notification => (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 ${getBgColor(notification.type)} ${
              !notification.read ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                
                {/* Action Buttons */}
                {notification.type === 'warning' && (
                  <div className="flex space-x-2">
                    <button className="text-xs bg-yellow-500 text-white px-3 py-1 rounded-full hover:bg-yellow-600">
                      Schedule Retest
                    </button>
                    <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300">
                      Remind Later
                    </button>
                  </div>
                )}
                
                {notification.type === 'success' && (
                  <div className="flex space-x-2">
                    <button className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600">
                      View Achievement
                    </button>
                    <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600">
                      Share
                    </button>
                  </div>
                )}
                
                {notification.type === 'info' && (
                  <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600">
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      )}

      {/* Mark All as Read */}
      {filteredNotifications.some(n => !n.read) && (
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span>Mark All as Read</span>
        </button>
      )}
    </div>
  );
};

export default Notifications;