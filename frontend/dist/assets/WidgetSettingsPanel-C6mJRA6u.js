const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/About-CVtcb0C1.js","assets/index-DfBvRGLH.js","assets/Appearance-Bu68xAYj.js","assets/General-CR8SxnI3.js","assets/theme-BuykcvzJ.js","assets/Whiteboar-DasZvYP6.js","assets/Widgets-he_QLpKp.js","assets/ZAROAdminPanel-ChNNAJU_.js","assets/settings-CL5KYzJi.js","assets/GlobalCalendarWidget-XM9wsFpp.js","assets/GlobalCalendarWidget-C4zHni_J.js","assets/StyleControllerWidget-D83kEGu3.js","assets/registry-BXqy4OK7.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxDevRuntimeExports, _ as __vitePreload, R as React } from "./index-DfBvRGLH.js";
import { i as __vite_glob_0_12, j as __vite_glob_0_11, k as __vite_glob_0_10, l as __vite_glob_0_9, m as __vite_glob_0_8, n as __vite_glob_0_4, o as __vite_glob_0_2, p as __vite_glob_0_1, q as __vite_glob_0_0 } from "./Echo_Recipe_Pro-D3BCmeiS.js";
import { c as __vite_glob_0_7, b as __vite_glob_0_6, _ as __vite_glob_0_5, a as __vite_glob_0_3 } from "./Echo_R-DJeORrcm.js";
import { d as setupThemeBoot } from "./theme-BuykcvzJ.js";
import { C as ChevronDown } from "./chevron-down-BMbSUoYr.js";
import { P as Paintbrush } from "./paintbrush-B7lPf6YF.js";
import { M as Monitor } from "./monitor-PiI9AQOi.js";
import { B as Boxes } from "./boxes-C7e5ANuZ.js";
import { B as Bell } from "./bell-DGiS29DN.js";
import { U as User, C as Cog, I as Info } from "./user-DLsVeuQj.js";
import "./settings-CL5KYzJi.js";
const AVATAR_KEY = "lu:echo:avatar:v1";
const SECTION_KEY = "lu:settings:section:v1";
function useAvatars() {
  return reactExports.useMemo(() => {
    const found = /* @__PURE__ */ Object.assign({ "../assets/Echo-Ai.png": __vite_glob_0_0, "../assets/Echo.png": __vite_glob_0_1, "../assets/Echo_A.png": __vite_glob_0_2, "../assets/Echo_B.png": __vite_glob_0_3, "../assets/Echo_Canvas.png": __vite_glob_0_4, "../assets/Echo_F.png": __vite_glob_0_5, "../assets/Echo_M.png": __vite_glob_0_6, "../assets/Echo_R.png": __vite_glob_0_7, "../assets/Echo_Recipe_Pro.png": __vite_glob_0_8, "../assets/Large/Echo-Ai.png": __vite_glob_0_9, "../assets/Large/Echo.png": __vite_glob_0_10, "../assets/Large/Echo_Canvas.png": __vite_glob_0_11, "../assets/Large/Echo_Recipe_Pro.png": __vite_glob_0_12 });
    let items = Object.entries(found).map(([path, url]) => ({ path, url }));
    if (!items.length) return items;
    const order = ["_F", "_M", "_B", "_R", "_A", "ECHO.PNG"];
    items.sort((a, b) => {
      const A = (a.path.split("/").pop() || "").toUpperCase();
      const B = (b.path.split("/").pop() || "").toUpperCase();
      const ia = order.findIndex((t) => A.includes(t));
      const ib = order.findIndex((t) => B.includes(t));
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    const seen = /* @__PURE__ */ new Set();
    items = items.filter((x) => !seen.has(x.url) && seen.add(x.url));
    return items;
  }, []);
}
const SECTION_MODULES = /* @__PURE__ */ Object.assign({ "./settings/sections/About.jsx": () => __vitePreload(() => import("./About-CVtcb0C1.js"), true ? __vite__mapDeps([0,1]) : void 0), "./settings/sections/Appearance.jsx": () => __vitePreload(() => import("./Appearance-Bu68xAYj.js"), true ? __vite__mapDeps([2,1]) : void 0), "./settings/sections/General.jsx": () => __vitePreload(() => import("./General-CR8SxnI3.js"), true ? __vite__mapDeps([3,1,4]) : void 0), "./settings/sections/Whiteboar.jsx": () => __vitePreload(() => import("./Whiteboar-DasZvYP6.js"), true ? __vite__mapDeps([5,1]) : void 0), "./settings/sections/Widgets.jsx": () => __vitePreload(() => import("./Widgets-he_QLpKp.js"), true ? __vite__mapDeps([6,1]) : void 0), "./settings/sections/ZAROAdminPanel.jsx": () => __vitePreload(() => import("./ZAROAdminPanel-ChNNAJU_.js"), true ? __vite__mapDeps([7,1,8]) : void 0) });
const SECTIONS = {
  appearance: { label: "Appearance", icon: Paintbrush, loader: SECTION_MODULES["./settings/sections/Appearance.jsx"] },
  whiteboard: { label: "Whiteboard", icon: Monitor, loader: SECTION_MODULES["./settings/sections/Whiteboard.jsx"] },
  widgets: { label: "Widgets", icon: Boxes, loader: SECTION_MODULES["./settings/sections/Widgets.jsx"] },
  notifications: { label: "Notifications", icon: Bell, loader: SECTION_MODULES["./settings/sections/Notifications.jsx"] },
  av: { label: "Audio & Video", icon: Monitor, loader: SECTION_MODULES["./settings/sections/AV.jsx"] },
  accounts: { label: "Accounts", icon: User, loader: SECTION_MODULES["./settings/sections/Accounts.jsx"] },
  general: { label: "General", icon: Cog, loader: SECTION_MODULES["./settings/sections/General.jsx"] },
  about: { label: "About", icon: Info, loader: SECTION_MODULES["./settings/sections/About.jsx"] }
};
const Lazy = Object.fromEntries(
  Object.entries(SECTIONS).map(([k, v]) => [
    k,
    React.lazy(v.loader ?? (async () => ({ default: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-70", children: "Coming soon…" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
      lineNumber: 49,
      columnNumber: 53
    }, void 0) })))
  ])
);
const WIDGET_MODULES = /* @__PURE__ */ Object.assign({ "./widgets/GlobalCalendarWidget.jsx": () => __vitePreload(() => import("./GlobalCalendarWidget-XM9wsFpp.js"), true ? __vite__mapDeps([9,1]) : void 0).then((m) => m["default"]), "./widgets/GlobalCalendarWidget.tsx": () => __vitePreload(() => import("./GlobalCalendarWidget-C4zHni_J.js"), true ? __vite__mapDeps([10,1]) : void 0).then((m) => m["default"]), "./widgets/StyleControllerWidget.jsx": () => __vitePreload(() => import("./StyleControllerWidget-D83kEGu3.js"), true ? __vite__mapDeps([11,1]) : void 0).then((m) => m["default"]), "./widgets/registry.js": () => __vitePreload(() => import("./registry-BXqy4OK7.js"), true ? __vite__mapDeps([12,1]) : void 0).then((m) => m["default"]) });
function WidgetSettingsPanel() {
  const avatars = useAvatars();
  const [avatar, setAvatar] = reactExports.useState(() => localStorage.getItem(AVATAR_KEY) || avatars[0]?.url || "");
  const [section, setSection] = reactExports.useState(() => localStorage.getItem(SECTION_KEY) || "appearance");
  reactExports.useEffect(() => {
    setupThemeBoot();
  }, []);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem(AVATAR_KEY, avatar);
    } catch {
    }
    window.dispatchEvent(new CustomEvent("echo-avatar-changed", { detail: { url: avatar } }));
  }, [avatar]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem(SECTION_KEY, section);
    } catch {
    }
  }, [section]);
  const widgets = reactExports.useMemo(() => Object.keys(WIDGET_MODULES).map((p) => ({ id: p, name: p.split("/").pop().replace(/\.(jsx?|tsx?)$/, "") })).sort((a, b) => a.name.localeCompare(b.name)), []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "h-full w-full overflow-hidden rounded-2xl border border-white/10 relative",
      style: {
        background: "linear-gradient(180deg, rgba(10,14,22,0.88), rgba(10,14,22,0.92))",
        boxShadow: "0 30px 100px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.045)"
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none", style: { backdropFilter: "blur(6px)" } }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
          lineNumber: 83,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative grid h-full", style: { gridTemplateColumns: "280px 1fr" }, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("aside", { className: "h-full overflow-auto border-r border-white/10 p-3", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AvatarHeader, { avatars, value: avatar, onChange: setAvatar }, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 87,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Nav, { section, setSection }, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 88,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 86,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "h-full overflow-auto p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-70", children: "Loading…" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 93,
            columnNumber: 31
          }, this), children: [
            section === "appearance" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lazy.appearance, {}, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 94,
              columnNumber: 44
            }, this),
            section === "whiteboard" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lazy.whiteboard, {}, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 95,
              columnNumber: 44
            }, this),
            section === "widgets" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lazy.widgets, { widgets }, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 96,
              columnNumber: 44
            }, this),
            section === "notifications" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lazy.notifications, {}, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 97,
              columnNumber: 44
            }, this),
            section === "av" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lazy.av, {}, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 98,
              columnNumber: 44
            }, this),
            section === "accounts" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lazy.accounts, {}, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 99,
              columnNumber: 44
            }, this),
            section === "general" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lazy.general, {}, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 100,
              columnNumber: 44
            }, this),
            section === "about" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lazy.about, {}, void 0, false, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 101,
              columnNumber: 44
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 93,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 92,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
          lineNumber: 84,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
      lineNumber: 76,
      columnNumber: 5
    },
    this
  );
}
function AvatarHeader({ avatars, value, onChange }) {
  const [open, setOpen] = reactExports.useState(false);
  const pop = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onDoc = (e) => {
      if (open && pop.current && !pop.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-2xl p-3 mb-3 border border-white/10 bg-gradient-to-b from-white/6 to-transparent", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 relative", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: "relative h-14 w-14 rounded-2xl ring-1 ring-white/20 overflow-hidden shadow",
        onClick: () => setOpen((v) => !v),
        title: "Change avatar",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: value, alt: "Avatar", className: "h-full w-full object-cover" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 128,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute -bottom-2 right-1 h-6 w-6 rounded-full grid place-items-center\n                           bg-black/60 ring-1 ring-white/30", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { size: 14 }, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 131,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 129,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
        lineNumber: 123,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold leading-tight", children: "Echo" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
        lineNumber: 135,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs opacity-70", children: "Choose your profile avatar" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
        lineNumber: 136,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
      lineNumber: 134,
      columnNumber: 9
    }, this),
    open && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        ref: pop,
        className: "absolute z-50 top-16 left-0 rounded-xl border border-white/12 p-2",
        style: {
          background: "rgba(15,20,28,.96)",
          boxShadow: "0 18px 60px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.04)"
        },
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "grid gap-2",
              style: { gridTemplateColumns: "repeat(2,64px)", maxHeight: 148, overflowY: "auto" },
              children: avatars.map((a) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  className: `rounded-lg ring-1 overflow-hidden ${value === a.url ? "ring-cyan-300/60" : "ring-white/12 hover:ring-white/30"}`,
                  onClick: () => {
                    onChange(a.url);
                    setOpen(false);
                  },
                  title: a.path.split("/").pop(),
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: a.url, alt: "", className: "h-16 w-16 object-cover" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
                    lineNumber: 156,
                    columnNumber: 19
                  }, this)
                },
                a.path,
                false,
                {
                  fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
                  lineNumber: 151,
                  columnNumber: 17
                },
                this
              ))
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 148,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 mt-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "inline-flex items-center gap-2 h-8 px-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 cursor-pointer", children: [
              "Upload…",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === "string") onChange(reader.result);
                      setOpen(false);
                    };
                    reader.readAsDataURL(f);
                  }
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
                  lineNumber: 165,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
              lineNumber: 163,
              columnNumber: 15
            }, this),
            value?.startsWith?.("data:") && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                className: "h-8 px-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10",
                onClick: () => onChange(avatars[0]?.url || value),
                children: "Remove upload"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
                lineNumber: 174,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 162,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: `.grid::-webkit-scrollbar{display:none}` }, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
            lineNumber: 181,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
        lineNumber: 140,
        columnNumber: 11
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
    lineNumber: 122,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
    lineNumber: 121,
    columnNumber: 5
  }, this);
}
function Nav({ section, setSection }) {
  const items = [
    ["appearance", Paintbrush, "Appearance"],
    ["whiteboard", Monitor, "Whiteboard"],
    ["widgets", Boxes, "Widgets"],
    ["notifications", Bell, "Notifications"],
    ["av", Monitor, "Audio & Video"],
    ["accounts", User, "Accounts"],
    ["general", Cog, "General"],
    ["about", Info, "About"]
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-1", children: items.map(([id, Icon, label]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      onClick: () => setSection(id),
      className: `w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left
                        ${section === id ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/5"}`,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "h-7 w-7 grid place-items-center rounded-lg bg-white/8 ring-1 ring-white/10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 16 }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
          lineNumber: 208,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
          lineNumber: 207,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[15px]", children: label }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
          lineNumber: 210,
          columnNumber: 13
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
      lineNumber: 204,
      columnNumber: 11
    },
    this
  ) }, id, false, {
    fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
    lineNumber: 203,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/WidgetSettingsPanel.jsx",
    lineNumber: 201,
    columnNumber: 5
  }, this);
}
const style = document.createElement("style");
style.innerHTML = `
.settings-input{display:block;width:100%;border-radius:10px;border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.06); color:#e8f7ff; padding:.55rem .7rem;}
.settings-switch{appearance:none;width:36px;height:20px;border-radius:999px;background:rgba(255,255,255,.2);
  position:relative;outline:none;border:1px solid rgba(255,255,255,.12)}
.settings-switch:checked{background:rgba(22,224,255,.55)}
.settings-switch::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;background:white;border-radius:999px;transition:transform .18s ease}
.settings-switch:checked::after{transform:translateX(16px)}
`;
document.head.appendChild(style);
export {
  WidgetSettingsPanel as default
};
