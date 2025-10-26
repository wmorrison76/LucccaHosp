import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { ButtonPrimary } from "./ButtonPrimary-FkYvQeM7.js";
import { ModalBasic } from "./ModalBasic-36ymhrIl.js";
function useModal() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return {
    isOpen,
    openModal,
    closeModal
  };
}
function SystemControlPanel() {
  const { isOpen, openModal, closeModal } = useModal();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "system-control-panel", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ButtonPrimary, { label: "Open System Controls", onClick: openModal }, void 0, false, {
      fileName: "/app/code/frontend/src/components/SystemContro.Panel.jsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ModalBasic, { isOpen, onClose: closeModal, title: "System Control Panel", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { children: "System controls and administrative functions will appear here." }, void 0, false, {
      fileName: "/app/code/frontend/src/components/SystemContro.Panel.jsx",
      lineNumber: 13,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/code/frontend/src/components/SystemContro.Panel.jsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/SystemContro.Panel.jsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}
export {
  SystemControlPanel
};
