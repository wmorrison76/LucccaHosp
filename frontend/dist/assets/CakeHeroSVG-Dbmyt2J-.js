import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
function CakeHero3D({
  layers = [],
  icingColor = "#F2D7E2",
  // soft blush
  accentColor = "#8B6CB8",
  // muted purple
  plateColor = "#B6BDC7",
  background = "transparent",
  topper = true,
  className = ""
}) {
  const tierCount = reactExports.useMemo(() => {
    const count = layers.filter((l) => l?.type === "cake").length;
    return Math.min(Math.max(count || 1, 1), 5);
  }, [layers]);
  const tiers = reactExports.useMemo(() => {
    const baseW = 520;
    const baseH = 120;
    const out = [];
    for (let i = 0; i < tierCount; i++) {
      const t = tierCount - i;
      const width = baseW - (t - 1) * 80;
      const height = baseH - (t - 1) * 10;
      const x = 300 - width / 2;
      const y = 460 - i * (height + 16);
      out.push({ x, y, width, height, r: 26 });
    }
    return out;
  }, [tierCount]);
  const [icLight, icMid, icDark] = reactExports.useMemo(() => {
    const toHsl = (c) => {
      const ctx = document?.createElement?.("canvas")?.getContext?.("2d");
      if (!ctx) return [0, 0, 85];
      ctx.fillStyle = c;
      const s2 = ctx.fillStyle;
      const m = s2.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/
      );
      if (!m) return [0, 0, 85];
      const [_, r, g, b] = m.map(Number);
      const rr = r / 255, gg = g / 255, bb = b / 255;
      const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb);
      let h2 = 0, s22 = 0, l2 = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s22 = l2 > 0.5 ? d / (2 - max - min) : d / (max - min);
        switch (max) {
          case rr:
            h2 = (gg - bb) / d + (gg < bb ? 6 : 0);
            break;
          case gg:
            h2 = (bb - rr) / d + 2;
            break;
          case bb:
            h2 = (rr - gg) / d + 4;
            break;
        }
        h2 /= 6;
      }
      return [Math.round(h2 * 360), Math.round(s22 * 100), Math.round(l2 * 100)];
    };
    const [h, s, l] = toHsl(icingColor);
    const light = `hsl(${h} ${Math.max(20, s - 15)}% ${Math.min(98, l + 12)}%)`;
    const mid = `hsl(${h} ${s}% ${l}%)`;
    const dark = `hsl(${h} ${Math.min(95, s + 15)}% ${Math.max(10, l - 15)}%)`;
    return [light, mid, dark];
  }, [icingColor]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "div",
    {
      className,
      style: {
        background,
        borderRadius: 16,
        border: "1px solid rgba(148,163,184,0.25)"
      },
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "svg",
        {
          viewBox: "0 0 600 520",
          width: "100%",
          height: "100%",
          role: "img",
          "aria-label": "Cake preview",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("defs", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("filter", { id: "shadow", x: "-20%", y: "-20%", width: "140%", height: "160%", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("feDropShadow", { dx: "0", dy: "12", stdDeviation: "12", floodOpacity: "0.28" }, void 0, false, {
                fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                lineNumber: 109,
                columnNumber: 13
              }, this) }, void 0, false, {
                fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                lineNumber: 108,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("linearGradient", { id: "icingGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "0%", stopColor: icLight }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 114,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "45%", stopColor: icMid }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 115,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "100%", stopColor: icDark }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 116,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                lineNumber: 113,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("radialGradient", { id: "topHighlight", cx: "50%", cy: "40%", r: "70%", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "0%", stopColor: "rgba(255,255,255,0.55)" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 121,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "100%", stopColor: "rgba(255,255,255,0)" }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 122,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                lineNumber: 120,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("linearGradient", { id: "plateGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "0%", stopColor: lighten(plateColor, 10) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 127,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "100%", stopColor: darken(plateColor, 12) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 128,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                lineNumber: 126,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("linearGradient", { id: "topperGrad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "0%", stopColor: lighten(accentColor, 12) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 133,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("stop", { offset: "100%", stopColor: darken(accentColor, 8) }, void 0, false, {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 134,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                lineNumber: 132,
                columnNumber: 11
              }, this)
            ] }, void 0, true, {
              fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
              lineNumber: 106,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("g", { filter: "url(#shadow)", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "ellipse",
              {
                cx: "300",
                cy: "500",
                rx: "220",
                ry: "32",
                fill: "url(#plateGrad)",
                opacity: "0.9"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                lineNumber: 140,
                columnNumber: 11
              },
              this
            ) }, void 0, false, {
              fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
              lineNumber: 139,
              columnNumber: 9
            }, this),
            tiers.map((t, idx) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("g", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "rect",
                {
                  x: t.x,
                  y: t.y,
                  width: t.width,
                  height: t.height,
                  rx: t.r,
                  fill: "url(#icingGrad)",
                  filter: "url(#shadow)",
                  stroke: "rgba(0,0,0,0.06)",
                  strokeWidth: "1"
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 154,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "ellipse",
                {
                  cx: t.x + t.width / 2,
                  cy: t.y + 10,
                  rx: t.width * 0.46,
                  ry: t.height * 0.18,
                  fill: "url(#topHighlight)",
                  opacity: "0.7"
                },
                void 0,
                false,
                {
                  fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                  lineNumber: 166,
                  columnNumber: 13
                },
                this
              )
            ] }, idx, true, {
              fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
              lineNumber: 152,
              columnNumber: 11
            }, this)),
            topper && tierCount > 1 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "path",
              {
                d: "M300 160\n               C 280 130, 230 140, 240 180\n               C 250 210, 290 230, 300 250\n               C 310 230, 350 210, 360 180\n               C 370 140, 320 130, 300 160\n               Z",
                fill: "none",
                stroke: "url(#topperGrad)",
                strokeWidth: "10",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              void 0,
              false,
              {
                fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
                lineNumber: 179,
                columnNumber: 11
              },
              this
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
          lineNumber: 98,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    false,
    {
      fileName: "/app/code/frontend/src/components/CakeHeroSVG.jsx",
      lineNumber: 90,
      columnNumber: 5
    },
    this
  );
}
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
function parseRgb(c) {
  const ctx = document?.createElement?.("canvas")?.getContext?.("2d");
  if (!ctx) return [200, 200, 200];
  ctx.fillStyle = c;
  const s = ctx.fillStyle;
  const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return [200, 200, 200];
  return m.slice(1, 4).map(Number);
}
function lighten(c, pct) {
  const [r, g, b] = parseRgb(c);
  const f = (x) => clamp(Math.round(x + (255 - x) * (pct / 100)), 0, 255);
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}
function darken(c, pct) {
  const [r, g, b] = parseRgb(c);
  const f = (x) => clamp(Math.round(x * (1 - pct / 100)), 0, 255);
  return `rgb(${f(r)}, ${f(g)}, ${f(b)})`;
}
export {
  CakeHero3D as default
};
