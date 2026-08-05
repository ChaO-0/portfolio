import {
  BufferAttribute,
  BufferGeometry,
  Color,
  FogExp2,
  GridHelper,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
  WireframeGeometry,
} from "three";

const INK = 0x0a0e18;
const PAPER = 0xe9edf5;
const ACCENT_FALLBACK = 0x36caf1;

/**
 * three's colour parser has no oklch(), and getComputedStyle hands the value
 * back verbatim — so paint one pixel with it and read the sRGB channels back.
 * Keeps the scene in step with --color-accent instead of duplicating it.
 */
function readAccent(): number {
  try {
    const css = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim();
    if (!css) return ACCENT_FALLBACK;

    const probe = document.createElement("canvas");
    probe.width = probe.height = 1;
    const ctx = probe.getContext("2d", { willReadFrequently: true });
    if (!ctx) return ACCENT_FALLBACK;

    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    // a colour the browser could not parse leaves fillStyle at transparent black
    return r + g + b > 0 ? (r << 16) | (g << 8) | b : ACCENT_FALLBACK;
  } catch {
    return ACCENT_FALLBACK;
  }
}

export interface HeroScene {
  render(now: number, progress: number): void;
}

/** Grid corridor + wireframe lattice behind the hero. `progress` is 0–1 over the first viewport. */
export function initHero3d(canvas: HTMLCanvasElement): HeroScene {
  const accent = new Color(readAccent());

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));

  const scene = new Scene();
  scene.fog = new FogExp2(INK, 0.062);

  const camera = new PerspectiveCamera(58, 1, 0.1, 140);
  camera.position.set(0, 0.9, 9.4);

  // floor and ceiling, scrolling toward the viewer in opposite directions
  const grids = [
    [-3.4, 1],
    [5.2, -1],
  ].map(([y, dir]) => {
    const grid = new GridHelper(70, 70, accent, accent);
    grid.material.transparent = true;
    grid.material.opacity = 0.17;
    grid.material.depthWrite = false;
    grid.position.y = y;
    grid.userData.dir = dir;
    scene.add(grid);
    return grid;
  });

  // the lattice: nodes and edges, the systems motif
  const group = new Group();
  scene.add(group);

  const ico = new IcosahedronGeometry(2.35, 1);
  const edges = new LineSegments(
    new WireframeGeometry(ico),
    new LineBasicMaterial({ color: accent, transparent: true, opacity: 0.42, depthWrite: false })
  );
  const nodes = new Points(
    ico,
    new PointsMaterial({ color: PAPER, size: 0.085, transparent: true, opacity: 0.9, depthWrite: false })
  );
  const shell = new LineSegments(
    new WireframeGeometry(new IcosahedronGeometry(3.5, 0)),
    new LineBasicMaterial({ color: accent, transparent: true, opacity: 0.14, depthWrite: false })
  );
  group.add(edges, nodes, shell);

  // dust
  const COUNT = 260;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 34;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute("position", new BufferAttribute(positions, 3));
  scene.add(
    new Points(
      dustGeo,
      new PointsMaterial({ color: PAPER, size: 0.045, transparent: true, opacity: 0.35, depthWrite: false })
    )
  );

  // pointer drift, eased toward the target each frame
  let mx = 0;
  let my = 0;
  let tmx = 0;
  let tmy = 0;
  const onMove = (e: PointerEvent) => {
    tmx = e.clientX / window.innerWidth - 0.5;
    tmy = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  return {
    render(now, p) {
      const t = now * 0.001;
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      grids.forEach((grid) => {
        grid.position.z = ((t * 1.5 + p * 26) % 1) * grid.userData.dir;
        grid.material.opacity = 0.17 * (1 - p * 0.7);
      });

      group.rotation.y = t * 0.12 + p * 2.4 + mx * 0.5;
      group.rotation.x = Math.sin(t * 0.22) * 0.16 + p * 0.5 + my * 0.35;
      group.position.y = Math.sin(t * 0.5) * 0.16 - p * 1.6;
      group.scale.setScalar(1 - p * 0.28);
      shell.rotation.y = -t * 0.2;
      shell.rotation.z = t * 0.14;
      edges.material.opacity = 0.42 * (1 - p * 0.8);
      nodes.material.opacity = 0.9 * (1 - p * 0.8);

      camera.position.set(mx * 1.1, 0.9 - my * 0.7 + p * 0.5, 9.4 - p * 3.2);
      camera.lookAt(0, -p * 0.6, 0);
      renderer.render(scene, camera);
    },
  };
}
