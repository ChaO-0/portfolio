/**
 * The spine behind the page: six wireframe nodes on one vertical run, linked by
 * lines with packets travelling down them. Scroll position grows the stack node
 * by node and drives the legend in the Systems section; the pointer swings it.
 */
import {
  BoxGeometry,
  BufferGeometry,
  Clock,
  EdgesGeometry,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

const MINT = 0x57c8a5;
const GAP = 3.15;
/** Node box dimensions, roughly scaled to how much each layer carries. */
const SIZES: [number, number, number][] = [
  [1.9, 1.05, 1.05],
  [1.55, 1.0, 1.0],
  [2.15, 1.2, 1.2],
  [1.2, 0.85, 0.85],
  [1.7, 1.0, 1.0],
  [1.45, 0.95, 0.95],
];

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

export function mountSpine(host: HTMLElement) {
  const N = SIZES.length;
  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 120);
  camera.position.z = 15;

  const renderer = new WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  host.appendChild(renderer.domElement);

  const group = new Group();
  scene.add(group);

  const nodes: { holder: Group; edges: LineSegments; fill: Mesh; on: number }[] = [];
  const links: Line[] = [];
  const packets: { mesh: Mesh; a: Vector3; b: Vector3; t: number; i: number }[] = [];

  for (let i = 0; i < N; i++) {
    const holder = new Group();
    const geo = new BoxGeometry(...SIZES[i]);
    const edges = new LineSegments(
      new EdgesGeometry(geo),
      new LineBasicMaterial({ color: MINT, transparent: true, opacity: 0.22 }),
    );
    const fill = new Mesh(geo, new MeshBasicMaterial({ color: MINT, transparent: true, opacity: 0.03 }));
    holder.add(edges, fill);
    holder.position.set(i % 2 ? 0.55 : -0.55, -i * GAP, i % 3 === 0 ? 0.3 : -0.3);
    holder.scale.setScalar(0.001);
    group.add(holder);
    nodes.push({ holder, edges, fill, on: 0 });

    if (i === 0) continue;

    const a = nodes[i - 1].holder.position.clone();
    const b = holder.position.clone();
    const line = new Line(
      new BufferGeometry().setFromPoints([a, b]),
      new LineBasicMaterial({ color: MINT, transparent: true, opacity: 0.1 }),
    );
    group.add(line);
    links.push(line);

    const mesh = new Mesh(
      new SphereGeometry(0.075, 8, 8),
      new MeshBasicMaterial({ color: MINT, transparent: true, opacity: 0.9 }),
    );
    group.add(mesh);
    // staggered by index so the packets don't march in lockstep
    packets.push({ mesh, a, b, t: i / N, i });
  }

  // Legend rows in the Systems section light up as their node grows in.
  const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-node]"));
  const readout = document.getElementById("node-active");
  let lit = -1;
  const setLit = (i: number) => {
    if (i === lit) return;
    lit = i;
    rows.forEach((row, k) => {
      row.toggleAttribute("data-on", k === i);
      row.querySelector("[data-num]")?.toggleAttribute("data-dim", k > i);
    });
    if (readout) readout.textContent = `${String(i + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
  };

  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // narrow viewports have no room beside the content, so it centres and dims
    const narrow = innerWidth < 1100;
    group.position.x = narrow ? 0 : 4.4;
    host.style.opacity = narrow ? "0.4" : "1";
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener(
    "pointermove",
    (e) => {
      pointer.tx = (e.clientX / innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / innerHeight - 0.5) * 2;
    },
    { passive: true },
  );

  const clock = new Clock();
  const frame = () => {
    const t = clock.getElapsedTime();
    const doc = Math.max(document.body.scrollHeight - innerHeight, 1);
    const grown = clamp01(scrollY / doc) * (N + 0.4);

    nodes.forEach((n, i) => {
      n.on += (clamp01(grown - i) - n.on) * 0.07;
      n.holder.scale.setScalar(0.001 + n.on * 0.999);
      (n.edges.material as LineBasicMaterial).opacity = 0.1 + n.on * 0.5;
      (n.fill.material as MeshBasicMaterial).opacity = n.on * 0.06;
      n.holder.rotation.y = t * 0.12 + i * 0.4;
      n.holder.rotation.x = Math.sin(t * 0.3 + i) * 0.06;
    });

    links.forEach((l, i) => {
      (l.material as LineBasicMaterial).opacity = 0.05 + clamp01(grown - i - 1) * 0.22;
    });

    packets.forEach((p) => {
      p.t = (p.t + 0.006) % 1;
      p.mesh.position.lerpVectors(p.a, p.b, p.t);
      (p.mesh.material as MeshBasicMaterial).opacity = clamp01(grown - p.i) * 0.85;
    });

    group.position.y = (grown / (N + 0.4)) * (N - 1) * GAP * 0.92 + 1.2;
    pointer.x += (pointer.tx - pointer.x) * 0.045;
    pointer.y += (pointer.ty - pointer.y) * 0.045;
    group.rotation.y = -0.42 + pointer.x * 0.3;
    group.rotation.x = pointer.y * 0.14;
    camera.position.x = pointer.x * 0.5;

    setLit(Math.min(Math.floor(grown), N - 1));
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  };
  frame();
}
