
import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import type { HealthLog } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [healthLogs, setHealthLogs] = useState<HealthLog[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const addHealthLog = (log: HealthLog) => {
    setHealthLogs(prevLogs => [...prevLogs, log]);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard healthLogs={healthLogs} addHealthLog={addHealthLog} />;
};

export default App;
