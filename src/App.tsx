import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyTests from './pages/MyTests';
import RecordTest from './pages/RecordTest';
import Progress from './pages/Progress';
import Leaderboard from './pages/Leaderboard';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import VideoAnalysis from './pages/VideoAnalysis';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tests" element={<MyTests />} />
          <Route path="/record/:testId?" element={<RecordTest />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analysis/:testId" element={<VideoAnalysis />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;