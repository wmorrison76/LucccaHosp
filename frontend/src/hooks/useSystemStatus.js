import { useState, useEffect } from 'react';

export function useSystemStatus() {
  const [status, setStatus] = useState({
    system: 'LUCCCA',
    status: 'online',
    uptime: 0,
    health: 'good'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(prev => ({
        ...prev,
        uptime: prev.uptime + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return status;
}

export default useSystemStatus;
