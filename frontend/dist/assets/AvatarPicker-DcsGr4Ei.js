import { _ as __vite_glob_0_12, a as __vite_glob_0_11, b as __vite_glob_0_10, c as __vite_glob_0_9, d as __vite_glob_0_8, e as __vite_glob_0_4, f as __vite_glob_0_2, g as __vite_glob_0_1, h as __vite_glob_0_0 } from "./Echo_Recipe_Pro-D3BCmeiS.js";
import { d as __vite_glob_0_7, e as __vite_glob_0_6, f as __vite_glob_0_5, g as __vite_glob_0_3 } from "./Echo_R-DJeORrcm.js";
import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const AVATAR_KEY = "lu:echo:avatar:v1";
function AvatarPicker({ choices }) {
  const discovered = reactExports.useMemo(() => {
    if (choices?.length) return choices.slice(0, 4);
    const found = /* @__PURE__ */ Object.assign({ "../assets/Echo-Ai.png": __vite_glob_0_0, "../assets/Echo.png": __vite_glob_0_1, "../assets/Echo_A.png": __vite_glob_0_2, "../assets/Echo_B.png": __vite_glob_0_3, "../assets/Echo_Canvas.png": __vite_glob_0_4, "../assets/Echo_F.png": __vite_glob_0_5, "../assets/Echo_M.png": __vite_glob_0_6, "../assets/Echo_R.png": __vite_glob_0_7, "../assets/Echo_Recipe_Pro.png": __vite_glob_0_8, "../assets/Large/Echo-Ai.png": __vite_glob_0_9, "../assets/Large/Echo.png": __vite_glob_0_10, "../assets/Large/Echo_Canvas.png": __vite_glob_0_11, "../assets/Large/Echo_Recipe_Pro.png": __vite_glob_0_12 });
    const items = Object.entries(found).map(([p, m]) => ({ path: p, url: m.default }));
    const order = ["_F", "_M", "_B", "_R"];
    items.sort((a, b) => {
      const ai = order.findIndex((t) => a.path.includes(t));
      const bi = order.findIndex((t) => b.path.includes(t));
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi);
    });
    return items.slice(0, 4).map((i) => i.url);
  }, [choices]);
  const initial = () => localStorage.getItem(AVATAR_KEY) || discovered[0] || "";
  const [current, setCurrent] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!current) return;
    try {
      localStorage.setItem(AVATAR_KEY, current);
    } catch {
    }
    window.dispatchEvent(new CustomEvent("echo-avatar-changed", { detail: { url: current } }));
  }, [current]);
  const fileRef = reactExports.useRef(null);
  const pickFile = () => fileRef.current?.click();
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setCurrent(String(reader.result || ""));
    reader.readAsDataURL(f);
  };
  const onKey = (i) => (e) => {
    const idx = discovered.indexOf(current);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const ni = idx <= 0 ? discovered.length - 1 : idx - 1;
      setCurrent(discovered[ni]);
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const ni = idx >= discovered.length - 1 ? 0 : idx + 1;
      setCurrent(discovered[ni]);
    }
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setCurrent(discovered[i]);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 mb-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "img",
        {
          src: current || discovered[0],
          alt: "",
          className: "h-12 w-12 rounded-lg ring-1 ring-white/15 object-cover"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
          lineNumber: 68,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm opacity-80", children: current?.startsWith("data:") ? "Custom avatar" : "Echo avatar" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "div",
      {
        role: "radiogroup",
        "aria-label": "Choose your profile avatar",
        className: "grid gap-3",
        style: { gridTemplateColumns: "repeat(4, minmax(0, 1fr))" },
        children: [
          discovered.map((url, i) => {
            const selected = current === url;
            return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                role: "radio",
                "aria-checked": selected,
                title: "Choose avatar",
                onClick: () => setCurrent(url),
                onKeyDown: onKey(i),
                className: "h-16 w-16 rounded-xl overflow-hidden ring-1 focus:outline-none " + (selected ? "ring-cyan-300 shadow-[0_0_0_2px_rgba(22,224,255,.6)]" : "ring-white/12 hover:ring-white/25"),
                children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: url, alt: "", className: "h-full w-full object-cover" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
                  lineNumber: 99,
                  columnNumber: 15
                }, this)
              },
              url,
              false,
              {
                fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
                lineNumber: 88,
                columnNumber: 13
              },
              this
            );
          }),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              type: "button",
              title: "Upload your own",
              onClick: pickFile,
              className: "h-16 w-16 rounded-xl ring-1 ring-white/12 hover:ring-white/25 bg-white/5 text-[11px]",
              children: "Upload"
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
              lineNumber: 104,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { ref: fileRef, type: "file", accept: "image/*", className: "hidden", onChange: onFile }, void 0, false, {
            fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
            lineNumber: 112,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
        lineNumber: 79,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/AvatarPicker.jsx",
    lineNumber: 65,
    columnNumber: 5
  }, this);
}
export {
  AVATAR_KEY,
  AvatarPicker as default
};
