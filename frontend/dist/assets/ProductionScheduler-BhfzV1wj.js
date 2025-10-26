import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function generateProductionTasks(design) {
  const { calculations, intakeData } = design;
  const layerCount = calculations.cakeLayers;
  const baseDate = new Date(intakeData.eventDate);
  const eventTime = intakeData.eventTime;
  const [eventHour, eventMinute] = eventTime.split(":").map(Number);
  const eventDateTime = new Date(baseDate);
  eventDateTime.setHours(eventHour, eventMinute, 0);
  const totalProductionMinutes = calculations.totalProductionTimeMinutes;
  const productionStartTime = new Date(eventDateTime.getTime() - totalProductionMinutes * 60 * 1e3);
  const tasks = [];
  let currentTime = new Date(productionStartTime);
  for (let i = 0; i < layerCount; i++) {
    tasks.push({
      id: `bake-${i + 1}`,
      cakeDesignId: design.id,
      taskType: "bake",
      assignedTo: void 0,
      startTime: currentTime.toISOString(),
      estimatedDurationMinutes: calculations.bakingTimeMinutes,
      status: "pending",
      notes: `Bake layer ${i + 1}/${layerCount}. Temp: 350°F. Use cake thermometer to test doneness.`
    });
    currentTime = new Date(currentTime.getTime() + calculations.bakingTimeMinutes * 60 * 1e3);
  }
  tasks.push({
    id: "cool",
    cakeDesignId: design.id,
    taskType: "cool",
    assignedTo: void 0,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: calculations.coolingTimeMinutes,
    status: "pending",
    notes: `Cool all layers to room temperature. Allow complete cooling before handling.`
  });
  currentTime = new Date(currentTime.getTime() + calculations.coolingTimeMinutes * 60 * 1e3);
  tasks.push({
    id: "level",
    cakeDesignId: design.id,
    taskType: "level",
    assignedTo: void 0,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: 15,
    status: "pending",
    notes: `Level cake layers using cake leveler. Remove domes for even stacking.`
  });
  currentTime = new Date(currentTime.getTime() + 15 * 60 * 1e3);
  tasks.push({
    id: "fill",
    cakeDesignId: design.id,
    taskType: "fill",
    assignedTo: void 0,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: 20,
    status: "pending",
    notes: `Apply fillings between layers: ${intakeData.fillingFlavors.join(", ")}. Use offset spatula for even distribution.`
  });
  currentTime = new Date(currentTime.getTime() + 20 * 60 * 1e3);
  tasks.push({
    id: "crumb_coat",
    cakeDesignId: design.id,
    taskType: "crumb_coat",
    assignedTo: void 0,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: 15,
    status: "pending",
    notes: `Apply thin crumb coat of icing. Chill for 30 minutes to seal crumbs before final frosting.`
  });
  currentTime = new Date(currentTime.getTime() + 15 * 60 * 1e3);
  currentTime = new Date(currentTime.getTime() + 30 * 60 * 1e3);
  tasks.push({
    id: "frost",
    cakeDesignId: design.id,
    taskType: "frost",
    assignedTo: void 0,
    startTime: currentTime.toISOString(),
    estimatedDurationMinutes: 30,
    status: "pending",
    notes: `Apply final icing coat using ${intakeData.icingType}. Color: ${intakeData.icingColor}. Use piping bag for borders if desired.`
  });
  currentTime = new Date(currentTime.getTime() + 30 * 60 * 1e3);
  if (intakeData.decorationNotes.length > 0) {
    tasks.push({
      id: "decorate",
      cakeDesignId: design.id,
      taskType: "decorate",
      assignedTo: void 0,
      startTime: currentTime.toISOString(),
      estimatedDurationMinutes: 45,
      status: "pending",
      notes: `Apply decorations: ${intakeData.decorationNotes}. Theme: ${intakeData.theme}. Allow time for fondant work or additional embellishments.`
    });
  }
  return tasks;
}
const ProductionScheduler = ({ design, onTasksGenerated, onClose }) => {
  const tasks = reactExports.useMemo(() => generateProductionTasks(design), [design]);
  const [taskList, setTaskList] = reactExports.useState(tasks);
  const [selectedStaff, setSelectedStaff] = reactExports.useState({});
  const [staffMembers] = reactExports.useState([
    { id: "baker1", name: "Baker 1", role: "baker" },
    { id: "baker2", name: "Baker 2", role: "baker" },
    { id: "prep1", name: "Prep Person 1", role: "prep" },
    { id: "prep2", name: "Prep Person 2", role: "prep" },
    { id: "decorator1", name: "Decorator 1", role: "decorator" }
  ]);
  const handleTaskStatusChange = (taskId, status) => {
    setTaskList(
      (prev) => prev.map(
        (task) => task.id === taskId ? {
          ...task,
          status,
          completedTime: status === "completed" ? (/* @__PURE__ */ new Date()).toISOString() : void 0
        } : task
      )
    );
  };
  const handleAssignStaff = (taskId, staffName) => {
    setTaskList(
      (prev) => prev.map(
        (task) => task.id === taskId ? { ...task, assignedTo: staffName || void 0 } : task
      )
    );
    setSelectedStaff((prev) => ({
      ...prev,
      [taskId]: staffName
    }));
  };
  const getTaskColor = (taskType) => {
    const colors = {
      bake: "#FF6B6B",
      cool: "#4ECDC4",
      level: "#95E1D3",
      fill: "#F38181",
      crumb_coat: "#AA96DA",
      frost: "#FCBAD3",
      decorate: "#FFD93D"
    };
    return colors[taskType] || "#999";
  };
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };
  const taskTypeLabels = {
    bake: "🔥 Bake",
    cool: "❄️ Cool",
    level: "📐 Level",
    fill: "🍓 Fill",
    crumb_coat: "🧈 Crumb Coat",
    frost: "🎨 Frost",
    decorate: "✨ Decorate"
  };
  const completedTasks = taskList.filter((t) => t.status === "completed").length;
  const completionPercentage = Math.round(completedTasks / taskList.length * 100);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { style: styles.title, children: "📋 Production Scheduler" }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
        lineNumber: 231,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.subtitle, children: [
        design.name,
        " | ",
        design.intakeData.guestCount,
        " guests | ",
        design.intakeData.eventDate
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
        lineNumber: 232,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.progressBar, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "div",
        {
          style: {
            ...styles.progressFill,
            width: `${completionPercentage}%`
          }
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
          lineNumber: 238,
          columnNumber: 11
        },
        void 0
      ) }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
        lineNumber: 237,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.progressText, children: [
        completedTasks,
        " of ",
        taskList.length,
        " tasks completed (",
        completionPercentage,
        "%)"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
        lineNumber: 245,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineContainer, children: taskList.map((task, index) => {
      const startDate = formatDate(task.startTime);
      const startTime = formatTime(task.startTime);
      const endTime = formatTime(
        new Date(new Date(task.startTime).getTime() + task.estimatedDurationMinutes * 60 * 1e3).toISOString()
      );
      return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineItem, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timeline, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              style: {
                ...styles.timelineDot,
                backgroundColor: task.status === "completed" ? "#22C55E" : task.status === "in_progress" ? getTaskColor(task.taskType) : "#DDD"
              }
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
              lineNumber: 263,
              columnNumber: 17
            },
            void 0
          ),
          index < taskList.length - 1 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.timelineConnector }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
            lineNumber: 274,
            columnNumber: 49
          }, void 0)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
          lineNumber: 262,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            style: {
              ...styles.taskCard,
              borderLeftColor: getTaskColor(task.taskType)
            },
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.taskHeader, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    "span",
                    {
                      style: {
                        ...styles.taskTypeLabel,
                        backgroundColor: getTaskColor(task.taskType)
                      },
                      children: taskTypeLabels[task.taskType]
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                      lineNumber: 287,
                      columnNumber: 21
                    },
                    void 0
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: styles.taskDuration, children: [
                    task.estimatedDurationMinutes,
                    " min"
                  ] }, void 0, true, {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                    lineNumber: 295,
                    columnNumber: 21
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                  lineNumber: 286,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "select",
                  {
                    value: task.status,
                    onChange: (e) => handleTaskStatusChange(task.id, e.target.value),
                    style: {
                      ...styles.statusSelect,
                      backgroundColor: task.status === "completed" ? "#D1FAE5" : task.status === "in_progress" ? "#FEF3C7" : "#F3F4F6"
                    },
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "pending", children: "⏳ Pending" }, void 0, false, {
                        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                        lineNumber: 312,
                        columnNumber: 21
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "in_progress", children: "▶️ In Progress" }, void 0, false, {
                        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                        lineNumber: 313,
                        columnNumber: 21
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "completed", children: "✅ Completed" }, void 0, false, {
                        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                        lineNumber: 314,
                        columnNumber: 21
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "paused", children: "⏸️ Paused" }, void 0, false, {
                        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                        lineNumber: 315,
                        columnNumber: 21
                      }, void 0)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                    lineNumber: 299,
                    columnNumber: 19
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                lineNumber: 285,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.taskTime, children: [
                "📅 ",
                startDate,
                " | ⏰ ",
                startTime,
                " - ",
                endTime
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                lineNumber: 320,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { style: styles.taskNotes, children: task.notes }, void 0, false, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                lineNumber: 325,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.assignmentSection, children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { style: styles.assignLabel, children: "Assign to: " }, void 0, false, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                  lineNumber: 329,
                  columnNumber: 19
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "select",
                  {
                    value: selectedStaff[task.id] || "",
                    onChange: (e) => handleAssignStaff(task.id, e.target.value),
                    style: styles.staffSelect,
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "— Unassigned —" }, void 0, false, {
                        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                        lineNumber: 335,
                        columnNumber: 21
                      }, void 0),
                      staffMembers.map((staff) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: staff.name, children: [
                        staff.name,
                        " (",
                        staff.role,
                        ")"
                      ] }, staff.id, true, {
                        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                        lineNumber: 337,
                        columnNumber: 23
                      }, void 0))
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                    lineNumber: 330,
                    columnNumber: 19
                  },
                  void 0
                ),
                task.assignedTo && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { style: styles.assignedTo, children: [
                  "👤 ",
                  task.assignedTo
                ] }, void 0, true, {
                  fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                  lineNumber: 342,
                  columnNumber: 39
                }, void 0)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
                lineNumber: 328,
                columnNumber: 17
              }, void 0)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
            lineNumber: 278,
            columnNumber: 15
          },
          void 0
        )
      ] }, task.id, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
        lineNumber: 260,
        columnNumber: 13
      }, void 0);
    }) }, void 0, false, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
      lineNumber: 251,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.summarySection, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { style: styles.summaryTitle, children: "📊 Production Summary" }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
        lineNumber: 352,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.summaryGrid, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.summaryItem, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Total Tasks:" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
            lineNumber: 355,
            columnNumber: 13
          }, void 0),
          " ",
          taskList.length
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
          lineNumber: 354,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.summaryItem, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Total Duration:" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
            lineNumber: 358,
            columnNumber: 13
          }, void 0),
          " ",
          Math.floor(design.calculations.totalProductionTimeMinutes / 60),
          "h",
          " ",
          design.calculations.totalProductionTimeMinutes % 60,
          "m"
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
          lineNumber: 357,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.summaryItem, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Production Start:" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
            lineNumber: 363,
            columnNumber: 13
          }, void 0),
          " ",
          formatDate(taskList[0].startTime),
          " ",
          formatTime(taskList[0].startTime)
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
          lineNumber: 362,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.summaryItem, children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", { children: "Event Date:" }, void 0, false, {
            fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
            lineNumber: 367,
            columnNumber: 13
          }, void 0),
          " ",
          design.intakeData.eventDate,
          " ",
          design.intakeData.eventTime
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
          lineNumber: 366,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
        lineNumber: 353,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
      lineNumber: 351,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { style: styles.actionButtons, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => {
            onTasksGenerated?.(taskList);
          },
          style: styles.buttonPrimary,
          children: "💾 Save Tasks"
        },
        void 0,
        false,
        {
          fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
          lineNumber: 375,
          columnNumber: 9
        },
        void 0
      ),
      onClose && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("button", { onClick: onClose, style: styles.buttonSecondary, children: "← Back" }, void 0, false, {
        fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
        lineNumber: 384,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
      lineNumber: 374,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/modules/PastryLibrary/CakeBuilder/ProductionScheduler.tsx",
    lineNumber: 228,
    columnNumber: 5
  }, void 0);
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "100vh",
    overflow: "auto",
    backgroundColor: "#f5f5f5",
    fontFamily: "system-ui, -apple-system, sans-serif"
  },
  header: {
    padding: "2rem",
    backgroundColor: "#fff",
    borderBottom: "2px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  title: {
    margin: "0 0 0.5rem 0",
    fontSize: "1.8rem",
    color: "#000"
  },
  subtitle: {
    margin: "0 0 1rem 0",
    fontSize: "0.95rem",
    color: "#666"
  },
  progressBar: {
    height: "8px",
    backgroundColor: "#eee",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "0.5rem"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ECDC4",
    transition: "width 0.3s ease"
  },
  progressText: {
    margin: "0",
    fontSize: "0.85rem",
    color: "#666"
  },
  timelineContainer: {
    flex: 1,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  timelineItem: {
    display: "flex",
    gap: "1rem"
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40px"
  },
  timelineDot: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "3px solid #fff",
    backgroundColor: "#ddd"
  },
  timelineConnector: {
    width: "2px",
    height: "80px",
    backgroundColor: "#ddd",
    marginTop: "0.5rem"
  },
  taskCard: {
    flex: 1,
    padding: "1.5rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    borderLeft: "4px solid #999",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem"
  },
  taskTypeLabel: {
    display: "inline-block",
    padding: "0.4rem 0.8rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#fff",
    borderRadius: "4px",
    marginRight: "0.5rem"
  },
  taskDuration: {
    fontSize: "0.85rem",
    color: "#666",
    fontWeight: "500"
  },
  statusSelect: {
    padding: "0.5rem",
    fontSize: "0.85rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer"
  },
  taskTime: {
    margin: "0.5rem 0",
    fontSize: "0.9rem",
    color: "#666"
  },
  taskNotes: {
    margin: "0.75rem 0",
    fontSize: "0.9rem",
    color: "#333",
    lineHeight: "1.4"
  },
  assignmentSection: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #eee"
  },
  assignLabel: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#333"
  },
  staffSelect: {
    padding: "0.4rem 0.6rem",
    fontSize: "0.85rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer"
  },
  assignedTo: {
    marginLeft: "1rem",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#0066cc"
  },
  summarySection: {
    padding: "2rem",
    backgroundColor: "#fff",
    borderTop: "2px solid #ddd"
  },
  summaryTitle: {
    margin: "0 0 1rem 0",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#000"
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem"
  },
  summaryItem: {
    padding: "0.75rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
    fontSize: "0.9rem"
  },
  actionButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#fff",
    borderTop: "2px solid #ddd"
  },
  buttonPrimary: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#0066cc",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },
  buttonSecondary: {
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#0066cc",
    backgroundColor: "#fff",
    border: "2px solid #0066cc",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
export {
  ProductionScheduler
};
