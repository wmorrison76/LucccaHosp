const BASE = (import.meta as any).env?.VITE_EVENT_STUDIO_URL || "http://localhost:8080";

export const echo = {
  async health() {
    const r = await fetch(`${BASE}/api/echo-ai/health`);
    return r.json();
  },
  async stt(blob: Blob): Promise<string> {
    const fd = new FormData();
    fd.append("audio", blob, "audio.webm");
    const r = await fetch(`${BASE}/api/echo-ai/stt`, { method: "POST", body: fd });
    if (!r.ok) throw new Error("STT failed");
    const j = await r.json();
    return j.text || "";
  },
  async tts(text: string, voice = "alloy"): Promise<HTMLAudioElement> {
    const r = await fetch(`${BASE}/api/echo-ai/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });
    if (!r.ok) throw new Error("TTS failed");
    const buf = await r.arrayBuffer();
    const url = URL.createObjectURL(new Blob([buf], { type: "audio/mpeg" }));
    const audio = new Audio(url);
    audio.play().catch(()=>{});
    return audio;
  },
  async chat(prompt: string): Promise<string> {
    const r = await fetch(`${BASE}/api/echo-ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!r.ok) throw new Error("Chat failed");
    const j = await r.json();
    return j.reply || "";
  }
};
