const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/About-CVtcb0C1.js","assets/index-DfBvRGLH.js","assets/Appearance-Bu68xAYj.js","assets/General-CR8SxnI3.js","assets/theme-BuykcvzJ.js","assets/Whiteboar-DasZvYP6.js","assets/Widgets-he_QLpKp.js","assets/ZAROAdminPanel-ChNNAJU_.js","assets/settings-CL5KYzJi.js","assets/GlobalCalendarWidget-XM9wsFpp.js","assets/GlobalCalendarWidget-C4zHni_J.js","assets/StyleControllerWidget-D83kEGu3.js","assets/registry-BXqy4OK7.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxDevRuntimeExports, _ as __vitePreload, R as React } from "./index-DfBvRGLH.js";
import { _ as __vite_glob_0_12, a as __vite_glob_0_11, b as __vite_glob_0_10, c as __vite_glob_0_9, d as __vite_glob_0_8, e as __vite_glob_0_4, f as __vite_glob_0_2, g as __vite_glob_0_1, h as __vite_glob_0_0 } from "./Echo_Recipe_Pro-D3BCmeiS.js";
import { d as __vite_glob_0_7, e as __vite_glob_0_6, f as __vite_glob_0_5, g as __vite_glob_0_3 } from "./Echo_R-DJeORrcm.js";
import { C as Cog, U as User, I as Info } from "./user-DLsVeuQj.js";
import { P as Paintbrush } from "./paintbrush-B7lPf6YF.js";
import { M as Monitor } from "./monitor-PiI9AQOi.js";
import { B as Boxes } from "./boxes-C7e5ANuZ.js";
import { B as Bell } from "./bell-DGiS29DN.js";
import { c as createLucideIcon } from "./settings-CL5KYzJi.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "10", r: "8", key: "1gshiw" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 22h10", key: "10w4w3" }],
  ["path", { d: "M12 22v-4", key: "1utk9m" }]
];
const Webcam = createLucideIcon("webcam", __iconNode);
const AVATAR_KEY = "lu:echo:avatar:v1";
const SECTION_KEY = "lu:settings:section:v1";
function useAvatars() {
  return reactExports.useMemo(() => {
    const found = /* @__PURE__ */ Object.assign({ "../assets/Echo-Ai.png": __vite_glob_0_0, "../assets/Echo.png": __vite_glob_0_1, "../assets/Echo_A.png": __vite_glob_0_2, "../assets/Echo_B.png": __vite_glob_0_3, "../assets/Echo_Canvas.png": __vite_glob_0_4, "../assets/Echo_F.png": __vite_glob_0_5, "../assets/Echo_M.png": __vite_glob_0_6, "../assets/Echo_R.png": __vite_glob_0_7, "../assets/Echo_Recipe_Pro.png": __vite_glob_0_8, "../assets/Large/Echo-Ai.png": __vite_glob_0_9, "../assets/Large/Echo.png": __vite_glob_0_10, "../assets/Large/Echo_Canvas.png": __vite_glob_0_11, "../assets/Large/Echo_Recipe_Pro.png": __vite_glob_0_12 });
    const items = Object.entries(found).map(([path, mod]) => ({ path, url: mod.default }));
    const order = ["_F", "_M", "_B", "_R"];
    items.sort((a, b) => {
      const ai = order.findIndex((t) => a.path.includes(t));
      const bi = order.findIndex((t) => b.path.includes(t));
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
    });
    return items;
  }, []);
}
const SECTION_MODULES = /* @__PURE__ */ Object.assign({ "./settings/sections/About.jsx": () => __vitePreload(() => import("./About-CVtcb0C1.js"), true ? __vite__mapDeps([0,1]) : void 0), "./settings/sections/Appearance.jsx": () => __vitePreload(() => import("./Appearance-Bu68xAYj.js"), true ? __vite__mapDeps([2,1]) : void 0), "./settings/sections/General.jsx": () => __vitePreload(() => import("./General-CR8SxnI3.js"), true ? __vite__mapDeps([3,1,4]) : void 0), "./settings/sections/Whiteboar.jsx": () => __vitePreload(() => import("./Whiteboar-DasZvYP6.js"), true ? __vite__mapDeps([5,1]) : void 0), "./settings/sections/Widgets.jsx": () => __vitePreload(() => import("./Widgets-he_QLpKp.js"), true ? __vite__mapDeps([6,1]) : void 0), "./settings/sections/ZAROAdminPanel.jsx": () => __vitePreload(() => import("./ZAROAdminPanel-ChNNAJU_.js"), true ? __vite__mapDeps([7,1,8]) : void 0) });
const SECTIONS = {
  general: { label: "General", icon: Cog, loader: SECTION_MODULES["./settings/sections/General.jsx"] },
  appearance: { label: "Appearance", icon: Paintbrush, loader: SECTION_MODULES["./settings/sections/Appearance.jsx"] },
  whiteboard: { label: "Whiteboard", icon: Monitor, loader: SECTION_MODULES["./settings/sections/Whiteboard.jsx"] },
  widgets: { label: "Widgets", icon: Boxes, loader: SECTION_MODULES["./settings/sections/Widgets.jsx"] },
  notifications: { label: "Notifications", icon: Bell, loader: SECTION_MODULES["./settings/sections/Notifications.jsx"] },
  av: { label: "Audio & Video", icon: Webcam, loader: SECTION_MODULES["./settings/sections/AV.jsx"] },
  accounts: { label: "Accounts", icon: User, loader: SECTION_MODULES["./settings/sections/Accounts.jsx"] },
  about: { label: "About", icon: Info, loader: SECTION_MODULES["./settings/sections/About.jsx"] }
};
const LazySection = Object.fromEntries(
  Object.entries(SECTIONS).map(([k, v]) => [k, React.lazy(v.loader ?? (async () => ({ default: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-75", children: "Coming soon…" }, void 0, false, {
    fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
    lineNumber: 50,
    columnNumber: 99
  }, void 0) })))])
);
const WIDGET_MODULES = /* @__PURE__ */ Object.assign({ "./widgets/GlobalCalendarWidget.jsx": () => __vitePreload(() => import("./GlobalCalendarWidget-XM9wsFpp.js"), true ? __vite__mapDeps([9,1]) : void 0).then((m) => m["default"]), "./widgets/GlobalCalendarWidget.tsx": () => __vitePreload(() => import("./GlobalCalendarWidget-C4zHni_J.js"), true ? __vite__mapDeps([10,1]) : void 0).then((m) => m["default"]), "./widgets/StyleControllerWidget.jsx": () => __vitePreload(() => import("./StyleControllerWidget-D83kEGu3.js"), true ? __vite__mapDeps([11,1]) : void 0).then((m) => m["default"]), "./widgets/registry.js": () => __vitePreload(() => import("./registry-BXqy4OK7.js"), true ? __vite__mapDeps([12,1]) : void 0).then((m) => m["default"]) });
function WidgetSettingsPanel() {
  const avatars = useAvatars();
  const [currentAvatar, setCurrentAvatar] = reactExports.useState(
    () => localStorage.getItem(AVATAR_KEY) || (avatars[0]?.url ?? "")
  );
  const [section, setSection] = reactExports.useState(() => localStorage.getItem(SECTION_KEY) || "general");
  reactExports.useEffect(() => {
    try {
      localStorage.setItem(AVATAR_KEY, currentAvatar);
    } catch {
    }
    window.dispatchEvent(new CustomEvent("echo-avatar-changed", { detail: { url: currentAvatar } }));
  }, [currentAvatar]);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem(SECTION_KEY, section);
    } catch {
    }
  }, [section]);
  const widgets = reactExports.useMemo(() => {
    return Object.keys(WIDGET_MODULES).map((path) => ({ id: path, name: path.split("/").pop().replace(/\.(jsx?|tsx?)$/, "") })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(12,14,18,0.6)] shadow-[0_0_0_1px_rgba(255,255,255,.04),0_40px_100px_rgba(0,0,0,.35)] grid",
      style: { gridTemplateColumns: "280px 1fr" },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("aside", { className: "h-full overflow-auto border-r border-white/10 p-3 backdrop-blur", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            HeaderAvatar,
            {
              current: currentAvatar,
              setCurrent: setCurrentAvatar,
              avatars
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
              lineNumber: 86,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(NavList, { section, setSection }, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 91,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 85,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("main", { className: "h-full overflow-auto p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-70", children: "Loading…" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 96,
          columnNumber: 29
        }, this), children: [
          section === "general" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazySection.general, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 97,
            columnNumber: 43
          }, this),
          section === "appearance" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazySection.appearance, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 98,
            columnNumber: 43
          }, this),
          section === "whiteboard" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazySection.whiteboard, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 99,
            columnNumber: 43
          }, this),
          section === "widgets" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazySection.widgets, { widgets }, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 100,
            columnNumber: 43
          }, this),
          section === "notifications" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazySection.notifications, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 101,
            columnNumber: 43
          }, this),
          section === "av" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazySection.av, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 102,
            columnNumber: 43
          }, this),
          section === "accounts" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazySection.accounts, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 103,
            columnNumber: 43
          }, this),
          section === "about" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LazySection.about, {}, void 0, false, {
            fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
            lineNumber: 104,
            columnNumber: 43
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 96,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 95,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
      lineNumber: 82,
      columnNumber: 5
    },
    this
  );
}
function HeaderAvatar({ current, setCurrent, avatars }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-2xl p-3 mb-3 border border-white/10 bg-gradient-to-b from-white/5 to-transparent", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: current, alt: "Avatar", className: "h-16 w-16 rounded-2xl object-cover ring-1 ring-white/20 shadow" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
        lineNumber: 117,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-semibold", children: "Echo" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 119,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs opacity-70", children: "Choose your profile avatar" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 120,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
        lineNumber: 118,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-3 mt-3", children: avatars.map((a) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        className: `rounded-xl ring-1 overflow-hidden ${current === a.url ? "ring-cyan-300/60" : "ring-white/15 hover:ring-white/30"}`,
        title: a.path.split("/").pop(),
        onClick: () => setCurrent(a.url),
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: a.url, alt: "", className: "h-12 w-12 object-cover" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 130,
          columnNumber: 13
        }, this)
      },
      a.path,
      false,
      {
        fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
        lineNumber: 125,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
      lineNumber: 123,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
    lineNumber: 115,
    columnNumber: 5
  }, this);
}
function NavList({ section, setSection }) {
  const items = [
    ["general", SECTIONS.general.icon, SECTIONS.general.label],
    ["appearance", SECTIONS.appearance.icon, SECTIONS.appearance.label],
    ["whiteboard", SECTIONS.whiteboard.icon, SECTIONS.whiteboard.label],
    ["widgets", SECTIONS.widgets.icon, SECTIONS.widgets.label],
    ["notifications", SECTIONS.notifications.icon, SECTIONS.notifications.label],
    ["av", SECTIONS.av.icon, "Audio & Video"],
    ["accounts", SECTIONS.accounts.icon, SECTIONS.accounts.label],
    ["about", SECTIONS.about.icon, SECTIONS.about.label]
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "space-y-1", children: items.map(([id, Icon, label]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      onClick: () => setSection(id),
      className: `w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left
                        ${section === id ? "bg-white/10 ring-1 ring-white/15" : "hover:bg-white/5"}`,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "h-7 w-7 grid place-items-center rounded-lg bg-white/8 ring-1 ring-white/10", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { size: 16 }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 159,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 158,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[15px]", children: label }, void 0, false, {
          fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
          lineNumber: 161,
          columnNumber: 13
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
      lineNumber: 153,
      columnNumber: 11
    },
    this
  ) }, id, false, {
    fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
    lineNumber: 152,
    columnNumber: 9
  }, this)) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/WidgetStudio.jsx",
    lineNumber: 150,
    columnNumber: 5
  }, this);
}
const style = document.createElement("style");
style.innerHTML = `
.settings-input{display:block;width:100%;border-radius:10px;border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.04); color:#e8f7ff; padding:.55rem .7rem;}
.settings-switch{appearance:none;width:36px;height:20px;border-radius:999px;background:rgba(255,255,255,.2);position:relative;outline:none;border:1px solid rgba(255,255,255,.12)}
.settings-switch:checked{background:rgba(22,224,255,.55)}
.settings-switch::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;background:white;border-radius:999px;transition:transform .18s ease}
.settings-switch:checked::after{transform:translateX(16px)}
`;
document.head.appendChild(style);
export {
  WidgetSettingsPanel as default
};
