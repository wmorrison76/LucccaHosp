// frontend/src/modules/crm/client/App.tsx
import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary";
import SystemEnhancements from "./components/SystemEnhancements";

// PAGES
import Index from "./pages/Index";
import Contacts from "./pages/Contacts";
import Events from "./pages/Events";
import BeoReo from "./pages/BeoReo";
import Analytics from "./pages/Analytics";
import MenuAnalytics from "./pages/MenuAnalytics";
import SettingsPage from "./pages/Settings";
import TimelinePage from "./pages/Timeline";
import QuarterlyBudget from "./pages/QuarterlyBudget";
import HighPriority from "./pages/HighPriority";
import Gantt from "./pages/Gantt";
import TeamDashboard from "./pages/TeamDashboard";
import ProjectTracking from "./pages/ProjectTracking";
import AdminPanel from "./pages/AdminPanel";
import GlobalCalendar from "./pages/GlobalCalendar";
import BeoManagement from "./pages/BeoManagement";
import KPIAnalytics from "./pages/KPIAnalytics";
import SalesPipelinePage from "./pages/SalesPipeline";
import TimeManagement from "./pages/TimeManagement";
import MarketingPlan from "./pages/MarketingPlan";
import LeadManagement from "./pages/LeadManagement";
import DirectorProfile from "./pages/DirectorProfile";
import GuestExperience from "./pages/GuestExperience";
import RevenueManagement from "./pages/RevenueManagement";
import ReputationManagement from "./pages/ReputationManagement";
import MobileApps from "./pages/MobileApps";
import PMSIntegration from "./pages/PMSIntegration";
import AIMLEnhancement from "./pages/AIMLEnhancement";
import AdvancedAnalytics from "./pages/AdvancedAnalytics";
import ReportBuilder from "./pages/ReportBuilder";
import UserProfile from "./pages/UserProfile";
import LeadGenerationSystem from "./pages/LeadGenerationSystem";
import MenuDigitization from "./pages/MenuDigitization";
import SalesMeeting from "./pages/SalesMeeting";
import EchoScopeBEO from "./pages/EchoScopeBEO";
import NotFound from "./pages/NotFound";

// 👇 NEW: host page that renders your panel/whiteboard system
import WhiteboardHost from "./pages/WhiteboardHost"; // create this file (see below)

const queryClient = new QueryClient();

/** Quiet ResizeObserver spam without hiding real errors */
function suppressResizeObserverErrors() {
  window.addEventListener("error", (e) => {
    if (e.message?.includes("ResizeObserver loop")) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  });
  window.addEventListener("unhandledrejection", (e) => {
    if (typeof e.reason === "string" && e.reason.includes("ResizeObserver loop")) {
      e.preventDefault();
    }
  });
  const original = console.error;
  console.error = (...args) => {
    const msg = args.join(" ");
    if (msg.includes("ResizeObserver loop")) return;
    original(...args);
  };
  if (window.ResizeObserver) {
    const RO = window.ResizeObserver;
    window.ResizeObserver = class extends RO {
      constructor(cb: ResizeObserverCallback) {
        let t: ReturnType<typeof setTimeout> | undefined;
        super((entries, obs) => {
          clearTimeout(t);
          t = setTimeout(() => {
            try {
              cb(entries, obs);
            } catch (err: any) {
              if (!err?.message?.includes("ResizeObserver loop")) throw err;
            }
          }, 0);
        });
      }
    };
  }
}
suppressResizeObserverErrors();

function App() {
  return (
    <ErrorBoundary>
      <SystemEnhancements>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Home dashboard */}
                <Route path="/" element={<Index />} />

                {/* NEW: Echo board/panel host */}
                <Route path="/whiteboard" element={<WhiteboardHost />} />
                <Route path="/studio" element={<WhiteboardHost />} />
                {/* Redirect any legacy deep-links */}
                <Route path="/~whiteboard" element={<Navigate to="/whiteboard" replace />} />

                {/* Rest of your app */}
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/events" element={<Events />} />
                <Route path="/beo-reo" element={<BeoReo />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/menu-analytics" element={<MenuAnalytics />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/quarterly-budget" element={<QuarterlyBudget />} />
                <Route path="/high-priority" element={<HighPriority />} />
                <Route path="/gantt" element={<Gantt />} />
                <Route path="/team-dashboard" element={<TeamDashboard />} />
                <Route path="/project-tracking" element={<ProjectTracking />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/calendar" element={<GlobalCalendar />} />
                <Route path="/beo-management" element={<BeoManagement />} />
                <Route path="/kpi-analytics" element={<KPIAnalytics />} />
                <Route path="/sales" element={<SalesPipelinePage />} />
                <Route path="/time-management" element={<TimeManagement />} />
                <Route path="/marketing-plan" element={<MarketingPlan />} />
                <Route path="/lead-management" element={<LeadManagement />} />
                <Route path="/director-profile" element={<DirectorProfile />} />
                <Route path="/guest-experience" element={<GuestExperience />} />
                <Route path="/revenue-management" element={<RevenueManagement />} />
                <Route path="/reputation-management" element={<ReputationManagement />} />
                <Route path="/mobile-apps" element={<MobileApps />} />
                <Route path="/pms-integration" element={<PMSIntegration />} />
                <Route path="/ai-ml-enhancement" element={<AIMLEnhancement />} />
                <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
                <Route path="/report-builder" element={<ReportBuilder />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/lead-generation-system" element={<LeadGenerationSystem />} />
                <Route path="/menu-digitization" element={<MenuDigitization />} />
                <Route path="/sales-meeting" element={<SalesMeeting />} />
                <Route path="/echoscope-beo" element={<EchoScopeBEO />} />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </SystemEnhancements>
    </ErrorBoundary>
  );
}

export default App;
