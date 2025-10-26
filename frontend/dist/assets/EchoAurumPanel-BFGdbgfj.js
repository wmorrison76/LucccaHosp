import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function EchoAurumPanel() {
  const apiKey = "bwncv6np70e4e8ey0yj";
  const embedUrl = `https://builder.io/embed/index.html?apiKey=${apiKey}&model=EchoAurum&published=true`;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0f172a",
        overflow: "hidden"
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "iframe",
        {
          src: embedUrl,
          style: {
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px"
          },
          title: "EchoAurum",
          allow: "fullscreen; clipboard-read; clipboard-write"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/EchoAurumPanel.jsx",
          lineNumber: 24,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/EchoAurumPanel.jsx",
      lineNumber: 14,
      columnNumber: 5
    },
    this
  );
}
export {
  EchoAurumPanel as default
};
