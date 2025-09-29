import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Video, Square, Upload, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Loader } from 'lucide-react';
import { tests } from '../data/mockData';
import { addToQueue, runOfflineAnalysis } from '../utils/offlineStorage';

const RecordTest: React.FC = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState(testId || '');
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [faceCheckResult, setFaceCheckResult] = useState<'pending' | 'match' | 'mismatch'>('pending');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const test = tests.find(t => t.id === selectedTest);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recording]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const startRecording = () => {
    setRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setRecording(false);
    setRecorded(true);
    
    // Simulate face check
    setTimeout(() => {
      const isMatch = Math.random() > 0.3; // 70% success rate
      setFaceCheckResult(isMatch ? 'match' : 'mismatch');
    }, 1500);
  };

  const saveAndAnalyze = async () => {
    if (!test) return;

    setAnalyzing(true);

    // Create mock video data
    const videoData = {
      testId: test.id,
      testName: test.name,
      athleteId: 'A1001',
      recordedAt: new Date().toISOString(),
      duration: recordingTime,
      faceMatch: faceCheckResult === 'match'
    };

    // Add to offline queue
    addToQueue({
      id: `recording_${test.id}_${Date.now()}`,
      type: 'test',
      testId: test.id,
      data: videoData,
      encrypted: false,
      size: Math.random() * 50 + 10 // Mock file size in MB
    });

    try {
      // Run offline analysis
      const result = await runOfflineAnalysis(test.id, videoData);
      setAnalysisResult(result);
      
      // Update test status in mock data
      const testIndex = tests.findIndex(t => t.id === test.id);
      if (testIndex !== -1) {
        tests[testIndex].status = 'pending_analysis';
        tests[testIndex].lastAttempt = new Date().toISOString();
      }
      
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedTest) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Select Test to Record</h1>
        <div className="grid grid-cols-1 gap-3">
          {tests.filter(t => t.type === 'video').map(test => (
            <button
              key={test.id}
              onClick={() => setSelectedTest(test.id)}
              className="bg-white p-4 rounded-lg shadow-sm text-left hover:shadow-md transition-shadow"
            >
              <div className="font-semibold">{test.name}</div>
              <div className="text-sm text-gray-500 mt-1">
                Status: {test.status.replace('_', ' ')}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{test?.name}</h1>
          <p className="text-sm text-gray-500">Record your performance</p>
        </div>
        <button
          onClick={() => navigate('/tests')}
          className="text-blue-500 hover:text-blue-700"
        >
          Back to Tests
        </button>
      </div>

      {/* Camera Preview */}
      <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Recording Indicator */}
        {recording && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-2 rounded-lg">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">REC {formatTime(recordingTime)}</span>
          </div>
        )}

        {/* Recording Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          {!recorded ? (
            <button
              onClick={recording ? stopRecording : startRecording}
              className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center ${
                recording ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-gray-100'
              } transition-colors`}
            >
              {recording ? (
                <Square className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-red-500" />
              )}
            </button>
          ) : (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-2" />
              <p className="text-white text-sm">Recording saved</p>
            </div>
          )}
        </div>
      </div>

      {/* Face Check Result */}
      {recorded && faceCheckResult !== 'pending' && (
        <div className={`p-4 rounded-lg ${
          faceCheckResult === 'match' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2">
            {faceCheckResult === 'match' ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-medium">
                  Face in video matches Aadhaar photo ✅ (mock)
                </span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-medium">
                  Face mismatch detected ⚠️ (mock)
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analyzing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Loader className="w-5 h-5 text-blue-500 animate-spin" />
            <div>
              <div className="font-medium text-blue-700">Offline analysis in progress...</div>
              <div className="text-sm text-blue-600">This may take 2-4 seconds</div>
            </div>
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium text-green-700">Offline analysis complete (mock)</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Confidence:</span>
              <span className="font-medium">{Math.round(analysisResult.confidence * 100)}%</span>
            </div>
            {analysisResult.jumpHeight_cm && (
              <div className="flex justify-between">
                <span>Jump Height:</span>
                <span className="font-medium">{analysisResult.jumpHeight_cm} cm</span>
              </div>
            )}
            {analysisResult.reps && (
              <div className="flex justify-between">
                <span>Reps Detected:</span>
                <span className="font-medium">{analysisResult.reps}</span>
              </div>
            )}
            {analysisResult.time_seconds && (
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-medium">{analysisResult.time_seconds}s</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {recorded && !analyzing && (
        <div className="space-y-3">
          {!analysisResult && (
            <button
              onClick={saveAndAnalyze}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Save & Analyze Offline</span>
            </button>
          )}
          
          {analysisResult && (
            <div className="space-y-2">
              <button
                onClick={() => navigate('/tests')}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg"
              >
                Done - Back to Tests
              </button>
              <p className="text-sm text-gray-600 text-center">
                Video queued for encrypted upload when online
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecordTest;