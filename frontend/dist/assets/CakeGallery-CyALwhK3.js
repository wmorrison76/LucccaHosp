import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { g as getAllCakeDesigns, a as getCakeDesignStats, e as exportDesignsAsJSON, d as deleteCakeDesign, b as getTasksByDesignId } from "./CakeBuilderPage-DCGyEV5m.js";
const CakeGallery = ({ onClose }) => {
  const [designs, setDesigns] = reactExports.useState([]);
  const [filteredDesigns, setFilteredDesigns] = reactExports.useState([]);
  const [selectedDesign, setSelectedDesign] = reactExports.useState(null);
  const [stats, setStats] = reactExports.useState(null);
  const [filters, setFilters] = reactExports.useState({
    searchQuery: "",
    sortBy: "newest"
  });
  reactExports.useEffect(() => {
    loadDesigns();
  }, []);
  reactExports.useEffect(() => {
    applyFilters();
  }, [designs, filters]);
  const loadDesigns = () => {
    const allDesigns = getAllCakeDesigns();
    setDesigns(allDesigns);
    setStats(getCakeDesignStats());
  };
  const applyFilters = () => {
    let result = designs;
    if (filters.searchQuery) {
      result = result.filter(
        (d) => d.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || d.intakeData.mainFlavor.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    if (filters.flavor) {
      result = result.filter((d) => d.intakeData.mainFlavor === filters.flavor);
    }
    if (filters.theme) {
      result = result.filter((d) => d.intakeData.theme === filters.theme);
    }
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case "oldest":
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case "guests":
          return b.intakeData.guestCount - a.intakeData.guestCount;
        default:
          return 0;
      }
    });
    setFilteredDesigns(result);
  };
  const handleDelete = (id) => {
    if (confirm("Delete this cake design? This cannot be undone.")) {
      deleteCakeDesign(id);
      loadDesigns();
      setSelectedDesign(null);
    }
  };
  const handleExport = () => {
    const jsonData = exportDesignsAsJSON();
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(jsonData));
    element.setAttribute("download", `cake-designs-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const getTotalTasks = (design) => {
    return getTasksByDesignId(design.id);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { style: styles.title, children: "📁 Cake Design Gallery" }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.subtitle, children: "Browse and manage your custom cake designs" }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, void 0),
    stats && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statsBar, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statBadge, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: stats.totalDesigns }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 131,
          columnNumber: 13
        }, void 0),
        " designs"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
        lineNumber: 130,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statBadge, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: stats.totalTasks }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 134,
          columnNumber: 13
        }, void 0),
        " tasks"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
        lineNumber: 133,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.statBadge, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: stats.totalGuestsServed }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 137,
          columnNumber: 13
        }, void 0),
        " guests served"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
        lineNumber: 136,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
      lineNumber: 129,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.mainContent, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.sidebar, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.sidebarTitle, children: "🔍 Filters" }, void 0, false, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 145,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.filterGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.filterLabel, children: "Search" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 149,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Design name or flavor...",
              value: filters.searchQuery,
              onChange: (e) => setFilters({ ...filters, searchQuery: e.target.value }),
              style: styles.filterInput
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 150,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 148,
          columnNumber: 11
        }, void 0),
        stats && Object.keys(stats.byFlavor).length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.filterGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.filterLabel, children: "Flavor" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 162,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "select",
            {
              value: filters.flavor || "",
              onChange: (e) => setFilters({ ...filters, flavor: e.target.value || void 0 }),
              style: styles.filterSelect,
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "All Flavors" }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 168,
                  columnNumber: 17
                }, void 0),
                Object.entries(stats.byFlavor).map(([flavor, count]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: flavor, children: [
                  flavor.replace(/_/g, " "),
                  " (",
                  count,
                  ")"
                ] }, flavor, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 170,
                  columnNumber: 19
                }, void 0))
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 163,
              columnNumber: 15
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 161,
          columnNumber: 13
        }, void 0),
        stats && Object.keys(stats.byTheme).length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.filterGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.filterLabel, children: "Theme" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 181,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "select",
            {
              value: filters.theme || "",
              onChange: (e) => setFilters({ ...filters, theme: e.target.value || void 0 }),
              style: styles.filterSelect,
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "All Themes" }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, void 0),
                Object.entries(stats.byTheme).map(([theme, count]) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: theme, children: [
                  theme.replace(/_/g, " "),
                  " (",
                  count,
                  ")"
                ] }, theme, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 189,
                  columnNumber: 19
                }, void 0))
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 182,
              columnNumber: 15
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 180,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.filterGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.filterLabel, children: "Sort By" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 199,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "select",
            {
              value: filters.sortBy,
              onChange: (e) => setFilters({ ...filters, sortBy: e.target.value }),
              style: styles.filterSelect,
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "newest", children: "Newest First" }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 205,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "oldest", children: "Oldest First" }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 206,
                  columnNumber: 15
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "guests", children: "Most Guests" }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 207,
                  columnNumber: 15
                }, void 0)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 200,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 198,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.filterGroup, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: handleExport, style: styles.buttonSecondary, children: "📥 Export Backup" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 213,
            columnNumber: 13
          }, void 0),
          onClose && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: onClose, style: styles.buttonCancel, children: "← Back" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 217,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 212,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.content, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.gridSection, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.sectionTitle, children: [
            "Your Designs (",
            filteredDesigns.length,
            ")"
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 228,
            columnNumber: 13
          }, void 0),
          filteredDesigns.length === 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.emptyState, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.emptyText, children: "No designs found. Create your first cake design!" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 234,
            columnNumber: 17
          }, void 0) }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 233,
            columnNumber: 15
          }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.designGrid, children: filteredDesigns.map((design) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              style: {
                ...styles.designCard,
                backgroundColor: selectedDesign?.id === design.id ? "#E8F0FF" : "#fff",
                borderColor: selectedDesign?.id === design.id ? "#0066cc" : "#ddd"
              },
              onClick: () => setSelectedDesign(design),
              children: [
                design.designImage && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("img", { src: design.designImage, alt: design.name, style: styles.designPreview }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 250,
                  columnNumber: 23
                }, void 0),
                !design.designImage && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.designPlaceholder, children: [
                  "🎂 ",
                  design.intakeData.cakeShape.replace(/_/g, " ")
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 253,
                  columnNumber: 23
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { style: styles.designName, children: design.name }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 259,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.designMeta, children: [
                  "👥 ",
                  design.intakeData.guestCount,
                  " guests | 📅",
                  " ",
                  new Date(design.intakeData.eventDate).toLocaleDateString()
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 260,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.designFlavor, children: design.intakeData.mainFlavor.replace(/_/g, " ") }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 264,
                  columnNumber: 21
                }, void 0)
              ]
            },
            design.id,
            true,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 239,
              columnNumber: 19
            },
            void 0
          )) }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 237,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 227,
          columnNumber: 11
        }, void 0),
        selectedDesign && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailsPanel, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailsHeader, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { style: styles.detailsTitle, children: selectedDesign.name }, void 0, false, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 275,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "button",
              {
                onClick: () => handleDelete(selectedDesign.id),
                style: styles.buttonDelete,
                children: "🗑️ Delete"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 276,
                columnNumber: 17
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 274,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailsContent, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailSection, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { style: styles.detailSectionTitle, children: "Cake Specifications" }, void 0, false, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 287,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { style: styles.detailList, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Flavor:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 290,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.intakeData.mainFlavor.replace(/_/g, " ")
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 289,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Shape:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 293,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.intakeData.cakeShape.replace(/_/g, " ")
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 292,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Guests:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 296,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.intakeData.guestCount
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 295,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Diameter:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 299,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.calculations.cakeDiameter,
                  '"'
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 298,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Layers:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 302,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.calculations.cakeLayers
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 301,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 288,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 286,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailSection, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { style: styles.detailSectionTitle, children: "Design Details" }, void 0, false, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 309,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { style: styles.detailList, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Icing:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 312,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.intakeData.icingType
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 311,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Color:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 315,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "span",
                    {
                      style: {
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: selectedDesign.intakeData.icingColor,
                        border: "1px solid #ccc",
                        borderRadius: "3px",
                        verticalAlign: "middle"
                      }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                      lineNumber: 316,
                      columnNumber: 23
                    },
                    void 0
                  )
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 314,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Theme:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 329,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.intakeData.theme.replace(/_/g, " ")
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 328,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 310,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 308,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailSection, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { style: styles.detailSectionTitle, children: "Production Timeline" }, void 0, false, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 336,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { style: styles.detailList, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Baking:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 339,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.calculations.bakingTimeMinutes,
                  " min/layer"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 338,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Cooling:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 342,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.calculations.coolingTimeMinutes,
                  " min"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 341,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Assembly:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 345,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.calculations.preparationTimeMinutes,
                  " min"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 344,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Total:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 348,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  Math.floor(selectedDesign.calculations.totalProductionTimeMinutes / 60),
                  "h",
                  " ",
                  selectedDesign.calculations.totalProductionTimeMinutes % 60,
                  "m"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 347,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 337,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 335,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailSection, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { style: styles.detailSectionTitle, children: [
                "Production Tasks (",
                getTotalTasks(selectedDesign).length,
                ")"
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 356,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { style: styles.detailList, children: getTotalTasks(selectedDesign).map((task, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                i + 1,
                ". ",
                task.taskType.replace(/_/g, " "),
                " (",
                task.estimatedDurationMinutes,
                " min)"
              ] }, task.id, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 361,
                columnNumber: 23
              }, void 0)) }, void 0, false, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 359,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 355,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.detailSection, children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { style: styles.detailSectionTitle, children: "Event Information" }, void 0, false, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 370,
                columnNumber: 19
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { style: styles.detailList, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Date:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 373,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  new Date(selectedDesign.intakeData.eventDate).toLocaleDateString()
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 372,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Time:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 376,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.intakeData.eventTime
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 375,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Location:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 379,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.intakeData.eventLocation
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 378,
                  columnNumber: 21
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Delivery:" }, void 0, false, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                    lineNumber: 382,
                    columnNumber: 23
                  }, void 0),
                  " ",
                  selectedDesign.intakeData.pickupOrDelivery === "pickup" ? "🚗 Pickup" : "🚚 Delivery"
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                  lineNumber: 381,
                  columnNumber: 21
                }, void 0)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
                lineNumber: 371,
                columnNumber: 19
              }, void 0)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
              lineNumber: 369,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
            lineNumber: 284,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
          lineNumber: 273,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
        lineNumber: 225,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
      lineNumber: 142,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/CakeGallery.tsx",
    lineNumber: 120,
    columnNumber: 5
  }, void 0);
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, sans-serif"
  },
  header: {
    padding: "2rem",
    backgroundColor: "#fff",
    borderBottom: "2px solid #ddd"
  },
  title: {
    margin: "0 0 0.5rem 0",
    fontSize: "2rem",
    color: "#000"
  },
  subtitle: {
    margin: "0",
    fontSize: "0.95rem",
    color: "#666"
  },
  statsBar: {
    display: "flex",
    gap: "1rem",
    padding: "1rem 2rem",
    backgroundColor: "#f9f9f9",
    borderBottom: "1px solid #ddd",
    flexWrap: "wrap"
  },
  statBadge: {
    padding: "0.5rem 1rem",
    backgroundColor: "#fff",
    borderRadius: "20px",
    border: "1px solid #ddd",
    fontSize: "0.9rem"
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    gap: "1rem",
    padding: "1.5rem",
    flex: 1,
    minHeight: 0
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "1.5rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    height: "fit-content"
  },
  sidebarTitle: {
    margin: "0",
    fontSize: "1.1rem",
    fontWeight: "600"
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  filterLabel: {
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  filterInput: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.9rem"
  },
  filterSelect: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "0.9rem",
    backgroundColor: "#fff"
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 350px",
    gap: "1rem",
    minHeight: 0
  },
  gridSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    minHeight: 0
  },
  sectionTitle: {
    margin: "0 0 1rem 0",
    fontSize: "1.1rem",
    fontWeight: "600"
  },
  designGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "1rem",
    flex: 1,
    overflowY: "auto"
  },
  designCard: {
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "2px solid #ddd",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  designPreview: {
    width: "100%",
    height: "120px",
    objectFit: "cover",
    borderRadius: "4px",
    marginBottom: "0.5rem"
  },
  designPlaceholder: {
    width: "100%",
    height: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
    marginBottom: "0.5rem",
    fontSize: "2rem"
  },
  designName: {
    margin: "0.5rem 0 0 0",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#000",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  designMeta: {
    margin: "0.25rem 0",
    fontSize: "0.75rem",
    color: "#666"
  },
  designFlavor: {
    margin: "0.25rem 0 0 0",
    fontSize: "0.8rem",
    color: "#0066cc",
    fontWeight: "500"
  },
  emptyState: {
    padding: "3rem 2rem",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "8px"
  },
  emptyText: {
    margin: "0",
    fontSize: "1rem",
    color: "#666"
  },
  detailsPanel: {
    padding: "1.5rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    border: "2px solid #0066cc",
    overflowY: "auto"
  },
  detailsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    borderBottom: "2px solid #ddd",
    paddingBottom: "1rem"
  },
  detailsTitle: {
    margin: "0",
    fontSize: "1.3rem",
    color: "#000"
  },
  detailsContent: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  },
  detailSection: {
    paddingBottom: "1rem",
    borderBottom: "1px solid #eee"
  },
  detailSectionTitle: {
    margin: "0 0 0.75rem 0",
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#000"
  },
  detailList: {
    margin: "0",
    padding: "0 0 0 1.25rem",
    fontSize: "0.85rem",
    color: "#333"
  },
  buttonSecondary: {
    padding: "0.6rem 1rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#0066cc",
    backgroundColor: "#fff",
    border: "2px solid #0066cc",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%"
  },
  buttonCancel: {
    padding: "0.6rem 1rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#666",
    backgroundColor: "#fff",
    border: "2px solid #999",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%"
  },
  buttonDelete: {
    padding: "0.5rem 1rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#ff6b6b",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
export {
  CakeGallery
};
