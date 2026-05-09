import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/',          label: 'Нүүр' },
  { to: '/login',     label: 'Нэвтрэх' },
  { to: '/otp',       label: 'OTP' },
  { to: '/setup',     label: 'Профайл' },
  { to: '/discover',  label: 'Discover' },
  { to: '/schedule',  label: 'Хуваарь' },
  { to: '/chat',      label: 'Чат' },
  { to: '/premium',   label: 'Premium' },
  { to: '/admin',     label: 'Admin' }
];

export default function NavBar({ theme, toggleTheme }) {
  return (
    <div className="nav-bar">
      {TABS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => 'nt' + (isActive ? ' on' : '')}
        >
          {label}
        </NavLink>
      ))}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        title="Харанхуй/цайвар"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
