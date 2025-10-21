import { getSystemVersion } from '../utils/versionCheck.js';

export function getSystemHealth(req, res) {
  res.json({
    system: 'LUCCCA Core System',
    status: 'Operational',
    version: getSystemVersion(),
  });
}
