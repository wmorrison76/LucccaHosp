import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const eventTypes = [
  "Wedding",
  "Birthday",
  "Baby Shower",
  "Corporate",
  "Anniversary",
  "Bar Mitzvah",
  "Bat Mitzvah",
  "Graduation",
  "Quinceañera",
  "Holiday",
  "Bridal Shower",
  "Engagement",
  "Retirement",
  "Just Because"
];
function CakeConfigSidebar({
  eventType,
  setEventType,
  guestCount,
  setGuestCount,
  theme,
  setTheme,
  notes,
  setNotes
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-72 bg-white border-r border-gray-200 p-6 shadow-inner rounded-tr-lg rounded-br-lg", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-xl font-bold mb-4 text-zinc-700", children: "Cake Details" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
      lineNumber: 18,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block mb-2 text-sm font-medium text-zinc-600", children: "Event Type" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "select",
      {
        value: eventType,
        onChange: (e) => setEventType(e.target.value),
        className: "w-full mb-4 p-2 border rounded",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select" }, void 0, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
            lineNumber: 26,
            columnNumber: 9
          }, this),
          eventTypes.map((type) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { children: type }, type, false, {
            fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
            lineNumber: 28,
            columnNumber: 11
          }, this))
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
        lineNumber: 21,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block mb-2 text-sm font-medium text-zinc-600", children: "Guest Count" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        type: "number",
        value: guestCount,
        onChange: (e) => setGuestCount(Number(e.target.value)),
        className: "w-full mb-4 p-2 border rounded",
        placeholder: "e.g. 75"
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
        lineNumber: 33,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block mb-2 text-sm font-medium text-zinc-600", children: "Theme" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
      lineNumber: 41,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        type: "text",
        value: theme,
        onChange: (e) => setTheme(e.target.value),
        className: "w-full mb-4 p-2 border rounded",
        placeholder: "Winter Wonderland, Tropical..."
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
        lineNumber: 42,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "block mb-2 text-sm font-medium text-zinc-600", children: "Special Notes" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
      lineNumber: 50,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "textarea",
      {
        value: notes,
        onChange: (e) => setNotes(e.target.value),
        className: "w-full p-2 border rounded",
        rows: 3,
        placeholder: "e.g. Contains nuts, vegan option..."
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
        lineNumber: 51,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/PastryLibrary/CakeConfigSidebar.jsx",
    lineNumber: 17,
    columnNumber: 5
  }, this);
}
export {
  CakeConfigSidebar as default
};
