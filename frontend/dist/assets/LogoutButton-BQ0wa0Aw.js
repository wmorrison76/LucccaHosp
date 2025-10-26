import { j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function LogoutButton() {
  const handleLogout = () => {
    alert("Logged out.");
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      onClick: handleLogout,
      className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded",
      children: "Logout"
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/LogoutButton.jsx",
      lineNumber: 9,
      columnNumber: 5
    },
    this
  );
}
export {
  LogoutButton
};
