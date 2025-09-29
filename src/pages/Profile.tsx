import React, { useState } from 'react';
import { Camera, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Upload, CreditCard as Edit, Award, MapPin, Calendar } from 'lucide-react';
import { currentAthlete } from '../data/mockData';

const Profile: React.FC = () => {
  const [aadhaarStep, setAadhaarStep] = useState<'none' | 'upload' | 'selfie' | 'processing' | 'complete'>('none');
  const [mediapipeStep, setMediapipeStep] = useState<'none' | 'processing' | 'complete'>('none');

  const handleAadhaarVerification = () => {
    setAadhaarStep('upload');
    setTimeout(() => setAadhaarStep('selfie'), 2000);
    setTimeout(() => setAadhaarStep('processing'), 4000);
    setTimeout(() => setAadhaarStep('complete'), 6000);
  };

  const handleMediapipeVerification = () => {
    setMediapipeStep('processing');
    setTimeout(() => setMediapipeStep('complete'), 3000);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop"
              alt={currentAthlete.name}
              className="w-20 h-20 rounded-full border-4 border-blue-500"
            />
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-xl font-bold">{currentAthlete.name}</h1>
              {currentAthlete.aadhaarVerified && (
                <CheckCircle className="w-5 h-5 text-blue-500" />
              )}
            </div>
            
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{currentAthlete.age} years old</span>
                {currentAthlete.aadhaarVerified && (
                  <span className="text-green-600 font-medium">(Aadhaar verified ✓)</span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{currentAthlete.region} • {currentAthlete.sport}</span>
              </div>
              <div>
                Height: {currentAthlete.height_cm}cm • Weight: {currentAthlete.weight_kg}kg
                {currentAthlete.mediapipeVerified && (
                  <span className="text-green-600 font-medium"> (Mediapipe verified ✓)</span>
                )}
              </div>
            </div>
          </div>
          
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {/* Badges */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2 flex items-center">
            <Award className="w-4 h-4 mr-1" />
            Achievements
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentAthlete.badges.map((badge, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm rounded-full font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Identity Verification</h2>
        
        {/* Aadhaar Verification */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Aadhaar Verification</h3>
            {currentAthlete.aadhaarVerified ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            )}
          </div>

          {aadhaarStep === 'none' && !currentAthlete.aadhaarVerified && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Verify your age and identity using your Aadhaar card
              </p>
              <button
                onClick={handleAadhaarVerification}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Start Verification</span>
              </button>
            </div>
          )}

          {aadhaarStep === 'upload' && (
            <div className="text-center py-4">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600">Upload Aadhaar photo...</p>
              </div>
            </div>
          )}

          {aadhaarStep === 'selfie' && (
            <div className="text-center py-4">
              <div className="animate-pulse">
                <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-sm text-gray-600">Take a selfie for face matching...</p>
              </div>
            </div>
          )}

          {aadhaarStep === 'processing' && (
            <div className="text-center py-4">
              <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Processing verification...</p>
            </div>
          )}

          {(aadhaarStep === 'complete' || currentAthlete.aadhaarVerified) && (
            <div className="space-y-2">
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Aadhaar photo matched ✅ (mock)</span>
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Age verified: {currentAthlete.age} (from Aadhaar) — mock</span>
              </div>
            </div>
          )}
        </div>

        {/* Mediapipe Verification */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Biometrics & Measurements</h3>
            {currentAthlete.mediapipeVerified ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
            )}
          </div>

          {mediapipeStep === 'none' && !currentAthlete.mediapipeVerified && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Verify your height and weight measurements using AI
              </p>
              <button
                onClick={handleMediapipeVerification}
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                Verify via Mediapipe (mock)
              </button>
            </div>
          )}

          {mediapipeStep === 'processing' && (
            <div className="text-center py-4">
              <div className="animate-spin w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Analyzing measurements...</p>
            </div>
          )}

          {(mediapipeStep === 'complete' || currentAthlete.mediapipeVerified) && (
            <div className="space-y-2">
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Height: {currentAthlete.height_cm}cm - Verified (mock)</span>
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Weight: {currentAthlete.weight_kg}kg - Verified (mock)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Performance Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{currentAthlete.aiScore}</div>
            <div className="text-sm text-gray-600">AI Score</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">#{currentAthlete.rank}</div>
            <div className="text-sm text-gray-600">National Rank</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;