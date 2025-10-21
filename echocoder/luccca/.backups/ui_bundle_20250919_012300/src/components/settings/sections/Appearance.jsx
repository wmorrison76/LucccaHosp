import React, { useEffect, useState } from "react";

const PRESET_CLASS = {
  nightfall: "theme-nightfall",
  glasslight: "theme-glasslight",
  neonwave: "theme-neonwave",
  highcontrast: "theme-highcontrast",
  colorblind: "theme-cb-safe",
};
const KEY = "lu:theme:preset:v1";

function applyPresetClass(cls) {
  const el = document.documentElement;
  // strip existing theme-* classes
  const keep = (el.className || "").split(/\s+/).filter(Boolean).filter(c => !c.startsWith("theme-"));
  el.className = keep.join(" ");
  el.classList.add(cls);
}

export default function Appearance() {
  const [preset, setPreset] = useState(() => localStorage.getItem(KEY) || "nightfall");

  useEffect(() => {
    const cls = PRESET_CLASS[preset] || PRESET_CLASS.nightfall;
    applyPresetClass(cls);
    try { localStorage.setItem(KEY, preset); } catch {}
  }, [preset]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Appearance</h2>

      <section className="panel p-4">
        <div className="font-semibold mb-2">Theme presets</div>
        <div className="flex flex-wrap gap-2">
          <PresetButton id="nightfall"    label="Nightfall"       active={preset==="nightfall"}    onSelect={setPreset}/>
          <PresetButton id="glasslight"   label="Glasslight"      active={preset==="glasslight"}   onSelect={setPreset}/>
          <PresetButton id="neonwave"     label="Neonwave"        active={preset==="neonwave"}     onSelect={setPreset}/>
          <PresetButton id="highcontrast" label="High contrast"   active={preset==="highcontrast"} onSelect={setPreset}/>
          <PresetButton id="colorblind"   label="Colorblind safe" active={preset==="colorblind"}   onSelect={setPreset}/>
        </div>
        <p className="text-sm opacity-75 mt-3">
          Colorblind Safe uses blue/orange accents and higher luminance contrast—no more “disappearing” inputs.
        </p>
      </section>
    </div>
  );
}

function PresetButton({ id, label, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`px-3 py-1.5 rounded-xl border ${active ? "bg-white/10 border-white/40" : "bg-white/5 border-white/15 hover:bg-white/8"}`}
    >
      {label}
    </button>
  );
}
