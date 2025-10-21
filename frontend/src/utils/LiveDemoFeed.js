// A tiny demo data bus that "streams" KPI updates to the dashboard.
// Emits: "kpi-tick" event with { covers, sales, laborPct, outletHealth, scheduledToday, hoursToday }

let timer = null;

export function startLiveDemoFeed({ baseSales = 12000 } = {}) {
  stopLiveDemoFeed();
  let t = 0;

  const emit = (payload) => {
    window.dispatchEvent(new CustomEvent("kpi-tick", { detail: payload }));
  };

  const rand = (min, max) => Math.random() * (max - min) + min;

  timer = setInterval(() => {
    t += 1;

    // Simulated covers climb smoothly with noise
    const covers = Math.max(0, Math.round(80 + 40 * Math.sin(t/8) + rand(-6, 10)));

    // Sales drift up as covers rise; add a little burst noise
    const sales = Math.round(baseSales * (0.7 + 0.3 * Math.sin(t/9)) + rand(-250, 400));

    // Outlet health: 6–10 green, 0–3 red, move slightly
    const greens = Math.min(10, Math.max(5, Math.round(8 + Math.sin(t/6) + rand(-1, 1))));
    const reds   = Math.max(0, 10 - greens);

    // Labor % reacts lightly to sales fluctuation
    const laborPct = Math.max(18, Math.min(36, +(26 + 4 * Math.cos(t/7) + rand(-1.5, 1.5)).toFixed(1)));

    // Pull "today" from scheduler localStorage if present; else demo
    let scheduledToday = [];
    let hoursToday = 0;

    try {
      // Try to find the latest 'lu' week saved (your store uses keys like "1-YYYY-MM-DD" or "0-...").
      const keys = Object.keys(localStorage).filter(k => k.startsWith("week:") || k.match(/^\d-\d{4}-\d{2}-\d{2}$/));
      const latestKey = keys.sort().pop();
      const data = latestKey ? JSON.parse(localStorage.getItem(latestKey) || "{}") : {};
      const todayIdx = new Date().getDay(); // 0..6; OK even if your week starts Monday—this is demo
      const parseHM = (hm) => {
        const m = String(hm||"").match(/^(\d{1,2}):(\d{2})$/);
        if (!m) return null;
        return (+m[1])*60 + (+m[2]);
      };
      for (const [empId, row] of Object.entries(data)) {
        if (!Array.isArray(row)) continue;
        const cell = row[todayIdx];
        if (!cell) continue;
        const st = parseHM(cell.start), en = parseHM(cell.end);
        if (st!=null && en!=null) {
          const mins = (en - st) - (cell.breakOut && cell.breakIn ? (parseHM(cell.breakIn) - parseHM(cell.breakOut)) : 0);
          hoursToday += Math.max(0, mins)/60;
          scheduledToday.push({ name: (data[empId]?.name)||empId, position: cell.position||"" });
        }
      }
    } catch {}

    if (scheduledToday.length === 0) {
      scheduledToday = [
        { name: "Maya R.", position: "Line Cook" },
        { name: "Sam K.",  position: "Server"    },
        { name: "Jules P.",position: "Bartender" },
      ];
      hoursToday = 21.5;
    }

    emit({
      covers,
      sales,
      laborPct,
      outletHealth: { green: greens, red: reds },
      scheduledToday,
      hoursToday: +hoursToday.toFixed(2),
    });
  }, 1500);
}

export function stopLiveDemoFeed() {
  if (timer) clearInterval(timer);
  timer = null;
}
