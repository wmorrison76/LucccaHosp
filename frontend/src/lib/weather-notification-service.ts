export type WeatherAlert = { id?: string; title: string; message: string; severity?: 'info'|'watch'|'warning'|'emergency' };
type Listener = (a: WeatherAlert) => void;
const listeners = new Set<Listener>();
export const weatherNotificationService = {
  subscribe(cb: Listener){ listeners.add(cb); return () => listeners.delete(cb); },
  notify(alert: WeatherAlert){ for (const cb of listeners) cb(alert); },
  buildAlert(partial: Partial<WeatherAlert>): WeatherAlert {
    return { id: partial.id ?? String(Date.now()), title: partial.title ?? 'Weather Update', message: partial.message ?? '', severity: partial.severity ?? 'info' };
  },
};
export default weatherNotificationService;
