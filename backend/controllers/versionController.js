import { getSystemVersion } from '../utils/versionCheck.js';

export function getVersion(req, res) {
  res.json(getSystemVersion());
}
