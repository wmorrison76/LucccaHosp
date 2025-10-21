import "./global.css";
import React from "react";
import "./add-recipe.styles.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import RecipeEditor from "./pages/RecipeEditor";
import RecipeTemplate from "./pages/RecipeTemplate";
import { AppDataProvider } from "@/context/AppDataContext";

const queryClient = new QueryClient();

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  componentDidCatch(error: any, info: any) {
    console.error("App error:", error, info);
  }
  render() {
    if (this.state.error)
      return (
        <div role="alert" style={{ padding: 16 }}>
          Something went wrong. Please refresh.
        </div>
      );
    return this.props.children as any;
  }
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppDataProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/recipe/:id" element={<RecipeEditor />} />
              <Route path="/recipe/:id/view" element={<RecipeTemplate />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppDataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

const container = document.getElementById("root")!;
const prevRoot = (window as any).__app_root;
if (prevRoot && typeof prevRoot.render === "function") {
  prevRoot.render(<App />);
} else {
  const root = createRoot(container);
  (window as any).__app_root = root;
  root.render(<App />);
}
// HMR safety: unmount previous root on module dispose to prevent duplicate portal containers
if (import.meta && (import.meta as any).hot) {
  (import.meta as any).hot.dispose(() => {
    const r = (window as any).__app_root;
    try {
      r?.unmount?.();
    } catch {}
    (window as any).__app_root = null;
  });
}
