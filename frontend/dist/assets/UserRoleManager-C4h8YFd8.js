import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
const allPermissions = [
  "Recipes",
  "Scheduling",
  "CRM & Client Tracker",
  "Echo AI",
  "Argus Monitor",
  "Zelda Master",
  "Red Phoenix",
  "Odin's Spear",
  "Cake Builder Admin",
  "Offline Mode Control",
  "Standalone Module License Entry"
];
const defaultRoles = {
  superAdmin: [...allPermissions],
  admin: ["Recipes", "Scheduling", "CRM & Client Tracker", "Echo AI", "Argus Monitor", "Offline Mode Control"],
  standaloneUser: ["Recipes", "Cake Builder Admin", "Standalone Module License Entry"],
  viewer: ["Recipes", "Scheduling"]
};
function UserRoleManager() {
  const [roles, setRoles] = reactExports.useState(defaultRoles);
  const handlePermissionChange = (role, permission) => {
    setRoles((prevRoles) => {
      const updatedPermissions = prevRoles[role].includes(permission) ? prevRoles[role].filter((p) => p !== permission) : [...prevRoles[role], permission];
      return { ...prevRoles, [role]: updatedPermissions };
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold mb-4", children: "User Role Manager" }, void 0, false, {
      fileName: "/app/code/frontend/src/components/UserRoleManager.jsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    Object.keys(roles).map((role) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-semibold mb-2 capitalize", children: role }, void 0, false, {
        fileName: "/app/code/frontend/src/components/UserRoleManager.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2", children: allPermissions.map((permission) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "input",
          {
            type: "checkbox",
            checked: roles[role].includes(permission),
            onChange: () => handlePermissionChange(role, permission)
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/UserRoleManager.jsx",
            lineNumber: 39,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: permission }, void 0, false, {
          fileName: "/app/code/frontend/src/components/UserRoleManager.jsx",
          lineNumber: 44,
          columnNumber: 17
        }, this)
      ] }, permission, true, {
        fileName: "/app/code/frontend/src/components/UserRoleManager.jsx",
        lineNumber: 38,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/UserRoleManager.jsx",
        lineNumber: 36,
        columnNumber: 11
      }, this)
    ] }, role, true, {
      fileName: "/app/code/frontend/src/components/UserRoleManager.jsx",
      lineNumber: 34,
      columnNumber: 9
    }, this))
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/UserRoleManager.jsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
export {
  UserRoleManager as default
};
