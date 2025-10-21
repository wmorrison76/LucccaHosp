import { API_BASE_URL } from './constants';

export async function fetchEchoStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/echo/status`);
    const data = await response.json();
    return data.message === 'Echo AI Core Operational.' ? 'online' : 'offline';
  } catch {
    return 'offline';
  }
}
