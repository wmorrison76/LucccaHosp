#!/usr/bin/env node
import fs from "fs"; import path from "path"; const ROOT=process.cwd(); const SRC=path.join(ROOT,"src"); const out=(p,c)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,c,"utf8");console.log("✓",path.relative(ROOT,p))}

const stubsDir=path.join(SRC,"echodesk/stubs");
const stub=(name,body)=>out(path.join(stubsDir,`${name}.jsx`),body);

const base=(title)=>`
import React from "react";
export default function ${title}Stub(){return(<div className="p-4 text-sm">
  <div className="text-lg font-bold mb-1">${title}</div>
  <div className="opacity-70">Stub panel is loaded. Replace this file at <code>src/echodesk/stubs/${title}.jsx</code>.</div>
</div>);}
`;

stub("CalendarOverlay",base("CalendarOverlay"));
stub("TeleconferenceOverlay",base("TeleconferenceOverlay"));
stub("ExpoRailPanel",base("ExpoRailPanel"));
stub("TemplatesLibrary",base("TemplatesLibrary"));
stub("AIHelperPanel",base("AIHelperPanel"));
stub("RulerSnapOverlay",base("RulerSnapOverlay"));
stub("LassoCopyTool",base("LassoCopyTool"));

const boardPath=path.join(SRC,"board/Board.jsx"); if(!fs.existsSync(boardPath)){console.error("Board.jsx not found");process.exit(1);}
let s=fs.readFileSync(boardPath,"utf8");

if(!/lazyPick\s*=/.test(s)){
  s=s.replace(/import React[^;]+;/,m=>`${m}

const lazyPick = (loader, key = "default") => React.lazy(() => loader().then(m => ({ default: m[key] ?? m.default ?? m })));`);
}

if(!/CalendarOverlay\s*=/.test(s)){
  s=s.replace(/\/\/ Panels \(lazy\)[\s\S]*?\n/,m=>`${m}
const CalendarOverlay    = lazyPick(() => import("../echodesk/stubs/CalendarOverlay.jsx"));
const Teleconference     = lazyPick(() => import("../echodesk/stubs/TeleconferenceOverlay.jsx"));
const ExpoRailPanel      = lazyPick(() => import("../echodesk/stubs/ExpoRailPanel.jsx"));
const TemplatesLibrary   = lazyPick(() => import("../echodesk/stubs/TemplatesLibrary.jsx"));
const AIHelperPanel      = lazyPick(() => import("../echodesk/stubs/AIHelperPanel.jsx"));
const RulerSnapOverlay   = lazyPick(() => import("../echodesk/stubs/RulerSnapOverlay.jsx"));
const LassoCopyTool      = lazyPick(() => import("../echodesk/stubs/LassoCopyTool.jsx"));
`);
}

if(!/calendar:\s*\{/.test(s)){
  s=s.replace(/const PANEL_REGISTRY\s*=\s*\{/,`const PANEL_REGISTRY={`);
  s=s.replace(/(\s*note:\s*\{[\s\S]*?\}\s*,?)/,m=>`${m}
  , calendar:       { title: "Calendar",        Component: CalendarOverlay,  icon: null }
  , teleconference: { title: "Teleconference",  Component: Teleconference,   icon: null }
  , exporail:       { title: "Expo Rail",       Component: ExpoRailPanel,    icon: null }
  , templates:      { title: "Templates",       Component: TemplatesLibrary, icon: null }
  , aihelper:       { title: "AI Helper",       Component: AIHelperPanel,    icon: null }
  , ruler:          { title: "Ruler & Snap",    Component: RulerSnapOverlay, icon: null }
  , lasso:          { title: "Lasso / Copy",    Component: LassoCopyTool,    icon: null }
`);
}

if(!/CalendarDays/.test(s)){
  s=s.replace(/import\s*\{\s*([^}]+)\s*\}\s*from\s*"lucide-react";/,(_,g)=>`import { ${g.replace(/\s+/g," ")} , CalendarDays, Video, Ruler, LassoSelect, Copy } from "lucide-react";`);
}

if(!/<!--ECHODESK-QUICK-->/){
  s=s.replace(/(<\/div>\s*\n\s*<\/div>\s*\n\s*{!!dockItems)/,`
            <div className="tb2-sep" />
            <div className="tb2-group" data-role="echodesk-quick">{/*ECHODESK-QUICK*/}
              <button className="tb2-btn" title="Calendar" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"calendar"}}))}><CalendarDays size={16}/></button>
              <button className="tb2-btn" title="Teleconference" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"teleconference"}}))}><Video size={16}/></button>
              <button className="tb2-btn" title="Ruler & Snap" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"ruler"}}))}><Ruler size={16}/></button>
              <button className="tb2-btn" title="Lasso / Copy" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"lasso"}}))}><LassoSelect size={16}/></button>
              <button className="tb2-btn" title="Templates" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"templates"}}))}>T</button>
              <button className="tb2-btn" title="AI Helper" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"aihelper"}}))}>AI</button>
              <button className="tb2-btn" title="Expo Rail" onClick={()=>window.dispatchEvent(new CustomEvent("open-panel",{detail:{id:"exporail"}}))}>XR</button>
            </div>
          </div>

          $1`);
}

fs.writeFileSync(boardPath,s,"utf8"); console.log("✓ patched Board.jsx");

console.log("==> Stub pack installed. Restart dev server.");
