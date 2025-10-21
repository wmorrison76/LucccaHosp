import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import OpenAI from "openai";

const WS_PORT = process.env.ECHO_WS_PORT || 9091;
const MODEL   = process.env.ECHO_MODEL || "gpt-4o-mini";
const openai  = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const app = express();
app.get("/health", (_req, res) => res.json({ ok: true }));
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify({ type: "status", status: "online" }));
  ws.send(JSON.stringify({ type: "assistant_text", text: "Echo connected. I’m here." }));

  ws.on("message", async (buf) => {
    let msg;
    try { msg = JSON.parse(buf.toString()); } catch { return; }
    if (msg?.type !== "client_text") return;
    const user = String(msg.text || "").slice(0, 4000);

    if (!openai) {
      ws.send(JSON.stringify({ type: "assistant_text", text: `(local) I heard: ${user}` }));
      return;
    }

    try {
      const resp = await openai.chat.completions.create({
        model: MODEL,
        temperature: 0.3,
        messages: [
          { role: "system",
            content:
              "You are Echo, a concise, pragmatic assistant for hotel BOH/FOH operations. " +
              "Answer in clear, immediately actionable steps unless asked otherwise." },
          { role: "user", content: user },
        ],
      });
      const text = resp.choices?.[0]?.message?.content?.trim() || "…";
      ws.send(JSON.stringify({ type: "assistant_text", text }));
    } catch (err) {
      ws.send(JSON.stringify({ type: "assistant_text", text: `Sorry, I hit an error.` }));
      console.error("OpenAI error:", err?.message || err);
    }
  });
});

server.listen(WS_PORT, () => {
  console.log(`Echo WS listening on ws://localhost:${WS_PORT}`);
});
