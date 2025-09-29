import React, { useState } from 'react';
import { WiFi, WifiOff, Upload, HardDrive, Eye, Volume2, Shield, Trash2, Download } from 'lucide-react';
import { getSettings, updateSettings, getQueuedItems, syncOfflineData } from '../utils/offlineStorage';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState(getSettings());
  const [syncing, setSyncing] = useState(false);
  const queuedItems = getQueuedItems();

  const handleSettingChange = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    updateSettings({ [key]: value });
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      await syncOfflineData();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) return `${(sizeInMB * 1024).toFixed(0)} KB`;
    return `${sizeInMB.toFixed(1)} MB`;
  };

  const totalQueueSize = queuedItems.reduce((total, item) => total + item.size, 0);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Sync & Storage */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Sync & Storage</h3>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Offline Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {settings.offlineMode ? (
                <WifiOff className="w-5 h-5 text-red-500" />
              ) : (
                <WiFi className="w-5 h-5 text-green-500" />
              )}
              <div>
                <div className="font-medium">Offline Mode</div>
                <div className="text-sm text-gray-500">
                  Save recordings locally when disconnected
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('offlineMode', !settings.offlineMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.offlineMode ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.offlineMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Auto Analyze Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">Auto-analyze Offline</div>
                <div className="text-sm text-gray-500">
                  Run ML analysis automatically after recording
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('autoAnalyze', !settings.autoAnalyze)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoAnalyze ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoAnalyze ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Sync Now Button */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium">Queued Items</div>
                <div className="text-sm text-gray-500">
                  {queuedItems.length} items ({formatFileSize(totalQueueSize)})
                </div>
              </div>
              <button
                onClick={handleSync}
                disabled={syncing || queuedItems.length === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{syncing ? 'Syncing...' : 'Sync Now'}</span>
              </button>
            </div>

            {/* Queue Details */}
            {queuedItems.length > 0 && (
              <div className="space-y-2">
                {queuedItems.slice(0, 3).map(item => (
                  <div key={item.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4 text-gray-400" />
                      <span>{item.type === 'test' ? 'Test Recording' : 'Analysis'}</span>
                      {item.encrypted && <Shield className="w-3 h-3 text-green-500" />}
                    </div>
                    <span className="text-gray-500">{formatFileSize(item.size)}</span>
                  </div>
                ))}
                {queuedItems.length > 3 && (
                  <div className="text-sm text-gray-500 text-center">
                    +{queuedItems.length - 3} more items
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Accessibility</h3>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-medium">Voice Guidance</div>
                <div className="text-sm text-gray-500">
                  Audio instructions during tests (mock)
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('voiceGuidance', !settings.voiceGuidance)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.voiceGuidance ? 'bg-purple-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.voiceGuidance ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-indigo-500" />
              <div>
                <div className="font-medium">High Contrast Mode</div>
                <div className="text-sm text-gray-500">
                  Enhanced visibility for better readability
                </div>
              </div>
            </div>
            <button
              onClick={() => handleSettingChange('highContrast', !settings.highContrast)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.highContrast ? 'bg-indigo-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ML Pipeline Info */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">ML Pipeline (Mock)</h3>
        </div>
        
        <div className="p-4">
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Record video tests on device</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Store temporarily in local SQLite (mock)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Run offline ML analysis script</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Encrypt and queue for upload</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Upload to cloud when online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Data Management</h3>
        </div>
        
        <div className="p-4 space-y-3">
          <button className="w-full text-left p-3 bg-blue-50 text-blue-700 rounded-lg flex items-center space-x-3">
            <Download className="w-5 h-5" />
            <span>Export My Data</span>
          </button>
          
          <button className="w-full text-left p-3 bg-red-50 text-red-700 rounded-lg flex items-center space-x-3">
            <Trash2 className="w-5 h-5" />
            <span>Clear Local Storage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;