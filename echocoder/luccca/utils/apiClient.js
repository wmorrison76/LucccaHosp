import { API_BASE_URL } from './constants';

export async function fetchSystemStatus() {
  try {
    const response = await fetch(`${API_BASE_URL}/system/status`);
    const data = await response.json();
    return data;
  } catch {
    return { system: 'LUCCCA Core System', status: 'Offline' };
  }
}
