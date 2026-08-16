"use client";

import { useEffect, useRef } from "react";

/**
 * Hero object: a dark cube with the NI mark revolving at center, integration
 * logos drifting in depth around it — far tiles behind, near tiles in front.
 */

type Vec3 = [number, number, number];

interface Face {
  o: Vec3;
  u: Vec3;
  v: Vec3;
  n: Vec3;
  mark: boolean;
}

const FACES: Face[] = [
  { o: [-1, 1, 1], u: [2, 0, 0], v: [0, -2, 0], n: [0, 0, 1], mark: true },
  { o: [1, 1, 1], u: [0, 0, -2], v: [0, -2, 0], n: [1, 0, 0], mark: true },
  { o: [1, 1, -1], u: [-2, 0, 0], v: [0, -2, 0], n: [0, 0, -1], mark: true },
  { o: [-1, 1, -1], u: [0, 0, 2], v: [0, -2, 0], n: [-1, 0, 0], mark: true },
  { o: [-1, 1, -1], u: [2, 0, 0], v: [0, 0, 2], n: [0, 1, 0], mark: false },
  { o: [-1, -1, 1], u: [2, 0, 0], v: [0, 0, -2], n: [0, -1, 0], mark: false },
];

const VERTS: Vec3[] = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const TILT = 0.28;
const SPEED = -0.12;
const CUBE_SCALE = 0.7;
const MARK_INSET = 0.18;
const CHIP_TEXTURE = 420;
const LIGHT: Vec3 = [0.35, 0.85, 0.45];

interface OrbitSeed {
  x: number;
  y: number;
  depth: number;
}

/** Spread across the frame with clear space around the cube. */
const WIDE_ORBITS: OrbitSeed[] = [
  { x: -3.9, y: 0.45, depth: -0.65 },
  { x: -3.2, y: -1.25, depth: 0.4 },
  { x: -2.7, y: 1.45, depth: -0.25 },
  { x: -1.9, y: -0.35, depth: 0.8 },
  { x: -3.55, y: 1.75, depth: -0.8 },
  { x: -2.2, y: -1.85, depth: 0.15 },
  { x: -0.75, y: 2.05, depth: 0.5 },
  { x: 0.9, y: -2.05, depth: -0.4 },
  { x: 1.85, y: 1.55, depth: 0.65 },
  { x: 2.55, y: -0.55, depth: -0.2 },
  { x: 3.2, y: 1.2, depth: 0.25 },
  { x: 3.85, y: -1.35, depth: -0.85 },
  { x: 2.85, y: -1.85, depth: 0.5 },
  { x: 4.05, y: 0.55, depth: -0.15 },
];

const TALL_ORBITS: OrbitSeed[] = [
  { x: -1.55, y: 3.35, depth: -0.55 },
  { x: 1.0, y: 3.65, depth: -0.1 },
  { x: 1.5, y: 2.8, depth: 0.4 },
  { x: -0.45, y: 2.25, depth: 0.75 },
  { x: 1.8, y: 1.5, depth: -0.3 },
  { x: -1.85, y: 1.7, depth: 0.2 },
  { x: -1.65, y: 0.2, depth: 0.6 },
  { x: 1.75, y: 0.0, depth: -0.65 },
  { x: -1.5, y: -1.3, depth: 0.4 },
  { x: 1.85, y: -1.1, depth: -0.2 },
  { x: 0.3, y: -2.1, depth: 0.8 },
  { x: -1.75, y: -2.65, depth: -0.45 },
  { x: 1.4, y: -3.0, depth: 0.3 },
  { x: -0.4, y: -3.55, depth: -0.7 },
];

interface Tile {
  src: string;
  seed: OrbitSeed;
  driftPhase: number;
  img?: HTMLCanvasElement;
  imgScale: number;
  depth: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  base: number;
  phase: number;
  speed: number;
}

function makeRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function rotY(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}

function rotX(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}

function transform(p: Vec3, spin: number, nod: number): Vec3 {
  const scaled: Vec3 = [p[0] * CUBE_SCALE, p[1] * CUBE_SCALE, p[2] * CUBE_SCALE];
  return rotX(rotY(scaled, spin), TILT + nod);
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** White mark from the monogram — black keyed out cleanly. */
async function buildMark(src: string) {
  const img = await loadImage(src);
  if (!img) return null;
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, size, size);

  const data = ctx.getImageData(0, 0, size, size);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const lum = px[i] * 0.299 + px[i + 1] * 0.587 + px[i + 2] * 0.114;
    if (lum < 48) {
      px[i + 3] = 0;
    } else {
      px[i] = 255;
      px[i + 1] = 255;
      px[i + 2] = 255;
      px[i + 3] = 255;
    }
  }
  ctx.putImageData(data, 0, 0);
  return c;
}

async function buildChip(src: string, blurPx: number) {
  const img = await loadImage(src);
  if (!img) return null;

  const s = CHIP_TEXTURE;
  const pad = Math.ceil(Math.max(blurPx, 1) * 3.2);
  const full = s + pad * 2;
  const radius = s * 0.16;

  const c = document.createElement("canvas");
  c.width = full;
  c.height = full;
  const ctx = c.getContext("2d");
  if (!ctx) return null;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Soft ground shadow.
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  roundRect(ctx, pad + s * 0.04, pad + s * 0.08, s, s, radius);
  ctx.fill();

  // Quiet white plate.
  const tileGrad = ctx.createLinearGradient(pad, pad, pad, pad + s);
  tileGrad.addColorStop(0, "#ffffff");
  tileGrad.addColorStop(1, "#f4f4f4");
  ctx.fillStyle = tileGrad;
  roundRect(ctx, pad, pad, s, s, radius);
  ctx.fill();

  // Top specular edge — reads like glass UI, not a sticker.
  const sheen = ctx.createLinearGradient(pad, pad, pad, pad + s * 0.35);
  sheen.addColorStop(0, "rgba(255,255,255,0.55)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  roundRect(ctx, pad, pad, s, s * 0.35, radius);
  ctx.fill();

  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = Math.max(1, s * 0.008);
  roundRect(ctx, pad + 0.5, pad + 0.5, s - 1, s - 1, radius);
  ctx.stroke();

  const inset = s * 0.2;
  const box = s - inset * 2;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  const k = Math.min(box / iw, box / ih);
  ctx.drawImage(img, pad + (s - iw * k) / 2, pad + (s - ih * k) / 2, iw * k, ih * k);

  if (blurPx <= 0.05) return { canvas: c, scale: full / s };

  const out = document.createElement("canvas");
  out.width = full;
  out.height = full;
  const octx = out.getContext("2d");
  if (!octx) return { canvas: c, scale: full / s };
  octx.filter = `blur(${blurPx.toFixed(2)}px)`;
  octx.drawImage(c, 0, 0);
  return { canvas: out, scale: full / s };
}

export function LogoCube({
  mark = "/notrix-monogram.png",
  logos,
  className = "",
  quiet = false,
}: {
  mark?: string;
  logos: string[];
  className?: string;
  /** Skip decorative stars so the cube can sit behind copy. */
  quiet?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  // Stable identity so parent re-renders don't rebuild the scene.
  const logosKey = logos.join("|");

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let markLight: HTMLCanvasElement | null = null;
    const logoList = logosKey.split("|").filter(Boolean);

    const tiles: Tile[] = logoList.map((src, i) => ({
      src,
      seed: WIDE_ORBITS[i % WIDE_ORBITS.length],
      driftPhase: i * 1.37,
      imgScale: 1,
      depth: 0,
    }));

    const applyLayout = (narrow: boolean) => {
      const source = narrow ? TALL_ORBITS : WIDE_ORBITS;
      tiles.forEach((tile, i) => {
        tile.seed = source[i % source.length];
      });
      return source;
    };

    let backdropGrad: CanvasGradient | null = null;
    let builtNarrow: boolean | null = null;
    let spin = -0.55;
    let t = 0;
    let intro = 0;
    let last = performance.now();
    let raf = 0;
    let w = 0;
    let h = 0;
    let unitX = 0;
    let unitY = 0;
    let unit = 0;
    let narrowScreen = false;
    let stars: Star[] = [];

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const seedStars = () => {
      const rand = makeRandom(20260805);
      const count = Math.round(Math.min(160, (w * h) / 7000));
      stars = Array.from({ length: count }, () => {
        const bright = rand() < 0.12;
        return {
          x: rand() * w,
          y: rand() * h,
          r: bright ? 1.1 + rand() * 0.7 : 0.35 + rand() * 0.7,
          base: bright ? 0.35 + rand() * 0.35 : 0.08 + rand() * 0.28,
          phase: rand() * Math.PI * 2,
          speed: bright ? 5 + rand() * 8 : 8 + rand() * 16,
        };
      });
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      narrowScreen = w < 760;
      const source = applyLayout(narrowScreen);
      let maxX = 0;
      let maxY = 0;
      for (const s of source) {
        maxX = Math.max(maxX, Math.abs(s.x));
        maxY = Math.max(maxY, Math.abs(s.y));
      }
      // Fit the field to the viewport with room for tile size.
      const pad = 0.38;
      unitX = w / (2 * (maxX + pad));
      unitY = h / (2 * (maxY + pad));
      unit = Math.min(unitX, unitY);
      if (!quiet) seedStars();

      backdropGrad = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.65,
      );
      backdropGrad.addColorStop(0, "rgba(255,255,255,0.06)");
      backdropGrad.addColorStop(0.4, "rgba(255,255,255,0.02)");
      backdropGrad.addColorStop(1, "rgba(255,255,255,0)");

      if (builtNarrow !== narrowScreen) {
        builtNarrow = narrowScreen;
        tiles.forEach((tile) => {
          const blur = Math.max(0, -tile.seed.depth) * 4.5;
          buildChip(tile.src, blur).then((result) => {
            if (!result) return;
            tile.img = result.canvas;
            tile.imgScale = result.scale;
          });
        });
      }
    };

    const project = (p: Vec3, ox = 0, oy = 0): [number, number] => [
      w / 2 + ox + p[0] * unit,
      h / 2 + oy - p[1] * unit,
    ];

    const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);

    const drawBackdrop = () => {
      if (!backdropGrad) return;
      ctx.fillStyle = backdropGrad;
      ctx.fillRect(0, 0, w, h);

      const horizon = ctx.createLinearGradient(0, h * 0.55, 0, h);
      horizon.addColorStop(0, "rgba(255,255,255,0)");
      horizon.addColorStop(0.55, "rgba(255,255,255,0.018)");
      horizon.addColorStop(1, "rgba(0,0,0,0.25)");
      ctx.fillStyle = horizon;
      ctx.fillRect(0, 0, w, h);
    };

    const drawStars = () => {
      for (const star of stars) {
        const twinkle = reduced
          ? 0.65
          : 0.25 + 0.75 * Math.pow(Math.max(0, Math.sin(t * star.speed + star.phase)), 8);
        const a = star.base * twinkle;
        if (a < 0.015) continue;
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawStage = (cx: number, cy: number, appear: number) => {
      const rw = unit * CUBE_SCALE * 1.4;
      const rh = unit * CUBE_SCALE * 0.38;
      const y = cy + unit * CUBE_SCALE * 1.0;

      ctx.save();
      ctx.globalAlpha = appear * 0.9;

      const shadow = ctx.createRadialGradient(cx, y, 0, cx, y, rw);
      shadow.addColorStop(0, "rgba(0,0,0,0.5)");
      shadow.addColorStop(0.55, "rgba(0,0,0,0.14)");
      shadow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = shadow;
      ctx.beginPath();
      ctx.ellipse(cx, y, rw, rh, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawCubeAura = (cx: number, cy: number) => {
      const r = unit * CUBE_SCALE * 1.6;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, "rgba(255,255,255,0.03)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
    };

    const drawDepthFog = () => {
      const fog = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.08,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.55,
      );
      fog.addColorStop(0, "rgba(5,5,5,0)");
      fog.addColorStop(0.55, "rgba(5,5,5,0.08)");
      fog.addColorStop(1, "rgba(5,5,5,0.22)");
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, w, h);
    };

    const drawVignette = () => {
      const g = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.35,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.95,
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(0.65, "rgba(0,0,0,0.1)");
      g.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawCube = (nod: number, cx: number, cy: number, appear: number) => {
      const ox = cx - w / 2;
      const oy = cy - h / 2;
      const verts = VERTS.map((v) => transform(v, spin, nod));
      const screen = verts.map((v) => project(v, ox, oy));
      // Thin shiny white wireframe — sharp corners.
      const edgeWidth = Math.max(1.15, unit * 0.012);

      ctx.save();
      ctx.globalAlpha = appear;

      const strokeEdges = (wantFront: boolean) => {
        ctx.lineCap = "butt";
        ctx.lineJoin = "miter";
        ctx.miterLimit = 10;
        for (const [a, b] of EDGES) {
          const z = (verts[a][2] + verts[b][2]) / 2;
          const isFront = z >= 0;
          if (isFront !== wantFront) continue;
          const depthT = (z + 1.4) / 2.8;

          // Soft sheen under the line.
          ctx.strokeStyle = `rgba(255,255,255,${(0.18 + 0.28 * depthT).toFixed(3)})`;
          ctx.lineWidth = edgeWidth * 2.4;
          ctx.beginPath();
          ctx.moveTo(screen[a][0], screen[a][1]);
          ctx.lineTo(screen[b][0], screen[b][1]);
          ctx.stroke();

          // Crisp bright edge.
          ctx.strokeStyle = `rgba(255,255,255,${(0.7 + 0.3 * depthT).toFixed(3)})`;
          ctx.lineWidth = edgeWidth;
          ctx.beginPath();
          ctx.moveTo(screen[a][0], screen[a][1]);
          ctx.lineTo(screen[b][0], screen[b][1]);
          ctx.stroke();
        }
      };

      strokeEdges(false);

      // Sort faces back-to-front so dark panes layer correctly.
      const visible = FACES.map((face) => {
        const n = transform(face.n, spin, nod);
        return { face, n, z: n[2] };
      })
        .filter((f) => f.z > 0.001)
        .sort((a, b) => a.z - b.z);

      for (const { face, n } of visible) {
        const O = transform(face.o, spin, nod);
        const U = transform(
          [face.o[0] + face.u[0], face.o[1] + face.u[1], face.o[2] + face.u[2]],
          spin,
          nod,
        );
        const V = transform(
          [face.o[0] + face.v[0], face.o[1] + face.v[1], face.o[2] + face.v[2]],
          spin,
          nod,
        );
        const C = transform(
          [
            face.o[0] + face.u[0] + face.v[0],
            face.o[1] + face.u[1] + face.v[1],
            face.o[2] + face.u[2] + face.v[2],
          ],
          spin,
          nod,
        );

        const p0 = project(O, ox, oy);
        const pu = project(U, ox, oy);
        const pv = project(V, ox, oy);
        const pc = project(C, ox, oy);

        const lambert = Math.max(
          0,
          Math.min(1, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]),
        );

        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.lineTo(pu[0], pu[1]);
        ctx.lineTo(pc[0], pc[1]);
        ctx.lineTo(pv[0], pv[1]);
        ctx.closePath();

        // Dark faces with a quiet specular lift on the lit side.
        const lo = 8 + lambert * 14;
        const hi = 18 + lambert * 38;
        const grad = ctx.createLinearGradient(p0[0], p0[1], pv[0], pv[1]);
        grad.addColorStop(0, `rgb(${hi | 0},${hi | 0},${hi | 0})`);
        grad.addColorStop(0.55, `rgb(${((lo + hi) / 2) | 0},${((lo + hi) / 2) | 0},${((lo + hi) / 2) | 0})`);
        grad.addColorStop(1, `rgb(${lo | 0},${lo | 0},${lo | 0})`);
        ctx.fillStyle = grad;
        ctx.fill();

        // Hairline face edge.
        ctx.strokeStyle = `rgba(255,255,255,${(0.4 + 0.4 * n[2]).toFixed(3)})`;
        ctx.lineWidth = edgeWidth;
        ctx.lineJoin = "miter";
        ctx.miterLimit = 10;
        ctx.stroke();

        if (!markLight || !face.mark) continue;

        const iu: Vec3 = [
          (U[0] - O[0]) * (1 - MARK_INSET * 2),
          (U[1] - O[1]) * (1 - MARK_INSET * 2),
          (U[2] - O[2]) * (1 - MARK_INSET * 2),
        ];
        const iv: Vec3 = [
          (V[0] - O[0]) * (1 - MARK_INSET * 2),
          (V[1] - O[1]) * (1 - MARK_INSET * 2),
          (V[2] - O[2]) * (1 - MARK_INSET * 2),
        ];
        const io: Vec3 = [
          O[0] + (U[0] - O[0]) * MARK_INSET + (V[0] - O[0]) * MARK_INSET,
          O[1] + (U[1] - O[1]) * MARK_INSET + (V[1] - O[1]) * MARK_INSET,
          O[2] + (U[2] - O[2]) * MARK_INSET + (V[2] - O[2]) * MARK_INSET,
        ];

        const a0 = project(io, ox, oy);
        const au = project([io[0] + iu[0], io[1] + iu[1], io[2] + iu[2]], ox, oy);
        const av = project([io[0] + iv[0], io[1] + iv[1], io[2] + iv[2]], ox, oy);
        const size = markLight.width;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.lineTo(pu[0], pu[1]);
        ctx.lineTo(pc[0], pc[1]);
        ctx.lineTo(pv[0], pv[1]);
        ctx.closePath();
        ctx.clip();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.transform(
          (au[0] - a0[0]) / size,
          (au[1] - a0[1]) / size,
          (av[0] - a0[0]) / size,
          (av[1] - a0[1]) / size,
          a0[0],
          a0[1],
        );
        // Sharp white NI — full opacity on facing faces.
        ctx.globalAlpha = (0.72 + 0.28 * n[2]) * appear;
        ctx.drawImage(markLight, 0, 0);
        ctx.restore();
      }

      strokeEdges(true);
      ctx.restore();
    };

    const updateAndDrawTiles = (
      _dt: number,
      mode: "far" | "near",
      cx: number,
      cy: number,
      appear: number,
    ) => {
      const list = tiles
        .map((tile) => {
          const s = tile.seed;
          // Tiny in-place float only — never wander off the layout.
          const bob = Math.sin(t * 0.45 + tile.driftPhase) * 0.04;
          const x = s.x;
          const y = s.y + bob;
          const depth = s.depth;
          return { tile, x, y, depth };
        })
        .filter(({ depth }) => (mode === "far" ? depth < 0.05 : depth >= 0.05))
        .sort((a, b) => a.depth - b.depth);

      for (const { tile, x, y, depth } of list) {
        if (!tile.img) continue;
        tile.depth = depth;

        const sx = cx + x * unitX;
        const sy = cy - y * unitY;

        const near = (depth + 1) / 2;
        const base = Math.min(unitX, unitY) * (narrowScreen ? 0.4 : 0.34);
        const size = base * (0.58 + 0.5 * near) * (0.8 + 0.2 * appear);
        const drawn = size * tile.imgScale;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.globalAlpha = (0.38 + 0.58 * near) * appear;
        if (depth > 0.1) {
          ctx.shadowColor = "rgba(0,0,0,0.45)";
          ctx.shadowBlur = size * 0.32;
          ctx.shadowOffsetY = size * 0.1;
        }
        ctx.drawImage(tile.img, -drawn / 2, -drawn / 2, drawn, drawn);
        ctx.restore();
      }
    };

    const render = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      if (unit <= 0 || unitX <= 0 || unitY <= 0) return;

      if (!reduced) intro = Math.min(1, intro + dt * 0.45);
      else intro = 1;
      const appear = easeOut(intro);

      const cx = w / 2;
      const cy = h / 2;
      const nod = Math.sin(t * 0.35) * 0.07;

      drawBackdrop();
      if (!quiet) drawStars();
      updateAndDrawTiles(dt, "far", cx, cy, appear);
      drawDepthFog();
      drawStage(cx, cy, appear);
      drawCubeAura(cx, cy);
      drawCube(nod, cx, cy, appear);
      updateAndDrawTiles(dt, "near", cx, cy, appear);
      drawVignette();
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!reduced) {
        t += dt;
        spin += dt * SPEED;
      }
      render(dt);
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(() => {
      resize();
      render(0);
    });

    resize();
    ro.observe(wrap);

    buildMark(mark).then((m) => {
      markLight = m;
    });
    tiles.forEach((tile) => {
      const blurPx = Math.max(0, -tile.seed.depth) * 4.5;
      buildChip(tile.src, blurPx).then((result) => {
        if (!result) return;
        tile.img = result.canvas;
        tile.imgScale = result.scale;
      });
    });

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [mark, logosKey, quiet]);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <canvas ref={canvasRef} aria-hidden className="block h-full w-full" />
    </div>
  );
}
