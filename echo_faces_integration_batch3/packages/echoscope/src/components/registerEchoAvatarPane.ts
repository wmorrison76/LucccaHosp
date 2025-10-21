/**
* LUCCCA | EF Integration
* File: <absolute path from repo root>
* Created: 2025-07-27 by AI
* Depends On: EchoAvatarPanel, PaneRegistry, telemetry bus
* Exposes: Telemetry, Playwright test
* ADR: docs/adr/ADR-echo-avatars.md
*/

import { EchoAvatarPanel } from '../panes/EchoAvatar/EchoAvatarPanel';
import { PaneRegistry } from './PaneRegistry';

/**
 * Register EchoAvatarPanel into the Fluid Shell PaneRegistry.
 */
export const registerEchoAvatarPane = () => {
  PaneRegistry.register({
    id: 'echo-avatar',
    component: EchoAvatarPanel,
    title: 'Echo Avatar',
    icon: 'UserCircle', // hypothetical lucide-react icon
  });
};
