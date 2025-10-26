import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function DoubleTabs({
  backRow = [],
  midRow = [],
  frontRow = [],
  activeId = null,
  colored = true,
  size = "md",
  onChange = () => {
  },
  onReorder = () => {
  },
  className = ""
}) {
  const rootRef = reactExports.useRef(null);
  const [draggingId, setDraggingId] = reactExports.useState(null);
  const flat = reactExports.useMemo(
    () => [...backRow, ...midRow, ...frontRow],
    [backRow, midRow, frontRow]
  );
  const moveFocus = reactExports.useCallback(
    (dir) => {
      if (!flat.length) return;
      const i = Math.max(0, flat.findIndex((t) => t.id === activeId));
      const next = (i + dir + flat.length) % flat.length;
      onChange(flat[next].id);
    },
    [flat, activeId, onChange]
  );
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      moveFocus(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      moveFocus(1);
    }
  };
  const startDrag = (e, rowKey, index, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ row: rowKey, index, id })
    );
    const ghost = document.createElement("div");
    ghost.className = "dt-ghost";
    ghost.textContent = "⋯";
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 6, 6);
    setTimeout(() => document.body.removeChild(ghost), 0);
  };
  const endDrag = () => setDraggingId(null);
  const getDropIndex = (rowEl, clientX) => {
    const tabs = Array.from(rowEl.querySelectorAll(".dt-tab"));
    if (!tabs.length) return 0;
    const midpoints = tabs.map((el) => {
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2;
    });
    let idx = midpoints.findIndex((m) => clientX < m);
    if (idx === -1) idx = tabs.length;
    return idx;
  };
  const onRowDrop = (rowKey) => (e) => {
    e.preventDefault();
    const rowEl = e.currentTarget;
    const payload = JSON.parse(e.dataTransfer.getData("text/plain") || "{}");
    if (!payload || payload.id == null) return;
    const toIndex = getDropIndex(rowEl, e.clientX);
    onReorder({
      from: { row: payload.row, index: payload.index },
      to: { row: rowKey, index: toIndex }
    });
    setDraggingId(null);
  };
  const row = (items, rowKey, extraClass) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: `dt__row ${extraClass || ""}`,
      role: "tablist",
      "aria-label": `${rowKey} tabs`,
      onKeyDown,
      onDragOver: (e) => e.preventDefault(),
      onDrop: onRowDrop(rowKey),
      children: items.map((t, i) => {
        const isActive = t.id === activeId;
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "button",
          {
            className: `dt-tab ${isActive ? "is-active" : ""} ${draggingId === t.id ? "is-dragging" : ""}`,
            draggable: true,
            onDragStart: (e) => startDrag(e, rowKey, i, t.id),
            onDragEnd: endDrag,
            style: {
              "--i": i,
              // used for per-tab z-index math
              "--tab-bg": colored ? t.color : "var(--dt-neutral)"
            },
            role: "tab",
            "aria-selected": isActive,
            title: t.label,
            onClick: () => onChange(t.id),
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "dt-tab__label", children: t.label }, void 0, false, {
              fileName: "/app/code/frontend/src/components/shared/DoubleTabs.jsx",
              lineNumber: 132,
              columnNumber: 13
            }, this)
          },
          t.id,
          false,
          {
            fileName: "/app/code/frontend/src/components/shared/DoubleTabs.jsx",
            lineNumber: 115,
            columnNumber: 11
          },
          this
        );
      })
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/shared/DoubleTabs.jsx",
      lineNumber: 104,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      ref: rootRef,
      className: ["dt", `dt--${size}`, className].join(" "),
      "data-component": "DoubleTabs",
      children: [
        row(backRow, "back", "dt__row--back"),
        midRow?.length ? row(midRow, "mid", "dt__row--mid") : null,
        row(frontRow, "front", "dt__row--front")
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/shared/DoubleTabs.jsx",
      lineNumber: 140,
      columnNumber: 5
    },
    this
  );
}
export {
  DoubleTabs as D
};
