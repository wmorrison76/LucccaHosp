import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function EchoOrbParticles({
  size = 88,
  intensity = 0.95,
  idle = true,
  position = "top-right",
  density = 1,
  className = "",
  onToggle,
  onOpen
}) {
  const [hue, setHue] = reactExports.useState(() => Math.floor(Math.random() * 360));
  const [sat, setSat] = reactExports.useState(85);
  const [light, setLight] = reactExports.useState(58);
  const [armed, setArmed] = reactExports.useState(false);
  const btnRef = reactExports.useRef(null);
  const canvasRef = reactExports.useRef(null);
  const rafRef = reactExports.useRef(null);
  const clickTimer = reactExports.useRef(null);
  reactExports.useEffect(() => {
    let ticks = 0;
    const step = () => {
      ticks += 1;
      setHue((h) => (h + 0.08) % 360);
      if (ticks % 420 === 0) {
        setSat((s) => clamp01(s / 100 + (Math.random() * 0.2 - 0.1)) * 100);
        setLight((l) => clamp01(l / 100 + (Math.random() * 0.16 - 0.08)) * 100);
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);
  reactExports.useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.sqrt(dx * dx + dy * dy);
      el.style.setProperty("--halo", String(clamp01(1 - d / 300)));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const px2 = Math.round(size * 2.6);
    canvas.width = px2 * dpr;
    canvas.height = px2 * dpr;
    canvas.style.width = px2 + "px";
    canvas.style.height = px2 + "px";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = "lighter";
    const cx = px2 / 2, cy = px2 / 2;
    const maxR = px2 * 0.46;
    const baseCount = Math.round(320 * density * (size / 88));
    const maxCount = Math.round(1200 * density * (size / 88));
    const particles = [];
    const rnd = (a, b) => a + Math.random() * (b - a);
    const make = (burst2 = false) => {
      const count = burst2 ? Math.round(baseCount * 1.8) : Math.round(baseCount * 0.6);
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const r0 = rnd(maxR * 0.2, maxR * 0.45);
        const sp = rnd(0.12, 0.6);
        particles.push({
          x: cx + Math.cos(ang) * r0 * rnd(0.2, 0.9),
          y: cy + Math.sin(ang) * r0 * rnd(0.2, 0.9),
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: rnd(0.8, 2),
          age: 0,
          size: rnd(0.6, 1.8),
          hueOffset: rnd(-14, 18)
        });
      }
      while (particles.length > maxCount) particles.shift();
    };
    let last = performance.now();
    let trail = 0.08;
    const loop = (t) => {
      const dt = Math.max(0.016, Math.min(0.048, (t - last) / 1e3));
      last = t;
      ctx.fillStyle = `rgba(0,0,0,${trail})`;
      ctx.fillRect(0, 0, px2, px2);
      const baseHue = hue;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += dt;
        p.x += p.vx;
        p.y += p.vy;
        const alpha = Math.max(0, 1 - p.age / p.life) * 0.9;
        if (alpha <= 0 || dist2(p.x, p.y, cx, cy) > (maxR * 1.2) ** 2) {
          particles.splice(i, 1);
          continue;
        }
        const color = `hsla(${(baseHue + p.hueOffset + 360) % 360}, 85%, 65%, ${alpha})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      if (particles.length < maxCount * 0.8) make(false);
      rafRef.current = requestAnimationFrame(loop);
    };
    make(true);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, px2, px2);
    rafRef.current = requestAnimationFrame(loop);
    const burst = () => make(true);
    canvas.addEventListener("mousedown", burst);
    return () => {
      canvas.removeEventListener("mousedown", burst);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size, density, hue]);
  const posStyle = {
    position: "fixed",
    zIndex: 1300,
    ...position.includes("top") ? { top: 12 } : { bottom: 16 },
    ...position.includes("right") ? { right: 16 } : { left: 16 }
  };
  const px = `${size}px`;
  const blurPx = Math.round(size * 0.75);
  const shadowPx = Math.round(size * 0.9);
  const colors = reactExports.useMemo(() => {
    const a = `hsl(${hue} ${sat}% ${light}%)`;
    const b = `hsl(${(hue + 30) % 360} ${sat}% ${Math.max(40, light - 12)}%)`;
    const c = `hsl(${(hue + 300) % 360} ${Math.max(70, sat)}% ${Math.min(80, light + 10)}%)`;
    const edge = `hsl(${hue} ${Math.max(65, sat - 10)}% ${Math.min(92, light + 18)}%)`;
    return { a, b, c, edge };
  }, [hue, sat, light]);
  function handleClick() {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      onOpen && onOpen();
    } else {
      clickTimer.current = setTimeout(() => {
        onToggle && onToggle();
        clickTimer.current = null;
      }, 210);
    }
  }
  const containerPx = Math.round(size * 2.6);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "button",
    {
      ref: btnRef,
      type: "button",
      "aria-label": "Summon Echo",
      title: "Summon Echo",
      onClick: handleClick,
      onMouseDown: () => setArmed(true),
      onMouseUp: () => setArmed(false),
      onMouseLeave: () => setArmed(false),
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle && onToggle();
        } else if (e.key.toLowerCase() === "o") {
          e.preventDefault();
          onOpen && onOpen();
        }
      },
      style: {
        ...posStyle,
        width: px,
        height: px,
        filter: "drop-shadow(0 0 6px var(--rim)) drop-shadow(0 0 14px var(--orb))",
        "--orb": colors.a,
        "--orb2": colors.b,
        "--orb3": colors.c,
        "--rim": colors.edge,
        "--glow": String(intensity),
        "--halo": "0"
      },
      className: [
        "relative isolate rounded-full select-none outline-none transition-transform duration-150 ease-out",
        armed ? "scale-95" : "hover:scale-[1.03]",
        className
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            "aria-hidden": true,
            className: "pointer-events-none absolute inset-0 -z-10",
            style: {
              width: containerPx,
              height: containerPx,
              left: `calc(50% - ${containerPx / 2}px)`,
              top: `calc(50% - ${containerPx / 2}px)`,
              filter: `blur(${Math.round(size * 0.15)}px)`,
              opacity: `calc(0.55 * var(--glow) + 0.45 * var(--halo))`,
              mixBlendMode: "screen"
            },
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "canvas",
              {
                ref: canvasRef,
                width: containerPx,
                height: containerPx,
                style: { width: "100%", height: "100%", display: "block" }
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/EchoOrbParticles.jsx",
                lineNumber: 231,
                columnNumber: 9
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EchoOrbParticles.jsx",
            lineNumber: 218,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "span",
          {
            "aria-hidden": true,
            className: "absolute inset-0 rounded-full",
            style: {
              background: `
            radial-gradient(120% 120% at 30% 30%, var(--rim) 0%, transparent 55%),
            radial-gradient(90% 90% at 65% 60%, var(--orb3) 0%, transparent 70%),
            radial-gradient(80% 80% at 40% 70%, var(--orb2) 0%, transparent 70%),
            radial-gradient(100% 100% at 50% 50%, var(--orb) 0%, #0a0f1a 85%)
          `,
              boxShadow: `0 0 ${shadowPx}px rgba(255,255,255,0.06), inset 0 0 24px rgba(255,255,255,0.25)`
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EchoOrbParticles.jsx",
            lineNumber: 240,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "span",
          {
            "aria-hidden": true,
            className: "absolute -inset-6 rounded-full opacity-80 pointer-events-none",
            style: {
              background: "radial-gradient(closest-side, var(--orb) 0%, transparent 70%)",
              filter: `blur(${blurPx}px)`,
              opacity: "calc(0.35 * var(--glow) + 0.65 * var(--halo))"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/code/frontend/src/components/EchoOrbParticles.jsx",
            lineNumber: 255,
            columnNumber: 7
          },
          this
        ),
        idle && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              "aria-hidden": true,
              className: "absolute inset-0 rounded-full",
              style: { animation: "echo-breathe 3.8s ease-in-out infinite, echo-tilt 10s ease-in-out infinite", mixBlendMode: "screen" }
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/EchoOrbParticles.jsx",
              lineNumber: 268,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "span",
            {
              "aria-hidden": true,
              className: "absolute left-1/3 top-1/4 h-1.5 w-1.5 rounded-full",
              style: { background: "white", filter: "blur(1px)", boxShadow: "0 0 12px white, 0 0 28px var(--rim)", animation: "echo-spark 2.6s ease-in-out infinite" }
            },
            void 0,
            false,
            {
              fileName: "/app/code/frontend/src/components/EchoOrbParticles.jsx",
              lineNumber: 273,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/code/frontend/src/components/EchoOrbParticles.jsx",
          lineNumber: 267,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/code/frontend/src/components/EchoOrbParticles.jsx",
      lineNumber: 186,
      columnNumber: 5
    },
    this
  );
}
function dist2(x1, y1, x2, y2) {
  const dx = x1 - x2, dy = y1 - y2;
  return dx * dx + dy * dy;
}
function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}
export {
  EchoOrbParticles as default
};
