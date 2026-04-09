import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './components/ThemeProvider'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Analytics from './pages/Analytics/Analytics'
import Calendar from './pages/Calendar/Calendar'
import Tasks from './pages/Tasks/Tasks'
import Habits from './pages/Habits/Habits'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('focusflow_token');
  });

  const handleLogin = (token) => {
    localStorage.setItem('focusflow_token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('focusflow_token');
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="focusflow-theme">
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/calendar" 
            element={isAuthenticated ? <Calendar onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/tasks" 
            element={isAuthenticated ? <Tasks onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/habits" 
            element={isAuthenticated ? <Habits onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/analytics" 
            element={isAuthenticated ? <Analytics onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}

export default App
