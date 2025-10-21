// src/echo/echoClient.js
// Echo WS client with:
// - resilient connect + local fallback
// - tiny event bus (status/assistant/messages)
// - intent extraction to open panels / board commands
// - global helpers: window.__echoSend, window.echo.{sendText,setTheme,ping}

let installed = false;
let ws = null;
let reconnectTimer = null;
let localAPI = null;

const bus = new EventTarget();
export function getEchoBus() { return bus; }
function emit(type, detail) {
  bus.dispatchEvent(new CustomEvent(type, { detail }));
  // also emit a catch-all "message"
  bus.dispatchEvent(new CustomEvent("message", { detail: { type, ...detail } }));
}

/* ---------------- local fallback ---------------- */
function makeLocalAPI() {
  if (localAPI) return localAPI;
  window.__echoLocal = true;
  emit("status", { status: "local" });
  localAPI = {
    sendText(text) {
      setTimeout(() => {
        const reply =
          `Local Echo (no WS) heard: “${text}”.\n` +
          `Try “open whiteboard”, “open pastry”, “dock all”, or “dark mode”.\n` +
          `I’ll auto-switch to online when the bridge is up.`;
        emit("assistant_text", { text: reply });
        // parse intent even in local mode
        handleAssistantIntent({ type: "chat.assistant", text: reply });
      }, 180);
    },
    sendCmd(cmd, args = {}) {
      setTimeout(() => emit("assistant_text", { text: `Local exec → ${cmd} ${JSON.stringify(args)}` }), 100);
    },
  };
  return localAPI;
}

/* ---------------- helpers: text → intent ---------------- */
const PANEL_ALIASES = {
  whiteboard: ["whiteboard", "dashboard", "board", "canvas"],
  home:       ["welcome", "home", "start"],
  pastry:     ["pastry", "baking", "dessert", "cakes", "breads", "doughs"],
  culinary:   ["kitchen", "culinary", "recipes", "library"],
  mixology:   ["mixology", "bar", "cocktails", "drinks"],
  scheduling: ["schedule", "scheduler", "shifts", "calendar"],
  viewer:     ["viewer", "page viewer", "file viewer"],
  studio:     ["widget studio", "studio", "widgets"],
  cake:       ["cake builder", "builder", "cakes module"],
  note:       ["note", "sticky", "post it", "backboard note"],
};
function aliasToId(text) {
  const t = text.toLowerCase();
  for (const id of Object.keys(PANEL_ALIASES)) {
    if (PANEL_ALIASES[id].some(k => t.includes(k))) return id;
  }
  return null;
}

function handleAssistantIntent(msg) {
  const text = (msg?.text || "").toLowerCase();

  // explicit intents from bridge
  if (msg?.action?.openPanel) {
    dispatchOpenPanel(msg.action.openPanel, msg.action.opts);
    return;
  }
  if (msg?.action?.boardCmd) {
    dispatchBoardCmd(msg.action.boardCmd);
    return;
  }
  if (msg?.action?.theme) {
    setTheme(msg.action.theme);
    return;
  }

  // heuristics from free-text assistant replies
  const openId = aliasToId(text);
  if (openId) dispatchOpenPanel(openId);

  if (/dock all|minimi[sz]e all|hide windows/.test(text)) dispatchBoardCmd("dock_all");
  if (/restore all|show windows|undock/.test(text))      dispatchBoardCmd("restore_all");
  if (/reset layout|clear layout/.test(text))            dispatchBoardCmd("reset_layout");

  if (/\bdark mode\b|night theme|tron\b/.test(text)) setTheme("dark");
  if (/\blight mode\b|day theme|apple\b/.test(text)) setTheme("light");
}

function dispatchOpenPanel(id, opts = {}) {
  window.dispatchEvent(new CustomEvent("open-panel", {
    detail: { id, allowDuplicate: true, ...opts },
  }));
  window.dispatchEvent(new CustomEvent("echo-notify", { detail: { text: `Opening ${id}…`, tone: "ok" }}));
}
function dispatchBoardCmd(cmd) {
  window.dispatchEvent(new CustomEvent("board-cmd", { detail: { cmd } }));
}

function setTheme(mode) {
  const dark = mode === "dark";
  document.documentElement.classList.toggle("dark", dark);
  emit("theme.change", { mode });
}

/* ---------------- public install ---------------- */
export function installEchoHook(opts = {}) {
  if (installed) return ws;
  installed = true;

  const host = location.hostname || "localhost";
  const WS_URL =
    (opts.baseUrl && opts.baseUrl.startsWith("ws")) ? opts.baseUrl : `ws://${host}:9091`;

  // expose global send helpers (usable even before WS open)
  window.__echoSend = (payload) => {
    try { ws?.send(JSON.stringify(payload)); } catch {}
  };
  window.echo = {
    sendText(text) { sendChat(text); },
    setTheme(mode) { setTheme(mode); window.__echoSend?.({ type: "theme.change", mode }); },
    ping() { window.__echoSend?.({ type: "ping", ts: Date.now() }); },
    bus,
  };

  emit("status", { status: "connecting" });

  const localFallback = setTimeout(() => { if (!ws || ws.readyState !== 1) makeLocalAPI(); }, 700);

  connect(WS_URL, localFallback);
  return ws;
}

/* ---------------- internal: ws connect ---------------- */
function connect(url, localFallback) {
  try {
    ws = new WebSocket(url);
    window.__echoWS = ws;

    ws.addEventListener("open", () => {
      clearTimeout(localFallback);
      window.__echoLocal = false;
      emit("status", { status: "online" });
      // announce theme on connect
      const mode = document.documentElement.classList.contains("dark") ? "dark" : "light";
      try { ws.send(JSON.stringify({ type: "theme.change", mode })); } catch {}
    });

    ws.addEventListener("message", (e) => {
      let msg; try { msg = JSON.parse(e.data); } catch { return; }

      // normalize and broadcast
      if (msg.type === "assistant_text" && msg.text) emit("assistant_text", { text: msg.text });
      emit(msg.type || "message", msg);

      // intent wiring
      if (msg.type === "chat.assistant" || msg.type === "assistant_text" || msg.type === "assistant.intent") {
        handleAssistantIntent(msg);
      }
      if (msg.type === "theme.change" && msg.mode) setTheme(msg.mode);
    });

    const goLocal = () => { makeLocalAPI(); scheduleReconnect(url); };
    ws.addEventListener("error", goLocal);
    ws.addEventListener("close", goLocal);
  } catch {
    makeLocalAPI();
    scheduleReconnect(url);
  }
}

function scheduleReconnect(url) {
  clearTimeout(reconnectTimer);
  reconnectTimer = setTimeout(() => {
    emit("status", { status: window.__echoLocal ? "local" : "connecting" });
    connect(url, setTimeout(() => makeLocalAPI(), 800));
  }, 2500);
}

/* ---------------- send helpers ---------------- */
function sendChat(text) {
  const msg = { type: "chat.user", text: String(text ?? "") };
  if (ws && ws.readyState === 1) {
    try { ws.send(JSON.stringify(msg)); } catch {}
  } else {
    makeLocalAPI().sendText(msg.text);
  }
  // best-effort HTTP fallback (non-blocking)
  try {
    const u = `http://localhost:9091/send?type=chat.user&text=${encodeURIComponent(msg.text)}`;
    fetch(u).catch(() => {});
  } catch {}
}

export default installEchoHook;
