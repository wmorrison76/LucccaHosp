const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/IntakeForm-C39xjSZK.js","assets/index-DfBvRGLH.js","assets/CakeSizeCalculator-D9SPtCeL.js","assets/CakeBuilder-DZ7_EdLk.js","assets/react-three-fiber.esm-CIonkBiw.js","assets/vanilla-Cp7rd2DV.js","assets/Board-6RvNRUqx.js","assets/settings-CL5KYzJi.js","assets/ProductionScheduler-BhfzV1wj.js","assets/CakeGallery-CyALwhK3.js"])))=>i.map(i=>d[i]);
import { r as reactExports, j as jsxDevRuntimeExports, _ as __vitePreload } from "./index-DfBvRGLH.js";
const STORAGE_KEY = "luccca_cake_designs";
const TASKS_KEY = "luccca_production_tasks";
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(TASKS_KEY)) {
    localStorage.setItem(TASKS_KEY, JSON.stringify([]));
  }
}
function saveCakeDesign(design) {
  initializeStorage();
  const designs = getAllCakeDesigns();
  const existingIndex = designs.findIndex((d) => d.id === design.id);
  if (existingIndex !== -1) {
    designs[existingIndex] = design;
  } else {
    designs.push(design);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  return design;
}
function getAllCakeDesigns() {
  initializeStorage();
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading cake designs:", error);
    return [];
  }
}
function deleteCakeDesign(id) {
  initializeStorage();
  const designs = getAllCakeDesigns();
  const filtered = designs.filter((d) => d.id !== id);
  if (filtered.length < designs.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    deleteTasksByDesignId(id);
    return true;
  }
  return false;
}
function saveProductionTasks(tasks) {
  initializeStorage();
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}
function getAllProductionTasks() {
  initializeStorage();
  try {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading production tasks:", error);
    return [];
  }
}
function getTasksByDesignId(designId) {
  const tasks = getAllProductionTasks();
  return tasks.filter((t) => t.cakeDesignId === designId);
}
function deleteTasksByDesignId(designId) {
  const tasks = getAllProductionTasks();
  const filtered = tasks.filter((t) => t.cakeDesignId !== designId);
  localStorage.setItem(TASKS_KEY, JSON.stringify(filtered));
}
function getCakeDesignStats() {
  const designs = getAllCakeDesigns();
  const tasks = getAllProductionTasks();
  const stats = {
    totalDesigns: designs.length,
    totalTasks: tasks.length,
    byFlavor: {},
    byTheme: {},
    totalGuestsServed: 0
  };
  designs.forEach((d) => {
    const flavor = d.intakeData.mainFlavor;
    const theme = d.intakeData.theme;
    stats.byFlavor[flavor] = (stats.byFlavor[flavor] || 0) + 1;
    stats.byTheme[theme] = (stats.byTheme[theme] || 0) + 1;
    stats.totalGuestsServed += d.intakeData.guestCount;
  });
  return stats;
}
function exportDesignsAsJSON() {
  const designs = getAllCakeDesigns();
  const tasks = getAllProductionTasks();
  return JSON.stringify(
    {
      version: "1.0",
      exportDate: (/* @__PURE__ */ new Date()).toISOString(),
      designs,
      tasks
    },
    null,
    2
  );
}
const IntakeForm = reactExports.lazy(() => __vitePreload(() => import("./IntakeForm-C39xjSZK.js"), true ? __vite__mapDeps([0,1,2]) : void 0).then((m) => ({ default: m.IntakeForm })));
const CakeBuilder = reactExports.lazy(() => __vitePreload(() => import("./CakeBuilder-DZ7_EdLk.js"), true ? __vite__mapDeps([3,1,4,5,6,7,2]) : void 0).then((m) => ({ default: m.CakeBuilder })));
const ProductionScheduler = reactExports.lazy(() => __vitePreload(() => import("./ProductionScheduler-BhfzV1wj.js"), true ? __vite__mapDeps([8,1]) : void 0).then((m) => ({ default: m.ProductionScheduler })));
const CakeGallery = reactExports.lazy(() => __vitePreload(() => import("./CakeGallery-CyALwhK3.js"), true ? __vite__mapDeps([9,1]) : void 0).then((m) => ({ default: m.CakeGallery })));
const CakeBuilderPage = () => {
  const [state, setState] = reactExports.useState({
    currentStep: "home"
  });
  reactExports.useEffect(() => {
    console.log("[CakeBuilder] Page loaded");
  }, []);
  const handleIntakeSubmit = (cakeData) => {
    console.log("[CakeBuilder] Intake data received:", cakeData);
    setState({
      currentStep: "design",
      cakeData
    });
  };
  const handleDesignExport = (design) => {
    console.log("[CakeBuilder] Design exported:", design.id);
    setState({
      currentStep: "schedule",
      cakeData: state.cakeData,
      cakeDesign: design
    });
  };
  const handleTasksGenerated = (tasks) => {
    if (!state.cakeDesign) {
      console.error("[CakeBuilder] No design available for tasks");
      return;
    }
    console.log("[CakeBuilder] Tasks generated:", tasks.length);
    saveCakeDesign(state.cakeDesign);
    saveProductionTasks(tasks);
    setState({
      ...state,
      productionTasks: tasks,
      currentStep: "home"
    });
    alert(`✅ Cake design saved!

${state.cakeDesign.name}
${tasks.length} production tasks created`);
  };
  const handleBackClick = () => {
    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep === "design" ? "intake" : "home"
    }));
  };
  const handleGalleryClick = () => {
    setState({
      ...state,
      currentStep: "gallery"
    });
  };
  const handleBackToHome = () => {
    setState({
      currentStep: "home",
      cakeData: void 0,
      cakeDesign: void 0,
      productionTasks: void 0
    });
  };
  const renderContent = () => {
    const LoadingFallback = () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { padding: "2rem", textAlign: "center", color: "#999" }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "Loading..." }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 108,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 107,
      columnNumber: 7
    }, void 0);
    switch (state.currentStep) {
      case "intake":
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoadingFallback, {}, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 115,
          columnNumber: 31
        }, void 0), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          IntakeForm,
          {
            onSubmit: handleIntakeSubmit,
            onCancel: handleBackToHome
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
            lineNumber: 116,
            columnNumber: 13
          },
          void 0
        ) }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 115,
          columnNumber: 11
        }, void 0);
      case "design":
        if (!state.cakeData) return null;
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoadingFallback, {}, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 126,
          columnNumber: 31
        }, void 0), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          CakeBuilder,
          {
            cakeData: state.cakeData,
            onExport: handleDesignExport,
            onClose: handleBackClick
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
            lineNumber: 127,
            columnNumber: 13
          },
          void 0
        ) }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, void 0);
      case "schedule":
        if (!state.cakeDesign) return null;
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoadingFallback, {}, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 138,
          columnNumber: 31
        }, void 0), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          ProductionScheduler,
          {
            design: state.cakeDesign,
            onTasksGenerated: handleTasksGenerated,
            onClose: handleBackToHome
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
            lineNumber: 139,
            columnNumber: 13
          },
          void 0
        ) }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, void 0);
      case "gallery":
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LoadingFallback, {}, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 149,
          columnNumber: 31
        }, void 0), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          CakeGallery,
          {
            onClose: handleBackToHome
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
            lineNumber: 150,
            columnNumber: 13
          },
          void 0
        ) }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, void 0);
      case "home":
      default:
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(HomePage, { onIntakeClick: () => setState({ ...state, currentStep: "intake" }), onGalleryClick: handleGalleryClick }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 158,
          columnNumber: 16
        }, void 0);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.pageContainer, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: { padding: "2rem", textAlign: "center" }, children: "Loading CakeBuilder..." }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
    lineNumber: 164,
    columnNumber: 27
  }, void 0), children: renderContent() }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
    lineNumber: 164,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
    lineNumber: 163,
    columnNumber: 5
  }, void 0);
};
const HomePage = ({ onIntakeClick, onGalleryClick }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.homeContainer, children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.homeHeader, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { style: styles.homeTitle, children: "🎂 LUCCCA CakeBuilder" }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.homeSubtitle, children: "Professional Cake Design & Production Management" }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 179,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
    lineNumber: 177,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.homeContent, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.welcomeCard, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: styles.cardTitle, children: "Welcome to CakeBuilder!" }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 186,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.cardText, children: "Create stunning custom cakes with our professional design studio. Collect client requirements, visualize designs in 3D, and generate production schedules automatically." }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 187,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 185,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureGrid, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureCard, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureIcon, children: "📋" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 196,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.featureTitle, children: "Client Intake" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 197,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.featureText, children: "Collect all event details, cake preferences, and guest count in one form" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 198,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 195,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureCard, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureIcon, children: "🎨" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 202,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.featureTitle, children: "3D Design" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 203,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.featureText, children: "Visualize custom cakes with realistic textures, colors, and multi-layer designs" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 204,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 201,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureCard, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureIcon, children: "📊" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 208,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.featureTitle, children: "Production Timeline" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 209,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.featureText, children: "Auto-generated task schedule with time estimates and staff assignments" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 210,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 207,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureCard, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.featureIcon, children: "📁" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.featureTitle, children: "Design Gallery" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 215,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.featureText, children: "Browse, search, and manage all your custom cake designs in one place" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 216,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 213,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 194,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.actionSection, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("[HomePage] Create New Cake Order clicked");
            onIntakeClick();
          },
          onMouseDown: (e) => e.stopPropagation(),
          onMouseEnter: (e) => {
            const btn = e.currentTarget;
            btn.style.backgroundColor = "#0052a3";
            btn.style.transform = "translateY(-2px)";
          },
          onMouseLeave: (e) => {
            const btn = e.currentTarget;
            btn.style.backgroundColor = "#0066cc";
            btn.style.transform = "translateY(0)";
          },
          style: styles.buttonLarge,
          children: "➕ Create New Cake Order"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 222,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("[HomePage] View Cake Gallery clicked");
            onGalleryClick();
          },
          onMouseDown: (e) => e.stopPropagation(),
          onMouseEnter: (e) => {
            const btn = e.currentTarget;
            btn.style.borderColor = "#0052a3";
            btn.style.color = "#0052a3";
            btn.style.transform = "translateY(-2px)";
          },
          onMouseLeave: (e) => {
            const btn = e.currentTarget;
            btn.style.borderColor = "#0066cc";
            btn.style.color = "#0066cc";
            btn.style.transform = "translateY(0)";
          },
          style: styles.buttonLargeSecondary,
          children: "📁 View Cake Gallery"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 244,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 221,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(QuickStats, {}, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 271,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
    lineNumber: 183,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.homeFooter, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: [
    "Built with ❤️ for pastry chefs |",
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", style: styles.link, children: " Documentation" }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 278,
      columnNumber: 9
    }, void 0),
    " |",
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "#", style: styles.link, children: " Support" }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 279,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
    lineNumber: 276,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
    lineNumber: 275,
    columnNumber: 5
  }, void 0)
] }, void 0, true, {
  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
  lineNumber: 175,
  columnNumber: 3
}, void 0);
const QuickStats = () => {
  const [stats, setStats] = reactExports.useState({ designs: 0, tasks: 0, guests: 0 });
  reactExports.useEffect(() => {
    const designs = getAllCakeDesigns();
    const tasks = getAllProductionTasks();
    const guests = designs.reduce((sum, d) => sum + (d.intakeData?.guestCount || 0), 0);
    setStats({
      designs: designs.length,
      tasks: tasks.length,
      guests
    });
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statsCard, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.statsTitle, children: "📈 Your Stats" }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 306,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statsGrid, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statItem, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statNumber, children: stats.designs }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 309,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statLabel, children: "Designs Created" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 310,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 308,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statItem, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statNumber, children: stats.tasks }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 313,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statLabel, children: "Production Tasks" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 314,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 312,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statItem, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statNumber, children: stats.guests }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 317,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statLabel, children: "Guests Served" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
          lineNumber: 318,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
        lineNumber: 316,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
      lineNumber: 307,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeBuilderPage.tsx",
    lineNumber: 305,
    columnNumber: 5
  }, void 0);
};
const styles = {
  pageContainer: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, sans-serif"
  },
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
    width: "100%",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  homeHeader: {
    padding: "0.75rem 1.5rem",
    textAlign: "center",
    color: "#fff",
    background: "rgba(0,0,0,0.3)",
    flexShrink: 0
  },
  homeTitle: {
    margin: "0 0 0.25rem 0",
    fontSize: "1.3rem",
    fontWeight: "bold"
  },
  homeSubtitle: {
    margin: "0",
    fontSize: "0.85rem",
    opacity: 0.9
  },
  homeContent: {
    flex: 1,
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    padding: "1rem",
    overflowY: "auto"
  },
  welcomeCard: {
    padding: "1.25rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    marginBottom: "1rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  cardTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.2rem",
    color: "#000"
  },
  cardText: {
    margin: "0",
    fontSize: "0.9rem",
    color: "#666",
    lineHeight: "1.5"
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem"
  },
  featureCard: {
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  featureIcon: {
    fontSize: "2rem",
    marginBottom: "0.5rem"
  },
  featureTitle: {
    margin: "0 0 0.25rem 0",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#000"
  },
  featureText: {
    margin: "0",
    fontSize: "0.8rem",
    color: "#666"
  },
  actionSection: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
    flexWrap: "wrap"
  },
  buttonLarge: {
    padding: "0.75rem 1.5rem",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0066cc",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,102,204,0.3)",
    transition: "all 0.3s ease",
    position: "relative",
    zIndex: 10,
    pointerEvents: "auto",
    outline: "none",
    minWidth: "auto"
  },
  buttonLargeSecondary: {
    padding: "0.75rem 1.5rem",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#0066cc",
    backgroundColor: "#fff",
    border: "2px solid #0066cc",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    zIndex: 10,
    pointerEvents: "auto",
    outline: "none",
    minWidth: "auto"
  },
  statsCard: {
    padding: "1.25rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  statsTitle: {
    margin: "0 0 1rem 0",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#000"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "0.75rem"
  },
  statItem: {
    textAlign: "center",
    padding: "0.75rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px"
  },
  statNumber: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#0066cc"
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#666",
    marginTop: "0.25rem"
  },
  homeFooter: {
    padding: "0.75rem 1.5rem",
    textAlign: "center",
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.3)",
    fontSize: "0.75rem",
    flexShrink: 0
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    marginLeft: "0.5rem"
  }
};
const CakeBuilderPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CakeBuilderPage,
  default: CakeBuilderPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  CakeBuilderPage$1 as C,
  getCakeDesignStats as a,
  getTasksByDesignId as b,
  deleteCakeDesign as d,
  exportDesignsAsJSON as e,
  getAllCakeDesigns as g
};
