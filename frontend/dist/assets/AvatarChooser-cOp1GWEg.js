import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const DEFAULTS = [
  { id: "echo_a", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=facearea&facepad=3&h=256" },
  { id: "echo_b", src: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=256&auto=format&fit=facearea&facepad=3&h=256" },
  { id: "echo_c", src: "https://images.unsplash.com/photo-1541534401786-2077eed87a72?q=80&w=256&auto=format&fit=facearea&facepad=3&h=256" },
  { id: "echo_d", src: "https://images.unsplash.com/photo-1544005316-04ce98b8e8d5?q=80&w=256&auto=format&fit=facearea&facepad=3&h=256" }
];
function AvatarChooser({ value, onChange }) {
  const inputRef = reactExports.useRef(null);
  const setCustom = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange?.({ id: "custom", src: reader.result });
    reader.readAsDataURL(file);
  };
  const selected = value?.src ? value : DEFAULTS[0];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "vstack", style: { gap: 16 }, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hstack", style: { gap: 14 }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "img",
        {
          src: selected.src,
          alt: "Selected avatar",
          width: 96,
          height: 96,
          className: "panel",
          style: { borderRadius: 20, objectFit: "cover" }
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
          lineNumber: 27,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "vstack", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "section-title", children: "Avatar" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
          lineNumber: 30,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "muted small", children: "Choose one of the presets or upload your own image." }, void 0, false, {
          fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
          lineNumber: 31,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hstack", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { className: "btn", onClick: () => inputRef.current?.click(), children: "Upload…" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
            lineNumber: 33,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { ref: inputRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => setCustom(e.target.files?.[0]) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
            lineNumber: 34,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
          lineNumber: 32,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
        lineNumber: 29,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid-4", style: { display: "grid", gridTemplateColumns: "repeat(4,96px)", gap: 14 }, children: DEFAULTS.map((a) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => onChange?.(a),
        style: { padding: 0, border: "none", background: "transparent", cursor: "pointer" },
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "img",
          {
            src: a.src,
            alt: "",
            width: 96,
            height: 96,
            className: "panel",
            style: { borderRadius: 20, objectFit: "cover", outline: selected.id === a.id ? "2px solid var(--accent)" : "none", outlineOffset: 2 }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
            lineNumber: 43,
            columnNumber: 13
          },
          this
        )
      },
      a.id,
      false,
      {
        fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
        lineNumber: 41,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
      lineNumber: 39,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AvatarChooser.jsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}
export {
  AvatarChooser as default
};
