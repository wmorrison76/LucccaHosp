import React, { useEffect, useMemo, useState } from "react";
import DoubleTabs from "../shared/DoubleTabs.jsx";

/**
 * makeTabbedModule(config) ➜ returns a React component with:
 * - Double row tabs (back/front)
 * - Tear out current tab into its own window (singleTab mode)
 * - Reattach from tear-out back to the main module window
 *
 * config = {
 *   moduleKey: "pastry" | "culinary" | "mixology" | "maestro-bqt" | "purchasing",
 *   title: "Baking & Pastry",
 *   storageKey: "tabs:pastry@v1",
 *   backDefaults: [{id,label,color}, ...],
 *   frontDefaults: [{id,label,color}, ...],
 * }
 */
export default function makeTabbedModule(config) {
  const {
    moduleKey,
    title,
    storageKey,
    backDefaults = [],
    frontDefaults = [],
  } = config;

  const ACTIVATE_EVT = `${moduleKey}-activate-tab`;
  const SETTINGS_EVT = `${moduleKey}-open-settings`;

  return function TabbedModule(props) {
    const { singleTab = false, initialActiveId = null, winToken } = props;

    const universeMap = useMemo(
      () =>
        Object.fromEntries(
          [...backDefaults, ...frontDefaults].map((t) => [t.id, t])
        ),
      []
    );

    const loadLayout = () => {
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) {
          return { back: backDefaults, front: frontDefaults, maxBack: 99, maxFront: 99 };
        }
        const parsed = JSON.parse(raw);
        const back = Array.isArray(parsed.back)
          ? parsed.back.map((id) => universeMap[id]).filter(Boolean)
          : backDefaults;
        const front = Array.isArray(parsed.front)
          ? parsed.front.map((id) => universeMap[id]).filter(Boolean)
          : frontDefaults;
        return {
          back,
          front,
          maxBack: Number(parsed.maxBack ?? 99),
          maxFront: Number(parsed.maxFront ?? 99),
        };
      } catch {
        return { back: backDefaults, front: frontDefaults, maxBack: 99, maxFront: 99 };
      }
    };

    const [layout, setLayout] = useState(loadLayout);
    const [activeId, setActiveId] = useState(
      initialActiveId || layout.front[0]?.id || layout.back[0]?.id || null
    );

    // Refresh layout when settings change
    useEffect(() => {
      const onChanged = () => {
        const next = loadLayout();
        setLayout(next);
        const all = [...next.back, ...next.front].map((t) => t.id);
        if (!all.includes(activeId)) {
          setActiveId(next.front[0]?.id || next.back[0]?.id || null);
        }
      };
      window.addEventListener(`${moduleKey}-tabs-changed`, onChanged);
      return () =>
        window.removeEventListener(`${moduleKey}-tabs-changed`, onChanged);
    }, [activeId]);

    // External activate-tab events
    useEffect(() => {
      const onActivate = (e) => {
        const id = e.detail?.id;
        if (!id) return;
        setActiveId(id);
      };
      window.addEventListener(ACTIVATE_EVT, onActivate);
      return () => window.removeEventListener(ACTIVATE_EVT, onActivate);
    }, []);

    const backRow = useMemo(
      () => layout.back.slice(0, layout.maxBack),
      [layout]
    );
    const frontRow = useMemo(
      () => layout.front.slice(0, layout.maxFront),
      [layout]
    );

    // Tear out current tab (spawns a duplicate module window in singleTab mode)
    const tearOutActive = () => {
      const tab = universeMap[activeId];
      const label = tab?.label || "Tab";
      window.dispatchEvent(
        new CustomEvent("open-panel", {
          detail: {
            id: moduleKey,
            allowDuplicate: true,
            title: `${title} • ${label}`,
            props: {
              singleTab: true,
              initialActiveId: activeId,
            },
          },
        })
      );
    };

    // Reattach (from tear-out) into main module window
    const reattach = () => {
      window.dispatchEvent(
        new CustomEvent("open-panel", { detail: { id: moduleKey } })
      );
      window.dispatchEvent(
        new CustomEvent(ACTIVATE_EVT, { detail: { id: activeId } })
      );
      if (winToken) {
        window.dispatchEvent(
          new CustomEvent("board-close-by-token", { detail: { token: winToken } })
        );
      }
    };

    // Header
    const header = (
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">
          {title}
          {singleTab && activeId ? ` • ${universeMap[activeId]?.label || ""}` : ""}
        </h3>

        <div className="flex items-center gap-2">
          {!singleTab ? (
            <>
              <button
                className="text-xs px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent(SETTINGS_EVT))
                }
                title="Tabs Settings"
              >
                Settings
              </button>
              <button
                className="text-xs px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5"
                onClick={tearOutActive}
                title="Tear out current tab"
              >
                Tear out
              </button>
            </>
          ) : (
            <>
              <button
                className="text-xs px-3 py-1.5 rounded border hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-panel", { detail: { id: moduleKey } })
                  )
                }
                title={`Open full ${title}`}
              >
                Open full
              </button>
              <button
                className="text-xs px-3 py-1.5 rounded bg-cyan-500 text-white hover:brightness-110"
                onClick={reattach}
                title="Reattach to main window"
              >
                Reattach
              </button>
            </>
          )}
        </div>
      </div>
    );

    // Placeholder content area (replace with actual views later)
    const content = (
      <div className="mt-3 border rounded-lg p-4 min-h-[280px] bg-white/70 dark:bg-slate-900/70">
        <div className="text-sm opacity-70">Selected tab:</div>
        <div className="text-lg font-semibold">{activeId || "—"}</div>
        <div className="mt-2 text-xs opacity-60">
          (Render the <b>{activeId}</b> view here)
        </div>
      </div>
    );

    // Single-tab tear-out mode: no DoubleTabs bar
    if (singleTab) {
      useEffect(() => {
        if (initialActiveId) setActiveId(initialActiveId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return (
        <div className="p-4">
          {header}
          {content}
        </div>
      );
    }

    // Normal mode with DoubleTabs
    return (
      <div className="p-4">
        {header}
        <DoubleTabs
          backRow={backRow}
          frontRow={frontRow}
          activeId={activeId}
          onChange={setActiveId}
          size="sm"
        />
        {content}
      </div>
    );
  };
}
