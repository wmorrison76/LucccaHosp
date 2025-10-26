import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const STATUS_COLORS = {
  PROPOSAL: "bg-cyan-500/30 text-cyan-200 ring-cyan-400/40",
  CONTRACT: "bg-emerald-500/30 text-emerald-200 ring-emerald-400/40",
  UPDATE: "bg-amber-500/30 text-amber-100 ring-amber-400/40",
  POPUP: "bg-fuchsia-500/30 text-fuchsia-100 ring-fuchsia-400/40",
  CHANGE: "bg-rose-500/30 text-rose-100 ring-rose-400/40"
};
function GlobalCalendarWidget({ max = 6 }) {
  const [events, setEvents] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const raw = localStorage.getItem("lu:events");
    if (!raw) {
      const demo = [
        { id: "e1", type: "BEO", number: "BEO-2025-104", status: "CONTRACT", covers: 120, startISO: new Date(Date.now() + 36e5).toISOString(), title: "Corporate Mixer" },
        { id: "e2", type: "REO", number: "REO-7781", status: "UPDATE", covers: 42, startISO: new Date(Date.now() + 864e5 * 2).toISOString(), title: "Chef’s Table" }
      ];
      localStorage.setItem("lu:events", JSON.stringify(demo));
      setEvents(demo);
    } else {
      try {
        setEvents(JSON.parse(raw));
      } catch {
      }
    }
    const onPush = (e) => {
      if (!e?.detail) return;
      setEvents((curr) => {
        const next = upsert(curr, e.detail);
        localStorage.setItem("lu:events", JSON.stringify(next));
        return next;
      });
    };
    window.addEventListener("echo-events-upsert", onPush);
    return () => window.removeEventListener("echo-events-upsert", onPush);
  }, []);
  const upcoming = reactExports.useMemo(() => {
    return [...events].sort((a, b) => new Date(a.startISO) - new Date(b.startISO)).slice(0, max);
  }, [events, max]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-2xl p-3 border border-white/12 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,.35),inset_0_0_0_1px_rgba(255,255,255,.04)]", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold", children: "Global Calendar" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          className: "text-xs px-2 h-7 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10",
          onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "calendar", title: "Global Calendar" } })),
          children: "Open"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
          lineNumber: 63,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2", children: [
      upcoming.map((ev) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "li",
        {
          className: "group p-2 rounded-xl border border-white/10 hover:bg-white/7 flex items-center gap-3 cursor-pointer",
          onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "beo", number: ev.number, title: ev.title } })),
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-[11px] px-2 py-0.5 rounded-full ring-1 ${STATUS_COLORS[ev.status] || "bg-white/10 text-white/80 ring-white/20"}`, children: ev.status }, void 0, false, {
              fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
              lineNumber: 75,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm truncate", children: ev.title || `${ev.type} ${ev.number}` }, void 0, false, {
                fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
                lineNumber: 79,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[11px] opacity-75", children: [
                fmtTime(ev.startISO),
                " • ",
                ev.type,
                " ",
                ev.number,
                " • ",
                ev.covers,
                " covers"
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
                lineNumber: 80,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
              lineNumber: 78,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[11px] opacity-70", children: shortDate(ev.startISO) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
              lineNumber: 84,
              columnNumber: 13
            }, this)
          ]
        },
        ev.id,
        true,
        {
          fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
          lineNumber: 71,
          columnNumber: 11
        },
        this
      )),
      upcoming.length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "text-sm opacity-70", children: "No upcoming events." }, void 0, false, {
        fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
        lineNumber: 87,
        columnNumber: 35
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.tsx",
    lineNumber: 60,
    columnNumber: 5
  }, this);
}
function upsert(list, item) {
  const i = list.findIndex((x) => x.id === item.id);
  if (i >= 0) {
    const next = [...list];
    next[i] = { ...next[i], ...item };
    return next;
  }
  return [...list, item];
}
function fmtTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}
function shortDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}
export {
  GlobalCalendarWidget as default
};
