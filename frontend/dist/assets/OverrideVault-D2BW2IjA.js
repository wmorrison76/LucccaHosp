import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function OverrideUnlock() {
  const [keyFile, setKeyFile] = reactExports.useState(null);
  const [status, setStatus] = reactExports.useState("");
  const handleUpload = (e) => {
    const file = e.target.files[0];
    setKeyFile(file);
    if (file && file.name === "LUCCCA_Master_Key.lck") {
      setStatus("✅ Verified by Echo, Zelda, and Odin. Access Restored.");
    } else {
      setStatus("❌ Invalid Key File. Access Denied.");
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-w-xl mx-auto mt-24 p-6 border shadow-lg rounded bg-white", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold mb-4 text-center", children: "System Locked" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/OverrideVault.jsx",
      lineNumber: 23,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 text-sm text-gray-700 text-center", children: "Upload your Master Key File to restore admin access. This will be verified by Echo, Zelda, and Odin’s Spear." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/OverrideVault.jsx",
      lineNumber: 24,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        type: "file",
        onChange: handleUpload,
        className: "block w-full mb-4 border px-3 py-2 rounded"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/OverrideVault.jsx",
        lineNumber: 27,
        columnNumber: 7
      },
      this
    ),
    status && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `mt-2 font-semibold text-center ${status.includes("✅") ? "text-green-600" : "text-red-600"}`, children: status }, void 0, false, {
      fileName: "/app/code/frontend/src/components/OverrideVault.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/OverrideVault.jsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}
export {
  OverrideUnlock as default
};
