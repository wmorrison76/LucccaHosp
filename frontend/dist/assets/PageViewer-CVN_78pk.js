import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const PageViewer = () => {
  const [files, setFiles] = reactExports.useState([]);
  const [selectedFile, setSelectedFile] = reactExports.useState("");
  const [Component, setComponent] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setFiles([
      { name: "Dashboard", path: "../components/DashboardWelcome.jsx" },
      { name: "RecipeInputPage", path: "../components/RecipeInputPage.jsx" },
      { name: "PastryRecipeInputPage", path: "../components/PastryRecipeInputPage.jsx" },
      { name: "CakeBuilder", path: "../components/CakeBuilder.jsx" }
    ]);
  }, []);
  const handleChange = async (e) => {
    const filePath = e.target.value;
    setSelectedFile(filePath);
    try {
      const mod = await import(
        /* @vite-ignore */
        filePath
      );
      setComponent(() => mod.default || (() => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "⚠️ No default export" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PageViewer.jsx",
        lineNumber: 31,
        columnNumber: 48
      }, void 0)));
    } catch (err) {
      console.error("Failed to load file:", err);
      setComponent(() => () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        "Error loading ",
        filePath
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PageViewer.jsx",
        lineNumber: 34,
        columnNumber: 32
      }, void 0));
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "font-bold mb-2", children: "Page Viewer" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PageViewer.jsx",
      lineNumber: 40,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "select",
      {
        value: selectedFile,
        onChange: handleChange,
        className: "border p-2 rounded mb-4",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "-- Select a file --" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PageViewer.jsx",
            lineNumber: 46,
            columnNumber: 9
          }, void 0),
          files.map((f) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: f.path, children: f.name }, f.path, false, {
            fileName: "/app/code/frontend/src/components/PageViewer.jsx",
            lineNumber: 48,
            columnNumber: 11
          }, void 0))
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/code/frontend/src/components/PageViewer.jsx",
        lineNumber: 41,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border rounded p-4 min-h-[300px] bg-gray-50", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "Loading…" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PageViewer.jsx",
      lineNumber: 55,
      columnNumber: 29
    }, void 0), children: Component ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Component, {}, void 0, false, {
      fileName: "/app/code/frontend/src/components/PageViewer.jsx",
      lineNumber: 56,
      columnNumber: 24
    }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: "Select a file to view" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PageViewer.jsx",
      lineNumber: 56,
      columnNumber: 40
    }, void 0) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PageViewer.jsx",
      lineNumber: 55,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PageViewer.jsx",
      lineNumber: 54,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PageViewer.jsx",
    lineNumber: 39,
    columnNumber: 5
  }, void 0);
};
export {
  PageViewer as default
};
