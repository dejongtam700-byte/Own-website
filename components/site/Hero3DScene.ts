/**
 * Hero3DScene — cinematische 3D-scène met drie zwevende browserpanelen.
 *
 * Bewust geschreven met "plain" Three.js (zonder React Three Fiber/Drei):
 * één scène, volledige controle over de render-loop en een kleinere bundel.
 * Deze module wordt pas geladen (dynamic import) als het apparaat 3D aankan.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type PanelSpec = { image: string; url: string };

type Options = {
  panels: [PanelSpec, PanelSpec, PanelSpec];
  onReady?: () => void;
  onError?: (err: unknown) => void;
};

type Layout = { w: number; pos: [number, number, number]; rot: [number, number, number]; phase: number };

const LAYOUT: Layout[] = [
  { w: 4.5, pos: [0.25, 0.05, 0], rot: [-0.03, -0.24, 0.0], phase: 0 },
  { w: 3.4, pos: [-2.55, 1.35, -2.7], rot: [0.05, 0.34, 0.025], phase: 1.7 },
  { w: 3.4, pos: [3.0, -1.05, -2.1], rot: [-0.03, -0.52, -0.02], phase: 3.1 },
];

const SCREEN_ASPECT = 1440 / 900;
const FLOOR_Y = -2.85;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** Browserbalk (stoplichtjes + adresbalk) als canvas-textuur. */
function chromeTexture(url: string, aspect: number) {
  const W = 2048;
  const H = Math.round(W / aspect);
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#171e2b");
  grad.addColorStop(1, "#111722");
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);
  g.fillStyle = "rgba(255,255,255,0.06)";
  g.fillRect(0, H - 2, W, 2);
  const cy = H / 2;
  const dot = H * 0.13;
  ["#ff6b62", "#f5bf4f", "#3fc66b"].forEach((col, i) => {
    g.beginPath();
    g.arc(H * 0.55 + i * dot * 3, cy, dot, 0, Math.PI * 2);
    g.fillStyle = col;
    g.globalAlpha = 0.85;
    g.fill();
  });
  g.globalAlpha = 1;
  // adresbalk
  const pw = W * 0.36;
  const ph = H * 0.56;
  const px = (W - pw) / 2;
  const py = cy - ph / 2;
  g.fillStyle = "rgba(255,255,255,0.065)";
  g.beginPath();
  g.roundRect(px, py, pw, ph, ph / 2);
  g.fill();
  g.fillStyle = "rgba(161,170,185,0.95)";
  g.font = `500 ${Math.round(ph * 0.46)}px ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(url, W / 2 + ph * 0.25, cy + 1);
  // slotje
  const lx = W / 2 - g.measureText(url).width / 2 - ph * 0.25;
  g.strokeStyle = "rgba(161,170,185,0.9)";
  g.lineWidth = ph * 0.06;
  g.strokeRect(lx - ph * 0.12, cy - ph * 0.02, ph * 0.24, ph * 0.2);
  g.beginPath();
  g.arc(lx, cy - ph * 0.04, ph * 0.08, Math.PI, 0);
  g.stroke();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Zachte contactschaduw (radiaal verloop). */
function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.85)");
  grad.addColorStop(0.45, "rgba(0,0,0,0.35)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  return t;
}

const glareVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const glareFragment = /* glsl */ `
  uniform float uOffset;
  uniform float uStrength;
  uniform float uIntro;
  varying vec2 vUv;
  void main() {
    float d = (vUv.x * 0.85 + vUv.y * 0.55) - uOffset;
    float band = smoothstep(0.32, 0.0, abs(d)) * 0.75 + smoothstep(0.06, 0.0, abs(d - 0.18)) * 0.35;
    float edge = smoothstep(0.0, 0.08, vUv.y) * smoothstep(1.0, 0.92, vUv.y);
    gl_FragColor = vec4(vec3(0.85, 0.95, 1.0), band * uStrength * edge * uIntro);
  }
`;

const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));

export function createHeroScene(container: HTMLElement, canvas: HTMLCanvasElement, opts: Options) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envTex = pmrem.fromScene(room, 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.6;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  // Licht: koele key, paarse rim, cyaan fill van achteren
  scene.add(new THREE.AmbientLight(0xffffff, 0.18));
  const key = new THREE.DirectionalLight(0xdff4ff, 1.4);
  key.position.set(-4, 6, 7);
  scene.add(key);
  const rim = new THREE.PointLight(0x8f85ff, 26, 22, 1.6);
  rim.position.set(5.5, -0.5, -3.5);
  scene.add(rim);
  const fill = new THREE.PointLight(0x5ad7ee, 18, 20, 1.6);
  fill.position.set(-5.5, 2.5, -4.5);
  scene.add(fill);

  const root = new THREE.Group();
  scene.add(root);

  const manager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(manager);
  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const shadowTex = shadowTexture();

  const frameMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b1019,
    metalness: 0.75,
    roughness: 0.26,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });

  type Panel = {
    group: THREE.Group;
    shadow: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
    glare: THREE.ShaderMaterial;
    layout: Layout;
  };
  const panels: Panel[] = [];

  opts.panels.forEach((spec, i) => {
    const L = LAYOUT[i];
    const w = L.w;
    const h = w / SCREEN_ASPECT;
    const chromeH = w * 0.046;
    const pad = w * 0.014;
    const fw = w + pad * 2;
    const fh = h + chromeH + pad * 2;
    const depth = 0.05;
    const bevel = 0.018;

    const group = new THREE.Group();

    const frameGeo = new THREE.ExtrudeGeometry(roundedRect(fw, fh, w * 0.028), {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 10,
    });
    frameGeo.translate(0, 0, -(depth + bevel));
    group.add(new THREE.Mesh(frameGeo, frameMat));

    const chrome = new THREE.Mesh(
      new THREE.PlaneGeometry(w, chromeH),
      new THREE.MeshBasicMaterial({ map: chromeTexture(spec.url, w / chromeH), toneMapped: false })
    );
    chrome.position.set(0, h / 2, 0.002);
    group.add(chrome);

    const tex = loader.load(spec.image);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = maxAniso;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, color: new THREE.Color(0.96, 0.96, 0.96) })
    );
    screen.position.set(0, -chromeH / 2, 0.002);
    group.add(screen);

    const glare = new THREE.ShaderMaterial({
      vertexShader: glareVertex,
      fragmentShader: glareFragment,
      uniforms: { uOffset: { value: 0.2 }, uStrength: { value: i === 0 ? 0.11 : 0.08 }, uIntro: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glareMesh = new THREE.Mesh(new THREE.PlaneGeometry(fw, fh), glare);
    glareMesh.position.z = 0.006;
    group.add(glareMesh);

    group.position.set(...L.pos);
    group.rotation.set(...L.rot);
    root.add(group);

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(fw * 1.15, fw * 0.42),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.55, color: 0x000000 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(L.pos[0], FLOOR_Y, L.pos[2]);
    root.add(shadow);

    panels.push({ group, shadow, glare, layout: L });
  });

  // Fijne zwevende deeltjes voor diepte
  const count = 150;
  const pts = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pts[i * 3] = (Math.random() - 0.5) * 16;
    pts[i * 3 + 1] = (Math.random() - 0.5) * 9;
    pts[i * 3 + 2] = -7 + Math.random() * 9;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xa9e6f5, size: 0.028, transparent: true, opacity: 0.45, depthWrite: false, sizeAttenuation: true })
  );
  scene.add(dust);

  // --- Interactie ---
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  let scrollP = 0;
  const onScroll = () => {
    scrollP = Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight)));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // --- Formaat & camera-fit ---
  let baseZ = 12;
  let compact = false;
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const tanHalf = Math.tan(vfov / 2);
    // Op smalle schermen staat het podium onder de tekst: compacter kader
    compact = w < 700;
    const needW = compact ? 7.2 : 9.4;
    const needH = compact ? 5.4 : 7.2;
    baseZ = Math.max(needH / 2 / tanHalf, needW / 2 / (tanHalf * camera.aspect)) + 0.6;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // --- Render-loop (pauzeert buiten beeld of in een achtergrondtab) ---
  // Eigen klok die stilstaat zolang de loop gepauzeerd is
  let elapsed = 0;
  let last = -1;
  let introStart = -1;
  let running = false;
  let inView = true;
  let readyFired = false;

  const frame = (now: number) => {
    if (last < 0) last = now;
    elapsed += Math.min(0.1, (now - last) / 1000);
    last = now;
    const t = elapsed;
    if (introStart < 0) introStart = t;
    const motion = reducedMotion ? 0 : 1;

    pointer.x += (pointer.tx - pointer.x) * 0.045;
    pointer.y += (pointer.ty - pointer.y) * 0.045;

    root.rotation.y = pointer.x * 0.2 * motion;
    const sp = compact ? 0 : scrollP;
    root.rotation.x = (pointer.y * 0.1 + sp * 0.12) * motion;
    root.position.y = sp * 0.9 * motion;

    camera.position.x = Math.sin(t * 0.11) * 0.35 * motion;
    camera.position.y = Math.cos(t * 0.09) * 0.2 * motion;
    camera.position.z = baseZ + Math.sin(t * 0.07) * 0.25 * motion;
    camera.lookAt(0, 0, 0);

    panels.forEach((p, i) => {
      const L = p.layout;
      const local = Math.max(0, Math.min(1, (t - introStart - i * 0.16) / 1.7));
      const k = reducedMotion ? 1 : easeOutExpo(local);
      const float = Math.sin(t * 0.7 + L.phase) * 0.09 * motion;
      p.group.position.set(L.pos[0], L.pos[1] + float - (1 - k) * 0.6, L.pos[2] - (1 - k) * 4.5);
      p.group.rotation.set(
        L.rot[0] + Math.sin(t * 0.5 + L.phase) * 0.015 * motion,
        L.rot[1] + (1 - k) * (i === 1 ? 0.5 : -0.5),
        L.rot[2] + Math.cos(t * 0.6 + L.phase) * 0.01 * motion
      );
      p.group.scale.setScalar(0.92 + 0.08 * k);
      p.shadow.material.opacity = (0.5 - float * 1.2) * k;
      p.shadow.scale.setScalar(1 + float * 0.6);
      p.glare.uniforms.uOffset.value = 0.15 + pointer.x * 0.35 + Math.sin(t * 0.25 + L.phase) * 0.12 * motion;
      p.glare.uniforms.uIntro.value = k;
    });

    dust.rotation.y = t * 0.015 * motion;
    dust.position.y = Math.sin(t * 0.2) * 0.1 * motion;

    renderer.render(scene, camera);
    if (!readyFired) {
      readyFired = true;
      opts.onReady?.();
    }
  };

  const updateLoop = () => {
    const shouldRun = inView && document.visibilityState === "visible";
    if (shouldRun && !running) {
      last = -1;
      renderer.setAnimationLoop(frame);
      running = true;
    } else if (!shouldRun && running) {
      renderer.setAnimationLoop(null);
      running = false;
    }
  };

  const io = new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    updateLoop();
  });
  io.observe(container);
  document.addEventListener("visibilitychange", updateLoop);

  manager.onLoad = () => updateLoop();
  manager.onError = (url) => opts.onError?.(new Error(`Textuur niet geladen: ${url}`));

  const onContextLost = (e: Event) => {
    e.preventDefault();
    opts.onError?.(new Error("WebGL-context verloren"));
  };
  canvas.addEventListener("webglcontextlost", onContextLost);

  return {
    dispose() {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", updateLoop);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        const mats = Array.isArray(mat) ? mat : mat ? [mat] : [];
        for (const m of mats) {
          const withMap = m as THREE.MeshBasicMaterial;
          withMap.map?.dispose();
          m.dispose();
        }
      });
      shadowTex.dispose();
      envTex.dispose();
      room.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
