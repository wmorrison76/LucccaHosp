import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { c as createLucideIcon } from "./settings-CL5KYzJi.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
];
const FolderPlus = createLucideIcon("folder-plus", __iconNode);
function ZAROAdminPanel() {
  const [safeMode, setSafeMode] = reactExports.useState(true);
  const [logs, setLogs] = reactExports.useState(["ZARO initialized in Safe Mode."]);
  const toggleSafeMode = () => {
    const newState = !safeMode;
    setSafeMode(newState);
    setLogs((prev) => [...prev, `ZARO Safe Mode \${newState ? "enabled" : "disabled"}.`]);
  };
  const handleModuleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      files[0].name;
      setLogs((prev) => [...prev, `Module dropped: \${name}. Verifying…`]);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-bold mb-4", children: "ZARO Admin Tools" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center mb-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mr-3", children: "Safe Mode:" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: toggleSafeMode,
          className: `px-4 py-1 rounded \${
            safeMode ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`,
          children: safeMode ? "ON" : "OFF"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
          lineNumber: 30,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        onDragOver: (e) => e.preventDefault(),
        onDrop: handleModuleDrop,
        className: "border-2 border-dashed border-blue-500 rounded-lg p-6 text-center text-blue-500 mb-4",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FolderPlus, { className: "mx-auto mb-2" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
            lineNumber: 45,
            columnNumber: 9
          }, this),
          "Drag & Drop a Module to Install"
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
        lineNumber: 40,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-zinc-800 text-white rounded p-4 h-40 overflow-y-scroll", children: logs.map((log, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm", children: log }, i, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
      lineNumber: 51,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
      lineNumber: 49,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/settings/sections/ZAROAdminPanel.jsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}
export {
  ZAROAdminPanel as default
};
