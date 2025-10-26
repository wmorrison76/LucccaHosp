import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { r as reactDomExports } from "./Board-6RvNRUqx.js";
import "./settings-CL5KYzJi.js";
class ParticleSystem {
  // ...fields unchanged...
  tick(dt, mode) {
    this.time += dt;
    this.globalRot += dt * 0.15;
    const R = this.cfg.radius;
    const idle = 0.26 + 0.12 * (0.5 + 0.5 * Math.sin(this.time * 0.9));
    const energy = Math.max(this.cfg.energy, idle);
    const noiseScale = mode === "thinking" ? 0.9 : 0.6;
    const flow = 0.4 + energy * 0.9 + (mode === "speaking" ? 0.7 : 0);
    const swirl = (mode === "listening" ? 0.4 : 0.2) + (mode === "speaking" ? 0.6 : 0);
    for (const p of this.particles) {
      const nx = p.x / R * noiseScale + this.time * 0.05;
      const ny = p.y / R * noiseScale - this.time * 0.03;
      const f = (this.noise.sample(nx, ny) - 0.5) * 2;
      const t = Math.atan2(p.y, p.x) + f * swirl * 0.12;
      const speed = (0.2 + Math.random() * 0.05) * flow;
      p.vx += Math.cos(t) * speed;
      p.vy += Math.sin(t) * speed;
      p.vx *= 0.94;
      p.vy *= 0.94;
      const d = Math.hypot(p.x, p.y);
      if (d > R * 0.98) {
        const k = (d - R * 0.98) * 0.12;
        p.vx -= p.x / d * k;
        p.vy -= p.y / d * k;
      }
      p.px = p.x;
      p.py = p.y;
      p.x += p.vx;
      p.y += p.vy;
      p.sparkle = Math.max(0, p.sparkle - dt * 0.45);
    }
  }
  // draw(...) unchanged
}
function useEchoOrbController() {
  const ref = reactExports.useRef(null);
  return ref;
}
function useBindEchoOrbHandle(expose) {
  const modeRef = reactExports.useRef("idle");
  const [energy, setEnergyState] = reactExports.useState(0.3);
  const listeners = { sparkle: [], pulse: [] };
  const api = {
    setMode(m) {
      modeRef.current = m;
    },
    pulse(intensity = 1) {
      listeners.pulse.forEach((fn) => fn(intensity));
    },
    sparkle(count = 24) {
      listeners.sparkle.forEach((fn) => fn(count));
    },
    ingestEvent(kind) {
      if (kind === "question") {
        modeRef.current = "listening";
        listeners.sparkle.forEach((fn) => fn(42));
      } else if (kind === "answer") {
        modeRef.current = "speaking";
      } else if (kind === "error") {
        modeRef.current = "thinking";
      } else {
        modeRef.current = "idle";
      }
    },
    setEnergy(v) {
      const c = Math.max(0, Math.min(1, v));
      setEnergyState(c);
    }
  };
  reactExports.useImperativeHandle({ current: null }, () => api);
  expose(api);
  const on = (evt, fn) => {
    listeners[evt].push(fn);
    return () => {
      const a = listeners[evt];
      const i = a.indexOf(fn);
      if (i >= 0) a.splice(i, 1);
    };
  };
  return { get mode() {
    return modeRef.current;
  }, energy, on };
}
const EchoOrb = reactExports.forwardRef(function EchoOrb2(props, ref) {
  const { size = 240, quality = "high", seed = 1337, className, renderStyle = "hybrid" } = props;
  const canvasRef = reactExports.useRef(null);
  const { mode, energy, on } = useBindEchoOrbHandle((h) => {
    ref.current = h;
  });
  const systemRef = reactExports.useRef(null);
  const lastTs = reactExports.useRef(0);
  const counts = { low: 350, medium: 650, high: 1100 };
  reactExports.useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    const ctx = canvas.getContext("2d", { alpha: true });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    systemRef.current = new ParticleSystem({
      radius: size * 0.42,
      count: counts[quality],
      quality,
      energy: 0.3,
      paletteIndex: Math.floor(Math.random() * 3),
      seed,
      renderStyle
    });
    systemRef.current.setCenter(size / 2, size / 2);
    lastTs.current = performance.now();
  }, [size, quality, seed, renderStyle]);
  reactExports.useEffect(() => {
    const offA = on("sparkle", (n) => systemRef.current?.sparkle(n));
    const offB = on("pulse", (intensity) => {
      const e = Math.max(0, Math.min(1, 0.25 + intensity * 0.5));
      systemRef.current?.setEnergy(e);
      setTimeout(() => systemRef.current?.setEnergy(0.3), 380);
    });
    return () => {
      offA();
      offB();
    };
  }, [on]);
  reactExports.useEffect(() => {
    let raf = 0;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const loop = (t) => {
      const dt = Math.min(0.033, (t - lastTs.current) / 1e3);
      lastTs.current = t;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      systemRef.current.tick(dt, mode);
      systemRef.current.draw(ctx);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [mode]);
  reactExports.useEffect(() => {
    systemRef.current?.setEnergy(energy);
  }, [energy]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `echo-orb-wrap ${className ?? ""}`, style: { width: size, height: size }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("canvas", { ref: canvasRef, className: "echo-orb-canvas" }, void 0, false, {
    fileName: "/app/code/frontend/src/echo-orb/components/EchoOrb.tsx",
    lineNumber: 86,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/code/frontend/src/echo-orb/components/EchoOrb.tsx",
    lineNumber: 83,
    columnNumber: 5
  }, this);
});
const EVENT_NAME = "echo:orb";
function onOrb(handler) {
  const fn = (ev) => handler(ev.detail);
  window.addEventListener(EVENT_NAME, fn);
  return () => window.removeEventListener(EVENT_NAME, fn);
}
function styleFromCorner(corner, pad, offX, offY, z) {
  const s = { position: "fixed", pointerEvents: "none", zIndex: z };
  const top = `calc(env(safe-area-inset-top, 0px) + ${pad}px + ${offY}px)`;
  const right = `calc(env(safe-area-inset-right, 0px) + ${pad}px + ${offX}px)`;
  const bottom = `calc(env(safe-area-inset-bottom, 0px) + ${pad}px - ${offY}px)`;
  const left = `calc(env(safe-area-inset-left, 0px) + ${pad}px - ${offX}px)`;
  if (corner.includes("top")) s.top = top;
  else s.bottom = bottom;
  if (corner.includes("right")) s.right = right;
  else s.left = left;
  return s;
}
function OrbDock({
  corner = "top-right",
  // sizes
  backSize = 168,
  orbSize = 95,
  // edge padding
  pad = 6,
  // per-orb offsets (px) relative to the same corner
  backOffsetX = 0,
  backOffsetY = 0,
  orbOffsetX = -4,
  orbOffsetY = 62,
  // ⬅️ moved UP from 78 → 62
  // layering & styles
  zIndex = 2e5,
  backStyle = "tendrils",
  orbStyle = "tendrils",
  autoplay = true
}) {
  const backCtrl = useEchoOrbController();
  const orbCtrl = useEchoOrbController();
  reactExports.useEffect(() => {
    const off = onOrb(({ type }) => {
      if (type === "question") orbCtrl.current?.ingestEvent("question");
      else if (type === "answer") orbCtrl.current?.ingestEvent("answer");
      else if (type === "error") orbCtrl.current?.ingestEvent("error");
      else orbCtrl.current?.ingestEvent("ping");
    });
    return off;
  }, []);
  reactExports.useEffect(() => {
    if (!autoplay) return;
    let raf = 0, t0 = performance.now();
    const loop = (t) => {
      const sec = (t - t0) / 1e3;
      const osc = 0.5 + 0.5 * Math.sin(sec * 1);
      const pulse = (c, amt) => c.current?.pulse ? c.current.pulse(amt) : c.current?.ingestEvent("ping");
      pulse(orbCtrl, 0.28 + osc * 0.14);
      pulse(backCtrl, 0.16 + osc * 0.08);
      if (sec % 1.2 < 0.016) {
        orbCtrl.current?.sparkle?.(10);
        backCtrl.current?.sparkle?.(6);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const backNode = /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "orb-portaled",
      style: { ...styleFromCorner(corner, pad, backOffsetX, backOffsetY, zIndex - 1), width: backSize, height: backSize },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EchoOrb, { ref: backCtrl, size: backSize, quality: "high", renderStyle: backStyle }, void 0, false, {
        fileName: "/app/code/frontend/src/components/OrbDock.jsx",
        lineNumber: 85,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/OrbDock.jsx",
      lineNumber: 81,
      columnNumber: 5
    },
    this
  );
  const orbNode = /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className: "orb-portaled",
      style: { ...styleFromCorner(corner, pad, orbOffsetX, orbOffsetY, zIndex), width: orbSize, height: orbSize },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EchoOrb, { ref: orbCtrl, size: orbSize, quality: "high", renderStyle: orbStyle }, void 0, false, {
        fileName: "/app/code/frontend/src/components/OrbDock.jsx",
        lineNumber: 94,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/OrbDock.jsx",
      lineNumber: 90,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    reactDomExports.createPortal(backNode, document.body),
    reactDomExports.createPortal(orbNode, document.body)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/OrbDock.jsx",
    lineNumber: 99,
    columnNumber: 5
  }, this);
}
export {
  OrbDock as default
};
