export interface Athlete {
  id: string;
  name: string;
  age: number;
  region: string;
  sport: string;
  height_cm: number;
  weight_kg: number;
  aadhaarVerified: boolean;
  mediapipeVerified: boolean;
  badges: string[];
  posts: Post[];
  xp: number;
  level: number;
  aiScore: number;
  rank?: number;
}

export interface Post {
  id: number;
  text: string;
  likes: number;
  comments: number;
  timestamp: string;
  image?: string;
}

export interface Test {
  id: string;
  name: string;
  type: 'numeric' | 'video';
  value_cm?: number;
  value_kg?: number;
  status: 'not_done' | 'pending_analysis' | 'validated' | 'failed';
  best?: string;
  videoThumb?: string;
  lastAttempt?: string;
  confidence?: number;
  analysis?: any;
}

export interface ProgressData {
  monthly: Array<{
    month: string;
    verticalJump: number;
    situps: number;
    shuttle: number;
    medicine: number;
    endurance: string;
  }>;
  radarLatest: {
    speed: number;
    agility: number;
    endurance: number;
    strength: number;
    flexibility: number;
    core: number;
  };
}

export const currentAthlete: Athlete = {
  id: "A1001",
  name: "Arjun Singh",
  age: 15,
  region: "Delhi",
  sport: "Athletics",
  height_cm: 168,
  weight_kg: 58,
  aadhaarVerified: true,
  mediapipeVerified: true,
  badges: ["Top 10 U-16", "Monthly Star", "Record Breaker"],
  xp: 2400,
  level: 12,
  aiScore: 95,
  rank: 1,
  posts: [
    {
      id: 1,
      text: "New personal best on vertical jump today! 🏃‍♂️ Hard work paying off! #training #athletics",
      likes: 24,
      comments: 8,
      timestamp: "2 hours ago",
      image: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      text: "Great training session with coach today. Ready for the upcoming district championship! 💪",
      likes: 18,
      comments: 5,
      timestamp: "1 day ago"
    }
  ]
};

export const athletes: Athlete[] = [
  currentAthlete,
  {
    id: "A1002",
    name: "Priya Sharma",
    age: 13,
    region: "Maharashtra",
    sport: "Football",
    height_cm: 155,
    weight_kg: 45,
    aadhaarVerified: true,
    mediapipeVerified: true,
    badges: ["Rising Star", "Team Player"],
    xp: 2200,
    level: 11,
    aiScore: 92,
    rank: 2,
    posts: [
      {
        id: 3,
        text: "Scored 3 goals in practice today! Team chemistry is getting better every day ⚽",
        likes: 31,
        comments: 12,
        timestamp: "3 hours ago"
      }
    ]
  },
  {
    id: "A1003",
    name: "Rahul Verma",
    age: 17,
    region: "Haryana",
    sport: "Kabaddi",
    height_cm: 175,
    weight_kg: 68,
    aadhaarVerified: true,
    mediapipeVerified: true,
    badges: ["State Champion", "Power Player"],
    xp: 2800,
    level: 14,
    aiScore: 90,
    rank: 3,
    posts: []
  },
  {
    id: "A1004",
    name: "Simran Kaur",
    age: 16,
    region: "Punjab",
    sport: "Wrestling",
    height_cm: 162,
    weight_kg: 55,
    aadhaarVerified: false,
    mediapipeVerified: true,
    badges: ["Technique Master"],
    xp: 1900,
    level: 9,
    aiScore: 89,
    rank: 4,
    posts: []
  },
  {
    id: "A1005",
    name: "Ayaan Sheikh",
    age: 12,
    region: "UP",
    sport: "Athletics",
    height_cm: 145,
    weight_kg: 38,
    aadhaarVerified: true,
    mediapipeVerified: false,
    badges: ["Young Talent"],
    xp: 1500,
    level: 8,
    aiScore: 88,
    rank: 5,
    posts: []
  },
  {
    id: "A1006",
    name: "Neha Rao",
    age: 14,
    region: "Karnataka",
    sport: "Athletics",
    height_cm: 158,
    weight_kg: 48,
    aadhaarVerified: true,
    mediapipeVerified: true,
    badges: ["Consistent Performer"],
    xp: 1800,
    level: 9,
    aiScore: 86,
    rank: 6,
    posts: []
  }
];

export const tests: Test[] = [
  { id: "t1", name: "Height", type: "numeric", value_cm: 168, status: "validated" },
  { id: "t2", name: "Weight", type: "numeric", value_kg: 58, status: "validated" },
  { id: "t3", name: "Sit and Reach", type: "video", status: "validated", best: "22 cm", videoThumb: "thumb3.jpg", confidence: 0.94 },
  { id: "t4", name: "Standing Vertical Jump", type: "video", status: "validated", best: "42 cm", videoThumb: "thumb4.jpg", confidence: 0.96 },
  { id: "t5", name: "Standing Broad Jump", type: "video", status: "validated", best: "2.8 m", videoThumb: "thumb5.jpg", confidence: 0.91 },
  { id: "t6", name: "Medicine Ball Throw", type: "video", status: "validated", best: "7.5 m", videoThumb: "thumb6.jpg", confidence: 0.89 },
  { id: "t7", name: "30m Standing Start", type: "video", status: "validated", best: "4.2 s", videoThumb: "thumb7.jpg", confidence: 0.95 },
  { id: "t8", name: "4x10m Shuttle Run", type: "video", status: "validated", best: "9.8 s", videoThumb: "thumb8.jpg", confidence: 0.92 },
  { id: "t9", name: "Sit Ups", type: "video", status: "validated", best: "50 reps/min", videoThumb: "thumb9.jpg", confidence: 0.97 },
  { id: "t10", name: "Endurance Run", type: "video", status: "pending_analysis", best: "6:50", videoThumb: "thumb10.jpg" }
];

export const progressData: ProgressData = {
  monthly: [
    { month: "Apr", verticalJump: 38, situps: 40, shuttle: 10.8, medicine: 6.8, endurance: "7:05" },
    { month: "May", verticalJump: 40, situps: 44, shuttle: 10.6, medicine: 7.0, endurance: "6:58" },
    { month: "Jun", verticalJump: 42, situps: 48, shuttle: 10.5, medicine: 7.3, endurance: "6:50" },
    { month: "Jul", verticalJump: 44, situps: 50, shuttle: 10.2, medicine: 7.5, endurance: "6:45" }
  ],
  radarLatest: {
    speed: 9.8,
    agility: 8.9,
    endurance: 8.5,
    strength: 7.5,
    flexibility: 6.5,
    core: 7.0
  }
};

export const leaderboardData = [
  { rank: 1, name: "Arjun Singh", sport: "Athletics", age: 15, region: "Delhi", aiScore: 95 },
  { rank: 2, name: "Priya Sharma", sport: "Football", age: 13, region: "Maharashtra", aiScore: 92 },
  { rank: 3, name: "Rahul Verma", sport: "Kabaddi", age: 17, region: "Haryana", aiScore: 90 },
  { rank: 4, name: "Simran Kaur", sport: "Wrestling", age: 16, region: "Punjab", aiScore: 89 },
  { rank: 5, name: "Ayaan Sheikh", sport: "Athletics", age: 12, region: "UP", aiScore: 88 },
  { rank: 6, name: "Neha Rao", sport: "Athletics", age: 14, region: "Karnataka", aiScore: 86 },
  { rank: 7, name: "Vikram Patel", sport: "Swimming", age: 16, region: "Gujarat", aiScore: 85 },
  { rank: 8, name: "Ananya Reddy", sport: "Badminton", age: 15, region: "Telangana", aiScore: 84 },
  { rank: 9, name: "Kiran Kumar", sport: "Hockey", age: 18, region: "Odisha", aiScore: 83 },
  { rank: 10, name: "Meera Joshi", sport: "Tennis", age: 17, region: "Rajasthan", aiScore: 82 }
];

export const notifications = [
  {
    id: 1,
    title: "Monthly retest due in 5 days",
    message: "Complete your compulsory monthly retest by Oct 28, 2025",
    time: "2 hours ago",
    type: "warning",
    read: false
  },
  {
    id: 2,
    title: "New rank: #1 - Congratulations!",
    message: "You've moved up to rank #1 in Athletics U-16 category",
    time: "1 day ago",
    type: "success",
    read: false
  },
  {
    id: 3,
    title: "Video analysis complete",
    message: "Your Endurance Run test has been analyzed and validated",
    time: "2 days ago",
    type: "info",
    read: true
  },
  {
    id: 4,
    title: "Achievement unlocked!",
    message: "You've earned the 'Record Breaker' badge",
    time: "3 days ago",
    type: "success",
    read: true
  }
];