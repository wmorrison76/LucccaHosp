/**
 * SIDEBAR REGISTRATION EXAMPLE
 * 
 * This file shows how to register Echo Recipe Pro as a panel in your 
 * Builder.io app's sidebar navigation with lazy loading.
 * 
 * Copy relevant parts to your main Sidebar/Navigation component.
 */

import React, { Suspense, lazy, useState } from "react";
import { ChefHat, BookOpen, Settings, BarChart3 } from "lucide-react";

// Lazy load the Echo Recipe Pro panel
const EchoRecipeProPanel = lazy(() => 
  import("./EchoRecipeProPanel").then(mod => ({ default: mod.EchoRecipeProPanel }))
);

/**
 * Sidebar Navigation Configuration
 * Define menu items with lazy-loaded components
 */
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component?: React.ComponentType<any>;
  children?: SidebarItem[];
  requiredRoles?: string[];
  onClick?: () => void;
}

const sidebarConfig: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
    // component: Dashboard, // If you have a dashboard component
  },
  {
    id: "echo-menu-studio",
    label: "Echo Menu Studio",
    icon: <ChefHat className="h-5 w-5" />,
    component: EchoRecipeProPanel,
    requiredRoles: ["admin", "chef", "sous_chef"],
  },
  {
    id: "documentation",
    label: "Documentation",
    icon: <BookOpen className="h-5 w-5" />,
    // component: Docs,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
    // component: Settings,
  },
];

/**
 * Example Sidebar Component Implementation
 */
export const SidebarWithEchoPanel: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [activePanelComponent, setActivePanelComponent] = useState<React.ComponentType<any> | null>(null);

  // Simulate checking user roles (replace with actual auth context)
  const userRoles = ["admin", "chef"];

  const handlePanelClick = (item: SidebarItem) => {
    if (item.component) {
      // Check if user has required roles
      if (item.requiredRoles) {
        const hasAccess = item.requiredRoles.some(role => userRoles.includes(role));
        if (!hasAccess) {
          console.warn(`User does not have access to ${item.label}`);
          return;
        }
      }

      // Set active panel
      setActivePanel(item.id);
      setActivePanelComponent(() => item.component!);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {sidebarConfig.map((item) => {
            const isActive = activePanel === item.id;
            const isClickable = item.component || item.onClick;

            return (
              <button
                key={item.id}
                onClick={() => handlePanelClick(item)}
                disabled={!isClickable}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg 
                  transition-all duration-200 text-left
                  ${isActive
                    ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-300/50"
                    : isClickable
                    ? "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                    : "text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="flex-shrink-0 h-2 w-2 rounded-full bg-cyan-500" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden">
        {activePanelComponent ? (
          <div className="h-full overflow-auto">
            <Suspense fallback={<LoadingSpinner />}>
              {React.createElement(activePanelComponent, {
                isActive: activePanel !== null,
                onClose: () => {
                  setActivePanel(null);
                  setActivePanelComponent(null);
                },
              })}
            </Suspense>
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

/**
 * Loading Spinner Component
 */
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 dark:bg-cyan-900/50 mb-4">
        <div className="h-6 w-6 rounded-full border-2 border-cyan-300 border-t-cyan-600 animate-spin" />
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">Loading panel...</p>
    </div>
  </div>
);

/**
 * Empty State Component
 * Shown when no panel is selected
 */
const EmptyState: React.FC = () => (
  <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div className="text-center">
      <ChefHat className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Welcome to Echo Menu Studio
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Select an option from the sidebar to get started
      </p>
    </div>
  </div>
);

/**
 * ALTERNATIVE: React Router Integration
 * 
 * If you're using React Router, you can use this pattern instead:
 */

import { Routes, Route, useNavigate } from "react-router-dom";

export const SidebarWithRouting: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
        <nav className="p-4 space-y-2">
          {sidebarConfig.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.component) {
                  navigate(`/panel/${item.id}`);
                }
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ROUTES */}
      <main className="flex-1">
        <Routes>
          <Route path="/panel/echo-menu-studio" element={
            <Suspense fallback={<LoadingSpinner />}>
              <EchoRecipeProPanel isActive={true} />
            </Suspense>
          } />
          <Route path="/" element={<EmptyState />} />
        </Routes>
      </main>
    </div>
  );
};

/**
 * ADVANCED: With Tab-Based Panel System
 * 
 * For a tabbed interface similar to VS Code:
 */

interface PanelTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
}

export const SidebarWithTabs: React.FC = () => {
  const [openTabs, setOpenTabs] = useState<PanelTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const handleOpenPanel = (item: SidebarItem) => {
    if (!item.component) return;

    // Check if already open
    const existing = openTabs.find(tab => tab.id === item.id);
    if (existing) {
      setActiveTabId(item.id);
      return;
    }

    // Add new tab
    const newTab: PanelTab = {
      id: item.id,
      label: item.label,
      icon: item.icon,
      component: item.component,
    };

    setOpenTabs([...openTabs, newTab]);
    setActiveTabId(item.id);
  };

  const closeTab = (tabId: string) => {
    const filtered = openTabs.filter(tab => tab.id !== tabId);
    setOpenTabs(filtered);

    if (activeTabId === tabId) {
      setActiveTabId(filtered[filtered.length - 1]?.id ?? null);
    }
  };

  const activeTab = openTabs.find(tab => tab.id === activeTabId);

  return (
    <div className="flex h-screen flex-col">
      {/* SIDEBAR + MAIN SPLIT */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {sidebarConfig.map((item) => (
              <button
                key={item.id}
                onClick={() => handleOpenPanel(item)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* TAB BAR */}
          {openTabs.length > 0 && (
            <div className="flex items-center border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 overflow-x-auto">
              {openTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 border-b-2 whitespace-nowrap
                    transition-colors
                    ${activeTabId === tab.id
                      ? "border-cyan-500 text-cyan-700 dark:text-cyan-300 bg-white dark:bg-slate-700"
                      : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300"
                    }
                  `}
                >
                  {tab.icon}
                  <span className="text-sm font-medium">{tab.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    className="ml-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded p-0.5"
                  >
                    ✕
                  </button>
                </button>
              ))}
            </div>
          )}

          {/* PANEL CONTENT */}
          <div className="flex-1 overflow-hidden">
            {activeTab ? (
              <Suspense fallback={<LoadingSpinner />}>
                {React.createElement(activeTab.component, {
                  isActive: true,
                  onClose: () => closeTab(activeTab.id),
                })}
              </Suspense>
            ) : (
              <EmptyState />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SidebarWithTabs;
