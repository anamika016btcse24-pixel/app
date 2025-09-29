import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hop as Home, User, Activity, ChartBar as BarChart3, Trophy, Bell, Camera, Wifi, WifiOff, Upload } from 'lucide-react';
import { syncOfflineData, getQueuedItems } from '../utils/offlineStorage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedItems, setQueuedItems] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Update queued items count
    const updateQueue = () => {
      const items = getQueuedItems();
      setQueuedItems(items.length);
    };
    
    updateQueue();
    const interval = setInterval(updateQueue, 2000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleSync = async () => {
    setSyncing(true);
    await syncOfflineData();
    const items = getQueuedItems();
    setQueuedItems(items.length);
    setSyncing(false);
  };

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/tests', icon: Activity, label: 'Tests' },
    { path: '/progress', icon: BarChart3, label: 'Progress' },
    { path: '/leaderboard', icon: Trophy, label: 'Board' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-blue-600">KheloIndia</h1>
          <span className="text-sm text-gray-500">Athlete</span>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Offline/Online Status */}
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            
            {queuedItems > 0 && (
              <button
                onClick={handleSync}
                disabled={!isOnline || syncing}
                className="flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white text-xs rounded-full disabled:opacity-50"
              >
                <Upload className="w-3 h-3" />
                <span>{syncing ? 'Syncing...' : `${queuedItems}`}</span>
              </button>
            )}
          </div>

          {/* Notifications */}
          <Link to="/notifications" className="relative">
            <Bell className="w-6 h-6 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Link>

          {/* Profile Avatar */}
          <Link to="/profile">
            <img
              src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-blue-500"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20">
        {children}
      </main>

      {/* Floating Action Button */}
      <Link
        to="/record"
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
      >
        <Camera className="w-6 h-6" />
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex">
          {tabs.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={path}
              className={`flex-1 py-3 px-2 text-center ${
                location.pathname === path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <Icon className="w-5 h-5 mx-auto mb-1" />
              <div className="text-xs">{label}</div>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;