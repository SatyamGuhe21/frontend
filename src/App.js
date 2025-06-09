import './App.css';
import { RouterProvider, createBrowserRouter, Navigate  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddTask from './Task/AddTask';
import CompletedTask from './Task/CompletedTask';
import Sidebar from './components/Sidebar';
import Register from './components/Register';
import Login from './components/Login';
import DishList from './Dish/DishList';
import ChefList from './Chef/ChefList';
import TaskList from './Task/TaskList';
import UserList from './User/UserList';
import LabourList from './Labour/LabourList';
import RolesManagement from './User/RolesManagement';
import InventoryList from './Inventory/InventoryList';
import Restaurant from './Task/Restaurants';
import TablePage from './Task/TablePage';
import Report from "./components/Report";
import Home from './HomePage/Home';
import IframePage from './HomePage/IframePage';
import PredictOrder from './components/PredictOrder';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserName(decodedToken.name);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (mode) => {
    setTheme(mode);
    localStorage.setItem('theme', mode);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserName('');
  };

  const route = createBrowserRouter([
    { path: '/', element: <IframePage/> },
    { path: '/userManagement', element: <LabourList /> },
    { path: '/rolesManagement', element: <RolesManagement /> },
    { path: '/inventoryManagement', element: <InventoryList /> },
    { path: '/table/:id', element: <TablePage /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/allusers', element: <UserList /> },
    { path: '/dishManagement', element: <DishList /> },
    { path: '/allchef', element: <ChefList /> },
    { path: '/alltask', element: <TaskList /> },
    { path: '/addtask', element: <AddTask /> },
    { path: '/completedtask', element: <CompletedTask /> },
    { path: '/restaurants', element: <Restaurant /> },
    { path:'/reports', element:<Report/> },
    { path:'/predictOrder', element:<PredictOrder/> },
  ]);

  return (
    <div className={`App ${theme}`}>
      <Sidebar
        userName={userName}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="dashboard--content">
        <RouterProvider router={route} />
      </div>

      <div className="header">
        <div className="header-content">
          {isAuthenticated ? (
            <div className="user-info">
              <span>Hello, {userName}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={() => window.location.href = '/login'}>Login</button>
              <button className="register-btn" onClick={() => window.location.href = '/register'}>Register</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
