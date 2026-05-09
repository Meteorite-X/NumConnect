import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar.jsx';
import Landing from './components/Landing.jsx';
import Login from './components/Login.jsx';
import Otp from './components/Otp.jsx';
import Setup from './components/Setup.jsx';
import Discover from './components/Discover.jsx';
import Schedule from './components/Schedule.jsx';
import Chat from './components/Chat.jsx';
import Premium from './components/Premium.jsx';
import Admin from './components/Admin.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('nc-theme') || 'light'; } catch { return 'light'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('nc-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:userId" element={<Chat />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
