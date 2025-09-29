interface QueuedItem {
  id: string;
  type: 'test' | 'analysis';
  testId: string;
  data: any;
  timestamp: number;
  encrypted: boolean;
  size: number;
}

const QUEUE_KEY = 'khelo_local_queue';
const SETTINGS_KEY = 'khelo_settings';

export const getQueuedItems = (): QueuedItem[] => {
  const stored = localStorage.getItem(QUEUE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToQueue = (item: Omit<QueuedItem, 'timestamp'>): void => {
  const items = getQueuedItems();
  const newItem: QueuedItem = {
    ...item,
    timestamp: Date.now()
  };
  items.push(newItem);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
};

export const removeFromQueue = (id: string): void => {
  const items = getQueuedItems().filter(item => item.id !== id);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
};

export const syncOfflineData = async (): Promise<void> => {
  const items = getQueuedItems();
  
  for (const item of items) {
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulate encryption if not already encrypted
    if (!item.encrypted) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Remove from queue after successful upload
    removeFromQueue(item.id);
  }
};

export const runOfflineAnalysis = async (testId: string, videoData: any): Promise<any> => {
  // Simulate ML analysis with realistic delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Generate mock analysis results based on test type
  const analysisResults = generateMockAnalysis(testId, videoData);
  
  return analysisResults;
};

const generateMockAnalysis = (testId: string, videoData: any) => {
  const testName = videoData.testName || '';
  const athleteId = videoData.athleteId || 'A1001';
  
  // Use deterministic randomization based on athleteId + testId
  const seed = parseInt(athleteId.slice(1)) + parseInt(testId.slice(1) || '1');
  const random = (min: number, max: number) => {
    const x = Math.sin(seed * 9999) * 10000;
    return min + (max - min) * (x - Math.floor(x));
  };
  
  const baseAnalysis = {
    confidence: 0.85 + random(0, 0.15),
    faceMatch: random(0, 1) > 0.2, // 80% success rate
    timestamp: Date.now()
  };

  switch (testName.toLowerCase()) {
    case 'standing vertical jump':
      return {
        ...baseAnalysis,
        jumpHeight_cm: Math.round(38 + random(-5, 8)),
        technique: random(0, 1) > 0.3 ? 'good' : 'needs_improvement'
      };
    case 'sit ups':
      return {
        ...baseAnalysis,
        reps: Math.round(45 + random(-10, 15)),
        form_score: Math.round(75 + random(0, 25))
      };
    case '4x10m shuttle run':
      return {
        ...baseAnalysis,
        time_seconds: (9.5 + random(-0.5, 1.5)).toFixed(2),
        agility_score: Math.round(80 + random(-15, 20))
      };
    default:
      return baseAnalysis;
  }
};

export const getSettings = () => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  return stored ? JSON.parse(stored) : {
    offlineMode: false,
    autoAnalyze: true,
    highContrast: false,
    voiceGuidance: false
  };
};

export const updateSettings = (newSettings: any) => {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
};