// src/components/shared/DoubleTabs.jsx
import React, { useMemo, useRef, useState, useCallback } from "react";
import "./DoubleTabs.css";

/**
 * DoubleTabs – folder tabs with draggable reordering
 *
 * Props:
 *  - backRow:  [{ id, label, color }]
 *  - midRow:   [{ id, label, color }]           // optional third row
 *  - frontRow: [{ id, label, color }]
 *  - activeId: string
 *  - colored:  boolean                           // if false, ignore per-tab color
 *  - size:     "sm" | "md" | "lg"
 *  - onChange: (id) => void
 *  - onReorder: ({ from:{row,index}, to:{row,index} }) => void
 *  - className: string
 */
export default function DoubleTabs({
  backRow = [],
  midRow = [],
  frontRow = [],
  activeId = null,
  colored = true,
  size = "md",
  onChange = () => {},
  onReorder = () => {},
  className = "",
}) {
  const rootRef = useRef(null);
  const [draggingId, setDraggingId] = useState(null);

  // Create a flat map to enable left/right keyboard stepping
  const flat = useMemo(
    () => [...backRow, ...midRow, ...frontRow],
    [backRow, midRow, frontRow]
  );

  const moveFocus = useCallback(
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

  /** Drag helpers **/
  const startDrag = (e, rowKey, index, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ row: rowKey, index, id })
    );
    // smaller ghost
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
      to: { row: rowKey, index: toIndex },
    });
    setDraggingId(null);
  };

  const row = (items, rowKey, extraClass) => (
    <div
      className={`dt__row ${extraClass || ""}`}
      role="tablist"
      aria-label={`${rowKey} tabs`}
      onKeyDown={onKeyDown}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onRowDrop(rowKey)}
    >
      {items.map((t, i) => {
        const isActive = t.id === activeId;
        return (
          <button
            key={t.id}
            className={`dt-tab ${isActive ? "is-active" : ""} ${
              draggingId === t.id ? "is-dragging" : ""
            }`}
            draggable
            onDragStart={(e) => startDrag(e, rowKey, i, t.id)}
            onDragEnd={endDrag}
            style={{
              "--i": i, // used for per-tab z-index math
              "--tab-bg": colored ? t.color : "var(--dt-neutral)",
            }}
            role="tab"
            aria-selected={isActive}
            title={t.label}
            onClick={() => onChange(t.id)}
          >
            <span className="dt-tab__label">{t.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={["dt", `dt--${size}`, className].join(" ")}
      data-component="DoubleTabs"
    >
      {/* Top/back row */}
      {row(backRow, "back", "dt__row--back")}
      {/* Optional middle row */}
      {midRow?.length ? row(midRow, "mid", "dt__row--mid") : null}
      {/* Bottom/front row */}
      {row(frontRow, "front", "dt__row--front")}
    </div>
  );
}
