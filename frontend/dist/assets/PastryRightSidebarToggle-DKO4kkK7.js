import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { PastryRightSidebar } from "./PastryRightSidebar-YHYshHFQ.js";
import "./chunk-S5YDGZLY-BNXTuE-C.js";
function PastryRightSidebarToggle() {
  const [open, setOpen] = reactExports.useState(true);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    open && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PastryRightSidebar, {}, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryRightSidebarToggle.jsx",
      lineNumber: 9,
      columnNumber: 16
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "fixed right-2 top-2 p-2 bg-pink-600 text-white rounded z-50",
        children: [
          open ? "Hide" : "Show",
          " Pastry Sidebar"
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/code/frontend/src/components/PastryRightSidebarToggle.jsx",
        lineNumber: 10,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryRightSidebarToggle.jsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
export {
  PastryRightSidebarToggle
};
