import React, { useMemo, useState, useEffect, Suspense } from "react";
import "./DoubleTabs.css";

/**
 * DoubleTabs
 * - Renders a pill tab row + optional secondary row (kept simple here)
 * - Loads tab content via React.lazy loader per tab (tree-shake and fast boot)
 *
 * Props:
 *  - tabs: [
 *      { key: "search", label: "Recipe Search", loader: () => import("...") },
 *      { key: "photos", label: "Photos", loader: () => import("...") },
 *      ...
 *    ]
 *  - defaultKey: "search"
 *  - onChange?: (key) => void
 */
export default function DoubleTabs({ tabs = [], defaultKey, onChange }) {
  const firstKey = tabs?.[0]?.key ?? "tab0";
  const [active, setActive] = useState(defaultKey || firstKey);

  // lazy component cache per tab key
  const LazyMap = useMemo(() => {
    const m = new Map();
    tabs.forEach((t) => {
      m.set(
        t.key,
        React.lazy(async () => {
          const mod = await t.loader();
          // Default export preferred; fall back to named export "default" or first value
          if (mod?.default) return { default: mod.default };
          const first = Object.values(mod)[0];
          return { default: first };
        })
      );
    });
    return m;
  }, [tabs]);

  useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  const ActiveCmp = LazyMap.get(active);

  return (
    <div className="dtabs-root">
      <div className="dtabs-row" role="tablist" aria-label="EchoRecipePro Tabs">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={isActive}
              className={`dtab ${isActive ? "active" : ""}`}
              onClick={() => setActive(t.key)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="dtabs-pane" role="tabpanel">
        <Suspense fallback={<div className="dtabs-loading">Loading…</div>}>
          {ActiveCmp ? <ActiveCmp /> : null}
        </Suspense>
      </div>
    </div>
  );
}
