import { register } from "../command/commands";

export function setupEchoShortcuts(){
  register({ id: "open:whiteboard", title: "Open Whiteboard", shortcut: "W", run: () => {
    window.dispatchEvent(new CustomEvent("open-panel", { detail: { id: "whiteboard", allowDuplicate: true } }));
  }, keywords:["open","panel","whiteboard"], group:"Panels" });

  register({ id: "tile:dashboard", title: "Tile Dashboard", shortcut: "", run: () => {
    window.dispatchEvent(new CustomEvent("dashboard-tile"));
  }, keywords:["layout","tile"], group:"Layout" });

  register({ id: "explain:selection", title: "Explain Selected Chart", shortcut: "", run: () => {
    window.dispatchEvent(new CustomEvent("echo-explain-selection"));
  }, keywords:["echo","explain"], group:"AI" });
}

export default setupEchoShortcuts;
