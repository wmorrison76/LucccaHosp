import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function BanquetMenuUploader({ onUpload }) {
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-white p-6 rounded shadow-md", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold mb-4", children: "Upload Banquet Menu" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/BanquetMenuUploader.jsx",
      lineNumber: 18,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "file", accept: ".pdf,.csv", onChange: handleFileChange, className: "mb-4" }, void 0, false, {
      fileName: "/app/code/frontend/src/pages/BanquetMenuUploader.jsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: handleUpload,
        className: "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700",
        children: "Upload"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/pages/BanquetMenuUploader.jsx",
        lineNumber: 20,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/pages/BanquetMenuUploader.jsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
export {
  BanquetMenuUploader as default
};
