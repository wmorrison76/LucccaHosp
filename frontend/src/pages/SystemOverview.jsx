import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import ModuleOverview from './ModuleOverview';
import Logs from './Logs';
import Settings from './Settings';
import Login from './Login';
import UserSettings from './UserSettings';
import EchoControl from './EchoControl';
import ArgusMonitor from './ArgusMonitor';
// Avoid circular import - SystemOverview is the current component
import { PrivateRoute } from './components/PrivateRoute';
import MainLayout from './layout/MainLayout';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/modules" element={<ModuleOverview />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/user" element={<UserSettings />} />
                  <Route path="/echo" element={<EchoControl />} />
                  <Route path="/argus" element={<ArgusMonitor />} />
                  <Route path="/overview" element={<SystemOverview />} />
                </Routes>
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
