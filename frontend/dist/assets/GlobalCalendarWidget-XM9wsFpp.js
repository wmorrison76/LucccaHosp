import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const C = { PROPOSAL: "bg-cyan-500/30 text-cyan-200 ring-cyan-400/40", CONTRACT: "bg-emerald-500/30 text-emerald-200 ring-emerald-400/40", UPDATE: "bg-amber-500/30 text-amber-100 ring-amber-400/40", POPUP: "bg-fuchsia-500/30 text-fuchsia-100 ring-fuchsia-400/40", CHANGE: "bg-rose-500/30 text-rose-100 ring-rose-400/40" };
function GlobalCalendarWidget({ max = 6 }) {
  const [events, setEvents] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const r = localStorage.getItem("lu:events");
    if (!r) {
      const d = [{ id: "e1", type: "BEO", number: "BEO-2025-104", status: "CONTRACT", covers: 120, startISO: new Date(Date.now() + 36e5).toISOString(), title: "Corporate Mixer" }];
      localStorage.setItem("lu:events", JSON.stringify(d));
      setEvents(d);
    } else {
      try {
        setEvents(JSON.parse(r));
      } catch {
      }
    }
    const up = (e) => {
      if (!e?.detail) return;
      setEvents((cur) => {
        const i = cur.findIndex((x) => x.id === e.detail.id);
        const n = i >= 0 ? cur.map((x, ix) => ix === i ? { ...x, ...e.detail } : x) : [...cur, e.detail];
        localStorage.setItem("lu:events", JSON.stringify(n));
        return n;
      });
    };
    window.addEventListener("echo-events-upsert", up);
    return () => window.removeEventListener("echo-events-upsert", up);
  }, []);
  const list = reactExports.useMemo(() => [...events].sort((a, b) => new Date(a.startISO) - new Date(b.startISO)).slice(0, max), [events, max]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-2xl p-3 border border-white/12 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,.35),inset_0_0_0_1px_rgba(255,255,255,.04)]", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold", children: "Global Calendar" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
        lineNumber: 3,
        columnNumber: 1102
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "text-xs px-2 h-7 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10", onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "calendar", title: "Global Calendar" } })), children: "Open" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
        lineNumber: 3,
        columnNumber: 1154
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
      lineNumber: 3,
      columnNumber: 1046
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-2", children: [
      list.map((ev) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "group p-2 rounded-xl border border-white/10 hover:bg-white/7 flex items-center gap-3 cursor-pointer", onClick: () => window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "beo", number: ev.number, title: ev.title } })), children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: `text-[11px] px-2 py-0.5 rounded-full ring-1 ${C[ev.status] || "bg-white/10 text-white/80 ring-white/20"}`, children: ev.status }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
          lineNumber: 3,
          columnNumber: 1675
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm truncate", children: ev.title || `${ev.type} ${ev.number}` }, void 0, false, {
            fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
            lineNumber: 3,
            columnNumber: 1848
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[11px] opacity-75", children: [
            new Date(ev.startISO).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            " • ",
            ev.type,
            " ",
            ev.number,
            " • ",
            ev.covers,
            " covers"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
            lineNumber: 3,
            columnNumber: 1925
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
          lineNumber: 3,
          columnNumber: 1816
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[11px] opacity-70", children: new Date(ev.startISO).toLocaleDateString([], { month: "short", day: "numeric" }) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
          lineNumber: 3,
          columnNumber: 2102
        }, this)
      ] }, ev.id, true, {
        fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
        lineNumber: 3,
        columnNumber: 1429
      }, this)),
      list.length === 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "text-sm opacity-70", children: "No upcoming events." }, void 0, false, {
        fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
        lineNumber: 3,
        columnNumber: 2252
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
      lineNumber: 3,
      columnNumber: 1388
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/widgets/GlobalCalendarWidget.jsx",
    lineNumber: 3,
    columnNumber: 904
  }, this);
}
export {
  GlobalCalendarWidget as default
};
