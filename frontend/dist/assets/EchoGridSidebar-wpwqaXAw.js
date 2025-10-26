import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { N as NavLink } from "./chunk-S5YDGZLY-BNXTuE-C.js";
import { H as House } from "./Board-6RvNRUqx.js";
import { B as BookOpen } from "./book-open-rCUCTzrv.js";
import { C as ChefHat } from "./chef-hat-BgZX9Th7.js";
import { c as createLucideIcon, S as Settings } from "./settings-CL5KYzJi.js";
import { B as Boxes } from "./boxes-C7e5ANuZ.js";
import { U as Users } from "./users-DPrj24jF.js";
import { C as Clock } from "./clock-BJR8nEFt.js";
import { C as CircleQuestionMark } from "./circle-question-mark-T3zVxUzD.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
];
const Network = createLucideIcon("network", __iconNode$1);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode);
const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(House, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 21,
    columnNumber: 49
  }, void 0) },
  { to: "/kitchen", label: "Kitchen Library", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BookOpen, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 22,
    columnNumber: 53
  }, void 0) },
  { to: "/pastry", label: "Baking & Pastry", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChefHat, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 23,
    columnNumber: 52
  }, void 0) },
  { to: "/mixology", label: "Mixology", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Cocktail, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 24,
    columnNumber: 47
  }, void 0) },
  { to: "/purchasing", label: "Purchasing", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ShoppingCart, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 25,
    columnNumber: 51
  }, void 0) },
  { to: "/inventory", label: "Inventory", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Boxes, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 26,
    columnNumber: 49
  }, void 0) },
  { to: "/crm", label: "CRM", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Users, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 27,
    columnNumber: 37
  }, void 0) },
  { to: "/schedules", label: "Schedules", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Clock, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 28,
    columnNumber: 49
  }, void 0) },
  { to: "/support", label: "Support", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleQuestionMark, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 29,
    columnNumber: 45
  }, void 0) },
  { to: "/settings", label: "Settings", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 30,
    columnNumber: 47
  }, void 0) },
  { to: "/chefnet", label: "ChefNet", icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Network, {}, void 0, false, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 31,
    columnNumber: 45
  }, void 0) }
];
const EchoGridSidebar = ({ isOpen, toggleSidebar, isDarkMode, toggleDarkMode }) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "sidebar-container", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "echo-header", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "projected-holo", children: "LUCCCA SYSTEM" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
        lineNumber: 38,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "echo-tagline", children: "Chef William • EchoGrid" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
        lineNumber: 39,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "quote-flare", children: '"This is not a sidebar. This is a control ring — wrapped in light, precision, and purpose."' }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
        lineNumber: 40,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
      lineNumber: 37,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("nav", { className: "echo-nav", children: navItems.map((item, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      NavLink,
      {
        to: item.to,
        className: ({ isActive }) => isActive ? "nav-link active-link" : "nav-link",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "icon-wrapper", children: item.icon }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
            lineNumber: 54,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "label", children: item.label }, void 0, false, {
            fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
            lineNumber: 55,
            columnNumber: 13
          }, void 0)
        ]
      },
      index,
      true,
      {
        fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
        lineNumber: 47,
        columnNumber: 11
      },
      void 0
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
      lineNumber: 45,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "echo-footer", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "beam-toggle", title: "Flip Sidebar Mode", onClick: toggleSidebar }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
        lineNumber: 61,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "footer-holo", children: "✨ ECHO GRID SIDEBAR — vTRON-X.0" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
        lineNumber: 62,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
      lineNumber: 60,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid-overlay" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
      lineNumber: 66,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/EchoGridSidebar.jsx",
    lineNumber: 36,
    columnNumber: 5
  }, void 0);
};
export {
  EchoGridSidebar as default
};
