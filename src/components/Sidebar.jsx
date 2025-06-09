import React from 'react';
import {
  BiHome, BiTask, BiMessage, BiBell, BiMoon, BiSun,
  BiUser, BiCog, BiLogOut
} from 'react-icons/bi';
import '../styles/sidebar.css';

const menuItems = [
  { name: 'Home', icon: <BiHome />, path: '/' },
  { name: 'Dashboard Overview', icon: <BiHome />, path: '/restaurants' },
  { name: 'Labour Management', icon: <BiTask />, path: '/userManagement', badge: 32 },
  { name: 'Admin Roles & Permissions', icon: <BiUser />, path: '/rolesManagement', badge: 32 },
  { name: 'Inventory Management', icon: <BiTask />, path: '/inventoryManagement', badge: 32 },
  { name: 'Supplier Management', icon: <BiTask />, path: '/', badge: 32 },
  { name: 'Dish Management', icon: <BiTask />, path: '/dishManagement' },
  { name: 'Order Management', icon: <BiTask />, path: '/restaurants' },
  { name: 'Reports & Analytics', icon: <BiTask />, path: '/reports' },
  { name: 'Predict Orders', icon: <BiTask />, path: '/predictOrder'},
  { name: 'Settings', icon: <BiCog />, path: '/' },
  { name: 'Help & Support', icon: <BiBell />, path: '/' },
];

const Sidebar = ({ userName, isAuthenticated, onLogout, theme, toggleTheme }) => {
  return (
    <div className={`sidebar ${theme}`}>
      <div className="top-section">
        <div className="avatar-section">
          <img src="https://i.pravatar.cc/100?img=1" alt="avatar" className="avatar" />
          <div className="user-info">
            <span className="name">{isAuthenticated ? userName : 'Guest'}</span>
            <span className="role"> Admin</span>
          </div>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="menu">
        {menuItems.map((item, idx) => (
          <a href={item.path} className="menu-item" key={idx}>
            <span className="icon">{item.icon}</span>
            <span className="label">{item.name}</span>
            {item.badge && <span className="badge">{item.badge}</span>}
          </a>
        ))}
      </div>

      <div className="bottom-section">
        <div className="theme-toggle">
          <button onClick={() => toggleTheme('light')} className={theme === 'light' ? 'active' : ''}><BiSun /></button>
          <button onClick={() => toggleTheme('dark')} className={theme === 'dark' ? 'active' : ''}><BiMoon /></button>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <BiLogOut /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
