import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { C as ChefHat } from "./chef-hat-BgZX9Th7.js";
import { c as createLucideIcon } from "./settings-CL5KYzJi.js";
import { P as Plus } from "./plus-BoqphXwa.js";
import { G as Grid3x3, L as List } from "./list-Dw93bOqv.js";
import { T as Trash2 } from "./trash-2-Bv0uM_qc.js";
import { F as FileText } from "./Board-6RvNRUqx.js";
import { E as Eye } from "./eye-D86xk_yZ.js";
import { C as Calendar } from "./calendar-CTx3tY8g.js";
import { D as Download } from "./download-DJY62jCL.js";
import { S as Share2 } from "./share-2-CwZPCKwF.js";
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
];
const FileDown = createLucideIcon("file-down", __iconNode$6);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$5);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$4);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$3);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode$1);
/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function cn(...args) {
  return args.filter(Boolean).join(" ");
}
const Button = reactExports.forwardRef(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const v = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800",
      outline: "border border-neutral-300 hover:bg-neutral-50",
      ghost: "hover:bg-neutral-100",
      secondary: "bg-neutral-200 text-neutral-900 hover:bg-neutral-300"
    }[variant];
    const s = {
      default: "h-9 px-4 py-2",
      sm: "h-8 px-3 text-sm",
      icon: "h-8 w-8 p-0 grid place-items-center"
    }[size];
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { ref, className: cn("rounded-md", v, s, className), ...props }, void 0, false, {
      fileName: "/app/code/frontend/src/components/ui/button.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, void 0);
  }
);
Button.displayName = "Button";
function Card({ children, ...props }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { ...props, className: ["rounded-lg border p-3 bg-white/70 dark:bg-slate-900/60", props.className].join(" "), children }, void 0, false, {
    fileName: "/app/code/frontend/src/components/ui/card.tsx",
    lineNumber: 4,
    columnNumber: 10
  }, this);
}
function Badge({ className, variant = "default", ...props }) {
  const v = {
    default: "bg-neutral-900 text-white",
    secondary: "bg-neutral-200 text-neutral-900",
    outline: "border border-neutral-300"
  }[variant];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: cn("px-2 py-0.5 rounded text-xs", v, className), ...props }, void 0, false, {
    fileName: "/app/code/frontend/src/components/ui/badge.tsx",
    lineNumber: 16,
    columnNumber: 10
  }, this);
}
const LSK = "lu:pastry:gallery:v1";
function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(LSK) || "[]");
  } catch {
    return [];
  }
}
function saveItems(items) {
  localStorage.setItem(LSK, JSON.stringify(items));
}
function openPrintWindow(html) {
  const w = window.open("", "_blank", "noopener,noreferrer,width=1000,height=800");
  if (!w) return;
  w.document.open();
  w.document.write(`
    <html>
      <head>
        <title>Pastry Gallery Export</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; margin: 16px; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .item { border: 1px solid #e5e7eb; padding: 12px; border-radius: 10px; }
          img { width: 100%; height: auto; border-radius: 8px; }
          h3 { margin: 8px 0 4px; }
          .meta { color: #6b7280; font-size: 12px; }
          @media print {
            .grid { grid-template-columns: repeat(3, 1fr); }
          }
        </style>
      </head>
      <body>${html}</body>
    </html>
  `);
  w.document.close();
  setTimeout(() => w.print(), 350);
}
function downloadDoc(html, filename = "pastry-gallery.doc") {
  const blob = new Blob(['<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>', html, "</body></html>"], {
    type: "application/msword"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
function PastryGallery({ isDarkMode, onAttachToServerNotes }) {
  const [dark, setDark] = reactExports.useState(
    () => typeof isDarkMode === "boolean" ? isDarkMode : document.documentElement.classList.contains("dark")
  );
  reactExports.useEffect(() => {
    if (typeof isDarkMode === "boolean") {
      setDark(isDarkMode);
      return;
    }
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [isDarkMode]);
  const [viewMode, setViewMode] = reactExports.useState("grid");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [selectedCategory, setSelectedCategory] = reactExports.useState("All");
  const [showCustomCategory, setShowCustomCategory] = reactExports.useState(false);
  const [customCategory, setCustomCategory] = reactExports.useState("");
  const [items, setItems] = reactExports.useState(() => {
    const existing = loadItems();
    if (existing.length) return existing;
    const seed = getMockData();
    saveItems(seed);
    return seed;
  });
  const [selectedIds, setSelectedIds] = reactExports.useState(() => /* @__PURE__ */ new Set());
  reactExports.useEffect(() => saveItems(items), [items]);
  const containerClass = reactExports.useMemo(() => {
    return [
      "h-full w-full overflow-auto transition-all duration-300",
      dark ? "bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-cyan-50" : "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900"
    ].join(" ");
  }, [dark]);
  const categories = reactExports.useMemo(() => {
    const base = [
      "All",
      "Cakes",
      "Cookies",
      "Pastries",
      "Breads",
      "Tarts",
      "Macarons",
      "Chocolates",
      "Desserts",
      "Specialty",
      "Seasonal"
    ];
    const customs = Array.from(new Set(items.map((i) => i.customCategory).filter(Boolean)));
    return base.concat(customs);
  }, [items]);
  const filtered = items.filter((i) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesQ = !q || i.name.toLowerCase().includes(q) || i.tags.some((t) => t.toLowerCase().includes(q)) || i.chef.toLowerCase().includes(q);
    const cat = selectedCategory;
    const matchesCat = cat === "All" || i.category === cat || i.customCategory === cat;
    return matchesQ && matchesCat;
  });
  const toggleLike = (id) => setItems((arr) => arr.map((i) => i.id === id ? { ...i, liked: !i.liked } : i));
  const toggleSelect = (id) => setSelectedIds((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
  const clearSelection = () => setSelectedIds(/* @__PURE__ */ new Set());
  const onFilesChosen = async (files) => {
    const toAdd = [];
    for (const file of files) {
      try {
        const dataUrl = await fileToDataURL(file);
        const now = /* @__PURE__ */ new Date();
        toAdd.push({
          id: "p-" + Math.random().toString(36).slice(2, 8),
          name: file.name.replace(/\.[^.]+$/, ""),
          image: dataUrl,
          category: "Specialty",
          customCategory: "",
          timestamp: now.toISOString(),
          tags: [],
          chef: "Unknown",
          difficulty: "Easy",
          prepTime: "-",
          liked: false,
          views: 0
        });
      } catch {
      }
    }
    if (toAdd.length) setItems((arr) => toAdd.concat(arr));
  };
  const fileInputRef = reactExports.useRef(null);
  const selectedOrAll = () => selectedIds.size ? filtered.filter((i) => selectedIds.has(i.id)) : filtered;
  const buildExportHTML = (list) => `
    <h2>Pastry Gallery Export (${list.length} items)</h2>
    <div class="grid">
      ${list.map((i) => `
        <div class="item">
          <img src="${i.image}" alt="${escapeHtml(i.name)}" />
          <h3>${escapeHtml(i.name)}</h3>
          <div class="meta">${escapeHtml(i.chef)} • ${escapeHtml(i.prepTime)}</div>
          <div class="meta">${new Date(i.timestamp).toLocaleString()}</div>
          <div class="meta">${escapeHtml(i.category)} ${i.customCategory ? "(" + escapeHtml(i.customCategory) + ")" : ""}</div>
          ${i.tags?.length ? `<div class="meta">tags: ${i.tags.map(escapeHtml).join(", ")}</div>` : ""}
        </div>
      `).join("")}
    </div>
  `;
  const onPrint = () => {
    const html = buildExportHTML(selectedOrAll());
    openPrintWindow(html);
  };
  const onExportPDF = () => {
    const html = buildExportHTML(selectedOrAll());
    openPrintWindow(html);
  };
  const onExportDoc = () => {
    const html = buildExportHTML(selectedOrAll());
    downloadDoc(html, "pastry-gallery.doc");
  };
  const onShareToServerNotes = () => {
    const list = selectedOrAll();
    if (typeof onAttachToServerNotes === "function") onAttachToServerNotes(list);
    window.dispatchEvent(new CustomEvent("server-notes-attach", { detail: { items: list, source: "PastryGallery" } }));
  };
  const removeSelected = () => {
    if (!selectedIds.size) return;
    if (!window.confirm(`Remove ${selectedIds.size} item(s) from gallery?`)) return;
    setItems((arr) => arr.filter((i) => !selectedIds.has(i.id)));
    clearSelection();
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: containerClass, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: [
      "sticky top-0 z-20 backdrop-blur-xl border-b",
      dark ? "bg-slate-900/80 border-cyan-500/30 shadow-[0_8px_32px_rgba(22,224,255,0.12)]" : "bg-white/80 border-slate-200/70 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
    ].join(" "), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 sm:px-6 py-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: [
            "p-2 rounded-xl border",
            dark ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/30" : "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-200"
          ].join(" "), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChefHat, { className: dark ? "w-6 h-6 text-cyan-400" : "w-6 h-6 text-blue-600" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 261,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 255,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: dark ? "text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" : "text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent", children: "Pastry Gallery" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 264,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: dark ? "text-cyan-300/70 text-sm" : "text-slate-600 text-sm", children: [
              filtered.length,
              " item",
              filtered.length !== 1 ? "s" : "",
              " • ",
              selectedIds.size,
              " selected"
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 270,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 263,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 254,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Search, { className: [
              "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4",
              dark ? "text-cyan-400/70" : "text-slate-400"
            ].join(" ") }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 278,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                className: [
                  "pl-10 pr-3 py-2 rounded-lg border w-64",
                  dark ? "bg-slate-800/60 border-cyan-400/30 text-cyan-100 placeholder-cyan-400/60" : "bg-white/80 border-slate-200 text-slate-900 placeholder-slate-500"
                ].join(" "),
                placeholder: "Search pastries, tags, chefs…",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
                lineNumber: 280,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 277,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Funnel, { className: dark ? "w-4 h-4 text-cyan-400" : "w-4 h-4 text-slate-600" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 294,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "select",
              {
                value: selectedCategory,
                onChange: (e) => setSelectedCategory(e.target.value),
                className: [
                  "px-3 py-2 rounded-lg border",
                  dark ? "bg-slate-800/60 border-cyan-400/30 text-cyan-100" : "bg-white/80 border-slate-200 text-slate-900"
                ].join(" "),
                children: categories.map((c) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: c, children: c }, c, false, {
                  fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
                  lineNumber: 305,
                  columnNumber: 40
                }, this))
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
                lineNumber: 295,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Button,
              {
                variant: "outline",
                onClick: () => setShowCustomCategory((v) => !v),
                className: dark ? "border-cyan-400/30 text-cyan-300" : "border-slate-200 text-slate-700",
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { className: "w-4 h-4 mr-1" }, void 0, false, {
                    fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
                    lineNumber: 312,
                    columnNumber: 19
                  }, this),
                  " Custom"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
                lineNumber: 307,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 293,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-px h-6 bg-black/10 dark:bg-white/20 mx-1" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 316,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Button,
            {
              variant: viewMode === "grid" ? "default" : "outline",
              onClick: () => setViewMode("grid"),
              className: dark ? "bg-cyan-600/20 text-cyan-300 border-cyan-400/30" : "",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Grid3x3, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
                lineNumber: 323,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 318,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Button,
            {
              variant: viewMode === "list" ? "default" : "outline",
              onClick: () => setViewMode("list"),
              className: dark ? "bg-cyan-600/20 text-cyan-300 border-cyan-400/30" : "",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(List, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
                lineNumber: 330,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 325,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-px h-6 bg-black/10 dark:bg-white/20 mx-1" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 333,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              multiple: true,
              hidden: true,
              onChange: (e) => {
                const f = e.target.files;
                if (f && f.length) onFilesChosen(f);
                e.target.value = "";
              }
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 335,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: () => fileInputRef.current?.click(), children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Upload, { className: "w-4 h-4 mr-1" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 348,
              columnNumber: 17
            }, this),
            " Upload"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 347,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: removeSelected, disabled: !selectedIds.size, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "w-4 h-4 mr-1" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 351,
              columnNumber: 17
            }, this),
            " Remove"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 350,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-px h-6 bg-black/10 dark:bg-white/20 mx-1" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 354,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: onPrint, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Printer, { className: "w-4 h-4 mr-1" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 356,
              columnNumber: 59
            }, this),
            " Print"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 356,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: onExportPDF, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileDown, { className: "w-4 h-4 mr-1" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 357,
              columnNumber: 63
            }, this),
            " PDF"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 357,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: onExportDoc, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileText, { className: "w-4 h-4 mr-1" }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 358,
              columnNumber: 63
            }, this),
            " Word"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 358,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "secondary", onClick: onShareToServerNotes, children: "Share to Server Notes" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 360,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 276,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 253,
        columnNumber: 11
      }, this),
      showCustomCategory && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            className: [
              "px-3 py-2 rounded-lg border w-72",
              dark ? "bg-slate-800/60 border-cyan-400/30 text-cyan-100" : "bg-white/80 border-slate-200 text-slate-900"
            ].join(" "),
            placeholder: "New category name…",
            value: customCategory,
            onChange: (e) => setCustomCategory(e.target.value)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 368,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            onClick: () => {
              if (!customCategory.trim()) return;
              setSelectedCategory(customCategory.trim());
              setShowCustomCategory(false);
              setCustomCategory("");
            },
            children: "Add"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 379,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 367,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 252,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 246,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-4 sm:px-6 py-4", children: filtered.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EmptyState, { dark }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 397,
      columnNumber: 11
    }, this) : viewMode === "grid" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5", children: filtered.map((item) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      GalleryCard,
      {
        item,
        dark,
        selected: selectedIds.has(item.id),
        onToggleSelect: () => toggleSelect(item.id),
        onToggleLike: () => toggleLike(item.id)
      },
      item.id,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 401,
        columnNumber: 15
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 399,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-3", children: filtered.map((item) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      ListRow,
      {
        item,
        dark,
        selected: selectedIds.has(item.id),
        onToggleSelect: () => toggleSelect(item.id),
        onToggleLike: () => toggleLike(item.id)
      },
      item.id,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 414,
        columnNumber: 15
      },
      this
    )) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 412,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 395,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
    lineNumber: 245,
    columnNumber: 5
  }, this);
}
function GalleryCard({ item, dark, selected, onToggleSelect, onToggleLike }) {
  const ts = new Date(item.timestamp);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: [
    "group overflow-hidden border transition-all duration-200",
    dark ? "bg-slate-800/40 border-cyan-400/20 hover:border-cyan-400/40 shadow-[0_8px_32px_rgba(22,224,255,0.08)] hover:shadow-[0_16px_48px_rgba(22,224,255,0.18)]" : "bg-white/80 border-slate-200 hover:border-slate-300 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]",
    selected ? dark ? "ring-2 ring-cyan-400/60" : "ring-2 ring-blue-400/50" : ""
  ].join(" "), children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative aspect-square overflow-hidden", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 443,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: [
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        dark ? "bg-gradient-to-t from-slate-950/80 via-transparent" : "bg-gradient-to-t from-black/60 via-transparent"
      ].join(" ") }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 444,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute top-2 left-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "checkbox",
            checked: selected,
            onChange: onToggleSelect,
            className: "w-4 h-4 accent-cyan-500",
            title: "Select"
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 449,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: item.difficulty === "Easy" ? "secondary" : item.difficulty === "Medium" ? "default" : "destructive", children: item.difficulty }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 456,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 448,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute bottom-2 left-2 right-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: onToggleLike,
            className: dark ? "bg-slate-800/80 border-cyan-400/30" : "bg-white/80 border-slate-200",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Heart, { className: `w-4 h-4 ${item.liked ? "fill-red-500 text-red-500" : ""}` }, void 0, false, {
              fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
              lineNumber: 463,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 461,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-1 text-xs", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 466,
            columnNumber: 13
          }, this),
          item.views
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 465,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 460,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 442,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: dark ? "font-semibold text-cyan-100" : "font-semibold text-slate-900", children: item.name }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 473,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: dark ? "text-cyan-300/70 text-xs" : "text-slate-500 text-xs", children: [
          ts.toLocaleDateString(),
          " ",
          ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 474,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 472,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: dark ? "text-cyan-300/70 text-sm mt-1" : "text-slate-600 text-sm mt-1", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChefHat, { className: "w-4 h-4" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 480,
          columnNumber: 13
        }, this),
        " ",
        item.chef,
        " • ",
        item.prepTime
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 479,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 478,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-1 mt-2", children: item.tags.slice(0, 3).map(
        (t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Badge,
          {
            variant: "secondary",
            className: dark ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-xs" : "bg-blue-50 text-blue-700 border-blue-200 text-xs",
            children: t
          },
          t,
          false,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 485,
            columnNumber: 13
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 483,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 471,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
    lineNumber: 435,
    columnNumber: 5
  }, this);
}
function ListRow({ item, dark, selected, onToggleSelect, onToggleLike }) {
  const ts = new Date(item.timestamp);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Card, { className: [
    "overflow-hidden border transition-all duration-200",
    dark ? "bg-slate-800/40 border-cyan-400/20 hover:border-cyan-400/40" : "bg-white/80 border-slate-200 hover:border-slate-300",
    selected ? dark ? "ring-2 ring-cyan-400/60" : "ring-2 ring-blue-400/50" : ""
  ].join(" "), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 p-3", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("input", { type: "checkbox", checked: selected, onChange: onToggleSelect, className: "w-4 h-4 accent-cyan-500", title: "Select" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 507,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-20 h-20 rounded-md overflow-hidden flex-shrink-0", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: item.image, alt: item.name, className: "w-full h-full object-cover" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 509,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 508,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: dark ? "font-semibold text-cyan-100 truncate" : "font-semibold text-slate-900 truncate", children: item.name }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 513,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Badge, { variant: item.difficulty === "Easy" ? "secondary" : item.difficulty === "Medium" ? "default" : "destructive", children: item.difficulty }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 515,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "ghost", size: "sm", onClick: onToggleLike, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Heart, { className: `w-4 h-4 ${item.liked ? "fill-red-500 text-red-500" : ""}` }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 518,
            columnNumber: 72
          }, this) }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 518,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 514,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 512,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: dark ? "text-cyan-300/70 text-sm" : "text-slate-600 text-sm", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChefHat, { className: "w-4 h-4 inline mr-1" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 522,
          columnNumber: 13
        }, this),
        item.chef,
        " • ",
        item.prepTime
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 521,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: dark ? "text-cyan-400/70 text-xs" : "text-slate-500 text-xs", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Calendar, { className: "w-3 h-3 inline mr-1" }, void 0, false, {
          fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
          lineNumber: 525,
          columnNumber: 13
        }, this),
        ts.toLocaleDateString(),
        " ",
        ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 524,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-wrap gap-1 mt-1", children: item.tags.map(
        (t) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Badge,
          {
            variant: "secondary",
            className: dark ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-[11px]" : "bg-blue-50 text-blue-700 border-blue-200 text-[11px]",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Tag, { className: "w-3 h-3 mr-1 inline" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
                lineNumber: 532,
                columnNumber: 17
              }, this),
              " ",
              t
            ]
          },
          t,
          true,
          {
            fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
            lineNumber: 530,
            columnNumber: 15
          },
          this
        )
      ) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 528,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 511,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2 text-sm opacity-80", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 538,
        columnNumber: 11
      }, this),
      " ",
      item.views,
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Download, { className: "w-4 h-4 ml-2", title: "(demo) Download image", onClick: () => downloadImage(item) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 539,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Share2, { className: "w-4 h-4", title: "(demo) Share" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
        lineNumber: 540,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 537,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
    lineNumber: 506,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
    lineNumber: 499,
    columnNumber: 5
  }, this);
}
function EmptyState({ dark }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: dark ? "text-cyan-300/70 text-center py-16" : "text-slate-500 text-center py-16", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChefHat, { className: dark ? "w-16 h-16 mx-auto mb-3 text-cyan-400/60" : "w-16 h-16 mx-auto mb-3 text-slate-300" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 550,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: dark ? "text-cyan-100 text-xl font-semibold" : "text-slate-700 text-xl font-semibold", children: "No pastries yet" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 551,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "Upload images to get started or change your filters." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
      lineNumber: 552,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/PastryGallery.jsx",
    lineNumber: 549,
    columnNumber: 5
  }, this);
}
function downloadImage(item) {
  const a = document.createElement("a");
  a.href = item.image;
  a.download = (item.name || "image") + ".png";
  a.click();
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}
function getMockData() {
  return [
    {
      id: "1",
      name: "Chocolate Ganache Tart",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
      category: "Tarts",
      timestamp: (/* @__PURE__ */ new Date("2024-01-15T10:30:00")).toISOString(),
      tags: ["chocolate", "rich", "elegant"],
      chef: "Chef Laurent",
      difficulty: "Medium",
      prepTime: "2h 30m",
      liked: true,
      views: 245
    },
    {
      id: "2",
      name: "French Macarons",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
      category: "Macarons",
      timestamp: (/* @__PURE__ */ new Date("2024-01-14T14:15:00")).toISOString(),
      tags: ["colorful", "delicate", "french"],
      chef: "Chef Marie",
      difficulty: "Hard",
      prepTime: "4h 15m",
      liked: false,
      views: 189
    },
    {
      id: "3",
      name: "Artisan Sourdough",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800",
      category: "Breads",
      timestamp: (/* @__PURE__ */ new Date("2024-01-13T08:45:00")).toISOString(),
      tags: ["artisan", "sourdough", "rustic"],
      chef: "Chef Antonio",
      difficulty: "Medium",
      prepTime: "18h total",
      liked: true,
      views: 156
    },
    {
      id: "4",
      name: "Vanilla Bean Crème Brûlée",
      image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800",
      category: "Desserts",
      timestamp: (/* @__PURE__ */ new Date("2024-01-12T16:20:00")).toISOString(),
      tags: ["vanilla", "custard", "torched"],
      chef: "Chef Isabella",
      difficulty: "Easy",
      prepTime: "3h 45m",
      liked: true,
      views: 298
    },
    {
      id: "5",
      name: "Red Velvet Cupcakes",
      image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800",
      category: "Cakes",
      timestamp: (/* @__PURE__ */ new Date("2024-01-11T11:30:00")).toISOString(),
      tags: ["red velvet", "cupcakes", "cream cheese"],
      chef: "Chef Sarah",
      difficulty: "Easy",
      prepTime: "1h 45m",
      liked: false,
      views: 203
    },
    {
      id: "6",
      name: "Chocolate Chip Cookies",
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800",
      category: "Cookies",
      timestamp: (/* @__PURE__ */ new Date("2024-01-10T13:15:00")).toISOString(),
      tags: ["classic", "chocolate chip", "comfort"],
      chef: "Chef David",
      difficulty: "Easy",
      prepTime: "45m",
      liked: true,
      views: 412
    }
  ];
}
export {
  PastryGallery as default
};
