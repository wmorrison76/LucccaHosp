// src/echo/echoClient.js
let installed = false;
let ws = null;
let reconnectTimer = null;
let localAPI = null;

const bus = new EventTarget();
export function getEchoBus() { return bus; }
function emit(type, detail) {
  bus.dispatchEvent(new CustomEvent(type, { detail }));
  bus.dispatchEvent(new CustomEvent("message", { detail: { type, ...detail } }));
}

/* ---------- Local fallback ---------- */
function makeLocalAPI() {
  if (localAPI) return localAPI;
  window.__echoLocal = true;
  emit("status", { status: "local" });
  localAPI = {
    sendText(text) {
      setTimeout(() => {
        const reply =
          `Local Echo heard: “${text}”.\n` +
          `Try “open whiteboard”, “dock all”, or “dark mode”.`;
        emit("assistant_text", { text: reply });
      }, 150);
    },
  };
  return localAPI;
}

/* ---------- Public install ---------- */
export function installEchoHook(opts = {}) {
  if (installed) return ws;
  installed = true;

  const host = location.hostname || "localhost";
  const url  =
    (opts.baseUrl && opts.baseUrl.startsWith("ws"))
      ? opts.baseUrl
      : `ws://${host}:9091`;

  // expose helpers
  window.echo = {
    sendText(text) { sendChat(text); },
    ping() { try { ws?.send(JSON.stringify({ type:"ping", ts: Date.now() })); } catch {} },
    bus,
  };

  emit("status", { status: "connecting" });
  const localFallback = setTimeout(() => { if (!ws || ws.readyState !== 1) makeLocalAPI(); }, 700);
  connect(url, localFallback);
  return ws;
}

function connect(url, localFallback) {
  try {
    ws = new WebSocket(url);
    window.__echoWS = ws;

    ws.addEventListener("open", () => {
      clearTimeout(localFallback);
      window.__echoLocal = false;
      emit("status", { status: "online" });
    });

    ws.addEventListener("message", (e) => {
      let msg; try { msg = JSON.parse(e.data); } catch { return; }
      if (msg.type === "assistant_text" && msg.text) emit("assistant_text", { text: msg.text });
      emit(msg.type || "message", msg);

      if (msg.type === "theme.change" && msg.mode)
        document.documentElement.classList.toggle("dark", msg.mode === "dark");
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
  reconnectTimer = setTimeout(() => connect(url, setTimeout(() => makeLocalAPI(), 800)), 2500);
}

/* ---------- send ---------- */
function sendChat(text) {
  const msg = { type: "chat.user", text: String(text ?? "") };
  if (ws && ws.readyState === 1) {
    try { ws.send(JSON.stringify(msg)); } catch {}
  } else {
    makeLocalAPI().sendText(msg.text);
  }
  // best-effort HTTP fallback
  try {
    const u = `http://localhost:9091/send?type=assistant_text&text=${encodeURIComponent("Thinking: " + msg.text)}`;
    fetch(u).catch(() => {});
  } catch {}
}

export default installEchoHook;
