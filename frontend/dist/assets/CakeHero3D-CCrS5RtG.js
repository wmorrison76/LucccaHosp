import { r as reactExports, j as jsxDevRuntimeExports } from "./index-DfBvRGLH.js";
import { R as REVISION, M as Mesh, I as IcosahedronGeometry, S as ShaderMaterial, D as DoubleSide, V as Vector3, c as Spherical, Q as Quaternion, O as OrthographicCamera, P as PerspectiveCamera, d as MOUSE, T as TOUCH, e as Vector2, f as Ray, g as Plane, h as DataTextureLoader, H as HalfFloatType, F as FloatType, i as DataUtils, L as LinearFilter, j as RGBAFormat, k as RedFormat, U as Uniform, l as UniformsUtils, m as MathUtils, u as useThree, a as useFrame, n as ClampToEdgeWrapping, o as Scene, p as PlaneGeometry, W as WebGLRenderTarget, q as UVMapping, r as WebGLRenderer, s as DataTexture, t as LinearSRGBColorSpace, v as Texture, w as MeshBasicMaterial, x as IntType, y as ShortType, B as ByteType, z as UnsignedIntType, A as UnsignedByteType, E as FileLoader, G as Loader, J as LoadingManager, K as LinearMipMapLinearFilter, N as SRGBColorSpace, X as NoBlending, Y as useLoader, Z as CubeReflectionMapping, _ as EquirectangularReflectionMapping, $ as CubeTextureLoader, a0 as extend, a1 as WebGLCubeRenderTarget, a2 as createPortal, a3 as applyProps, a4 as MeshDepthMaterial, b as Color, a5 as NearestFilter, a6 as MeshLambertMaterial, C as Canvas, a7 as CanvasTexture, a8 as RepeatWrapping } from "./react-three-fiber.esm-CIonkBiw.js";
import "./vanilla-Cp7rd2DV.js";
import "./Board-6RvNRUqx.js";
import "./settings-CL5KYzJi.js";
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
const version$1 = /* @__PURE__ */ (() => parseInt(REVISION.replace(/\D+/g, "")))();
var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new u32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return [b, r];
};
var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b[0];
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
  var x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var hMap = (function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i)
    ++l[cd[i] - 1];
  var le = new u16(mb);
  for (i = 0; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
      }
    }
  }
  return co;
});
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
  flt[i] = 8;
for (var i = 144; i < 256; ++i)
  flt[i] = 9;
for (var i = 256; i < 280; ++i)
  flt[i] = 7;
for (var i = 280; i < 288; ++i)
  flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
  fdt[i] = 5;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p / 8 | 0) + (p & 7 && 1);
};
var slc = function(v, s, e) {
  if (e == null || e > v.length)
    e = v.length;
  var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
  n.set(v.subarray(s, e));
  return n;
};
var inflt = function(dat, buf, st) {
  var sl = dat.length;
  if (!sl || st && !st.l && sl < 5)
    return buf || new u8(0);
  var noBuf = !buf || st;
  var noSt = !st || st.i;
  if (!st)
    st = {};
  if (!buf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      st.f = final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            throw "unexpected EOF";
          break;
        }
        if (noBuf)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >>> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        throw "invalid block type";
      if (pos > tbts) {
        if (noSt)
          throw "unexpected EOF";
        break;
      }
    }
    if (noBuf)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          throw "unexpected EOF";
        break;
      }
      if (!c)
        throw "invalid length/literal";
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
        if (!d)
          throw "invalid distance";
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            throw "unexpected EOF";
          break;
        }
        if (noBuf)
          cbuf(bt + 131072);
        var end = bt + add;
        for (; bt < end; bt += 4) {
          buf[bt] = buf[bt - dt];
          buf[bt + 1] = buf[bt + 1 - dt];
          buf[bt + 2] = buf[bt + 2 - dt];
          buf[bt + 3] = buf[bt + 3 - dt];
        }
        bt = end;
      }
    }
    st.l = lm, st.p = lpos, st.b = bt;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt == buf.length ? buf : slc(buf, 0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var zlv = function(d) {
  if ((d[0] & 15) != 8 || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31)
    throw "invalid zlib data";
  if (d[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function unzlibSync(data, out) {
  return inflt((zlv(data), data.subarray(2, -4)), out);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
const isCubeTexture = (def) => def && def.isCubeTexture;
class GroundProjectedEnv extends Mesh {
  constructor(texture, options) {
    var _a2, _b2;
    const isCubeMap = isCubeTexture(texture);
    const w = (_b2 = isCubeMap ? (_a2 = texture.image[0]) == null ? void 0 : _a2.width : texture.image.width) != null ? _b2 : 1024;
    const cubeSize = w / 4;
    const _lodMax = Math.floor(Math.log2(cubeSize));
    const _cubeSize = Math.pow(2, _lodMax);
    const width = 3 * Math.max(_cubeSize, 16 * 7);
    const height = 4 * _cubeSize;
    const defines = [
      isCubeMap ? "#define ENVMAP_TYPE_CUBE" : "",
      `#define CUBEUV_TEXEL_WIDTH ${1 / width}`,
      `#define CUBEUV_TEXEL_HEIGHT ${1 / height}`,
      `#define CUBEUV_MAX_MIP ${_lodMax}.0`
    ];
    const vertexShader2 = (
      /* glsl */
      `
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `
    );
    const fragmentShader2 = defines.join("\n") + /* glsl */
    `
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${version$1 >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }
        `;
    const uniforms = {
      map: { value: texture },
      height: { value: (options == null ? void 0 : options.height) || 15 },
      radius: { value: (options == null ? void 0 : options.radius) || 100 }
    };
    const geometry = new IcosahedronGeometry(1, 16);
    const material = new ShaderMaterial({
      uniforms,
      fragmentShader: fragmentShader2,
      vertexShader: vertexShader2,
      side: DoubleSide
    });
    super(geometry, material);
  }
  set radius(radius) {
    this.material.uniforms.radius.value = radius;
  }
  get radius() {
    return this.material.uniforms.radius.value;
  }
  set height(height) {
    this.material.uniforms.height.value = height;
  }
  get height() {
    return this.material.uniforms.height.value;
  }
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, key + "", value);
  return value;
};
class EventDispatcher {
  constructor() {
    __publicField$1(this, "_listeners");
  }
  /**
   * Adds a listener to an event type.
   * @param type The type of event to listen to.
   * @param listener The function that gets called when the event is fired.
   */
  addEventListener(type, listener) {
    if (this._listeners === void 0)
      this._listeners = {};
    const listeners = this._listeners;
    if (listeners[type] === void 0) {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  }
  /**
      * Checks if listener is added to an event type.
      * @param type The type of event to listen to.
      * @param listener The function that gets called when the event is fired.
      */
  hasEventListener(type, listener) {
    if (this._listeners === void 0)
      return false;
    const listeners = this._listeners;
    return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
  }
  /**
      * Removes a listener from an event type.
      * @param type The type of the listener that gets removed.
      * @param listener The listener function that gets removed.
      */
  removeEventListener(type, listener) {
    if (this._listeners === void 0)
      return;
    const listeners = this._listeners;
    const listenerArray = listeners[type];
    if (listenerArray !== void 0) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }
  /**
      * Fire an event type.
      * @param event The event that gets fired.
      */
  dispatchEvent(event) {
    if (this._listeners === void 0)
      return;
    const listeners = this._listeners;
    const listenerArray = listeners[event.type];
    if (listenerArray !== void 0) {
      event.target = this;
      const array = listenerArray.slice(0);
      for (let i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
      event.target = null;
    }
  }
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _ray = /* @__PURE__ */ new Ray();
const _plane = /* @__PURE__ */ new Plane();
const TILT_LIMIT = Math.cos(70 * (Math.PI / 180));
const moduloWrapAround = (offset, capacity) => (offset % capacity + capacity) % capacity;
let OrbitControls$1 = class OrbitControls extends EventDispatcher {
  constructor(object, domElement) {
    super();
    __publicField(this, "object");
    __publicField(this, "domElement");
    __publicField(this, "enabled", true);
    __publicField(this, "target", new Vector3());
    __publicField(this, "minDistance", 0);
    __publicField(this, "maxDistance", Infinity);
    __publicField(this, "minZoom", 0);
    __publicField(this, "maxZoom", Infinity);
    __publicField(this, "minPolarAngle", 0);
    __publicField(this, "maxPolarAngle", Math.PI);
    __publicField(this, "minAzimuthAngle", -Infinity);
    __publicField(this, "maxAzimuthAngle", Infinity);
    __publicField(this, "enableDamping", false);
    __publicField(this, "dampingFactor", 0.05);
    __publicField(this, "enableZoom", true);
    __publicField(this, "zoomSpeed", 1);
    __publicField(this, "enableRotate", true);
    __publicField(this, "rotateSpeed", 1);
    __publicField(this, "enablePan", true);
    __publicField(this, "panSpeed", 1);
    __publicField(this, "screenSpacePanning", true);
    __publicField(this, "keyPanSpeed", 7);
    __publicField(this, "zoomToCursor", false);
    __publicField(this, "autoRotate", false);
    __publicField(this, "autoRotateSpeed", 2);
    __publicField(this, "reverseOrbit", false);
    __publicField(this, "reverseHorizontalOrbit", false);
    __publicField(this, "reverseVerticalOrbit", false);
    __publicField(this, "keys", { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" });
    __publicField(this, "mouseButtons", {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    });
    __publicField(this, "touches", { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN });
    __publicField(this, "target0");
    __publicField(this, "position0");
    __publicField(this, "zoom0");
    __publicField(this, "_domElementKeyEvents", null);
    __publicField(this, "getPolarAngle");
    __publicField(this, "getAzimuthalAngle");
    __publicField(this, "setPolarAngle");
    __publicField(this, "setAzimuthalAngle");
    __publicField(this, "getDistance");
    __publicField(this, "getZoomScale");
    __publicField(this, "listenToKeyEvents");
    __publicField(this, "stopListenToKeyEvents");
    __publicField(this, "saveState");
    __publicField(this, "reset");
    __publicField(this, "update");
    __publicField(this, "connect");
    __publicField(this, "dispose");
    __publicField(this, "dollyIn");
    __publicField(this, "dollyOut");
    __publicField(this, "getScale");
    __publicField(this, "setScale");
    this.object = object;
    this.domElement = domElement;
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.getPolarAngle = () => spherical.phi;
    this.getAzimuthalAngle = () => spherical.theta;
    this.setPolarAngle = (value) => {
      let phi = moduloWrapAround(value, 2 * Math.PI);
      let currentPhi = spherical.phi;
      if (currentPhi < 0)
        currentPhi += 2 * Math.PI;
      if (phi < 0)
        phi += 2 * Math.PI;
      let phiDist = Math.abs(phi - currentPhi);
      if (2 * Math.PI - phiDist < phiDist) {
        if (phi < currentPhi) {
          phi += 2 * Math.PI;
        } else {
          currentPhi += 2 * Math.PI;
        }
      }
      sphericalDelta.phi = phi - currentPhi;
      scope.update();
    };
    this.setAzimuthalAngle = (value) => {
      let theta = moduloWrapAround(value, 2 * Math.PI);
      let currentTheta = spherical.theta;
      if (currentTheta < 0)
        currentTheta += 2 * Math.PI;
      if (theta < 0)
        theta += 2 * Math.PI;
      let thetaDist = Math.abs(theta - currentTheta);
      if (2 * Math.PI - thetaDist < thetaDist) {
        if (theta < currentTheta) {
          theta += 2 * Math.PI;
        } else {
          currentTheta += 2 * Math.PI;
        }
      }
      sphericalDelta.theta = theta - currentTheta;
      scope.update();
    };
    this.getDistance = () => scope.object.position.distanceTo(scope.target);
    this.listenToKeyEvents = (domElement2) => {
      domElement2.addEventListener("keydown", onKeyDown);
      this._domElementKeyEvents = domElement2;
    };
    this.stopListenToKeyEvents = () => {
      this._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
      this._domElementKeyEvents = null;
    };
    this.saveState = () => {
      scope.target0.copy(scope.target);
      scope.position0.copy(scope.object.position);
      scope.zoom0 = scope.object.zoom;
    };
    this.reset = () => {
      scope.target.copy(scope.target0);
      scope.object.position.copy(scope.position0);
      scope.object.zoom = scope.zoom0;
      scope.object.updateProjectionMatrix();
      scope.dispatchEvent(changeEvent);
      scope.update();
      state = STATE.NONE;
    };
    this.update = (() => {
      const offset = new Vector3();
      const up = new Vector3(0, 1, 0);
      const quat = new Quaternion().setFromUnitVectors(object.up, up);
      const quatInverse = quat.clone().invert();
      const lastPosition = new Vector3();
      const lastQuaternion = new Quaternion();
      const twoPI = 2 * Math.PI;
      return function update() {
        const position = scope.object.position;
        quat.setFromUnitVectors(object.up, up);
        quatInverse.copy(quat).invert();
        offset.copy(position).sub(scope.target);
        offset.applyQuaternion(quat);
        spherical.setFromVector3(offset);
        if (scope.autoRotate && state === STATE.NONE) {
          rotateLeft(getAutoRotationAngle());
        }
        if (scope.enableDamping) {
          spherical.theta += sphericalDelta.theta * scope.dampingFactor;
          spherical.phi += sphericalDelta.phi * scope.dampingFactor;
        } else {
          spherical.theta += sphericalDelta.theta;
          spherical.phi += sphericalDelta.phi;
        }
        let min = scope.minAzimuthAngle;
        let max2 = scope.maxAzimuthAngle;
        if (isFinite(min) && isFinite(max2)) {
          if (min < -Math.PI)
            min += twoPI;
          else if (min > Math.PI)
            min -= twoPI;
          if (max2 < -Math.PI)
            max2 += twoPI;
          else if (max2 > Math.PI)
            max2 -= twoPI;
          if (min <= max2) {
            spherical.theta = Math.max(min, Math.min(max2, spherical.theta));
          } else {
            spherical.theta = spherical.theta > (min + max2) / 2 ? Math.max(min, spherical.theta) : Math.min(max2, spherical.theta);
          }
        }
        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
        spherical.makeSafe();
        if (scope.enableDamping === true) {
          scope.target.addScaledVector(panOffset, scope.dampingFactor);
        } else {
          scope.target.add(panOffset);
        }
        if (scope.zoomToCursor && performCursorZoom || scope.object.isOrthographicCamera) {
          spherical.radius = clampDistance(spherical.radius);
        } else {
          spherical.radius = clampDistance(spherical.radius * scale);
        }
        offset.setFromSpherical(spherical);
        offset.applyQuaternion(quatInverse);
        position.copy(scope.target).add(offset);
        if (!scope.object.matrixAutoUpdate)
          scope.object.updateMatrix();
        scope.object.lookAt(scope.target);
        if (scope.enableDamping === true) {
          sphericalDelta.theta *= 1 - scope.dampingFactor;
          sphericalDelta.phi *= 1 - scope.dampingFactor;
          panOffset.multiplyScalar(1 - scope.dampingFactor);
        } else {
          sphericalDelta.set(0, 0, 0);
          panOffset.set(0, 0, 0);
        }
        let zoomChanged = false;
        if (scope.zoomToCursor && performCursorZoom) {
          let newRadius = null;
          if (scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
            const prevRadius = offset.length();
            newRadius = clampDistance(prevRadius * scale);
            const radiusDelta = prevRadius - newRadius;
            scope.object.position.addScaledVector(dollyDirection, radiusDelta);
            scope.object.updateMatrixWorld();
          } else if (scope.object.isOrthographicCamera) {
            const mouseBefore = new Vector3(mouse.x, mouse.y, 0);
            mouseBefore.unproject(scope.object);
            scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
            scope.object.updateProjectionMatrix();
            zoomChanged = true;
            const mouseAfter = new Vector3(mouse.x, mouse.y, 0);
            mouseAfter.unproject(scope.object);
            scope.object.position.sub(mouseAfter).add(mouseBefore);
            scope.object.updateMatrixWorld();
            newRadius = offset.length();
          } else {
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
            scope.zoomToCursor = false;
          }
          if (newRadius !== null) {
            if (scope.screenSpacePanning) {
              scope.target.set(0, 0, -1).transformDirection(scope.object.matrix).multiplyScalar(newRadius).add(scope.object.position);
            } else {
              _ray.origin.copy(scope.object.position);
              _ray.direction.set(0, 0, -1).transformDirection(scope.object.matrix);
              if (Math.abs(scope.object.up.dot(_ray.direction)) < TILT_LIMIT) {
                object.lookAt(scope.target);
              } else {
                _plane.setFromNormalAndCoplanarPoint(scope.object.up, scope.target);
                _ray.intersectPlane(_plane, scope.target);
              }
            }
          }
        } else if (scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) {
          zoomChanged = scale !== 1;
          if (zoomChanged) {
            scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
            scope.object.updateProjectionMatrix();
          }
        }
        scale = 1;
        performCursorZoom = false;
        if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
          scope.dispatchEvent(changeEvent);
          lastPosition.copy(scope.object.position);
          lastQuaternion.copy(scope.object.quaternion);
          zoomChanged = false;
          return true;
        }
        return false;
      };
    })();
    this.connect = (domElement2) => {
      scope.domElement = domElement2;
      scope.domElement.style.touchAction = "none";
      scope.domElement.addEventListener("contextmenu", onContextMenu);
      scope.domElement.addEventListener("pointerdown", onPointerDown);
      scope.domElement.addEventListener("pointercancel", onPointerUp);
      scope.domElement.addEventListener("wheel", onMouseWheel);
    };
    this.dispose = () => {
      var _a2, _b2, _c, _d, _e, _f;
      if (scope.domElement) {
        scope.domElement.style.touchAction = "auto";
      }
      (_a2 = scope.domElement) == null ? void 0 : _a2.removeEventListener("contextmenu", onContextMenu);
      (_b2 = scope.domElement) == null ? void 0 : _b2.removeEventListener("pointerdown", onPointerDown);
      (_c = scope.domElement) == null ? void 0 : _c.removeEventListener("pointercancel", onPointerUp);
      (_d = scope.domElement) == null ? void 0 : _d.removeEventListener("wheel", onMouseWheel);
      (_e = scope.domElement) == null ? void 0 : _e.ownerDocument.removeEventListener("pointermove", onPointerMove);
      (_f = scope.domElement) == null ? void 0 : _f.ownerDocument.removeEventListener("pointerup", onPointerUp);
      if (scope._domElementKeyEvents !== null) {
        scope._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
      }
    };
    const scope = this;
    const changeEvent = { type: "change" };
    const startEvent = { type: "start" };
    const endEvent = { type: "end" };
    const STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let state = STATE.NONE;
    const EPS = 1e-6;
    const spherical = new Spherical();
    const sphericalDelta = new Spherical();
    let scale = 1;
    const panOffset = new Vector3();
    const rotateStart = new Vector2();
    const rotateEnd = new Vector2();
    const rotateDelta = new Vector2();
    const panStart = new Vector2();
    const panEnd = new Vector2();
    const panDelta = new Vector2();
    const dollyStart = new Vector2();
    const dollyEnd = new Vector2();
    const dollyDelta = new Vector2();
    const dollyDirection = new Vector3();
    const mouse = new Vector2();
    let performCursorZoom = false;
    const pointers = [];
    const pointerPositions = {};
    function getAutoRotationAngle() {
      return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    }
    function getZoomScale() {
      return Math.pow(0.95, scope.zoomSpeed);
    }
    function rotateLeft(angle) {
      if (scope.reverseOrbit || scope.reverseHorizontalOrbit) {
        sphericalDelta.theta += angle;
      } else {
        sphericalDelta.theta -= angle;
      }
    }
    function rotateUp(angle) {
      if (scope.reverseOrbit || scope.reverseVerticalOrbit) {
        sphericalDelta.phi += angle;
      } else {
        sphericalDelta.phi -= angle;
      }
    }
    const panLeft = (() => {
      const v = new Vector3();
      return function panLeft2(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0);
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    })();
    const panUp = (() => {
      const v = new Vector3();
      return function panUp2(distance, objectMatrix) {
        if (scope.screenSpacePanning === true) {
          v.setFromMatrixColumn(objectMatrix, 1);
        } else {
          v.setFromMatrixColumn(objectMatrix, 0);
          v.crossVectors(scope.object.up, v);
        }
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    })();
    const pan = (() => {
      const offset = new Vector3();
      return function pan2(deltaX, deltaY) {
        const element = scope.domElement;
        if (element && scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
          const position = scope.object.position;
          offset.copy(position).sub(scope.target);
          let targetDistance = offset.length();
          targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180);
          panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
        } else if (element && scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) {
          panLeft(
            deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth,
            scope.object.matrix
          );
          panUp(
            deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight,
            scope.object.matrix
          );
        } else {
          console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
          scope.enablePan = false;
        }
      };
    })();
    function setScale(newScale) {
      if (scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera || scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) {
        scale = newScale;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        scope.enableZoom = false;
      }
    }
    function dollyOut(dollyScale) {
      setScale(scale / dollyScale);
    }
    function dollyIn(dollyScale) {
      setScale(scale * dollyScale);
    }
    function updateMouseParameters(event) {
      if (!scope.zoomToCursor || !scope.domElement) {
        return;
      }
      performCursorZoom = true;
      const rect = scope.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      mouse.x = x / w * 2 - 1;
      mouse.y = -(y / h) * 2 + 1;
      dollyDirection.set(mouse.x, mouse.y, 1).unproject(scope.object).sub(scope.object.position).normalize();
    }
    function clampDistance(dist) {
      return Math.max(scope.minDistance, Math.min(scope.maxDistance, dist));
    }
    function handleMouseDownRotate(event) {
      rotateStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownDolly(event) {
      updateMouseParameters(event);
      dollyStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownPan(event) {
      panStart.set(event.clientX, event.clientY);
    }
    function handleMouseMoveRotate(event) {
      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
      const element = scope.domElement;
      if (element) {
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      }
      rotateStart.copy(rotateEnd);
      scope.update();
    }
    function handleMouseMoveDolly(event) {
      dollyEnd.set(event.clientX, event.clientY);
      dollyDelta.subVectors(dollyEnd, dollyStart);
      if (dollyDelta.y > 0) {
        dollyOut(getZoomScale());
      } else if (dollyDelta.y < 0) {
        dollyIn(getZoomScale());
      }
      dollyStart.copy(dollyEnd);
      scope.update();
    }
    function handleMouseMovePan(event) {
      panEnd.set(event.clientX, event.clientY);
      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
      scope.update();
    }
    function handleMouseWheel(event) {
      updateMouseParameters(event);
      if (event.deltaY < 0) {
        dollyIn(getZoomScale());
      } else if (event.deltaY > 0) {
        dollyOut(getZoomScale());
      }
      scope.update();
    }
    function handleKeyDown(event) {
      let needsUpdate = false;
      switch (event.code) {
        case scope.keys.UP:
          pan(0, scope.keyPanSpeed);
          needsUpdate = true;
          break;
        case scope.keys.BOTTOM:
          pan(0, -scope.keyPanSpeed);
          needsUpdate = true;
          break;
        case scope.keys.LEFT:
          pan(scope.keyPanSpeed, 0);
          needsUpdate = true;
          break;
        case scope.keys.RIGHT:
          pan(-scope.keyPanSpeed, 0);
          needsUpdate = true;
          break;
      }
      if (needsUpdate) {
        event.preventDefault();
        scope.update();
      }
    }
    function handleTouchStartRotate() {
      if (pointers.length == 1) {
        rotateStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        rotateStart.set(x, y);
      }
    }
    function handleTouchStartPan() {
      if (pointers.length == 1) {
        panStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        panStart.set(x, y);
      }
    }
    function handleTouchStartDolly() {
      const dx = pointers[0].pageX - pointers[1].pageX;
      const dy = pointers[0].pageY - pointers[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }
    function handleTouchStartDollyPan() {
      if (scope.enableZoom)
        handleTouchStartDolly();
      if (scope.enablePan)
        handleTouchStartPan();
    }
    function handleTouchStartDollyRotate() {
      if (scope.enableZoom)
        handleTouchStartDolly();
      if (scope.enableRotate)
        handleTouchStartRotate();
    }
    function handleTouchMoveRotate(event) {
      if (pointers.length == 1) {
        rotateEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        rotateEnd.set(x, y);
      }
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
      const element = scope.domElement;
      if (element) {
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      }
      rotateStart.copy(rotateEnd);
    }
    function handleTouchMovePan(event) {
      if (pointers.length == 1) {
        panEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        panEnd.set(x, y);
      }
      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
    }
    function handleTouchMoveDolly(event) {
      const position = getSecondPointerPosition(event);
      const dx = event.pageX - position.x;
      const dy = event.pageY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyEnd.set(0, distance);
      dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
      dollyOut(dollyDelta.y);
      dollyStart.copy(dollyEnd);
    }
    function handleTouchMoveDollyPan(event) {
      if (scope.enableZoom)
        handleTouchMoveDolly(event);
      if (scope.enablePan)
        handleTouchMovePan(event);
    }
    function handleTouchMoveDollyRotate(event) {
      if (scope.enableZoom)
        handleTouchMoveDolly(event);
      if (scope.enableRotate)
        handleTouchMoveRotate(event);
    }
    function onPointerDown(event) {
      var _a2, _b2;
      if (scope.enabled === false)
        return;
      if (pointers.length === 0) {
        (_a2 = scope.domElement) == null ? void 0 : _a2.ownerDocument.addEventListener("pointermove", onPointerMove);
        (_b2 = scope.domElement) == null ? void 0 : _b2.ownerDocument.addEventListener("pointerup", onPointerUp);
      }
      addPointer(event);
      if (event.pointerType === "touch") {
        onTouchStart(event);
      } else {
        onMouseDown(event);
      }
    }
    function onPointerMove(event) {
      if (scope.enabled === false)
        return;
      if (event.pointerType === "touch") {
        onTouchMove(event);
      } else {
        onMouseMove(event);
      }
    }
    function onPointerUp(event) {
      var _a2, _b2, _c;
      removePointer(event);
      if (pointers.length === 0) {
        (_a2 = scope.domElement) == null ? void 0 : _a2.releasePointerCapture(event.pointerId);
        (_b2 = scope.domElement) == null ? void 0 : _b2.ownerDocument.removeEventListener("pointermove", onPointerMove);
        (_c = scope.domElement) == null ? void 0 : _c.ownerDocument.removeEventListener("pointerup", onPointerUp);
      }
      scope.dispatchEvent(endEvent);
      state = STATE.NONE;
    }
    function onMouseDown(event) {
      let mouseAction;
      switch (event.button) {
        case 0:
          mouseAction = scope.mouseButtons.LEFT;
          break;
        case 1:
          mouseAction = scope.mouseButtons.MIDDLE;
          break;
        case 2:
          mouseAction = scope.mouseButtons.RIGHT;
          break;
        default:
          mouseAction = -1;
      }
      switch (mouseAction) {
        case MOUSE.DOLLY:
          if (scope.enableZoom === false)
            return;
          handleMouseDownDolly(event);
          state = STATE.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (scope.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          } else {
            if (scope.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (scope.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          } else {
            if (scope.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }
    function onMouseMove(event) {
      if (scope.enabled === false)
        return;
      switch (state) {
        case STATE.ROTATE:
          if (scope.enableRotate === false)
            return;
          handleMouseMoveRotate(event);
          break;
        case STATE.DOLLY:
          if (scope.enableZoom === false)
            return;
          handleMouseMoveDolly(event);
          break;
        case STATE.PAN:
          if (scope.enablePan === false)
            return;
          handleMouseMovePan(event);
          break;
      }
    }
    function onMouseWheel(event) {
      if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) {
        return;
      }
      event.preventDefault();
      scope.dispatchEvent(startEvent);
      handleMouseWheel(event);
      scope.dispatchEvent(endEvent);
    }
    function onKeyDown(event) {
      if (scope.enabled === false || scope.enablePan === false)
        return;
      handleKeyDown(event);
    }
    function onTouchStart(event) {
      trackPointer(event);
      switch (pointers.length) {
        case 1:
          switch (scope.touches.ONE) {
            case TOUCH.ROTATE:
              if (scope.enableRotate === false)
                return;
              handleTouchStartRotate();
              state = STATE.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (scope.enablePan === false)
                return;
              handleTouchStartPan();
              state = STATE.TOUCH_PAN;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        case 2:
          switch (scope.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (scope.enableZoom === false && scope.enablePan === false)
                return;
              handleTouchStartDollyPan();
              state = STATE.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (scope.enableZoom === false && scope.enableRotate === false)
                return;
              handleTouchStartDollyRotate();
              state = STATE.TOUCH_DOLLY_ROTATE;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }
    function onTouchMove(event) {
      trackPointer(event);
      switch (state) {
        case STATE.TOUCH_ROTATE:
          if (scope.enableRotate === false)
            return;
          handleTouchMoveRotate(event);
          scope.update();
          break;
        case STATE.TOUCH_PAN:
          if (scope.enablePan === false)
            return;
          handleTouchMovePan(event);
          scope.update();
          break;
        case STATE.TOUCH_DOLLY_PAN:
          if (scope.enableZoom === false && scope.enablePan === false)
            return;
          handleTouchMoveDollyPan(event);
          scope.update();
          break;
        case STATE.TOUCH_DOLLY_ROTATE:
          if (scope.enableZoom === false && scope.enableRotate === false)
            return;
          handleTouchMoveDollyRotate(event);
          scope.update();
          break;
        default:
          state = STATE.NONE;
      }
    }
    function onContextMenu(event) {
      if (scope.enabled === false)
        return;
      event.preventDefault();
    }
    function addPointer(event) {
      pointers.push(event);
    }
    function removePointer(event) {
      delete pointerPositions[event.pointerId];
      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].pointerId == event.pointerId) {
          pointers.splice(i, 1);
          return;
        }
      }
    }
    function trackPointer(event) {
      let position = pointerPositions[event.pointerId];
      if (position === void 0) {
        position = new Vector2();
        pointerPositions[event.pointerId] = position;
      }
      position.set(event.pageX, event.pageY);
    }
    function getSecondPointerPosition(event) {
      const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
      return pointerPositions[pointer.pointerId];
    }
    this.dollyIn = (dollyScale = getZoomScale()) => {
      dollyIn(dollyScale);
      scope.update();
    };
    this.dollyOut = (dollyScale = getZoomScale()) => {
      dollyOut(dollyScale);
      scope.update();
    };
    this.getScale = () => {
      return scale;
    };
    this.setScale = (newScale) => {
      setScale(newScale);
      scope.update();
    };
    this.getZoomScale = () => {
      return getZoomScale();
    };
    if (domElement !== void 0)
      this.connect(domElement);
    this.update();
  }
};
const HorizontalBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    h: { value: 1 / 512 }
  },
  vertexShader: (
    /* glsl */
    `
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `
  ),
  fragmentShader: (
    /* glsl */
    `
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `
  )
};
const VerticalBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    v: { value: 1 / 512 }
  },
  vertexShader: (
    /* glsl */
    `
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `
  ),
  fragmentShader: (
    /* glsl */
    `

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `
  )
};
class RGBELoader extends DataTextureLoader {
  constructor(manager) {
    super(manager);
    this.type = HalfFloatType;
  }
  // adapted from http://www.graphics.cornell.edu/~bjw/rgbe.html
  parse(buffer) {
    const rgbe_read_error = 1, rgbe_write_error = 2, rgbe_format_error = 3, rgbe_memory_error = 4, rgbe_error = function(rgbe_error_code, msg) {
      switch (rgbe_error_code) {
        case rgbe_read_error:
          throw new Error("THREE.RGBELoader: Read Error: " + (msg || ""));
        case rgbe_write_error:
          throw new Error("THREE.RGBELoader: Write Error: " + (msg || ""));
        case rgbe_format_error:
          throw new Error("THREE.RGBELoader: Bad File Format: " + (msg || ""));
        default:
        case rgbe_memory_error:
          throw new Error("THREE.RGBELoader: Memory Error: " + (msg || ""));
      }
    }, RGBE_VALID_PROGRAMTYPE = 1, RGBE_VALID_FORMAT = 2, RGBE_VALID_DIMENSIONS = 4, NEWLINE = "\n", fgets = function(buffer2, lineLimit, consume) {
      const chunkSize = 128;
      lineLimit = !lineLimit ? 1024 : lineLimit;
      let p = buffer2.pos, i = -1, len = 0, s = "", chunk = String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
      while (0 > (i = chunk.indexOf(NEWLINE)) && len < lineLimit && p < buffer2.byteLength) {
        s += chunk;
        len += chunk.length;
        p += chunkSize;
        chunk += String.fromCharCode.apply(null, new Uint16Array(buffer2.subarray(p, p + chunkSize)));
      }
      if (-1 < i) {
        buffer2.pos += len + i + 1;
        return s + chunk.slice(0, i);
      }
      return false;
    }, RGBE_ReadHeader = function(buffer2) {
      const magic_token_re = /^#\?(\S+)/, gamma_re = /^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/, exposure_re = /^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/, format_re = /^\s*FORMAT=(\S+)\s*$/, dimensions_re = /^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/, header = {
        valid: 0,
        string: "",
        comments: "",
        programtype: "RGBE",
        format: "",
        gamma: 1,
        exposure: 1,
        width: 0,
        height: 0
      };
      let line, match;
      if (buffer2.pos >= buffer2.byteLength || !(line = fgets(buffer2))) {
        rgbe_error(rgbe_read_error, "no header found");
      }
      if (!(match = line.match(magic_token_re))) {
        rgbe_error(rgbe_format_error, "bad initial token");
      }
      header.valid |= RGBE_VALID_PROGRAMTYPE;
      header.programtype = match[1];
      header.string += line + "\n";
      while (true) {
        line = fgets(buffer2);
        if (false === line)
          break;
        header.string += line + "\n";
        if ("#" === line.charAt(0)) {
          header.comments += line + "\n";
          continue;
        }
        if (match = line.match(gamma_re)) {
          header.gamma = parseFloat(match[1]);
        }
        if (match = line.match(exposure_re)) {
          header.exposure = parseFloat(match[1]);
        }
        if (match = line.match(format_re)) {
          header.valid |= RGBE_VALID_FORMAT;
          header.format = match[1];
        }
        if (match = line.match(dimensions_re)) {
          header.valid |= RGBE_VALID_DIMENSIONS;
          header.height = parseInt(match[1], 10);
          header.width = parseInt(match[2], 10);
        }
        if (header.valid & RGBE_VALID_FORMAT && header.valid & RGBE_VALID_DIMENSIONS)
          break;
      }
      if (!(header.valid & RGBE_VALID_FORMAT)) {
        rgbe_error(rgbe_format_error, "missing format specifier");
      }
      if (!(header.valid & RGBE_VALID_DIMENSIONS)) {
        rgbe_error(rgbe_format_error, "missing image size specifier");
      }
      return header;
    }, RGBE_ReadPixels_RLE = function(buffer2, w2, h2) {
      const scanline_width = w2;
      if (
        // run length encoding is not allowed so read flat
        scanline_width < 8 || scanline_width > 32767 || // this file is not run length encoded
        2 !== buffer2[0] || 2 !== buffer2[1] || buffer2[2] & 128
      ) {
        return new Uint8Array(buffer2);
      }
      if (scanline_width !== (buffer2[2] << 8 | buffer2[3])) {
        rgbe_error(rgbe_format_error, "wrong scanline width");
      }
      const data_rgba = new Uint8Array(4 * w2 * h2);
      if (!data_rgba.length) {
        rgbe_error(rgbe_memory_error, "unable to allocate buffer space");
      }
      let offset = 0, pos = 0;
      const ptr_end = 4 * scanline_width;
      const rgbeStart = new Uint8Array(4);
      const scanline_buffer = new Uint8Array(ptr_end);
      let num_scanlines = h2;
      while (num_scanlines > 0 && pos < buffer2.byteLength) {
        if (pos + 4 > buffer2.byteLength) {
          rgbe_error(rgbe_read_error);
        }
        rgbeStart[0] = buffer2[pos++];
        rgbeStart[1] = buffer2[pos++];
        rgbeStart[2] = buffer2[pos++];
        rgbeStart[3] = buffer2[pos++];
        if (2 != rgbeStart[0] || 2 != rgbeStart[1] || (rgbeStart[2] << 8 | rgbeStart[3]) != scanline_width) {
          rgbe_error(rgbe_format_error, "bad rgbe scanline format");
        }
        let ptr = 0, count;
        while (ptr < ptr_end && pos < buffer2.byteLength) {
          count = buffer2[pos++];
          const isEncodedRun = count > 128;
          if (isEncodedRun)
            count -= 128;
          if (0 === count || ptr + count > ptr_end) {
            rgbe_error(rgbe_format_error, "bad scanline data");
          }
          if (isEncodedRun) {
            const byteValue = buffer2[pos++];
            for (let i = 0; i < count; i++) {
              scanline_buffer[ptr++] = byteValue;
            }
          } else {
            scanline_buffer.set(buffer2.subarray(pos, pos + count), ptr);
            ptr += count;
            pos += count;
          }
        }
        const l = scanline_width;
        for (let i = 0; i < l; i++) {
          let off = 0;
          data_rgba[offset] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 1] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 2] = scanline_buffer[i + off];
          off += scanline_width;
          data_rgba[offset + 3] = scanline_buffer[i + off];
          offset += 4;
        }
        num_scanlines--;
      }
      return data_rgba;
    };
    const RGBEByteToRGBFloat = function(sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale = Math.pow(2, e - 128) / 255;
      destArray[destOffset + 0] = sourceArray[sourceOffset + 0] * scale;
      destArray[destOffset + 1] = sourceArray[sourceOffset + 1] * scale;
      destArray[destOffset + 2] = sourceArray[sourceOffset + 2] * scale;
      destArray[destOffset + 3] = 1;
    };
    const RGBEByteToRGBHalf = function(sourceArray, sourceOffset, destArray, destOffset) {
      const e = sourceArray[sourceOffset + 3];
      const scale = Math.pow(2, e - 128) / 255;
      destArray[destOffset + 0] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 0] * scale, 65504));
      destArray[destOffset + 1] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 1] * scale, 65504));
      destArray[destOffset + 2] = DataUtils.toHalfFloat(Math.min(sourceArray[sourceOffset + 2] * scale, 65504));
      destArray[destOffset + 3] = DataUtils.toHalfFloat(1);
    };
    const byteArray = new Uint8Array(buffer);
    byteArray.pos = 0;
    const rgbe_header_info = RGBE_ReadHeader(byteArray);
    const w = rgbe_header_info.width, h = rgbe_header_info.height, image_rgba_data = RGBE_ReadPixels_RLE(byteArray.subarray(byteArray.pos), w, h);
    let data, type;
    let numElements;
    switch (this.type) {
      case FloatType:
        numElements = image_rgba_data.length / 4;
        const floatArray = new Float32Array(numElements * 4);
        for (let j = 0; j < numElements; j++) {
          RGBEByteToRGBFloat(image_rgba_data, j * 4, floatArray, j * 4);
        }
        data = floatArray;
        type = FloatType;
        break;
      case HalfFloatType:
        numElements = image_rgba_data.length / 4;
        const halfArray = new Uint16Array(numElements * 4);
        for (let j = 0; j < numElements; j++) {
          RGBEByteToRGBHalf(image_rgba_data, j * 4, halfArray, j * 4);
        }
        data = halfArray;
        type = HalfFloatType;
        break;
      default:
        throw new Error("THREE.RGBELoader: Unsupported type: " + this.type);
    }
    return {
      width: w,
      height: h,
      data,
      header: rgbe_header_info.string,
      gamma: rgbe_header_info.gamma,
      exposure: rgbe_header_info.exposure,
      type
    };
  }
  setDataType(value) {
    this.type = value;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    function onLoadCallback(texture, texData) {
      switch (texture.type) {
        case FloatType:
        case HalfFloatType:
          if ("colorSpace" in texture)
            texture.colorSpace = "srgb-linear";
          else
            texture.encoding = 3e3;
          texture.minFilter = LinearFilter;
          texture.magFilter = LinearFilter;
          texture.generateMipmaps = false;
          texture.flipY = true;
          break;
      }
      if (onLoad)
        onLoad(texture, texData);
    }
    return super.load(url, onLoadCallback, onProgress, onError);
  }
}
const hasColorSpace = version$1 >= 152;
class EXRLoader extends DataTextureLoader {
  constructor(manager) {
    super(manager);
    this.type = HalfFloatType;
  }
  parse(buffer) {
    const USHORT_RANGE = 1 << 16;
    const BITMAP_SIZE = USHORT_RANGE >> 3;
    const HUF_ENCBITS = 16;
    const HUF_DECBITS = 14;
    const HUF_ENCSIZE = (1 << HUF_ENCBITS) + 1;
    const HUF_DECSIZE = 1 << HUF_DECBITS;
    const HUF_DECMASK = HUF_DECSIZE - 1;
    const NBITS = 16;
    const A_OFFSET = 1 << NBITS - 1;
    const MOD_MASK = (1 << NBITS) - 1;
    const SHORT_ZEROCODE_RUN = 59;
    const LONG_ZEROCODE_RUN = 63;
    const SHORTEST_LONG_RUN = 2 + LONG_ZEROCODE_RUN - SHORT_ZEROCODE_RUN;
    const ULONG_SIZE = 8;
    const FLOAT32_SIZE = 4;
    const INT32_SIZE = 4;
    const INT16_SIZE = 2;
    const INT8_SIZE = 1;
    const STATIC_HUFFMAN = 0;
    const DEFLATE = 1;
    const UNKNOWN = 0;
    const LOSSY_DCT = 1;
    const RLE = 2;
    const logBase = Math.pow(2.7182818, 2.2);
    function reverseLutFromBitmap(bitmap, lut) {
      var k = 0;
      for (var i = 0; i < USHORT_RANGE; ++i) {
        if (i == 0 || bitmap[i >> 3] & 1 << (i & 7)) {
          lut[k++] = i;
        }
      }
      var n = k - 1;
      while (k < USHORT_RANGE)
        lut[k++] = 0;
      return n;
    }
    function hufClearDecTable(hdec) {
      for (var i = 0; i < HUF_DECSIZE; i++) {
        hdec[i] = {};
        hdec[i].len = 0;
        hdec[i].lit = 0;
        hdec[i].p = null;
      }
    }
    const getBitsReturn = { l: 0, c: 0, lc: 0 };
    function getBits(nBits, c, lc, uInt8Array2, inOffset) {
      while (lc < nBits) {
        c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
        lc += 8;
      }
      lc -= nBits;
      getBitsReturn.l = c >> lc & (1 << nBits) - 1;
      getBitsReturn.c = c;
      getBitsReturn.lc = lc;
    }
    const hufTableBuffer = new Array(59);
    function hufCanonicalCodeTable(hcode) {
      for (var i = 0; i <= 58; ++i)
        hufTableBuffer[i] = 0;
      for (var i = 0; i < HUF_ENCSIZE; ++i)
        hufTableBuffer[hcode[i]] += 1;
      var c = 0;
      for (var i = 58; i > 0; --i) {
        var nc = c + hufTableBuffer[i] >> 1;
        hufTableBuffer[i] = c;
        c = nc;
      }
      for (var i = 0; i < HUF_ENCSIZE; ++i) {
        var l = hcode[i];
        if (l > 0)
          hcode[i] = l | hufTableBuffer[l]++ << 6;
      }
    }
    function hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, hcode) {
      var p = inOffset;
      var c = 0;
      var lc = 0;
      for (; im <= iM; im++) {
        if (p.value - inOffset.value > ni)
          return false;
        getBits(6, c, lc, uInt8Array2, p);
        var l = getBitsReturn.l;
        c = getBitsReturn.c;
        lc = getBitsReturn.lc;
        hcode[im] = l;
        if (l == LONG_ZEROCODE_RUN) {
          if (p.value - inOffset.value > ni) {
            throw "Something wrong with hufUnpackEncTable";
          }
          getBits(8, c, lc, uInt8Array2, p);
          var zerun = getBitsReturn.l + SHORTEST_LONG_RUN;
          c = getBitsReturn.c;
          lc = getBitsReturn.lc;
          if (im + zerun > iM + 1) {
            throw "Something wrong with hufUnpackEncTable";
          }
          while (zerun--)
            hcode[im++] = 0;
          im--;
        } else if (l >= SHORT_ZEROCODE_RUN) {
          var zerun = l - SHORT_ZEROCODE_RUN + 2;
          if (im + zerun > iM + 1) {
            throw "Something wrong with hufUnpackEncTable";
          }
          while (zerun--)
            hcode[im++] = 0;
          im--;
        }
      }
      hufCanonicalCodeTable(hcode);
    }
    function hufLength(code) {
      return code & 63;
    }
    function hufCode(code) {
      return code >> 6;
    }
    function hufBuildDecTable(hcode, im, iM, hdecod) {
      for (; im <= iM; im++) {
        var c = hufCode(hcode[im]);
        var l = hufLength(hcode[im]);
        if (c >> l) {
          throw "Invalid table entry";
        }
        if (l > HUF_DECBITS) {
          var pl = hdecod[c >> l - HUF_DECBITS];
          if (pl.len) {
            throw "Invalid table entry";
          }
          pl.lit++;
          if (pl.p) {
            var p = pl.p;
            pl.p = new Array(pl.lit);
            for (var i = 0; i < pl.lit - 1; ++i) {
              pl.p[i] = p[i];
            }
          } else {
            pl.p = new Array(1);
          }
          pl.p[pl.lit - 1] = im;
        } else if (l) {
          var plOffset = 0;
          for (var i = 1 << HUF_DECBITS - l; i > 0; i--) {
            var pl = hdecod[(c << HUF_DECBITS - l) + plOffset];
            if (pl.len || pl.p) {
              throw "Invalid table entry";
            }
            pl.len = l;
            pl.lit = im;
            plOffset++;
          }
        }
      }
      return true;
    }
    const getCharReturn = { c: 0, lc: 0 };
    function getChar(c, lc, uInt8Array2, inOffset) {
      c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
      lc += 8;
      getCharReturn.c = c;
      getCharReturn.lc = lc;
    }
    const getCodeReturn = { c: 0, lc: 0 };
    function getCode(po, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outBufferOffset, outBufferEndOffset) {
      if (po == rlc) {
        if (lc < 8) {
          getChar(c, lc, uInt8Array2, inOffset);
          c = getCharReturn.c;
          lc = getCharReturn.lc;
        }
        lc -= 8;
        var cs = c >> lc;
        var cs = new Uint8Array([cs])[0];
        if (outBufferOffset.value + cs > outBufferEndOffset) {
          return false;
        }
        var s = outBuffer[outBufferOffset.value - 1];
        while (cs-- > 0) {
          outBuffer[outBufferOffset.value++] = s;
        }
      } else if (outBufferOffset.value < outBufferEndOffset) {
        outBuffer[outBufferOffset.value++] = po;
      } else {
        return false;
      }
      getCodeReturn.c = c;
      getCodeReturn.lc = lc;
    }
    function UInt16(value) {
      return value & 65535;
    }
    function Int16(value) {
      var ref = UInt16(value);
      return ref > 32767 ? ref - 65536 : ref;
    }
    const wdec14Return = { a: 0, b: 0 };
    function wdec14(l, h) {
      var ls = Int16(l);
      var hs = Int16(h);
      var hi = hs;
      var ai = ls + (hi & 1) + (hi >> 1);
      var as = ai;
      var bs = ai - hi;
      wdec14Return.a = as;
      wdec14Return.b = bs;
    }
    function wdec16(l, h) {
      var m = UInt16(l);
      var d = UInt16(h);
      var bb = m - (d >> 1) & MOD_MASK;
      var aa = d + bb - A_OFFSET & MOD_MASK;
      wdec14Return.a = aa;
      wdec14Return.b = bb;
    }
    function wav2Decode(buffer2, j, nx, ox, ny, oy, mx) {
      var w14 = mx < 1 << 14;
      var n = nx > ny ? ny : nx;
      var p = 1;
      var p2;
      while (p <= n)
        p <<= 1;
      p >>= 1;
      p2 = p;
      p >>= 1;
      while (p >= 1) {
        var py = 0;
        var ey = py + oy * (ny - p2);
        var oy1 = oy * p;
        var oy2 = oy * p2;
        var ox1 = ox * p;
        var ox2 = ox * p2;
        var i00, i01, i10, i11;
        for (; py <= ey; py += oy2) {
          var px = py;
          var ex = py + ox * (nx - p2);
          for (; px <= ex; px += ox2) {
            var p01 = px + ox1;
            var p10 = px + oy1;
            var p11 = p10 + ox1;
            if (w14) {
              wdec14(buffer2[px + j], buffer2[p10 + j]);
              i00 = wdec14Return.a;
              i10 = wdec14Return.b;
              wdec14(buffer2[p01 + j], buffer2[p11 + j]);
              i01 = wdec14Return.a;
              i11 = wdec14Return.b;
              wdec14(i00, i01);
              buffer2[px + j] = wdec14Return.a;
              buffer2[p01 + j] = wdec14Return.b;
              wdec14(i10, i11);
              buffer2[p10 + j] = wdec14Return.a;
              buffer2[p11 + j] = wdec14Return.b;
            } else {
              wdec16(buffer2[px + j], buffer2[p10 + j]);
              i00 = wdec14Return.a;
              i10 = wdec14Return.b;
              wdec16(buffer2[p01 + j], buffer2[p11 + j]);
              i01 = wdec14Return.a;
              i11 = wdec14Return.b;
              wdec16(i00, i01);
              buffer2[px + j] = wdec14Return.a;
              buffer2[p01 + j] = wdec14Return.b;
              wdec16(i10, i11);
              buffer2[p10 + j] = wdec14Return.a;
              buffer2[p11 + j] = wdec14Return.b;
            }
          }
          if (nx & p) {
            var p10 = px + oy1;
            if (w14)
              wdec14(buffer2[px + j], buffer2[p10 + j]);
            else
              wdec16(buffer2[px + j], buffer2[p10 + j]);
            i00 = wdec14Return.a;
            buffer2[p10 + j] = wdec14Return.b;
            buffer2[px + j] = i00;
          }
        }
        if (ny & p) {
          var px = py;
          var ex = py + ox * (nx - p2);
          for (; px <= ex; px += ox2) {
            var p01 = px + ox1;
            if (w14)
              wdec14(buffer2[px + j], buffer2[p01 + j]);
            else
              wdec16(buffer2[px + j], buffer2[p01 + j]);
            i00 = wdec14Return.a;
            buffer2[p01 + j] = wdec14Return.b;
            buffer2[px + j] = i00;
          }
        }
        p2 = p;
        p >>= 1;
      }
      return py;
    }
    function hufDecode(encodingTable, decodingTable, uInt8Array2, inDataView, inOffset, ni, rlc, no, outBuffer, outOffset) {
      var c = 0;
      var lc = 0;
      var outBufferEndOffset = no;
      var inOffsetEnd = Math.trunc(inOffset.value + (ni + 7) / 8);
      while (inOffset.value < inOffsetEnd) {
        getChar(c, lc, uInt8Array2, inOffset);
        c = getCharReturn.c;
        lc = getCharReturn.lc;
        while (lc >= HUF_DECBITS) {
          var index = c >> lc - HUF_DECBITS & HUF_DECMASK;
          var pl = decodingTable[index];
          if (pl.len) {
            lc -= pl.len;
            getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
            c = getCodeReturn.c;
            lc = getCodeReturn.lc;
          } else {
            if (!pl.p) {
              throw "hufDecode issues";
            }
            var j;
            for (j = 0; j < pl.lit; j++) {
              var l = hufLength(encodingTable[pl.p[j]]);
              while (lc < l && inOffset.value < inOffsetEnd) {
                getChar(c, lc, uInt8Array2, inOffset);
                c = getCharReturn.c;
                lc = getCharReturn.lc;
              }
              if (lc >= l) {
                if (hufCode(encodingTable[pl.p[j]]) == (c >> lc - l & (1 << l) - 1)) {
                  lc -= l;
                  getCode(
                    pl.p[j],
                    rlc,
                    c,
                    lc,
                    uInt8Array2,
                    inDataView,
                    inOffset,
                    outBuffer,
                    outOffset,
                    outBufferEndOffset
                  );
                  c = getCodeReturn.c;
                  lc = getCodeReturn.lc;
                  break;
                }
              }
            }
            if (j == pl.lit) {
              throw "hufDecode issues";
            }
          }
        }
      }
      var i = 8 - ni & 7;
      c >>= i;
      lc -= i;
      while (lc > 0) {
        var pl = decodingTable[c << HUF_DECBITS - lc & HUF_DECMASK];
        if (pl.len) {
          lc -= pl.len;
          getCode(pl.lit, rlc, c, lc, uInt8Array2, inDataView, inOffset, outBuffer, outOffset, outBufferEndOffset);
          c = getCodeReturn.c;
          lc = getCodeReturn.lc;
        } else {
          throw "hufDecode issues";
        }
      }
      return true;
    }
    function hufUncompress(uInt8Array2, inDataView, inOffset, nCompressed, outBuffer, nRaw) {
      var outOffset = { value: 0 };
      var initialInOffset = inOffset.value;
      var im = parseUint32(inDataView, inOffset);
      var iM = parseUint32(inDataView, inOffset);
      inOffset.value += 4;
      var nBits = parseUint32(inDataView, inOffset);
      inOffset.value += 4;
      if (im < 0 || im >= HUF_ENCSIZE || iM < 0 || iM >= HUF_ENCSIZE) {
        throw "Something wrong with HUF_ENCSIZE";
      }
      var freq = new Array(HUF_ENCSIZE);
      var hdec = new Array(HUF_DECSIZE);
      hufClearDecTable(hdec);
      var ni = nCompressed - (inOffset.value - initialInOffset);
      hufUnpackEncTable(uInt8Array2, inDataView, inOffset, ni, im, iM, freq);
      if (nBits > 8 * (nCompressed - (inOffset.value - initialInOffset))) {
        throw "Something wrong with hufUncompress";
      }
      hufBuildDecTable(freq, im, iM, hdec);
      hufDecode(freq, hdec, uInt8Array2, inDataView, inOffset, nBits, iM, nRaw, outBuffer, outOffset);
    }
    function applyLut(lut, data, nData) {
      for (var i = 0; i < nData; ++i) {
        data[i] = lut[data[i]];
      }
    }
    function predictor(source) {
      for (var t = 1; t < source.length; t++) {
        var d = source[t - 1] + source[t] - 128;
        source[t] = d;
      }
    }
    function interleaveScalar(source, out) {
      var t1 = 0;
      var t2 = Math.floor((source.length + 1) / 2);
      var s = 0;
      var stop = source.length - 1;
      while (true) {
        if (s > stop)
          break;
        out[s++] = source[t1++];
        if (s > stop)
          break;
        out[s++] = source[t2++];
      }
    }
    function decodeRunLength(source) {
      var size = source.byteLength;
      var out = new Array();
      var p = 0;
      var reader = new DataView(source);
      while (size > 0) {
        var l = reader.getInt8(p++);
        if (l < 0) {
          var count = -l;
          size -= count + 1;
          for (var i = 0; i < count; i++) {
            out.push(reader.getUint8(p++));
          }
        } else {
          var count = l;
          size -= 2;
          var value = reader.getUint8(p++);
          for (var i = 0; i < count + 1; i++) {
            out.push(value);
          }
        }
      }
      return out;
    }
    function lossyDctDecode(cscSet, rowPtrs, channelData, acBuffer, dcBuffer, outBuffer) {
      var dataView = new DataView(outBuffer.buffer);
      var width = channelData[cscSet.idx[0]].width;
      var height = channelData[cscSet.idx[0]].height;
      var numComp = 3;
      var numFullBlocksX = Math.floor(width / 8);
      var numBlocksX = Math.ceil(width / 8);
      var numBlocksY = Math.ceil(height / 8);
      var leftoverX = width - (numBlocksX - 1) * 8;
      var leftoverY = height - (numBlocksY - 1) * 8;
      var currAcComp = { value: 0 };
      var currDcComp = new Array(numComp);
      var dctData = new Array(numComp);
      var halfZigBlock = new Array(numComp);
      var rowBlock = new Array(numComp);
      var rowOffsets = new Array(numComp);
      for (let comp2 = 0; comp2 < numComp; ++comp2) {
        rowOffsets[comp2] = rowPtrs[cscSet.idx[comp2]];
        currDcComp[comp2] = comp2 < 1 ? 0 : currDcComp[comp2 - 1] + numBlocksX * numBlocksY;
        dctData[comp2] = new Float32Array(64);
        halfZigBlock[comp2] = new Uint16Array(64);
        rowBlock[comp2] = new Uint16Array(numBlocksX * 64);
      }
      for (let blocky = 0; blocky < numBlocksY; ++blocky) {
        var maxY = 8;
        if (blocky == numBlocksY - 1)
          maxY = leftoverY;
        var maxX = 8;
        for (let blockx = 0; blockx < numBlocksX; ++blockx) {
          if (blockx == numBlocksX - 1)
            maxX = leftoverX;
          for (let comp2 = 0; comp2 < numComp; ++comp2) {
            halfZigBlock[comp2].fill(0);
            halfZigBlock[comp2][0] = dcBuffer[currDcComp[comp2]++];
            unRleAC(currAcComp, acBuffer, halfZigBlock[comp2]);
            unZigZag(halfZigBlock[comp2], dctData[comp2]);
            dctInverse(dctData[comp2]);
          }
          {
            csc709Inverse(dctData);
          }
          for (let comp2 = 0; comp2 < numComp; ++comp2) {
            convertToHalf(dctData[comp2], rowBlock[comp2], blockx * 64);
          }
        }
        let offset2 = 0;
        for (let comp2 = 0; comp2 < numComp; ++comp2) {
          const type2 = channelData[cscSet.idx[comp2]].type;
          for (let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2) {
            offset2 = rowOffsets[comp2][y2];
            for (let blockx = 0; blockx < numFullBlocksX; ++blockx) {
              const src = blockx * 64 + (y2 & 7) * 8;
              dataView.setUint16(offset2 + 0 * INT16_SIZE * type2, rowBlock[comp2][src + 0], true);
              dataView.setUint16(offset2 + 1 * INT16_SIZE * type2, rowBlock[comp2][src + 1], true);
              dataView.setUint16(offset2 + 2 * INT16_SIZE * type2, rowBlock[comp2][src + 2], true);
              dataView.setUint16(offset2 + 3 * INT16_SIZE * type2, rowBlock[comp2][src + 3], true);
              dataView.setUint16(offset2 + 4 * INT16_SIZE * type2, rowBlock[comp2][src + 4], true);
              dataView.setUint16(offset2 + 5 * INT16_SIZE * type2, rowBlock[comp2][src + 5], true);
              dataView.setUint16(offset2 + 6 * INT16_SIZE * type2, rowBlock[comp2][src + 6], true);
              dataView.setUint16(offset2 + 7 * INT16_SIZE * type2, rowBlock[comp2][src + 7], true);
              offset2 += 8 * INT16_SIZE * type2;
            }
          }
          if (numFullBlocksX != numBlocksX) {
            for (let y2 = 8 * blocky; y2 < 8 * blocky + maxY; ++y2) {
              const offset3 = rowOffsets[comp2][y2] + 8 * numFullBlocksX * INT16_SIZE * type2;
              const src = numFullBlocksX * 64 + (y2 & 7) * 8;
              for (let x2 = 0; x2 < maxX; ++x2) {
                dataView.setUint16(offset3 + x2 * INT16_SIZE * type2, rowBlock[comp2][src + x2], true);
              }
            }
          }
        }
      }
      var halfRow = new Uint16Array(width);
      var dataView = new DataView(outBuffer.buffer);
      for (var comp = 0; comp < numComp; ++comp) {
        channelData[cscSet.idx[comp]].decoded = true;
        var type = channelData[cscSet.idx[comp]].type;
        if (channelData[comp].type != 2)
          continue;
        for (var y = 0; y < height; ++y) {
          const offset2 = rowOffsets[comp][y];
          for (var x = 0; x < width; ++x) {
            halfRow[x] = dataView.getUint16(offset2 + x * INT16_SIZE * type, true);
          }
          for (var x = 0; x < width; ++x) {
            dataView.setFloat32(offset2 + x * INT16_SIZE * type, decodeFloat16(halfRow[x]), true);
          }
        }
      }
    }
    function unRleAC(currAcComp, acBuffer, halfZigBlock) {
      var acValue;
      var dctComp = 1;
      while (dctComp < 64) {
        acValue = acBuffer[currAcComp.value];
        if (acValue == 65280) {
          dctComp = 64;
        } else if (acValue >> 8 == 255) {
          dctComp += acValue & 255;
        } else {
          halfZigBlock[dctComp] = acValue;
          dctComp++;
        }
        currAcComp.value++;
      }
    }
    function unZigZag(src, dst) {
      dst[0] = decodeFloat16(src[0]);
      dst[1] = decodeFloat16(src[1]);
      dst[2] = decodeFloat16(src[5]);
      dst[3] = decodeFloat16(src[6]);
      dst[4] = decodeFloat16(src[14]);
      dst[5] = decodeFloat16(src[15]);
      dst[6] = decodeFloat16(src[27]);
      dst[7] = decodeFloat16(src[28]);
      dst[8] = decodeFloat16(src[2]);
      dst[9] = decodeFloat16(src[4]);
      dst[10] = decodeFloat16(src[7]);
      dst[11] = decodeFloat16(src[13]);
      dst[12] = decodeFloat16(src[16]);
      dst[13] = decodeFloat16(src[26]);
      dst[14] = decodeFloat16(src[29]);
      dst[15] = decodeFloat16(src[42]);
      dst[16] = decodeFloat16(src[3]);
      dst[17] = decodeFloat16(src[8]);
      dst[18] = decodeFloat16(src[12]);
      dst[19] = decodeFloat16(src[17]);
      dst[20] = decodeFloat16(src[25]);
      dst[21] = decodeFloat16(src[30]);
      dst[22] = decodeFloat16(src[41]);
      dst[23] = decodeFloat16(src[43]);
      dst[24] = decodeFloat16(src[9]);
      dst[25] = decodeFloat16(src[11]);
      dst[26] = decodeFloat16(src[18]);
      dst[27] = decodeFloat16(src[24]);
      dst[28] = decodeFloat16(src[31]);
      dst[29] = decodeFloat16(src[40]);
      dst[30] = decodeFloat16(src[44]);
      dst[31] = decodeFloat16(src[53]);
      dst[32] = decodeFloat16(src[10]);
      dst[33] = decodeFloat16(src[19]);
      dst[34] = decodeFloat16(src[23]);
      dst[35] = decodeFloat16(src[32]);
      dst[36] = decodeFloat16(src[39]);
      dst[37] = decodeFloat16(src[45]);
      dst[38] = decodeFloat16(src[52]);
      dst[39] = decodeFloat16(src[54]);
      dst[40] = decodeFloat16(src[20]);
      dst[41] = decodeFloat16(src[22]);
      dst[42] = decodeFloat16(src[33]);
      dst[43] = decodeFloat16(src[38]);
      dst[44] = decodeFloat16(src[46]);
      dst[45] = decodeFloat16(src[51]);
      dst[46] = decodeFloat16(src[55]);
      dst[47] = decodeFloat16(src[60]);
      dst[48] = decodeFloat16(src[21]);
      dst[49] = decodeFloat16(src[34]);
      dst[50] = decodeFloat16(src[37]);
      dst[51] = decodeFloat16(src[47]);
      dst[52] = decodeFloat16(src[50]);
      dst[53] = decodeFloat16(src[56]);
      dst[54] = decodeFloat16(src[59]);
      dst[55] = decodeFloat16(src[61]);
      dst[56] = decodeFloat16(src[35]);
      dst[57] = decodeFloat16(src[36]);
      dst[58] = decodeFloat16(src[48]);
      dst[59] = decodeFloat16(src[49]);
      dst[60] = decodeFloat16(src[57]);
      dst[61] = decodeFloat16(src[58]);
      dst[62] = decodeFloat16(src[62]);
      dst[63] = decodeFloat16(src[63]);
    }
    function dctInverse(data) {
      const a = 0.5 * Math.cos(3.14159 / 4);
      const b = 0.5 * Math.cos(3.14159 / 16);
      const c = 0.5 * Math.cos(3.14159 / 8);
      const d = 0.5 * Math.cos(3 * 3.14159 / 16);
      const e = 0.5 * Math.cos(5 * 3.14159 / 16);
      const f = 0.5 * Math.cos(3 * 3.14159 / 8);
      const g = 0.5 * Math.cos(7 * 3.14159 / 16);
      var alpha = new Array(4);
      var beta = new Array(4);
      var theta = new Array(4);
      var gamma = new Array(4);
      for (var row = 0; row < 8; ++row) {
        var rowPtr = row * 8;
        alpha[0] = c * data[rowPtr + 2];
        alpha[1] = f * data[rowPtr + 2];
        alpha[2] = c * data[rowPtr + 6];
        alpha[3] = f * data[rowPtr + 6];
        beta[0] = b * data[rowPtr + 1] + d * data[rowPtr + 3] + e * data[rowPtr + 5] + g * data[rowPtr + 7];
        beta[1] = d * data[rowPtr + 1] - g * data[rowPtr + 3] - b * data[rowPtr + 5] - e * data[rowPtr + 7];
        beta[2] = e * data[rowPtr + 1] - b * data[rowPtr + 3] + g * data[rowPtr + 5] + d * data[rowPtr + 7];
        beta[3] = g * data[rowPtr + 1] - e * data[rowPtr + 3] + d * data[rowPtr + 5] - b * data[rowPtr + 7];
        theta[0] = a * (data[rowPtr + 0] + data[rowPtr + 4]);
        theta[3] = a * (data[rowPtr + 0] - data[rowPtr + 4]);
        theta[1] = alpha[0] + alpha[3];
        theta[2] = alpha[1] - alpha[2];
        gamma[0] = theta[0] + theta[1];
        gamma[1] = theta[3] + theta[2];
        gamma[2] = theta[3] - theta[2];
        gamma[3] = theta[0] - theta[1];
        data[rowPtr + 0] = gamma[0] + beta[0];
        data[rowPtr + 1] = gamma[1] + beta[1];
        data[rowPtr + 2] = gamma[2] + beta[2];
        data[rowPtr + 3] = gamma[3] + beta[3];
        data[rowPtr + 4] = gamma[3] - beta[3];
        data[rowPtr + 5] = gamma[2] - beta[2];
        data[rowPtr + 6] = gamma[1] - beta[1];
        data[rowPtr + 7] = gamma[0] - beta[0];
      }
      for (var column = 0; column < 8; ++column) {
        alpha[0] = c * data[16 + column];
        alpha[1] = f * data[16 + column];
        alpha[2] = c * data[48 + column];
        alpha[3] = f * data[48 + column];
        beta[0] = b * data[8 + column] + d * data[24 + column] + e * data[40 + column] + g * data[56 + column];
        beta[1] = d * data[8 + column] - g * data[24 + column] - b * data[40 + column] - e * data[56 + column];
        beta[2] = e * data[8 + column] - b * data[24 + column] + g * data[40 + column] + d * data[56 + column];
        beta[3] = g * data[8 + column] - e * data[24 + column] + d * data[40 + column] - b * data[56 + column];
        theta[0] = a * (data[column] + data[32 + column]);
        theta[3] = a * (data[column] - data[32 + column]);
        theta[1] = alpha[0] + alpha[3];
        theta[2] = alpha[1] - alpha[2];
        gamma[0] = theta[0] + theta[1];
        gamma[1] = theta[3] + theta[2];
        gamma[2] = theta[3] - theta[2];
        gamma[3] = theta[0] - theta[1];
        data[0 + column] = gamma[0] + beta[0];
        data[8 + column] = gamma[1] + beta[1];
        data[16 + column] = gamma[2] + beta[2];
        data[24 + column] = gamma[3] + beta[3];
        data[32 + column] = gamma[3] - beta[3];
        data[40 + column] = gamma[2] - beta[2];
        data[48 + column] = gamma[1] - beta[1];
        data[56 + column] = gamma[0] - beta[0];
      }
    }
    function csc709Inverse(data) {
      for (var i = 0; i < 64; ++i) {
        var y = data[0][i];
        var cb = data[1][i];
        var cr = data[2][i];
        data[0][i] = y + 1.5747 * cr;
        data[1][i] = y - 0.1873 * cb - 0.4682 * cr;
        data[2][i] = y + 1.8556 * cb;
      }
    }
    function convertToHalf(src, dst, idx) {
      for (var i = 0; i < 64; ++i) {
        dst[idx + i] = DataUtils.toHalfFloat(toLinear(src[i]));
      }
    }
    function toLinear(float) {
      if (float <= 1) {
        return Math.sign(float) * Math.pow(Math.abs(float), 2.2);
      } else {
        return Math.sign(float) * Math.pow(logBase, Math.abs(float) - 1);
      }
    }
    function uncompressRAW(info) {
      return new DataView(info.array.buffer, info.offset.value, info.size);
    }
    function uncompressRLE(info) {
      var compressed = info.viewer.buffer.slice(info.offset.value, info.offset.value + info.size);
      var rawBuffer = new Uint8Array(decodeRunLength(compressed));
      var tmpBuffer = new Uint8Array(rawBuffer.length);
      predictor(rawBuffer);
      interleaveScalar(rawBuffer, tmpBuffer);
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressZIP(info) {
      var compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
      var rawBuffer = unzlibSync(compressed);
      var tmpBuffer = new Uint8Array(rawBuffer.length);
      predictor(rawBuffer);
      interleaveScalar(rawBuffer, tmpBuffer);
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressPIZ(info) {
      var inDataView = info.viewer;
      var inOffset = { value: info.offset.value };
      var outBuffer = new Uint16Array(info.width * info.scanlineBlockSize * (info.channels * info.type));
      var bitmap = new Uint8Array(BITMAP_SIZE);
      var outBufferEnd = 0;
      var pizChannelData = new Array(info.channels);
      for (var i = 0; i < info.channels; i++) {
        pizChannelData[i] = {};
        pizChannelData[i]["start"] = outBufferEnd;
        pizChannelData[i]["end"] = pizChannelData[i]["start"];
        pizChannelData[i]["nx"] = info.width;
        pizChannelData[i]["ny"] = info.lines;
        pizChannelData[i]["size"] = info.type;
        outBufferEnd += pizChannelData[i].nx * pizChannelData[i].ny * pizChannelData[i].size;
      }
      var minNonZero = parseUint16(inDataView, inOffset);
      var maxNonZero = parseUint16(inDataView, inOffset);
      if (maxNonZero >= BITMAP_SIZE) {
        throw "Something is wrong with PIZ_COMPRESSION BITMAP_SIZE";
      }
      if (minNonZero <= maxNonZero) {
        for (var i = 0; i < maxNonZero - minNonZero + 1; i++) {
          bitmap[i + minNonZero] = parseUint8(inDataView, inOffset);
        }
      }
      var lut = new Uint16Array(USHORT_RANGE);
      var maxValue = reverseLutFromBitmap(bitmap, lut);
      var length = parseUint32(inDataView, inOffset);
      hufUncompress(info.array, inDataView, inOffset, length, outBuffer, outBufferEnd);
      for (var i = 0; i < info.channels; ++i) {
        var cd = pizChannelData[i];
        for (var j = 0; j < pizChannelData[i].size; ++j) {
          wav2Decode(outBuffer, cd.start + j, cd.nx, cd.size, cd.ny, cd.nx * cd.size, maxValue);
        }
      }
      applyLut(lut, outBuffer, outBufferEnd);
      var tmpOffset2 = 0;
      var tmpBuffer = new Uint8Array(outBuffer.buffer.byteLength);
      for (var y = 0; y < info.lines; y++) {
        for (var c = 0; c < info.channels; c++) {
          var cd = pizChannelData[c];
          var n = cd.nx * cd.size;
          var cp = new Uint8Array(outBuffer.buffer, cd.end * INT16_SIZE, n * INT16_SIZE);
          tmpBuffer.set(cp, tmpOffset2);
          tmpOffset2 += n * INT16_SIZE;
          cd.end += n;
        }
      }
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressPXR(info) {
      var compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
      var rawBuffer = unzlibSync(compressed);
      const sz = info.lines * info.channels * info.width;
      const tmpBuffer = info.type == 1 ? new Uint16Array(sz) : new Uint32Array(sz);
      let tmpBufferEnd = 0;
      let writePtr = 0;
      const ptr = new Array(4);
      for (let y = 0; y < info.lines; y++) {
        for (let c = 0; c < info.channels; c++) {
          let pixel = 0;
          switch (info.type) {
            case 1:
              ptr[0] = tmpBufferEnd;
              ptr[1] = ptr[0] + info.width;
              tmpBufferEnd = ptr[1] + info.width;
              for (let j = 0; j < info.width; ++j) {
                const diff = rawBuffer[ptr[0]++] << 8 | rawBuffer[ptr[1]++];
                pixel += diff;
                tmpBuffer[writePtr] = pixel;
                writePtr++;
              }
              break;
            case 2:
              ptr[0] = tmpBufferEnd;
              ptr[1] = ptr[0] + info.width;
              ptr[2] = ptr[1] + info.width;
              tmpBufferEnd = ptr[2] + info.width;
              for (let j = 0; j < info.width; ++j) {
                const diff = rawBuffer[ptr[0]++] << 24 | rawBuffer[ptr[1]++] << 16 | rawBuffer[ptr[2]++] << 8;
                pixel += diff;
                tmpBuffer[writePtr] = pixel;
                writePtr++;
              }
              break;
          }
        }
      }
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressDWA(info) {
      var inDataView = info.viewer;
      var inOffset = { value: info.offset.value };
      var outBuffer = new Uint8Array(info.width * info.lines * (info.channels * info.type * INT16_SIZE));
      var dwaHeader = {
        version: parseInt64(inDataView, inOffset),
        unknownUncompressedSize: parseInt64(inDataView, inOffset),
        unknownCompressedSize: parseInt64(inDataView, inOffset),
        acCompressedSize: parseInt64(inDataView, inOffset),
        dcCompressedSize: parseInt64(inDataView, inOffset),
        rleCompressedSize: parseInt64(inDataView, inOffset),
        rleUncompressedSize: parseInt64(inDataView, inOffset),
        rleRawSize: parseInt64(inDataView, inOffset),
        totalAcUncompressedCount: parseInt64(inDataView, inOffset),
        totalDcUncompressedCount: parseInt64(inDataView, inOffset),
        acCompression: parseInt64(inDataView, inOffset)
      };
      if (dwaHeader.version < 2) {
        throw "EXRLoader.parse: " + EXRHeader.compression + " version " + dwaHeader.version + " is unsupported";
      }
      var channelRules = new Array();
      var ruleSize = parseUint16(inDataView, inOffset) - INT16_SIZE;
      while (ruleSize > 0) {
        var name = parseNullTerminatedString(inDataView.buffer, inOffset);
        var value = parseUint8(inDataView, inOffset);
        var compression = value >> 2 & 3;
        var csc = (value >> 4) - 1;
        var index = new Int8Array([csc])[0];
        var type = parseUint8(inDataView, inOffset);
        channelRules.push({
          name,
          index,
          type,
          compression
        });
        ruleSize -= name.length + 3;
      }
      var channels = EXRHeader.channels;
      var channelData = new Array(info.channels);
      for (var i = 0; i < info.channels; ++i) {
        var cd = channelData[i] = {};
        var channel = channels[i];
        cd.name = channel.name;
        cd.compression = UNKNOWN;
        cd.decoded = false;
        cd.type = channel.pixelType;
        cd.pLinear = channel.pLinear;
        cd.width = info.width;
        cd.height = info.lines;
      }
      var cscSet = {
        idx: new Array(3)
      };
      for (var offset2 = 0; offset2 < info.channels; ++offset2) {
        var cd = channelData[offset2];
        for (var i = 0; i < channelRules.length; ++i) {
          var rule = channelRules[i];
          if (cd.name == rule.name) {
            cd.compression = rule.compression;
            if (rule.index >= 0) {
              cscSet.idx[rule.index] = offset2;
            }
            cd.offset = offset2;
          }
        }
      }
      if (dwaHeader.acCompressedSize > 0) {
        switch (dwaHeader.acCompression) {
          case STATIC_HUFFMAN:
            var acBuffer = new Uint16Array(dwaHeader.totalAcUncompressedCount);
            hufUncompress(
              info.array,
              inDataView,
              inOffset,
              dwaHeader.acCompressedSize,
              acBuffer,
              dwaHeader.totalAcUncompressedCount
            );
            break;
          case DEFLATE:
            var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.totalAcUncompressedCount);
            var data = unzlibSync(compressed);
            var acBuffer = new Uint16Array(data.buffer);
            inOffset.value += dwaHeader.totalAcUncompressedCount;
            break;
        }
      }
      if (dwaHeader.dcCompressedSize > 0) {
        var zlibInfo = {
          array: info.array,
          offset: inOffset,
          size: dwaHeader.dcCompressedSize
        };
        var dcBuffer = new Uint16Array(uncompressZIP(zlibInfo).buffer);
        inOffset.value += dwaHeader.dcCompressedSize;
      }
      if (dwaHeader.rleRawSize > 0) {
        var compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.rleCompressedSize);
        var data = unzlibSync(compressed);
        var rleBuffer = decodeRunLength(data.buffer);
        inOffset.value += dwaHeader.rleCompressedSize;
      }
      var outBufferEnd = 0;
      var rowOffsets = new Array(channelData.length);
      for (var i = 0; i < rowOffsets.length; ++i) {
        rowOffsets[i] = new Array();
      }
      for (var y = 0; y < info.lines; ++y) {
        for (var chan = 0; chan < channelData.length; ++chan) {
          rowOffsets[chan].push(outBufferEnd);
          outBufferEnd += channelData[chan].width * info.type * INT16_SIZE;
        }
      }
      lossyDctDecode(cscSet, rowOffsets, channelData, acBuffer, dcBuffer, outBuffer);
      for (var i = 0; i < channelData.length; ++i) {
        var cd = channelData[i];
        if (cd.decoded)
          continue;
        switch (cd.compression) {
          case RLE:
            var row = 0;
            var rleOffset = 0;
            for (var y = 0; y < info.lines; ++y) {
              var rowOffsetBytes = rowOffsets[i][row];
              for (var x = 0; x < cd.width; ++x) {
                for (var byte = 0; byte < INT16_SIZE * cd.type; ++byte) {
                  outBuffer[rowOffsetBytes++] = rleBuffer[rleOffset + byte * cd.width * cd.height];
                }
                rleOffset++;
              }
              row++;
            }
            break;
          case LOSSY_DCT:
          default:
            throw "EXRLoader.parse: unsupported channel compression";
        }
      }
      return new DataView(outBuffer.buffer);
    }
    function parseNullTerminatedString(buffer2, offset2) {
      var uintBuffer = new Uint8Array(buffer2);
      var endOffset = 0;
      while (uintBuffer[offset2.value + endOffset] != 0) {
        endOffset += 1;
      }
      var stringValue = new TextDecoder().decode(uintBuffer.slice(offset2.value, offset2.value + endOffset));
      offset2.value = offset2.value + endOffset + 1;
      return stringValue;
    }
    function parseFixedLengthString(buffer2, offset2, size) {
      var stringValue = new TextDecoder().decode(new Uint8Array(buffer2).slice(offset2.value, offset2.value + size));
      offset2.value = offset2.value + size;
      return stringValue;
    }
    function parseRational(dataView, offset2) {
      var x = parseInt32(dataView, offset2);
      var y = parseUint32(dataView, offset2);
      return [x, y];
    }
    function parseTimecode(dataView, offset2) {
      var x = parseUint32(dataView, offset2);
      var y = parseUint32(dataView, offset2);
      return [x, y];
    }
    function parseInt32(dataView, offset2) {
      var Int32 = dataView.getInt32(offset2.value, true);
      offset2.value = offset2.value + INT32_SIZE;
      return Int32;
    }
    function parseUint32(dataView, offset2) {
      var Uint32 = dataView.getUint32(offset2.value, true);
      offset2.value = offset2.value + INT32_SIZE;
      return Uint32;
    }
    function parseUint8Array(uInt8Array2, offset2) {
      var Uint8 = uInt8Array2[offset2.value];
      offset2.value = offset2.value + INT8_SIZE;
      return Uint8;
    }
    function parseUint8(dataView, offset2) {
      var Uint8 = dataView.getUint8(offset2.value);
      offset2.value = offset2.value + INT8_SIZE;
      return Uint8;
    }
    const parseInt64 = function(dataView, offset2) {
      let int;
      if ("getBigInt64" in DataView.prototype) {
        int = Number(dataView.getBigInt64(offset2.value, true));
      } else {
        int = dataView.getUint32(offset2.value + 4, true) + Number(dataView.getUint32(offset2.value, true) << 32);
      }
      offset2.value += ULONG_SIZE;
      return int;
    };
    function parseFloat32(dataView, offset2) {
      var float = dataView.getFloat32(offset2.value, true);
      offset2.value += FLOAT32_SIZE;
      return float;
    }
    function decodeFloat32(dataView, offset2) {
      return DataUtils.toHalfFloat(parseFloat32(dataView, offset2));
    }
    function decodeFloat16(binary) {
      var exponent = (binary & 31744) >> 10, fraction = binary & 1023;
      return (binary >> 15 ? -1 : 1) * (exponent ? exponent === 31 ? fraction ? NaN : Infinity : Math.pow(2, exponent - 15) * (1 + fraction / 1024) : 6103515625e-14 * (fraction / 1024));
    }
    function parseUint16(dataView, offset2) {
      var Uint16 = dataView.getUint16(offset2.value, true);
      offset2.value += INT16_SIZE;
      return Uint16;
    }
    function parseFloat16(buffer2, offset2) {
      return decodeFloat16(parseUint16(buffer2, offset2));
    }
    function parseChlist(dataView, buffer2, offset2, size) {
      var startOffset = offset2.value;
      var channels = [];
      while (offset2.value < startOffset + size - 1) {
        var name = parseNullTerminatedString(buffer2, offset2);
        var pixelType = parseInt32(dataView, offset2);
        var pLinear = parseUint8(dataView, offset2);
        offset2.value += 3;
        var xSampling = parseInt32(dataView, offset2);
        var ySampling = parseInt32(dataView, offset2);
        channels.push({
          name,
          pixelType,
          pLinear,
          xSampling,
          ySampling
        });
      }
      offset2.value += 1;
      return channels;
    }
    function parseChromaticities(dataView, offset2) {
      var redX = parseFloat32(dataView, offset2);
      var redY = parseFloat32(dataView, offset2);
      var greenX = parseFloat32(dataView, offset2);
      var greenY = parseFloat32(dataView, offset2);
      var blueX = parseFloat32(dataView, offset2);
      var blueY = parseFloat32(dataView, offset2);
      var whiteX = parseFloat32(dataView, offset2);
      var whiteY = parseFloat32(dataView, offset2);
      return {
        redX,
        redY,
        greenX,
        greenY,
        blueX,
        blueY,
        whiteX,
        whiteY
      };
    }
    function parseCompression(dataView, offset2) {
      var compressionCodes = [
        "NO_COMPRESSION",
        "RLE_COMPRESSION",
        "ZIPS_COMPRESSION",
        "ZIP_COMPRESSION",
        "PIZ_COMPRESSION",
        "PXR24_COMPRESSION",
        "B44_COMPRESSION",
        "B44A_COMPRESSION",
        "DWAA_COMPRESSION",
        "DWAB_COMPRESSION"
      ];
      var compression = parseUint8(dataView, offset2);
      return compressionCodes[compression];
    }
    function parseBox2i(dataView, offset2) {
      var xMin = parseUint32(dataView, offset2);
      var yMin = parseUint32(dataView, offset2);
      var xMax = parseUint32(dataView, offset2);
      var yMax = parseUint32(dataView, offset2);
      return { xMin, yMin, xMax, yMax };
    }
    function parseLineOrder(dataView, offset2) {
      var lineOrders = ["INCREASING_Y"];
      var lineOrder = parseUint8(dataView, offset2);
      return lineOrders[lineOrder];
    }
    function parseV2f(dataView, offset2) {
      var x = parseFloat32(dataView, offset2);
      var y = parseFloat32(dataView, offset2);
      return [x, y];
    }
    function parseV3f(dataView, offset2) {
      var x = parseFloat32(dataView, offset2);
      var y = parseFloat32(dataView, offset2);
      var z = parseFloat32(dataView, offset2);
      return [x, y, z];
    }
    function parseValue(dataView, buffer2, offset2, type, size) {
      if (type === "string" || type === "stringvector" || type === "iccProfile") {
        return parseFixedLengthString(buffer2, offset2, size);
      } else if (type === "chlist") {
        return parseChlist(dataView, buffer2, offset2, size);
      } else if (type === "chromaticities") {
        return parseChromaticities(dataView, offset2);
      } else if (type === "compression") {
        return parseCompression(dataView, offset2);
      } else if (type === "box2i") {
        return parseBox2i(dataView, offset2);
      } else if (type === "lineOrder") {
        return parseLineOrder(dataView, offset2);
      } else if (type === "float") {
        return parseFloat32(dataView, offset2);
      } else if (type === "v2f") {
        return parseV2f(dataView, offset2);
      } else if (type === "v3f") {
        return parseV3f(dataView, offset2);
      } else if (type === "int") {
        return parseInt32(dataView, offset2);
      } else if (type === "rational") {
        return parseRational(dataView, offset2);
      } else if (type === "timecode") {
        return parseTimecode(dataView, offset2);
      } else if (type === "preview") {
        offset2.value += size;
        return "skipped";
      } else {
        offset2.value += size;
        return void 0;
      }
    }
    function parseHeader(dataView, buffer2, offset2) {
      const EXRHeader2 = {};
      if (dataView.getUint32(0, true) != 20000630) {
        throw "THREE.EXRLoader: provided file doesn't appear to be in OpenEXR format.";
      }
      EXRHeader2.version = dataView.getUint8(4);
      const spec = dataView.getUint8(5);
      EXRHeader2.spec = {
        singleTile: !!(spec & 2),
        longName: !!(spec & 4),
        deepFormat: !!(spec & 8),
        multiPart: !!(spec & 16)
      };
      offset2.value = 8;
      var keepReading = true;
      while (keepReading) {
        var attributeName = parseNullTerminatedString(buffer2, offset2);
        if (attributeName == 0) {
          keepReading = false;
        } else {
          var attributeType = parseNullTerminatedString(buffer2, offset2);
          var attributeSize = parseUint32(dataView, offset2);
          var attributeValue = parseValue(dataView, buffer2, offset2, attributeType, attributeSize);
          if (attributeValue === void 0) {
            console.warn(`EXRLoader.parse: skipped unknown header attribute type '${attributeType}'.`);
          } else {
            EXRHeader2[attributeName] = attributeValue;
          }
        }
      }
      if ((spec & -5) != 0) {
        console.error("EXRHeader:", EXRHeader2);
        throw "THREE.EXRLoader: provided file is currently unsupported.";
      }
      return EXRHeader2;
    }
    function setupDecoder(EXRHeader2, dataView, uInt8Array2, offset2, outputType) {
      const EXRDecoder2 = {
        size: 0,
        viewer: dataView,
        array: uInt8Array2,
        offset: offset2,
        width: EXRHeader2.dataWindow.xMax - EXRHeader2.dataWindow.xMin + 1,
        height: EXRHeader2.dataWindow.yMax - EXRHeader2.dataWindow.yMin + 1,
        channels: EXRHeader2.channels.length,
        bytesPerLine: null,
        lines: null,
        inputSize: null,
        type: EXRHeader2.channels[0].pixelType,
        uncompress: null,
        getter: null,
        format: null,
        [hasColorSpace ? "colorSpace" : "encoding"]: null
      };
      switch (EXRHeader2.compression) {
        case "NO_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressRAW;
          break;
        case "RLE_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressRLE;
          break;
        case "ZIPS_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressZIP;
          break;
        case "ZIP_COMPRESSION":
          EXRDecoder2.lines = 16;
          EXRDecoder2.uncompress = uncompressZIP;
          break;
        case "PIZ_COMPRESSION":
          EXRDecoder2.lines = 32;
          EXRDecoder2.uncompress = uncompressPIZ;
          break;
        case "PXR24_COMPRESSION":
          EXRDecoder2.lines = 16;
          EXRDecoder2.uncompress = uncompressPXR;
          break;
        case "DWAA_COMPRESSION":
          EXRDecoder2.lines = 32;
          EXRDecoder2.uncompress = uncompressDWA;
          break;
        case "DWAB_COMPRESSION":
          EXRDecoder2.lines = 256;
          EXRDecoder2.uncompress = uncompressDWA;
          break;
        default:
          throw "EXRLoader.parse: " + EXRHeader2.compression + " is unsupported";
      }
      EXRDecoder2.scanlineBlockSize = EXRDecoder2.lines;
      if (EXRDecoder2.type == 1) {
        switch (outputType) {
          case FloatType:
            EXRDecoder2.getter = parseFloat16;
            EXRDecoder2.inputSize = INT16_SIZE;
            break;
          case HalfFloatType:
            EXRDecoder2.getter = parseUint16;
            EXRDecoder2.inputSize = INT16_SIZE;
            break;
        }
      } else if (EXRDecoder2.type == 2) {
        switch (outputType) {
          case FloatType:
            EXRDecoder2.getter = parseFloat32;
            EXRDecoder2.inputSize = FLOAT32_SIZE;
            break;
          case HalfFloatType:
            EXRDecoder2.getter = decodeFloat32;
            EXRDecoder2.inputSize = FLOAT32_SIZE;
        }
      } else {
        throw "EXRLoader.parse: unsupported pixelType " + EXRDecoder2.type + " for " + EXRHeader2.compression + ".";
      }
      EXRDecoder2.blockCount = (EXRHeader2.dataWindow.yMax + 1) / EXRDecoder2.scanlineBlockSize;
      for (var i = 0; i < EXRDecoder2.blockCount; i++)
        parseInt64(dataView, offset2);
      EXRDecoder2.outputChannels = EXRDecoder2.channels == 3 ? 4 : EXRDecoder2.channels;
      const size = EXRDecoder2.width * EXRDecoder2.height * EXRDecoder2.outputChannels;
      switch (outputType) {
        case FloatType:
          EXRDecoder2.byteArray = new Float32Array(size);
          if (EXRDecoder2.channels < EXRDecoder2.outputChannels)
            EXRDecoder2.byteArray.fill(1, 0, size);
          break;
        case HalfFloatType:
          EXRDecoder2.byteArray = new Uint16Array(size);
          if (EXRDecoder2.channels < EXRDecoder2.outputChannels)
            EXRDecoder2.byteArray.fill(15360, 0, size);
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", outputType);
          break;
      }
      EXRDecoder2.bytesPerLine = EXRDecoder2.width * EXRDecoder2.inputSize * EXRDecoder2.channels;
      if (EXRDecoder2.outputChannels == 4)
        EXRDecoder2.format = RGBAFormat;
      else
        EXRDecoder2.format = RedFormat;
      if (hasColorSpace)
        EXRDecoder2.colorSpace = "srgb-linear";
      else
        EXRDecoder2.encoding = 3e3;
      return EXRDecoder2;
    }
    const bufferDataView = new DataView(buffer);
    const uInt8Array = new Uint8Array(buffer);
    const offset = { value: 0 };
    const EXRHeader = parseHeader(bufferDataView, buffer, offset);
    const EXRDecoder = setupDecoder(EXRHeader, bufferDataView, uInt8Array, offset, this.type);
    const tmpOffset = { value: 0 };
    const channelOffsets = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
    for (let scanlineBlockIdx = 0; scanlineBlockIdx < EXRDecoder.height / EXRDecoder.scanlineBlockSize; scanlineBlockIdx++) {
      const line = parseUint32(bufferDataView, offset);
      EXRDecoder.size = parseUint32(bufferDataView, offset);
      EXRDecoder.lines = line + EXRDecoder.scanlineBlockSize > EXRDecoder.height ? EXRDecoder.height - line : EXRDecoder.scanlineBlockSize;
      const isCompressed = EXRDecoder.size < EXRDecoder.lines * EXRDecoder.bytesPerLine;
      const viewer = isCompressed ? EXRDecoder.uncompress(EXRDecoder) : uncompressRAW(EXRDecoder);
      offset.value += EXRDecoder.size;
      for (let line_y = 0; line_y < EXRDecoder.scanlineBlockSize; line_y++) {
        const true_y = line_y + scanlineBlockIdx * EXRDecoder.scanlineBlockSize;
        if (true_y >= EXRDecoder.height)
          break;
        for (let channelID = 0; channelID < EXRDecoder.channels; channelID++) {
          const cOff = channelOffsets[EXRHeader.channels[channelID].name];
          for (let x = 0; x < EXRDecoder.width; x++) {
            tmpOffset.value = (line_y * (EXRDecoder.channels * EXRDecoder.width) + channelID * EXRDecoder.width + x) * EXRDecoder.inputSize;
            const outIndex = (EXRDecoder.height - 1 - true_y) * (EXRDecoder.width * EXRDecoder.outputChannels) + x * EXRDecoder.outputChannels + cOff;
            EXRDecoder.byteArray[outIndex] = EXRDecoder.getter(viewer, tmpOffset);
          }
        }
      }
    }
    return {
      header: EXRHeader,
      width: EXRDecoder.width,
      height: EXRDecoder.height,
      data: EXRDecoder.byteArray,
      format: EXRDecoder.format,
      [hasColorSpace ? "colorSpace" : "encoding"]: EXRDecoder[hasColorSpace ? "colorSpace" : "encoding"],
      type: this.type
    };
  }
  setDataType(value) {
    this.type = value;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    function onLoadCallback(texture, texData) {
      if (hasColorSpace)
        texture.colorSpace = texData.colorSpace;
      else
        texture.encoding = texData.encoding;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.generateMipmaps = false;
      texture.flipY = false;
      if (onLoad)
        onLoad(texture, texData);
    }
    return super.load(url, onLoadCallback, onProgress, onError);
  }
}
function shaderMaterial(uniforms, vertexShader2, fragmentShader2, onInit) {
  var _Class;
  return _Class = class extends ShaderMaterial {
    constructor(parameters) {
      super({
        vertexShader: vertexShader2,
        fragmentShader: fragmentShader2,
        ...parameters
      });
      for (const key in uniforms) {
        this.uniforms[key] = new Uniform(uniforms[key]);
        Object.defineProperty(this, key, {
          get() {
            return this.uniforms[key].value;
          },
          set(value) {
            this.uniforms[key].value = value;
          }
        });
      }
      this.uniforms = UniformsUtils.clone(this.uniforms);
    }
  }, _Class.key = MathUtils.generateUUID(), _Class;
}
const getVersion = () => parseInt(REVISION.replace(/\D+/g, ""));
const version = /* @__PURE__ */ getVersion();
const OrbitControls2 = /* @__PURE__ */ reactExports.forwardRef(({
  makeDefault,
  camera,
  regress,
  domElement,
  enableDamping = true,
  keyEvents = false,
  onChange,
  onStart,
  onEnd,
  ...restProps
}, ref) => {
  const invalidate = useThree((state) => state.invalidate);
  const defaultCamera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const setEvents = useThree((state) => state.setEvents);
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const performance = useThree((state) => state.performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = reactExports.useMemo(() => new OrbitControls$1(explCamera), [explCamera]);
  useFrame(() => {
    if (controls.enabled) controls.update();
  }, -1);
  reactExports.useEffect(() => {
    if (keyEvents) {
      controls.connect(keyEvents === true ? explDomElement : keyEvents);
    }
    controls.connect(explDomElement);
    return () => void controls.dispose();
  }, [keyEvents, explDomElement, regress, controls, invalidate]);
  reactExports.useEffect(() => {
    const callback = (e) => {
      invalidate();
      if (regress) performance.regress();
      if (onChange) onChange(e);
    };
    const onStartCb = (e) => {
      if (onStart) onStart(e);
    };
    const onEndCb = (e) => {
      if (onEnd) onEnd(e);
    };
    controls.addEventListener("change", callback);
    controls.addEventListener("start", onStartCb);
    controls.addEventListener("end", onEndCb);
    return () => {
      controls.removeEventListener("start", onStartCb);
      controls.removeEventListener("end", onEndCb);
      controls.removeEventListener("change", callback);
    };
  }, [onChange, onStart, onEnd, controls, invalidate, setEvents]);
  reactExports.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    ref,
    object: controls,
    enableDamping
  }, restProps));
});
const DiscardMaterial = /* @__PURE__ */ shaderMaterial({}, "void main() { }", "void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");
const getBufferForType = (type, width, height) => {
  let out;
  switch (type) {
    case UnsignedByteType:
      out = new Uint8ClampedArray(width * height * 4);
      break;
    case HalfFloatType:
      out = new Uint16Array(width * height * 4);
      break;
    case UnsignedIntType:
      out = new Uint32Array(width * height * 4);
      break;
    case ByteType:
      out = new Int8Array(width * height * 4);
      break;
    case ShortType:
      out = new Int16Array(width * height * 4);
      break;
    case IntType:
      out = new Int32Array(width * height * 4);
      break;
    case FloatType:
      out = new Float32Array(width * height * 4);
      break;
    default:
      throw new Error("Unsupported data type");
  }
  return out;
};
let _canReadPixelsResult;
const canReadPixels = (type, renderer, camera, renderTargetOptions) => {
  if (_canReadPixelsResult !== void 0)
    return _canReadPixelsResult;
  const testRT = new WebGLRenderTarget(1, 1, renderTargetOptions);
  renderer.setRenderTarget(testRT);
  const mesh = new Mesh(new PlaneGeometry(), new MeshBasicMaterial({ color: 16777215 }));
  renderer.render(mesh, camera);
  renderer.setRenderTarget(null);
  const out = getBufferForType(type, testRT.width, testRT.height);
  renderer.readRenderTargetPixels(testRT, 0, 0, testRT.width, testRT.height, out);
  testRT.dispose();
  mesh.geometry.dispose();
  mesh.material.dispose();
  _canReadPixelsResult = out[0] !== 0;
  return _canReadPixelsResult;
};
class QuadRenderer {
  /**
   * Constructs a new QuadRenderer
   *
   * @param options Parameters for this QuadRenderer
   */
  constructor(options) {
    var _a2, _b2, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    this._rendererIsDisposable = false;
    this._supportsReadPixels = true;
    this.render = () => {
      this._renderer.setRenderTarget(this._renderTarget);
      try {
        this._renderer.render(this._scene, this._camera);
      } catch (e) {
        this._renderer.setRenderTarget(null);
        throw e;
      }
      this._renderer.setRenderTarget(null);
    };
    this._width = options.width;
    this._height = options.height;
    this._type = options.type;
    this._colorSpace = options.colorSpace;
    const rtOptions = {
      // fixed options
      format: RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
      // user options
      type: this._type,
      // set in class property
      colorSpace: this._colorSpace,
      // set in class property
      anisotropy: ((_a2 = options.renderTargetOptions) === null || _a2 === void 0 ? void 0 : _a2.anisotropy) !== void 0 ? (_b2 = options.renderTargetOptions) === null || _b2 === void 0 ? void 0 : _b2.anisotropy : 1,
      generateMipmaps: ((_c = options.renderTargetOptions) === null || _c === void 0 ? void 0 : _c.generateMipmaps) !== void 0 ? (_d = options.renderTargetOptions) === null || _d === void 0 ? void 0 : _d.generateMipmaps : false,
      magFilter: ((_e = options.renderTargetOptions) === null || _e === void 0 ? void 0 : _e.magFilter) !== void 0 ? (_f = options.renderTargetOptions) === null || _f === void 0 ? void 0 : _f.magFilter : LinearFilter,
      minFilter: ((_g = options.renderTargetOptions) === null || _g === void 0 ? void 0 : _g.minFilter) !== void 0 ? (_h = options.renderTargetOptions) === null || _h === void 0 ? void 0 : _h.minFilter : LinearFilter,
      samples: ((_j = options.renderTargetOptions) === null || _j === void 0 ? void 0 : _j.samples) !== void 0 ? (_k = options.renderTargetOptions) === null || _k === void 0 ? void 0 : _k.samples : void 0,
      wrapS: ((_l = options.renderTargetOptions) === null || _l === void 0 ? void 0 : _l.wrapS) !== void 0 ? (_m = options.renderTargetOptions) === null || _m === void 0 ? void 0 : _m.wrapS : ClampToEdgeWrapping,
      wrapT: ((_o = options.renderTargetOptions) === null || _o === void 0 ? void 0 : _o.wrapT) !== void 0 ? (_p = options.renderTargetOptions) === null || _p === void 0 ? void 0 : _p.wrapT : ClampToEdgeWrapping
    };
    this._material = options.material;
    if (options.renderer) {
      this._renderer = options.renderer;
    } else {
      this._renderer = QuadRenderer.instantiateRenderer();
      this._rendererIsDisposable = true;
    }
    this._scene = new Scene();
    this._camera = new OrthographicCamera();
    this._camera.position.set(0, 0, 10);
    this._camera.left = -0.5;
    this._camera.right = 0.5;
    this._camera.top = 0.5;
    this._camera.bottom = -0.5;
    this._camera.updateProjectionMatrix();
    if (!canReadPixels(this._type, this._renderer, this._camera, rtOptions)) {
      let alternativeType;
      switch (this._type) {
        case HalfFloatType:
          alternativeType = this._renderer.extensions.has("EXT_color_buffer_float") ? FloatType : void 0;
          break;
      }
      if (alternativeType !== void 0) {
        console.warn(`This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${FloatType}`);
        this._type = alternativeType;
      } else {
        this._supportsReadPixels = false;
        console.warn("This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown");
      }
    }
    this._quad = new Mesh(new PlaneGeometry(), this._material);
    this._quad.geometry.computeBoundingBox();
    this._scene.add(this._quad);
    this._renderTarget = new WebGLRenderTarget(this.width, this.height, rtOptions);
    this._renderTarget.texture.mapping = ((_q = options.renderTargetOptions) === null || _q === void 0 ? void 0 : _q.mapping) !== void 0 ? (_r = options.renderTargetOptions) === null || _r === void 0 ? void 0 : _r.mapping : UVMapping;
  }
  /**
   * Instantiates a temporary renderer
   *
   * @returns
   */
  static instantiateRenderer() {
    const renderer = new WebGLRenderer();
    renderer.setSize(128, 128);
    return renderer;
  }
  /**
   * Obtains a Buffer containing the rendered texture.
   *
   * @throws Error if the browser cannot read pixels from this RenderTarget type.
   * @returns a TypedArray containing RGBA values from this renderer
   */
  toArray() {
    if (!this._supportsReadPixels)
      throw new Error("Can't read pixels in this browser");
    const out = getBufferForType(this._type, this._width, this._height);
    this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, this._width, this._height, out);
    return out;
  }
  /**
   * Performs a readPixel operation in the renderTarget
   * and returns a DataTexture containing the read data
   *
   * @param options options
   * @returns
   */
  toDataTexture(options) {
    const returnValue = new DataTexture(
      // fixed values
      this.toArray(),
      this.width,
      this.height,
      RGBAFormat,
      this._type,
      // user values
      (options === null || options === void 0 ? void 0 : options.mapping) || UVMapping,
      (options === null || options === void 0 ? void 0 : options.wrapS) || ClampToEdgeWrapping,
      (options === null || options === void 0 ? void 0 : options.wrapT) || ClampToEdgeWrapping,
      (options === null || options === void 0 ? void 0 : options.magFilter) || LinearFilter,
      (options === null || options === void 0 ? void 0 : options.minFilter) || LinearFilter,
      (options === null || options === void 0 ? void 0 : options.anisotropy) || 1,
      // fixed value
      LinearSRGBColorSpace
    );
    returnValue.generateMipmaps = (options === null || options === void 0 ? void 0 : options.generateMipmaps) !== void 0 ? options === null || options === void 0 ? void 0 : options.generateMipmaps : false;
    return returnValue;
  }
  /**
   * If using a disposable renderer, it will dispose it.
   */
  disposeOnDemandRenderer() {
    this._renderer.setRenderTarget(null);
    if (this._rendererIsDisposable) {
      this._renderer.dispose();
      this._renderer.forceContextLoss();
    }
  }
  /**
   * Will dispose of **all** assets used by this renderer.
   *
   *
   * @param disposeRenderTarget will dispose of the renderTarget which will not be usable later
   * set this to true if you passed the `renderTarget.texture` to a `PMREMGenerator`
   * or are otherwise done with it.
   *
   * @example
   * ```js
   * const loader = new HDRJPGLoader(renderer)
   * const result = await loader.loadAsync('gainmap.jpeg')
   * const mesh = new Mesh(geometry, new MeshBasicMaterial({ map: result.renderTarget.texture }) )
   * // DO NOT dispose the renderTarget here,
   * // it is used directly in the material
   * result.dispose()
   * ```
   *
   * @example
   * ```js
   * const loader = new HDRJPGLoader(renderer)
   * const pmremGenerator = new PMREMGenerator( renderer );
   * const result = await loader.loadAsync('gainmap.jpeg')
   * const envMap = pmremGenerator.fromEquirectangular(result.renderTarget.texture)
   * const mesh = new Mesh(geometry, new MeshStandardMaterial({ envMap }) )
   * // renderTarget can be disposed here
   * // because it was used to generate a PMREM texture
   * result.dispose(true)
   * ```
   */
  dispose(disposeRenderTarget) {
    this.disposeOnDemandRenderer();
    if (disposeRenderTarget) {
      this.renderTarget.dispose();
    }
    if (this.material instanceof ShaderMaterial) {
      Object.values(this.material.uniforms).forEach((v) => {
        if (v.value instanceof Texture)
          v.value.dispose();
      });
    }
    Object.values(this.material).forEach((value) => {
      if (value instanceof Texture)
        value.dispose();
    });
    this.material.dispose();
    this._quad.geometry.dispose();
  }
  /**
   * Width of the texture
   */
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
    this._renderTarget.setSize(this._width, this._height);
  }
  /**
   * Height of the texture
   */
  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
    this._renderTarget.setSize(this._width, this._height);
  }
  /**
   * The renderer used
   */
  get renderer() {
    return this._renderer;
  }
  /**
   * The `WebGLRenderTarget` used.
   */
  get renderTarget() {
    return this._renderTarget;
  }
  set renderTarget(value) {
    this._renderTarget = value;
    this._width = value.width;
    this._height = value.height;
  }
  /**
   * The `Material` used.
   */
  get material() {
    return this._material;
  }
  /**
   *
   */
  get type() {
    return this._type;
  }
  get colorSpace() {
    return this._colorSpace;
  }
}
const vertexShader = (
  /* glsl */
  `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
);
const fragmentShader = (
  /* glsl */
  `
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`
);
class GainMapDecoderMaterial extends ShaderMaterial {
  /**
   *
   * @param params
   */
  constructor({ gamma, offsetHdr, offsetSdr, gainMapMin, gainMapMax, maxDisplayBoost, hdrCapacityMin, hdrCapacityMax, sdr, gainMap }) {
    super({
      name: "GainMapDecoderMaterial",
      vertexShader,
      fragmentShader,
      uniforms: {
        sdr: { value: sdr },
        gainMap: { value: gainMap },
        gamma: { value: new Vector3(1 / gamma[0], 1 / gamma[1], 1 / gamma[2]) },
        offsetHdr: { value: new Vector3().fromArray(offsetHdr) },
        offsetSdr: { value: new Vector3().fromArray(offsetSdr) },
        gainMapMin: { value: new Vector3().fromArray(gainMapMin) },
        gainMapMax: { value: new Vector3().fromArray(gainMapMax) },
        weightFactor: {
          value: (Math.log2(maxDisplayBoost) - hdrCapacityMin) / (hdrCapacityMax - hdrCapacityMin)
        }
      },
      blending: NoBlending,
      depthTest: false,
      depthWrite: false
    });
    this._maxDisplayBoost = maxDisplayBoost;
    this._hdrCapacityMin = hdrCapacityMin;
    this._hdrCapacityMax = hdrCapacityMax;
    this.needsUpdate = true;
    this.uniformsNeedUpdate = true;
  }
  get sdr() {
    return this.uniforms.sdr.value;
  }
  set sdr(value) {
    this.uniforms.sdr.value = value;
  }
  get gainMap() {
    return this.uniforms.gainMap.value;
  }
  set gainMap(value) {
    this.uniforms.gainMap.value = value;
  }
  /**
   * @see {@link GainMapMetadata.offsetHdr}
   */
  get offsetHdr() {
    return this.uniforms.offsetHdr.value.toArray();
  }
  set offsetHdr(value) {
    this.uniforms.offsetHdr.value.fromArray(value);
  }
  /**
   * @see {@link GainMapMetadata.offsetSdr}
   */
  get offsetSdr() {
    return this.uniforms.offsetSdr.value.toArray();
  }
  set offsetSdr(value) {
    this.uniforms.offsetSdr.value.fromArray(value);
  }
  /**
   * @see {@link GainMapMetadata.gainMapMin}
   */
  get gainMapMin() {
    return this.uniforms.gainMapMin.value.toArray();
  }
  set gainMapMin(value) {
    this.uniforms.gainMapMin.value.fromArray(value);
  }
  /**
   * @see {@link GainMapMetadata.gainMapMax}
   */
  get gainMapMax() {
    return this.uniforms.gainMapMax.value.toArray();
  }
  set gainMapMax(value) {
    this.uniforms.gainMapMax.value.fromArray(value);
  }
  /**
   * @see {@link GainMapMetadata.gamma}
   */
  get gamma() {
    const g = this.uniforms.gamma.value;
    return [1 / g.x, 1 / g.y, 1 / g.z];
  }
  set gamma(value) {
    const g = this.uniforms.gamma.value;
    g.x = 1 / value[0];
    g.y = 1 / value[1];
    g.z = 1 / value[2];
  }
  /**
   * @see {@link GainMapMetadata.hdrCapacityMin}
   * @remarks Logarithmic space
   */
  get hdrCapacityMin() {
    return this._hdrCapacityMin;
  }
  set hdrCapacityMin(value) {
    this._hdrCapacityMin = value;
    this.calculateWeight();
  }
  /**
   * @see {@link GainMapMetadata.hdrCapacityMin}
   * @remarks Logarithmic space
   */
  get hdrCapacityMax() {
    return this._hdrCapacityMax;
  }
  set hdrCapacityMax(value) {
    this._hdrCapacityMax = value;
    this.calculateWeight();
  }
  /**
   * @see {@link GainmapDecodingParameters.maxDisplayBoost}
   * @remarks Non Logarithmic space
   */
  get maxDisplayBoost() {
    return this._maxDisplayBoost;
  }
  set maxDisplayBoost(value) {
    this._maxDisplayBoost = Math.max(1, Math.min(65504, value));
    this.calculateWeight();
  }
  calculateWeight() {
    const val = (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) / (this._hdrCapacityMax - this._hdrCapacityMin);
    this.uniforms.weightFactor.value = Math.max(0, Math.min(1, val));
  }
}
class GainMapNotFoundError extends Error {
}
class XMPMetadataNotFoundError extends Error {
}
const getXMLValue = (xml, tag, defaultValue) => {
  const attributeMatch = new RegExp(`${tag}="([^"]*)"`, "i").exec(xml);
  if (attributeMatch)
    return attributeMatch[1];
  const tagMatch = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i").exec(xml);
  if (tagMatch) {
    const liValues = tagMatch[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);
    if (liValues && liValues.length === 3) {
      return liValues.map((v) => v.replace(/<\/?rdf:li>/g, ""));
    }
    return tagMatch[1].trim();
  }
  if (defaultValue !== void 0)
    return defaultValue;
  throw new Error(`Can't find ${tag} in gainmap metadata`);
};
const extractXMP = (input) => {
  let str;
  if (typeof TextDecoder !== "undefined")
    str = new TextDecoder().decode(input);
  else
    str = input.toString();
  let start = str.indexOf("<x:xmpmeta");
  while (start !== -1) {
    const end = str.indexOf("x:xmpmeta>", start);
    const xmpBlock = str.slice(start, end + 10);
    try {
      const gainMapMin = getXMLValue(xmpBlock, "hdrgm:GainMapMin", "0");
      const gainMapMax = getXMLValue(xmpBlock, "hdrgm:GainMapMax");
      const gamma = getXMLValue(xmpBlock, "hdrgm:Gamma", "1");
      const offsetSDR = getXMLValue(xmpBlock, "hdrgm:OffsetSDR", "0.015625");
      const offsetHDR = getXMLValue(xmpBlock, "hdrgm:OffsetHDR", "0.015625");
      const hdrCapacityMinMatch = /hdrgm:HDRCapacityMin="([^"]*)"/.exec(xmpBlock);
      const hdrCapacityMin = hdrCapacityMinMatch ? hdrCapacityMinMatch[1] : "0";
      const hdrCapacityMaxMatch = /hdrgm:HDRCapacityMax="([^"]*)"/.exec(xmpBlock);
      if (!hdrCapacityMaxMatch)
        throw new Error("Incomplete gainmap metadata");
      const hdrCapacityMax = hdrCapacityMaxMatch[1];
      return {
        gainMapMin: Array.isArray(gainMapMin) ? gainMapMin.map((v) => parseFloat(v)) : [parseFloat(gainMapMin), parseFloat(gainMapMin), parseFloat(gainMapMin)],
        gainMapMax: Array.isArray(gainMapMax) ? gainMapMax.map((v) => parseFloat(v)) : [parseFloat(gainMapMax), parseFloat(gainMapMax), parseFloat(gainMapMax)],
        gamma: Array.isArray(gamma) ? gamma.map((v) => parseFloat(v)) : [parseFloat(gamma), parseFloat(gamma), parseFloat(gamma)],
        offsetSdr: Array.isArray(offsetSDR) ? offsetSDR.map((v) => parseFloat(v)) : [parseFloat(offsetSDR), parseFloat(offsetSDR), parseFloat(offsetSDR)],
        offsetHdr: Array.isArray(offsetHDR) ? offsetHDR.map((v) => parseFloat(v)) : [parseFloat(offsetHDR), parseFloat(offsetHDR), parseFloat(offsetHDR)],
        hdrCapacityMin: parseFloat(hdrCapacityMin),
        hdrCapacityMax: parseFloat(hdrCapacityMax)
      };
    } catch (e) {
    }
    start = str.indexOf("<x:xmpmeta", end);
  }
};
class MPFExtractor {
  constructor(options) {
    this.options = {
      debug: options && options.debug !== void 0 ? options.debug : false,
      extractFII: options && options.extractFII !== void 0 ? options.extractFII : true,
      extractNonFII: options && options.extractNonFII !== void 0 ? options.extractNonFII : true
    };
  }
  extract(imageArrayBuffer) {
    return new Promise((resolve, reject) => {
      const debug = this.options.debug;
      const dataView = new DataView(imageArrayBuffer.buffer);
      if (dataView.getUint16(0) !== 65496) {
        reject(new Error("Not a valid jpeg"));
        return;
      }
      const length = dataView.byteLength;
      let offset = 2;
      let loops = 0;
      let marker;
      while (offset < length) {
        if (++loops > 250) {
          reject(new Error(`Found no marker after ${loops} loops 😵`));
          return;
        }
        if (dataView.getUint8(offset) !== 255) {
          reject(new Error(`Not a valid marker at offset 0x${offset.toString(16)}, found: 0x${dataView.getUint8(offset).toString(16)}`));
          return;
        }
        marker = dataView.getUint8(offset + 1);
        if (debug)
          console.log(`Marker: ${marker.toString(16)}`);
        if (marker === 226) {
          if (debug)
            console.log("Found APP2 marker (0xffe2)");
          const formatPt = offset + 4;
          if (dataView.getUint32(formatPt) === 1297106432) {
            const tiffOffset = formatPt + 4;
            let bigEnd;
            if (dataView.getUint16(tiffOffset) === 18761) {
              bigEnd = false;
            } else if (dataView.getUint16(tiffOffset) === 19789) {
              bigEnd = true;
            } else {
              reject(new Error("No valid endianness marker found in TIFF header"));
              return;
            }
            if (dataView.getUint16(tiffOffset + 2, !bigEnd) !== 42) {
              reject(new Error("Not valid TIFF data! (no 0x002A marker)"));
              return;
            }
            const firstIFDOffset = dataView.getUint32(tiffOffset + 4, !bigEnd);
            if (firstIFDOffset < 8) {
              reject(new Error("Not valid TIFF data! (First offset less than 8)"));
              return;
            }
            const dirStart = tiffOffset + firstIFDOffset;
            const count = dataView.getUint16(dirStart, !bigEnd);
            const entriesStart = dirStart + 2;
            let numberOfImages = 0;
            for (let i = entriesStart; i < entriesStart + 12 * count; i += 12) {
              if (dataView.getUint16(i, !bigEnd) === 45057) {
                numberOfImages = dataView.getUint32(i + 8, !bigEnd);
              }
            }
            const nextIFDOffsetLen = 4;
            const MPImageListValPt = dirStart + 2 + count * 12 + nextIFDOffsetLen;
            const images = [];
            for (let i = MPImageListValPt; i < MPImageListValPt + numberOfImages * 16; i += 16) {
              const image = {
                MPType: dataView.getUint32(i, !bigEnd),
                size: dataView.getUint32(i + 4, !bigEnd),
                // This offset is specified relative to the address of the MP Endian
                // field in the MP Header, unless the image is a First Individual Image,
                // in which case the value of the offset shall be NULL (0x00000000).
                dataOffset: dataView.getUint32(i + 8, !bigEnd),
                dependantImages: dataView.getUint32(i + 12, !bigEnd),
                start: -1,
                end: -1,
                isFII: false
              };
              if (!image.dataOffset) {
                image.start = 0;
                image.isFII = true;
              } else {
                image.start = tiffOffset + image.dataOffset;
                image.isFII = false;
              }
              image.end = image.start + image.size;
              images.push(image);
            }
            if (this.options.extractNonFII && images.length) {
              const bufferBlob = new Blob([dataView]);
              const imgs = [];
              for (const image of images) {
                if (image.isFII && !this.options.extractFII) {
                  continue;
                }
                const imageBlob = bufferBlob.slice(image.start, image.end + 1, "image/jpeg");
                imgs.push(imageBlob);
              }
              resolve(imgs);
            }
          }
        }
        offset += 2 + dataView.getUint16(offset + 2);
      }
    });
  }
}
const extractGainmapFromJPEG = async (jpegFile) => {
  const metadata = extractXMP(jpegFile);
  if (!metadata)
    throw new XMPMetadataNotFoundError("Gain map XMP metadata not found");
  const mpfExtractor = new MPFExtractor({ extractFII: true, extractNonFII: true });
  const images = await mpfExtractor.extract(jpegFile);
  if (images.length !== 2)
    throw new GainMapNotFoundError("Gain map recovery image not found");
  return {
    sdr: new Uint8Array(await images[0].arrayBuffer()),
    gainMap: new Uint8Array(await images[1].arrayBuffer()),
    metadata
  };
};
const getHTMLImageFromBlob = (blob) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
    img.src = URL.createObjectURL(blob);
  });
};
class LoaderBase extends Loader {
  /**
   *
   * @param renderer
   * @param manager
   */
  constructor(renderer, manager) {
    super(manager);
    if (renderer)
      this._renderer = renderer;
    this._internalLoadingManager = new LoadingManager();
  }
  /**
   * Specify the renderer to use when rendering the gain map
   *
   * @param renderer
   * @returns
   */
  setRenderer(renderer) {
    this._renderer = renderer;
    return this;
  }
  /**
   * Specify the renderTarget options to use when rendering the gain map
   *
   * @param options
   * @returns
   */
  setRenderTargetOptions(options) {
    this._renderTargetOptions = options;
    return this;
  }
  /**
   * @private
   * @returns
   */
  prepareQuadRenderer() {
    if (!this._renderer)
      console.warn("WARNING: An existing WebGL Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.");
    const material = new GainMapDecoderMaterial({
      gainMapMax: [1, 1, 1],
      gainMapMin: [0, 0, 0],
      gamma: [1, 1, 1],
      offsetHdr: [1, 1, 1],
      offsetSdr: [1, 1, 1],
      hdrCapacityMax: 1,
      hdrCapacityMin: 0,
      maxDisplayBoost: 1,
      gainMap: new Texture(),
      sdr: new Texture()
    });
    return new QuadRenderer({
      width: 16,
      height: 16,
      type: HalfFloatType,
      colorSpace: LinearSRGBColorSpace,
      material,
      renderer: this._renderer,
      renderTargetOptions: this._renderTargetOptions
    });
  }
  /**
  * @private
  * @param quadRenderer
  * @param metadata
  * @param sdrBuffer
  * @param gainMapBuffer
  */
  async render(quadRenderer, metadata, sdrBuffer, gainMapBuffer) {
    const gainMapBlob = gainMapBuffer ? new Blob([gainMapBuffer], { type: "image/jpeg" }) : void 0;
    const sdrBlob = new Blob([sdrBuffer], { type: "image/jpeg" });
    let sdrImage;
    let gainMapImage;
    let needsFlip = false;
    if (typeof createImageBitmap === "undefined") {
      const res = await Promise.all([
        gainMapBlob ? getHTMLImageFromBlob(gainMapBlob) : Promise.resolve(void 0),
        getHTMLImageFromBlob(sdrBlob)
      ]);
      gainMapImage = res[0];
      sdrImage = res[1];
      needsFlip = true;
    } else {
      const res = await Promise.all([
        gainMapBlob ? createImageBitmap(gainMapBlob, { imageOrientation: "flipY" }) : Promise.resolve(void 0),
        createImageBitmap(sdrBlob, { imageOrientation: "flipY" })
      ]);
      gainMapImage = res[0];
      sdrImage = res[1];
    }
    const gainMap = new Texture(gainMapImage || new ImageData(2, 2), UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearMipMapLinearFilter, RGBAFormat, UnsignedByteType, 1, LinearSRGBColorSpace);
    gainMap.flipY = needsFlip;
    gainMap.needsUpdate = true;
    const sdr = new Texture(sdrImage, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearMipMapLinearFilter, RGBAFormat, UnsignedByteType, 1, SRGBColorSpace);
    sdr.flipY = needsFlip;
    sdr.needsUpdate = true;
    quadRenderer.width = sdrImage.width;
    quadRenderer.height = sdrImage.height;
    quadRenderer.material.gainMap = gainMap;
    quadRenderer.material.sdr = sdr;
    quadRenderer.material.gainMapMin = metadata.gainMapMin;
    quadRenderer.material.gainMapMax = metadata.gainMapMax;
    quadRenderer.material.offsetHdr = metadata.offsetHdr;
    quadRenderer.material.offsetSdr = metadata.offsetSdr;
    quadRenderer.material.gamma = metadata.gamma;
    quadRenderer.material.hdrCapacityMin = metadata.hdrCapacityMin;
    quadRenderer.material.hdrCapacityMax = metadata.hdrCapacityMax;
    quadRenderer.material.maxDisplayBoost = Math.pow(2, metadata.hdrCapacityMax);
    quadRenderer.material.needsUpdate = true;
    quadRenderer.render();
  }
}
class GainMapLoader extends LoaderBase {
  /**
   * Loads a gainmap using separate data
   * * sdr image
   * * gain map image
   * * metadata json
   *
   * useful for webp gain maps
   *
   * @param urls An array in the form of [sdr.jpg, gainmap.jpg, metadata.json]
   * @param onLoad Load complete callback, will receive the result
   * @param onProgress Progress callback, will receive a {@link ProgressEvent}
   * @param onError Error callback
   * @returns
   */
  load([sdrUrl, gainMapUrl, metadataUrl], onLoad, onProgress, onError) {
    const quadRenderer = this.prepareQuadRenderer();
    let sdr;
    let gainMap;
    let metadata;
    const loadCheck = async () => {
      if (sdr && gainMap && metadata) {
        try {
          await this.render(quadRenderer, metadata, sdr, gainMap);
        } catch (error) {
          this.manager.itemError(sdrUrl);
          this.manager.itemError(gainMapUrl);
          this.manager.itemError(metadataUrl);
          if (typeof onError === "function")
            onError(error);
          quadRenderer.disposeOnDemandRenderer();
          return;
        }
        if (typeof onLoad === "function")
          onLoad(quadRenderer);
        this.manager.itemEnd(sdrUrl);
        this.manager.itemEnd(gainMapUrl);
        this.manager.itemEnd(metadataUrl);
        quadRenderer.disposeOnDemandRenderer();
      }
    };
    let sdrLengthComputable = true;
    let sdrTotal = 0;
    let sdrLoaded = 0;
    let gainMapLengthComputable = true;
    let gainMapTotal = 0;
    let gainMapLoaded = 0;
    let metadataLengthComputable = true;
    let metadataTotal = 0;
    let metadataLoaded = 0;
    const progressHandler = () => {
      if (typeof onProgress === "function") {
        const total = sdrTotal + gainMapTotal + metadataTotal;
        const loaded = sdrLoaded + gainMapLoaded + metadataLoaded;
        const lengthComputable = sdrLengthComputable && gainMapLengthComputable && metadataLengthComputable;
        onProgress(new ProgressEvent("progress", { lengthComputable, loaded, total }));
      }
    };
    this.manager.itemStart(sdrUrl);
    this.manager.itemStart(gainMapUrl);
    this.manager.itemStart(metadataUrl);
    const sdrLoader = new FileLoader(this._internalLoadingManager);
    sdrLoader.setResponseType("arraybuffer");
    sdrLoader.setRequestHeader(this.requestHeader);
    sdrLoader.setPath(this.path);
    sdrLoader.setWithCredentials(this.withCredentials);
    sdrLoader.load(sdrUrl, async (buffer) => {
      if (typeof buffer === "string")
        throw new Error("Invalid sdr buffer");
      sdr = buffer;
      await loadCheck();
    }, (e) => {
      sdrLengthComputable = e.lengthComputable;
      sdrLoaded = e.loaded;
      sdrTotal = e.total;
      progressHandler();
    }, (error) => {
      this.manager.itemError(sdrUrl);
      if (typeof onError === "function")
        onError(error);
    });
    const gainMapLoader = new FileLoader(this._internalLoadingManager);
    gainMapLoader.setResponseType("arraybuffer");
    gainMapLoader.setRequestHeader(this.requestHeader);
    gainMapLoader.setPath(this.path);
    gainMapLoader.setWithCredentials(this.withCredentials);
    gainMapLoader.load(gainMapUrl, async (buffer) => {
      if (typeof buffer === "string")
        throw new Error("Invalid gainmap buffer");
      gainMap = buffer;
      await loadCheck();
    }, (e) => {
      gainMapLengthComputable = e.lengthComputable;
      gainMapLoaded = e.loaded;
      gainMapTotal = e.total;
      progressHandler();
    }, (error) => {
      this.manager.itemError(gainMapUrl);
      if (typeof onError === "function")
        onError(error);
    });
    const metadataLoader = new FileLoader(this._internalLoadingManager);
    metadataLoader.setRequestHeader(this.requestHeader);
    metadataLoader.setPath(this.path);
    metadataLoader.setWithCredentials(this.withCredentials);
    metadataLoader.load(metadataUrl, async (json) => {
      if (typeof json !== "string")
        throw new Error("Invalid metadata string");
      metadata = JSON.parse(json);
      await loadCheck();
    }, (e) => {
      metadataLengthComputable = e.lengthComputable;
      metadataLoaded = e.loaded;
      metadataTotal = e.total;
      progressHandler();
    }, (error) => {
      this.manager.itemError(metadataUrl);
      if (typeof onError === "function")
        onError(error);
    });
    return quadRenderer;
  }
}
class HDRJPGLoader extends LoaderBase {
  /**
   * Loads a JPEG containing gain map metadata
   * Renders a normal SDR image if gainmap data is not found
   *
   * @param url An array in the form of [sdr.jpg, gainmap.jpg, metadata.json]
   * @param onLoad Load complete callback, will receive the result
   * @param onProgress Progress callback, will receive a {@link ProgressEvent}
   * @param onError Error callback
   * @returns
   */
  load(url, onLoad, onProgress, onError) {
    const quadRenderer = this.prepareQuadRenderer();
    const loader = new FileLoader(this._internalLoadingManager);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    this.manager.itemStart(url);
    loader.load(url, async (jpeg) => {
      if (typeof jpeg === "string")
        throw new Error("Invalid buffer, received [string], was expecting [ArrayBuffer]");
      const jpegBuffer = new Uint8Array(jpeg);
      let sdrJPEG;
      let gainMapJPEG;
      let metadata;
      try {
        const extractionResult = await extractGainmapFromJPEG(jpegBuffer);
        sdrJPEG = extractionResult.sdr;
        gainMapJPEG = extractionResult.gainMap;
        metadata = extractionResult.metadata;
      } catch (e) {
        if (e instanceof XMPMetadataNotFoundError || e instanceof GainMapNotFoundError) {
          console.warn(`Failure to reconstruct an HDR image from ${url}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`);
          metadata = {
            gainMapMin: [0, 0, 0],
            gainMapMax: [1, 1, 1],
            gamma: [1, 1, 1],
            hdrCapacityMin: 0,
            hdrCapacityMax: 1,
            offsetHdr: [0, 0, 0],
            offsetSdr: [0, 0, 0]
          };
          sdrJPEG = jpegBuffer;
        } else {
          throw e;
        }
      }
      try {
        await this.render(quadRenderer, metadata, sdrJPEG, gainMapJPEG);
      } catch (error) {
        this.manager.itemError(url);
        if (typeof onError === "function")
          onError(error);
        quadRenderer.disposeOnDemandRenderer();
        return;
      }
      if (typeof onLoad === "function")
        onLoad(quadRenderer);
      this.manager.itemEnd(url);
      quadRenderer.disposeOnDemandRenderer();
    }, onProgress, (error) => {
      this.manager.itemError(url);
      if (typeof onError === "function")
        onError(error);
    });
    return quadRenderer;
  }
}
const presetsObj = {
  apartment: "lebombo_1k.hdr",
  city: "potsdamer_platz_1k.hdr",
  dawn: "kiara_1_dawn_1k.hdr",
  forest: "forest_slope_1k.hdr",
  lobby: "st_fagans_interior_1k.hdr",
  night: "dikhololo_night_1k.hdr",
  park: "rooitou_park_1k.hdr",
  studio: "studio_small_03_1k.hdr",
  sunset: "venice_sunset_1k.hdr",
  warehouse: "empty_warehouse_01_1k.hdr"
};
const CUBEMAP_ROOT = "https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/";
const isArray = (arr) => Array.isArray(arr);
const defaultFiles = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"];
function useEnvironment({
  files = defaultFiles,
  path = "",
  preset = void 0,
  colorSpace = void 0,
  extensions
} = {}) {
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
    path = CUBEMAP_ROOT;
  }
  const multiFile = isArray(files);
  const {
    extension,
    isCubemap
  } = getExtension(files);
  const loader = getLoader(extension);
  if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  const gl = useThree((state) => state.gl);
  reactExports.useLayoutEffect(() => {
    if (extension !== "webp" && extension !== "jpg" && extension !== "jpeg") return;
    function clearGainmapTexture() {
      useLoader.clear(loader, multiFile ? [files] : files);
    }
    gl.domElement.addEventListener("webglcontextlost", clearGainmapTexture, {
      once: true
    });
  }, [files, gl.domElement]);
  const loaderResult = useLoader(loader, multiFile ? [files] : files, (loader2) => {
    if (extension === "webp" || extension === "jpg" || extension === "jpeg") {
      loader2.setRenderer(gl);
    }
    loader2.setPath == null || loader2.setPath(path);
    if (extensions) extensions(loader2);
  });
  let texture = multiFile ? (
    // @ts-ignore
    loaderResult[0]
  ) : loaderResult;
  if (extension === "jpg" || extension === "jpeg" || extension === "webp") {
    var _renderTarget;
    texture = (_renderTarget = texture.renderTarget) == null ? void 0 : _renderTarget.texture;
  }
  texture.mapping = isCubemap ? CubeReflectionMapping : EquirectangularReflectionMapping;
  texture.colorSpace = colorSpace !== null && colorSpace !== void 0 ? colorSpace : isCubemap ? "srgb" : "srgb-linear";
  return texture;
}
const preloadDefaultOptions = {
  files: defaultFiles,
  path: "",
  preset: void 0,
  extensions: void 0
};
useEnvironment.preload = (preloadOptions) => {
  const options = {
    ...preloadDefaultOptions,
    ...preloadOptions
  };
  let {
    files,
    path = ""
  } = options;
  const {
    preset,
    extensions
  } = options;
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
    path = CUBEMAP_ROOT;
  }
  const {
    extension
  } = getExtension(files);
  if (extension === "webp" || extension === "jpg" || extension === "jpeg") {
    throw new Error("useEnvironment: Preloading gainmaps is not supported");
  }
  const loader = getLoader(extension);
  if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  useLoader.preload(loader, isArray(files) ? [files] : files, (loader2) => {
    loader2.setPath == null || loader2.setPath(path);
    if (extensions) extensions(loader2);
  });
};
const clearDefaultOptins = {
  files: defaultFiles,
  preset: void 0
};
useEnvironment.clear = (clearOptions) => {
  const options = {
    ...clearDefaultOptins,
    ...clearOptions
  };
  let {
    files
  } = options;
  const {
    preset
  } = options;
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
  }
  const {
    extension
  } = getExtension(files);
  const loader = getLoader(extension);
  if (!loader) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  useLoader.clear(loader, isArray(files) ? [files] : files);
};
function validatePreset(preset) {
  if (!(preset in presetsObj)) throw new Error("Preset must be one of: " + Object.keys(presetsObj).join(", "));
}
function getExtension(files) {
  var _firstEntry$split$pop;
  const isCubemap = isArray(files) && files.length === 6;
  const isGainmap = isArray(files) && files.length === 3 && files.some((file) => file.endsWith("json"));
  const firstEntry = isArray(files) ? files[0] : files;
  const extension = isCubemap ? "cube" : isGainmap ? "webp" : firstEntry.startsWith("data:application/exr") ? "exr" : firstEntry.startsWith("data:application/hdr") ? "hdr" : firstEntry.startsWith("data:image/jpeg") ? "jpg" : (_firstEntry$split$pop = firstEntry.split(".").pop()) == null || (_firstEntry$split$pop = _firstEntry$split$pop.split("?")) == null || (_firstEntry$split$pop = _firstEntry$split$pop.shift()) == null ? void 0 : _firstEntry$split$pop.toLowerCase();
  return {
    extension,
    isCubemap,
    isGainmap
  };
}
function getLoader(extension) {
  const loader = extension === "cube" ? CubeTextureLoader : extension === "hdr" ? RGBELoader : extension === "exr" ? EXRLoader : extension === "jpg" || extension === "jpeg" ? HDRJPGLoader : extension === "webp" ? GainMapLoader : null;
  return loader;
}
const isRef = (obj) => obj.current && obj.current.isScene;
const resolveScene = (scene) => isRef(scene) ? scene.current : scene;
function setEnvProps(background, scene, defaultScene, texture, sceneProps = {}) {
  var _target$backgroundRot, _target$backgroundRot2, _target$environmentRo, _target$environmentRo2;
  sceneProps = {
    backgroundBlurriness: 0,
    backgroundIntensity: 1,
    backgroundRotation: [0, 0, 0],
    environmentIntensity: 1,
    environmentRotation: [0, 0, 0],
    ...sceneProps
  };
  const target = resolveScene(scene || defaultScene);
  const oldbg = target.background;
  const oldenv = target.environment;
  const oldSceneProps = {
    // @ts-ignore
    backgroundBlurriness: target.backgroundBlurriness,
    // @ts-ignore
    backgroundIntensity: target.backgroundIntensity,
    // @ts-ignore
    backgroundRotation: (_target$backgroundRot = (_target$backgroundRot2 = target.backgroundRotation) == null || _target$backgroundRot2.clone == null ? void 0 : _target$backgroundRot2.clone()) !== null && _target$backgroundRot !== void 0 ? _target$backgroundRot : [0, 0, 0],
    // @ts-ignore
    environmentIntensity: target.environmentIntensity,
    // @ts-ignore
    environmentRotation: (_target$environmentRo = (_target$environmentRo2 = target.environmentRotation) == null || _target$environmentRo2.clone == null ? void 0 : _target$environmentRo2.clone()) !== null && _target$environmentRo !== void 0 ? _target$environmentRo : [0, 0, 0]
  };
  if (background !== "only") target.environment = texture;
  if (background) target.background = texture;
  applyProps(target, sceneProps);
  return () => {
    if (background !== "only") target.environment = oldenv;
    if (background) target.background = oldbg;
    applyProps(target, oldSceneProps);
  };
}
function EnvironmentMap({
  scene,
  background = false,
  map,
  ...config
}) {
  const defaultScene = useThree((state) => state.scene);
  reactExports.useLayoutEffect(() => {
    if (map) return setEnvProps(background, scene, defaultScene, map, config);
  });
  return null;
}
function EnvironmentCube({
  background = false,
  scene,
  blur,
  backgroundBlurriness,
  backgroundIntensity,
  backgroundRotation,
  environmentIntensity,
  environmentRotation,
  ...rest
}) {
  const texture = useEnvironment(rest);
  const defaultScene = useThree((state) => state.scene);
  reactExports.useLayoutEffect(() => {
    return setEnvProps(background, scene, defaultScene, texture, {
      backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
      backgroundIntensity,
      backgroundRotation,
      environmentIntensity,
      environmentRotation
    });
  });
  reactExports.useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);
  return null;
}
function EnvironmentPortal({
  children,
  near = 0.1,
  far = 1e3,
  resolution = 256,
  frames = 1,
  map,
  background = false,
  blur,
  backgroundBlurriness,
  backgroundIntensity,
  backgroundRotation,
  environmentIntensity,
  environmentRotation,
  scene,
  files,
  path,
  preset = void 0,
  extensions
}) {
  const gl = useThree((state) => state.gl);
  const defaultScene = useThree((state) => state.scene);
  const camera = reactExports.useRef(null);
  const [virtualScene] = reactExports.useState(() => new Scene());
  const fbo = reactExports.useMemo(() => {
    const fbo2 = new WebGLCubeRenderTarget(resolution);
    fbo2.texture.type = HalfFloatType;
    return fbo2;
  }, [resolution]);
  reactExports.useEffect(() => {
    return () => {
      fbo.dispose();
    };
  }, [fbo]);
  reactExports.useLayoutEffect(() => {
    if (frames === 1) {
      const autoClear = gl.autoClear;
      gl.autoClear = true;
      camera.current.update(gl, virtualScene);
      gl.autoClear = autoClear;
    }
    return setEnvProps(background, scene, defaultScene, fbo.texture, {
      backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
      backgroundIntensity,
      backgroundRotation,
      environmentIntensity,
      environmentRotation
    });
  }, [children, virtualScene, fbo.texture, scene, defaultScene, background, frames, gl]);
  let count = 1;
  useFrame(() => {
    if (frames === Infinity || count < frames) {
      const autoClear = gl.autoClear;
      gl.autoClear = true;
      camera.current.update(gl, virtualScene);
      gl.autoClear = autoClear;
      count++;
    }
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, createPortal(/* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, children, /* @__PURE__ */ reactExports.createElement("cubeCamera", {
    ref: camera,
    args: [near, far, fbo]
  }), files || preset ? /* @__PURE__ */ reactExports.createElement(EnvironmentCube, {
    background: true,
    files,
    preset,
    path,
    extensions
  }) : map ? /* @__PURE__ */ reactExports.createElement(EnvironmentMap, {
    background: true,
    map,
    extensions
  }) : null), virtualScene));
}
function EnvironmentGround(props) {
  var _props$ground, _props$ground2, _scale, _props$ground3;
  const textureDefault = useEnvironment(props);
  const texture = props.map || textureDefault;
  reactExports.useMemo(() => extend({
    GroundProjectedEnvImpl: GroundProjectedEnv
  }), []);
  reactExports.useEffect(() => {
    return () => {
      textureDefault.dispose();
    };
  }, [textureDefault]);
  const args = reactExports.useMemo(() => [texture], [texture]);
  const height = (_props$ground = props.ground) == null ? void 0 : _props$ground.height;
  const radius = (_props$ground2 = props.ground) == null ? void 0 : _props$ground2.radius;
  const scale = (_scale = (_props$ground3 = props.ground) == null ? void 0 : _props$ground3.scale) !== null && _scale !== void 0 ? _scale : 1e3;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(EnvironmentMap, _extends({}, props, {
    map: texture
  })), /* @__PURE__ */ reactExports.createElement("groundProjectedEnvImpl", {
    args,
    scale,
    height,
    radius
  }));
}
function Environment(props) {
  return props.ground ? /* @__PURE__ */ reactExports.createElement(EnvironmentGround, props) : props.map ? /* @__PURE__ */ reactExports.createElement(EnvironmentMap, props) : props.children ? /* @__PURE__ */ reactExports.createElement(EnvironmentPortal, props) : /* @__PURE__ */ reactExports.createElement(EnvironmentCube, props);
}
const ContactShadows = /* @__PURE__ */ reactExports.forwardRef(({
  scale = 10,
  frames = Infinity,
  opacity = 1,
  width = 1,
  height = 1,
  blur = 1,
  near = 0,
  far = 10,
  resolution = 512,
  smooth = true,
  color = "#000000",
  depthWrite = false,
  renderOrder,
  ...props
}, fref) => {
  const ref = reactExports.useRef(null);
  const scene = useThree((state) => state.scene);
  const gl = useThree((state) => state.gl);
  const shadowCamera = reactExports.useRef(null);
  width = width * (Array.isArray(scale) ? scale[0] : scale || 1);
  height = height * (Array.isArray(scale) ? scale[1] : scale || 1);
  const [renderTarget, planeGeometry, depthMaterial, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, renderTargetBlur] = reactExports.useMemo(() => {
    const renderTarget2 = new WebGLRenderTarget(resolution, resolution);
    const renderTargetBlur2 = new WebGLRenderTarget(resolution, resolution);
    renderTargetBlur2.texture.generateMipmaps = renderTarget2.texture.generateMipmaps = false;
    const planeGeometry2 = new PlaneGeometry(width, height).rotateX(Math.PI / 2);
    const blurPlane2 = new Mesh(planeGeometry2);
    const depthMaterial2 = new MeshDepthMaterial();
    depthMaterial2.depthTest = depthMaterial2.depthWrite = false;
    depthMaterial2.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ucolor: {
          value: new Color(color)
        }
      };
      shader.fragmentShader = shader.fragmentShader.replace(
        `void main() {`,
        //
        `uniform vec3 ucolor;
           void main() {
          `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4( vec3( 1.0 - fragCoordZ ), opacity );",
        // Colorize the shadow, multiply by the falloff so that the center can remain darker
        "vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );"
      );
    };
    const horizontalBlurMaterial2 = new ShaderMaterial(HorizontalBlurShader);
    const verticalBlurMaterial2 = new ShaderMaterial(VerticalBlurShader);
    verticalBlurMaterial2.depthTest = horizontalBlurMaterial2.depthTest = false;
    return [renderTarget2, planeGeometry2, depthMaterial2, blurPlane2, horizontalBlurMaterial2, verticalBlurMaterial2, renderTargetBlur2];
  }, [resolution, width, height, scale, color]);
  const blurShadows = (blur2) => {
    blurPlane.visible = true;
    blurPlane.material = horizontalBlurMaterial;
    horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
    horizontalBlurMaterial.uniforms.h.value = blur2 * 1 / 256;
    gl.setRenderTarget(renderTargetBlur);
    gl.render(blurPlane, shadowCamera.current);
    blurPlane.material = verticalBlurMaterial;
    verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture;
    verticalBlurMaterial.uniforms.v.value = blur2 * 1 / 256;
    gl.setRenderTarget(renderTarget);
    gl.render(blurPlane, shadowCamera.current);
    blurPlane.visible = false;
  };
  let count = 0;
  let initialBackground;
  let initialOverrideMaterial;
  useFrame(() => {
    if (shadowCamera.current && (frames === Infinity || count < frames)) {
      count++;
      initialBackground = scene.background;
      initialOverrideMaterial = scene.overrideMaterial;
      ref.current.visible = false;
      scene.background = null;
      scene.overrideMaterial = depthMaterial;
      gl.setRenderTarget(renderTarget);
      gl.render(scene, shadowCamera.current);
      blurShadows(blur);
      if (smooth) blurShadows(blur * 0.4);
      gl.setRenderTarget(null);
      ref.current.visible = true;
      scene.overrideMaterial = initialOverrideMaterial;
      scene.background = initialBackground;
    }
  });
  reactExports.useImperativeHandle(fref, () => ref.current, []);
  return /* @__PURE__ */ reactExports.createElement("group", _extends({
    "rotation-x": Math.PI / 2
  }, props, {
    ref
  }), /* @__PURE__ */ reactExports.createElement("mesh", {
    renderOrder,
    geometry: planeGeometry,
    scale: [1, -1, 1],
    rotation: [-Math.PI / 2, 0, 0]
  }, /* @__PURE__ */ reactExports.createElement("meshBasicMaterial", {
    transparent: true,
    map: renderTarget.texture,
    opacity,
    depthWrite
  })), /* @__PURE__ */ reactExports.createElement("orthographicCamera", {
    ref: shadowCamera,
    args: [-width / 2, width / 2, height / 2, -height / 2, near, far]
  }));
});
function isLight(object) {
  return object.isLight;
}
function isGeometry(object) {
  return !!object.geometry;
}
const accumulativeContext = /* @__PURE__ */ reactExports.createContext(null);
const SoftShadowMaterial = /* @__PURE__ */ shaderMaterial({
  color: /* @__PURE__ */ new Color(),
  blend: 2,
  alphaTest: 0.75,
  opacity: 0,
  map: null
}, `varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
     vUv = uv;
   }`, `varying vec2 vUv;
   uniform sampler2D map;
   uniform vec3 color;
   uniform float opacity;
   uniform float alphaTest;
   uniform float blend;
   void main() {
     vec4 sampledDiffuseColor = texture2D(map, vUv);
     gl_FragColor = vec4(color * sampledDiffuseColor.r * blend, max(0.0, (1.0 - (sampledDiffuseColor.r + sampledDiffuseColor.g + sampledDiffuseColor.b) / alphaTest)) * opacity);
     #include <tonemapping_fragment>
     #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
   }`);
const AccumulativeShadows = /* @__PURE__ */ reactExports.forwardRef(({
  children,
  temporal,
  frames = 40,
  limit = Infinity,
  blend = 20,
  scale = 10,
  opacity = 1,
  alphaTest = 0.75,
  color = "black",
  colorBlend = 2,
  resolution = 1024,
  toneMapped = true,
  ...props
}, forwardRef) => {
  extend({
    SoftShadowMaterial
  });
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const gPlane = reactExports.useRef(null);
  const gLights = reactExports.useRef(null);
  const [plm] = reactExports.useState(() => new ProgressiveLightMap(gl, scene, resolution));
  reactExports.useLayoutEffect(() => {
    plm.configure(gPlane.current);
  }, []);
  const api = reactExports.useMemo(() => ({
    lights: /* @__PURE__ */ new Map(),
    temporal: !!temporal,
    frames: Math.max(2, frames),
    blend: Math.max(2, frames === Infinity ? blend : frames),
    count: 0,
    getMesh: () => gPlane.current,
    reset: () => {
      plm.clear();
      const material = gPlane.current.material;
      material.opacity = 0;
      material.alphaTest = 0;
      api.count = 0;
    },
    update: (frames2 = 1) => {
      const material = gPlane.current.material;
      if (!api.temporal) {
        material.opacity = opacity;
        material.alphaTest = alphaTest;
      } else {
        material.opacity = Math.min(opacity, material.opacity + opacity / api.blend);
        material.alphaTest = Math.min(alphaTest, material.alphaTest + alphaTest / api.blend);
      }
      gLights.current.visible = true;
      plm.prepare();
      for (let i = 0; i < frames2; i++) {
        api.lights.forEach((light) => light.update());
        plm.update(camera, api.blend);
      }
      gLights.current.visible = false;
      plm.finish();
    }
  }), [plm, camera, scene, temporal, frames, blend, opacity, alphaTest]);
  reactExports.useLayoutEffect(() => {
    api.reset();
    if (!api.temporal && api.frames !== Infinity) api.update(api.blend);
  });
  reactExports.useImperativeHandle(forwardRef, () => api, [api]);
  useFrame(() => {
    if ((api.temporal || api.frames === Infinity) && api.count < api.frames && api.count < limit) {
      invalidate();
      api.update();
      api.count++;
    }
  });
  return /* @__PURE__ */ reactExports.createElement("group", props, /* @__PURE__ */ reactExports.createElement("group", {
    traverse: () => null,
    ref: gLights
  }, /* @__PURE__ */ reactExports.createElement(accumulativeContext.Provider, {
    value: api
  }, children)), /* @__PURE__ */ reactExports.createElement("mesh", {
    receiveShadow: true,
    ref: gPlane,
    scale,
    rotation: [-Math.PI / 2, 0, 0]
  }, /* @__PURE__ */ reactExports.createElement("planeGeometry", null), /* @__PURE__ */ reactExports.createElement("softShadowMaterial", {
    transparent: true,
    depthWrite: false,
    toneMapped,
    color,
    blend: colorBlend,
    map: plm.progressiveLightMap2.texture
  })));
});
const RandomizedLight = /* @__PURE__ */ reactExports.forwardRef(({
  castShadow = true,
  bias = 1e-3,
  mapSize = 512,
  size = 5,
  near = 0.5,
  far = 500,
  frames = 1,
  position = [0, 0, 0],
  radius = 1,
  amount = 8,
  intensity = version >= 155 ? Math.PI : 1,
  ambient = 0.5,
  ...props
}, forwardRef) => {
  const gLights = reactExports.useRef(null);
  const length = new Vector3(...position).length();
  const parent = reactExports.useContext(accumulativeContext);
  const update = reactExports.useCallback(() => {
    let light;
    if (gLights.current) {
      for (let l = 0; l < gLights.current.children.length; l++) {
        light = gLights.current.children[l];
        if (Math.random() > ambient) {
          light.position.set(position[0] + MathUtils.randFloatSpread(radius), position[1] + MathUtils.randFloatSpread(radius), position[2] + MathUtils.randFloatSpread(radius));
        } else {
          let lambda = Math.acos(2 * Math.random() - 1) - Math.PI / 2;
          let phi = 2 * Math.PI * Math.random();
          light.position.set(Math.cos(lambda) * Math.cos(phi) * length, Math.abs(Math.cos(lambda) * Math.sin(phi) * length), Math.sin(lambda) * length);
        }
      }
    }
  }, [radius, ambient, length, ...position]);
  const api = reactExports.useMemo(() => ({
    update
  }), [update]);
  reactExports.useImperativeHandle(forwardRef, () => api, [api]);
  reactExports.useLayoutEffect(() => {
    var _parent$lights;
    const group = gLights.current;
    if (parent) (_parent$lights = parent.lights) == null || _parent$lights.set(group.uuid, api);
    return () => {
      var _parent$lights2;
      return void (parent == null || (_parent$lights2 = parent.lights) == null ? void 0 : _parent$lights2.delete(group.uuid));
    };
  }, [parent, api]);
  return /* @__PURE__ */ reactExports.createElement("group", _extends({
    ref: gLights
  }, props), Array.from({
    length: amount
  }, (_, index) => /* @__PURE__ */ reactExports.createElement("directionalLight", {
    key: index,
    castShadow,
    "shadow-bias": bias,
    "shadow-mapSize": [mapSize, mapSize],
    intensity: intensity / amount
  }, /* @__PURE__ */ reactExports.createElement("orthographicCamera", {
    attach: "shadow-camera",
    args: [-size, size, size, -size, near, far]
  }))));
});
class ProgressiveLightMap {
  constructor(renderer, scene, res = 1024) {
    this.renderer = renderer;
    this.res = res;
    this.scene = scene;
    this.buffer1Active = false;
    this.lights = [];
    this.meshes = [];
    this.object = null;
    this.clearColor = new Color();
    this.clearAlpha = 0;
    const textureParams = {
      type: HalfFloatType,
      magFilter: NearestFilter,
      minFilter: NearestFilter
    };
    this.progressiveLightMap1 = new WebGLRenderTarget(this.res, this.res, textureParams);
    this.progressiveLightMap2 = new WebGLRenderTarget(this.res, this.res, textureParams);
    this.discardMat = new DiscardMaterial();
    this.targetMat = new MeshLambertMaterial({
      fog: false
    });
    this.previousShadowMap = {
      value: this.progressiveLightMap1.texture
    };
    this.averagingWindow = {
      value: 100
    };
    this.targetMat.onBeforeCompile = (shader) => {
      shader.vertexShader = "varying vec2 vUv;\n" + shader.vertexShader.slice(0, -1) + "vUv = uv; gl_Position = vec4((uv - 0.5) * 2.0, 1.0, 1.0); }";
      const bodyStart = shader.fragmentShader.indexOf("void main() {");
      shader.fragmentShader = "varying vec2 vUv;\n" + shader.fragmentShader.slice(0, bodyStart) + "uniform sampler2D previousShadowMap;\n	uniform float averagingWindow;\n" + shader.fragmentShader.slice(bodyStart - 1, -1) + `
vec3 texelOld = texture2D(previousShadowMap, vUv).rgb;
        gl_FragColor.rgb = mix(texelOld, gl_FragColor.rgb, 1.0/ averagingWindow);
      }`;
      shader.uniforms.previousShadowMap = this.previousShadowMap;
      shader.uniforms.averagingWindow = this.averagingWindow;
    };
  }
  clear() {
    this.renderer.getClearColor(this.clearColor);
    this.clearAlpha = this.renderer.getClearAlpha();
    this.renderer.setClearColor("black", 1);
    this.renderer.setRenderTarget(this.progressiveLightMap1);
    this.renderer.clear();
    this.renderer.setRenderTarget(this.progressiveLightMap2);
    this.renderer.clear();
    this.renderer.setRenderTarget(null);
    this.renderer.setClearColor(this.clearColor, this.clearAlpha);
    this.lights = [];
    this.meshes = [];
    this.scene.traverse((object) => {
      if (isGeometry(object)) {
        this.meshes.push({
          object,
          material: object.material
        });
      } else if (isLight(object)) {
        this.lights.push({
          object,
          intensity: object.intensity
        });
      }
    });
  }
  prepare() {
    this.lights.forEach((light) => light.object.intensity = 0);
    this.meshes.forEach((mesh) => mesh.object.material = this.discardMat);
  }
  finish() {
    this.lights.forEach((light) => light.object.intensity = light.intensity);
    this.meshes.forEach((mesh) => mesh.object.material = mesh.material);
  }
  configure(object) {
    this.object = object;
  }
  update(camera, blendWindow = 100) {
    if (!this.object) return;
    this.averagingWindow.value = blendWindow;
    this.object.material = this.targetMat;
    const activeMap = this.buffer1Active ? this.progressiveLightMap1 : this.progressiveLightMap2;
    const inactiveMap = this.buffer1Active ? this.progressiveLightMap2 : this.progressiveLightMap1;
    const oldBg = this.scene.background;
    this.scene.background = null;
    this.renderer.setRenderTarget(activeMap);
    this.previousShadowMap.value = inactiveMap.texture;
    this.buffer1Active = !this.buffer1Active;
    this.renderer.render(this.scene, camera);
    this.renderer.setRenderTarget(null);
    this.scene.background = oldBg;
  }
}
function useNoiseTexture(size = 256) {
  return reactExports.useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const g = c.getContext("2d");
    const img = g.createImageData(size, size);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 205 + Math.random() * 40;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    const t = new CanvasTexture(c);
    t.wrapS = t.wrapT = RepeatWrapping;
    t.repeat.set(3, 3);
    return t;
  }, []);
}
function baseFromGuests(guests = 80, shape = "round") {
  if (shape === "sheet") {
    if (guests <= 30) return { w: 33, d: 23 };
    if (guests <= 60) return { w: 45, d: 30 };
    if (guests <= 120) return { w: 60, d: 40 };
    return { w: 75, d: 50 };
  }
  if (guests <= 30) return { dia: 15 };
  if (guests <= 60) return { dia: 20 };
  if (guests <= 100) return { dia: 25 };
  if (guests <= 160) return { dia: 30 };
  if (guests <= 220) return { dia: 35 };
  return { dia: 40 };
}
function tintFromFlavor(flavor = "", fallback = "#f4efe6") {
  const f = (flavor || "").toLowerCase();
  if (f.includes("vanilla") || f.includes("white")) return "#f4efe6";
  if (f.includes("buttercream") || f.includes("ivory")) return "#f3efe4";
  if (f.includes("chocolate")) return "#d7b79b";
  if (f.includes("red velvet")) return "#d9a7a7";
  if (f.includes("lemon")) return "#ffe39f";
  if (f.includes("straw") || f.includes("rasp")) return "#f3c8d6";
  if (f.includes("blue") || f.includes("berry")) return "#cfe0ff";
  return fallback;
}
function RiseIn({ delay = 0, from = -1, to = 0, children }) {
  const ref = reactExports.useRef();
  useFrame(({ clock }) => {
    const t = Math.max(0, clock.getElapsedTime() - delay);
    const k = Math.min(1, t / 0.55);
    const y = from + (to - from) * (1 - Math.pow(1 - k, 3));
    if (ref.current) ref.current.position.y = y;
  });
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("group", { ref, "position-y": from, children }, void 0, false, {
    fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
    lineNumber: 71,
    columnNumber: 10
  }, this);
}
function SlabRound({ r, h, color, roughnessMap }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { castShadow: true, receiveShadow: true, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("cylinderGeometry", { args: [r, r, h, 96, 1, false] }, void 0, false, {
      fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
      lineNumber: 78,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "meshPhysicalMaterial",
      {
        color,
        roughness: 0.58,
        clearcoat: 0.8,
        clearcoatRoughness: 0.22,
        sheen: 1,
        roughnessMap
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 79,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
    lineNumber: 77,
    columnNumber: 5
  }, this);
}
function SlabSheet({ w, d, h, color, roughnessMap }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { castShadow: true, receiveShadow: true, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("boxGeometry", { args: [w, h, d] }, void 0, false, {
      fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
      lineNumber: 94,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "meshPhysicalMaterial",
      {
        color,
        roughness: 0.58,
        clearcoat: 0.8,
        clearcoatRoughness: 0.22,
        sheen: 1,
        roughnessMap
      },
      void 0,
      false,
      {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 95,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
    lineNumber: 93,
    columnNumber: 5
  }, this);
}
function CakeHero3D({
  layers = [],
  // bottom → top; each { type: 'cake'|'filling', heightIn, flavor, icing }
  guests = 80,
  shape = "round",
  // "round" | "sheet"
  occasion = "Preview",
  unitsPerInch = 0.55,
  // scene height units per real inch
  animateAssembly = true,
  showTopPiping = true
}) {
  const noise = useNoiseTexture();
  const base = baseFromGuests(guests, shape);
  const r = shape === "round" ? (base.dia || 25) / 10 * 0.9 : null;
  const w = shape === "sheet" ? (base.w || 45) / 10 * 0.9 : null;
  const d = shape === "sheet" ? (base.d || 30) / 10 * 0.9 : null;
  const placed = reactExports.useMemo(() => {
    let y = 0;
    const out = [];
    const rows = layers.filter((l) => l.type === "cake" || l.type === "filling");
    rows.forEach((L, i) => {
      const hIn = typeof L.heightIn === "number" ? L.heightIn : L.type === "cake" ? 1 : 0.25;
      const h = Math.max(0.04, hIn * unitsPerInch);
      const color = L.type === "filling" ? tintFromFlavor(L.flavor || L.icing || "filling", "#fff4ea") : tintFromFlavor(L.icing || L.flavor || "cake", "#f4efe6");
      const item = {
        kind: L.type,
        // 'cake' | 'filling'
        y: y + h / 2,
        h,
        color,
        delay: i * 0.18
      };
      out.push(item);
      y += h;
    });
    return { list: out, totalH: y };
  }, [layers, unitsPerInch]);
  const centerOffset = placed.totalH / 2;
  const plateY = -centerOffset - 0.28;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full h-full", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Canvas, { shadows: true, camera: { position: [3.8, 2.9, 5.7], fov: 42 }, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("color", { attach: "background", args: ["#0f172a"] }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 163,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ambientLight", { intensity: 0.6 }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 164,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AccumulativeShadows, { temporal: true, frames: 80, alphaTest: 0.85, scale: 10, position: [0, plateY + 0.35, 0], children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RandomizedLight, { amount: 8, radius: 4, intensity: 1.2, ambient: 0.6, position: [2, 5, 2] }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 168,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 167,
        columnNumber: 9
      }, this),
      shape === "round" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { position: [0, plateY, 0], receiveShadow: true, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("cylinderGeometry", { args: [(base.dia || 25) / 10 * 1.35, (base.dia || 25) / 10 * 1.35, 0.22, 64] }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 174,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meshStandardMaterial", { color: "#bcc2cc", metalness: 0.12, roughness: 0.42 }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 175,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 173,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { position: [0, plateY, 0], receiveShadow: true, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("boxGeometry", { args: [(base.w || 45) / 10 * 1.35, 0.22, (base.d || 30) / 10 * 1.35] }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 179,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meshStandardMaterial", { color: "#bcc2cc", metalness: 0.12, roughness: 0.42 }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 180,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 178,
        columnNumber: 11
      }, this),
      placed.list.map((p, i) => {
        const posY = p.y - centerOffset;
        const content = shape === "sheet" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SlabSheet, { w, d, h: p.h, color: p.color, roughnessMap: noise }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 189,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SlabRound, { r, h: p.h, color: p.color, roughnessMap: noise }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 191,
          columnNumber: 15
        }, this);
        return animateAssembly ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RiseIn, { delay: p.delay, from: -centerOffset - 1, to: posY, children: content }, i, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 195,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("group", { "position-y": posY, children: content }, i, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 199,
          columnNumber: 13
        }, this);
      }),
      showTopPiping && placed.list.length > 0 && shape === "round" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("mesh", { position: [0, placed.list.at(-1).y - centerOffset + placed.list.at(-1).h / 2 + 0.02, 0], castShadow: true, children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("torusGeometry", { args: [r * 0.92, 0.04, 24, 96] }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 208,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("meshPhysicalMaterial", { color: tintFromFlavor("buttercream-ivory"), roughness: 0.5, clearcoat: 0.75 }, void 0, false, {
          fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
          lineNumber: 209,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 207,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ContactShadows, { opacity: 0.5, blur: 2.5, far: 6, resolution: 1024, position: [0, plateY, 0] }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 213,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Environment, { preset: "studio" }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 214,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(OrbitControls2, { enablePan: false, minPolarAngle: 0.9, maxPolarAngle: 1.4 }, void 0, false, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 215,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
      lineNumber: 162,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 text-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: [
        occasion,
        " Preview"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 219,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-xs opacity-70", children: [
        layers.length,
        " steps • ~",
        guests,
        " guests • ",
        shape === "sheet" ? "Sheet" : "Round"
      ] }, void 0, true, {
        fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
        lineNumber: 220,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
      lineNumber: 218,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/code/frontend/src/components/CakeHero3D.jsx",
    lineNumber: 161,
    columnNumber: 5
  }, this);
}
export {
  CakeHero3D as default
};
