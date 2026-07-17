import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  TransformControls,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// -------- COLOUR SYSTEM --------
// Each MAJOR component has its own colour; its SUB-components are a lighter shade
// of the same hue so you can read the family at a glance.
const COL = {
  valve: "#2f6fed",     lever: "#82abf7",        // valve family (blue)
  bracket: "#1f9d57",   coupling: "#63c98d",     // mount family (green)
  actuator: "#e0851b",  cap: "#f2b562",          // actuator family (amber)
  lsb: "#7c4dff",       lsbmount: "#b49bff",     // limit-switch family (purple)
  afr: "#d93a3a",       gauge: "#ef8d8d",  lplate: "#f2a9a9",  airpipe: "#f4bcbc", // AFR / air-train family (red)
  sov: "#12a5a5",       namurplate: "#62d0d0",   // SOV family (teal)
  boltset: "#9aa3ad",                            // hardware (steel)
};

// -------- MESHES --------
// The physical parts with their final assembled transforms.
//   showFrom = 1-based golden step where the part appears (slides in).
//   hideFrom = optional step where it is REMOVED (slides out) - e.g. the lever.
// NOTE: positions/scales for the 7 new sub-parts are first-guess and meant to be
// tuned live on localhost. Nudge these numbers and re-check; nothing else changes.
const MESHES = [
  { id: "valve", url: "/valve_bv.glb", color: COL.valve, recenter: false, position: [0.0, 0.0, 0.0], rotation: [0.0, 0.0, 0.0], scale: 1.0, insert: [0.0, -0.2, 0.0], showFrom: 1 },
  { id: "lever", url: "/lever_bv.glb", color: COL.lever, recenter: false, position: [0.0, 0.0, 0.0], rotation: [0.0, 0.0, 0.0], scale: 1.0, insert: [0.08, 0.22, 0.0], showFrom: 1, hideFrom: 2 },
  { id: "bracket", url: "/bracket.glb", color: COL.bracket, position: [-0.0, 0.1491, 0.022], rotation: [90.0, 0.0, -180.0], scale: 0.73, insert: [0.0, 0.18, 0.0], showFrom: 3 },
  { id: "coupling", url: "/coupling.glb", color: COL.coupling, position: [0.0, 0.1035, 0.0], rotation: [0.0, 90.0, 0.0], scale: 1.0, insert: [0.0, 0.12, 0.0], showFrom: 4 },
  { id: "actuator", url: "/actuator.glb", color: COL.actuator, position: [0.0, 0.17, 0.0], rotation: [0.0, 90.0, 0.0], scale: 0.55, insert: [0.0, 0.3, 0.0], showFrom: 5 },
  { id: "cap", url: "/cap.glb", color: COL.cap, position: [0.0, 0.255, 0.0], rotation: [0.0, 90.0, 0.0], scale: 0.8, insert: [0.0, 0.12, 0.0], showFrom: 5, hideFrom: 6 },
  { id: "lsb", url: "/lsb.glb", color: COL.lsb, position: [-0.0, 0.33, 0.05], rotation: [-90.0, 0.0, -1.0], scale: 0.85, insert: [0.0, 0.22, 0.0], showFrom: 6,
    extras: [{ url: "/lsbmount.glb", color: COL.lsbmount, position: [0.0, 0.258, 0.0], rotation: [0.0, 90.0, 0.0], scale: 1.0, insert: [0.0, 0.22, 0.0] }] },
  { id: "afr", url: "/afr.glb", color: COL.afr, position: [0.05, 0.21, -0.04], rotation: [-180.0, 0.0, 180.0], scale: 0.49, insert: [0.28, 0.0, 0.0], showFrom: 7 },
  { id: "gauge", url: "/gauge.glb", color: COL.gauge, position: [0.075, 0.255, 0.01], rotation: [90.0, 0.0, 0.0], scale: 0.7, insert: [0.0, 0.1, 0.0], showFrom: 8 },
  { id: "lplate", url: "/lplate.glb", color: COL.lplate, position: [0.045, 0.2, -0.02], rotation: [0.0, 90.0, 0.0], scale: 0.7, insert: [0.12, 0.0, 0.0], showFrom: 7 },
  { id: "namurplate", url: "/namurplate.glb", color: COL.namurplate, position: [0.0, 0.23, -0.02], rotation: [90.0, 90.0, 0.0], scale: 0.6, insert: [0.0, 0.0, -0.15], showFrom: 9 },
  { id: "sov", url: "/sov.glb", color: COL.sov, position: [0.0, 0.23, -0.05], rotation: [180.0, -90.0, 0.0], scale: 0.46, insert: [0.0, 0.0, -0.22], showFrom: 10 },
  { id: "airpipe", url: "/airpipe.glb", color: COL.airpipe, position: [0.03, 0.2, -0.03], rotation: [0.0, 0.0, 0.0], scale: 0.55, insert: [0.0, 0.1, 0.0], showFrom: 13 },
  { id: "boltset", url: "/boltset.glb", color: COL.boltset, position: [0.03, 0.135, 0.0], rotation: [0.0, 90.0, 0.0], scale: 0.8, insert: [0.0, 0.08, 0.0], showFrom: 15 },
];

// -------- GOLDEN STEP LIST (Config 1) --------
// Every step from docs/golden-steplist-config01.md. All fastener sizes / torque = placeholder.
const GOLDEN_STEPS = [
  { code: "A1", type: "3D",        title: "Check open/close; clamp valve in vice",                               tool: "Bench vice",       torque: "—",              checks: ["Valve cycles freely", "Clamped square, bore horizontal", "Flanges to the line"] },
  { code: "A2", type: "3D remove", title: "Remove lever handle + nameplate; refit stem nut",                     tool: "Ring spanner",     torque: "—",              checks: ["Keep nameplate for tagging", "Note ball position (closed)"] },
  { code: "A3", type: "3D",        title: "Fit mounting bracket over stem onto stop-plate ears",                 tool: "Allen key 5 mm",   torque: "~10 Nm",         checks: ["Bracket flat, no rock", "ISO 5211 pattern up", "2x M6 socket-head screws"] },
  { code: "A4", type: "3D",        title: "Drop drive coupling / adapter onto stem",                             tool: "Hand",             torque: "—",              checks: ["Coupling seated on stem flats", "Square tang up"] },
  { code: "B1", type: "3D remove", title: "Remove actuator top cap / position indicator; wipe clean",            tool: "Screwdriver",      torque: "—",              checks: ["NAMUR pinion drive exposed"] },
  { code: "B2", type: "3D",        title: "Fit limit-switch box (integral bracket) onto actuator top; engage shaft", tool: "Hand + spanner", torque: "~5 Nm",       checks: ["Shaft engaged in pinion BEFORE nuts pulled", "Integral bracket square on actuator top", "4x bolts/studs"] },
  { code: "C2", type: "3D",        title: "Bolt AFR body to its L-plate",                                        tool: "Spanner",          torque: "~6 Nm",          checks: ["Bowl points down", "Slots vertical for height adjust", "2x M5 nuts/bolts"] },
  { code: "C1", type: "3D",        title: "Thread dial gauge into the AFR gauge port",                           tool: "Hand",             torque: "—",              checks: ["PTFE on thread", "Gauge readable from front"] },
  { code: "D2", type: "3D",        title: "Fit rubber NAMUR plate + 2 O-rings on the actuator NAMUR face",        tool: "Hand",             torque: "—",              checks: ["O-rings seated", "Protective film peeled"] },
  { code: "D1", type: "3D",        title: "Fit SOV over the NAMUR plate; select 3/2 or 5/2; set the O-ring gate", tool: "—",                torque: "—",              checks: ["Gate matches ordered function"] },
  { code: "E1", type: "Combine",   title: "Bolt the AFR L-plate to the actuator side face",                     tool: "Open-end spanner", torque: "~8 Nm",          checks: ["Plate square", "AFR height set so tube run lines up", "2x M6 hex"] },
  { code: "F1", type: "Combine",   title: "Bolt SOV to actuator NAMUR face; blank all air holes except middle (supply); fit silencer", tool: "Ball-end Allen key", torque: "~6 Nm", checks: ["O-rings compressed evenly", "Supply hole open; exhaust clear", "2x M5 long Allen bolts"] },
  { code: "G1", type: "3D",        title: "Fit bent pipe from AFR out to SOV middle (supply) hole",              tool: "Open-end spanner", torque: "—",              checks: ["Pipe geometry matches AFR height", "Nuts not cross-threaded", "1/4 connectors + PTFE"] },
  { code: "H1", type: "Combine",   title: "Lower the dressed actuator as ONE unit onto the bracket; engage stem-to-pinion", tool: "Hand", torque: "—",           checks: ["Coupling tang aligned to pinion (never force)", "Fail-action orientation correct"] },
  { code: "H2", type: "3D",        title: "Final bolt-up: actuator base to bracket, then bracket-to-valve",      tool: "Allen key + spanner", torque: "Base ~20 Nm · valve ~10 Nm", checks: ["Cross-tighten base", "Actuator square before final torque", "4x M6 base + 2x M6 valve"] },
  { code: "H3", type: "3D",        title: "Re-tie nameplate tag; fit air-supply fitting; set regulator to 4 bar", tool: "Wire; hand",      torque: "—",              checks: ["Spec tag on unit", "Supply fitting PTFE-taped", "AFR set 4 bar"] },
  { code: "T1", type: "Test",      title: "Stroke / end-stop set",                                               tool: "—",                torque: "—",              checks: ["Round 2 — not built now"] },
  { code: "T2", type: "Test",      title: "LSB cam set (open / closed)",                                         tool: "—",                torque: "—",              checks: ["Round 2 — not built now"] },
  { code: "T3", type: "Test",      title: "Function test: 24 VDC, cycle, no leaks",                              tool: "—",                torque: "—",              checks: ["Round 2 — not built now"] },
  { code: "T4", type: "Test",      title: "Body hydro 30 bar (ISO 5208)",                                        tool: "—",                torque: "—",              checks: ["Round 2 — not built now"] },
  { code: "T5", type: "Test",      title: "Seat leakage 6 bar",                                                  tool: "—",                torque: "—",              checks: ["Round 2 — not built now"] },
  { code: "T6", type: "Test",      title: "Final QC",                                                            tool: "—",                torque: "—",              checks: ["Round 2 — not built now"] },
];

// Config 2 replays the same golden sequence with its own, safety-relevant content:
// fail-to-CLOSE, 40 mm valve, RNP80 actuator, and NO Config 1 torque values on the
// 40 mm build (they differ and are unconfirmed - OQ-16/17).
function toConfig2(steps) {
  return steps.map((s) => {
    const t = { ...s, checks: [...s.checks] };
    if (/Nm/.test(t.torque)) t.torque = "— (TBC)";
    switch (s.code) {
      case "A1":
        t.title = "Check open/close; clamp valve in vice (40 mm)";
        break;
      case "B1":
        t.title = "Remove RNP80 actuator top cap / indicator; wipe clean";
        break;
      case "H1":
        t.title = "Lower the dressed RNP80 actuator onto the bracket; engage pinion";
        t.checks = t.checks.map((x) => x.replace("Fail-action orientation correct", "FAIL-TO-CLOSE orientation correct"));
        break;
      case "H3":
        t.title = "Re-tie nameplate tag; fit air-supply fitting; set regulator";
        t.checks = t.checks.map((x) => x.replace("AFR set 4 bar", "AFR set within 4-6.5 bar"));
        break;
      default:
        break;
    }
    return t;
  });
}

const CONFIGS = {
  config01: {
    code: "BV1121-PA1019-TP0026-PN00",
    label: "Config 1 · 15 mm · fail-to-close",
    target: [0, 0.18, 0],
    camera: [0.34, 0.28, 0.55],
    meshes: MESHES,
    steps: GOLDEN_STEPS,
  },
  config02: {
    code: "BV1124-PA1025-TP0026-CL00",
    label: "Config 2 · 40 mm · fail-to-close",
    target: [0, 0.18, 0],
    camera: [0.34, 0.28, 0.55],
    meshes: MESHES,
    steps: toConfig2(GOLDEN_STEPS),
  },
};

const D2R = Math.PI / 180;

function Part({ url, color, position, rotation, scale, insert, revealed, recenter }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const t = useRef(0); // 0 = flown out / hidden, 1 = fully placed

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.material = new THREE.MeshStandardMaterial({
          color: color || "#8b949e",
          metalness: 0.35,
          roughness: 0.4,
        });
      }
    });
    if (recenter !== false) {
      const box = new THREE.Box3().setFromObject(clone);
      const c = box.getCenter(new THREE.Vector3());
      clone.position.set(-c.x, -box.min.y, -c.z);
    }
    const g = new THREE.Group();
    g.add(clone);
    return g;
  }, [scene, color, recenter]);

  useFrame((_, dt) => {
    const target = revealed ? 1 : 0;
    t.current = THREE.MathUtils.damp(t.current, target, 6, dt);
    if (ref.current) {
      ref.current.visible = t.current > 0.002;
      const k = 1 - t.current; // how far along the insertion offset it still is
      ref.current.position.set(
        position[0] + insert[0] * k,
        position[1] + insert[1] * k,
        position[2] + insert[2] * k
      );
    }
  });

  return (
    <primitive
      ref={ref}
      object={model}
      rotation={[rotation[0] * D2R, rotation[1] * D2R, rotation[2] * D2R]}
      scale={scale}
    />
  );
}

function meshActive(m, step) {
  return step >= m.showFrom && step < (m.hideFrom || Infinity);
}

function Scene({ items, step, target }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 8, 5]} intensity={2.3} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-6, 3, -4]} intensity={0.7} />
      <directionalLight position={[0, 2, -6]} intensity={0.9} />
      <Suspense fallback={null}>
        {items.map((it) => (
          <Part key={it.id} url={it.url} color={it.color} recenter={it.recenter}
            position={it.position} rotation={it.rotation} scale={it.scale} insert={it.insert || [0, 0, 0]}
            revealed={meshActive(it, step)} />
        ))}
      </Suspense>
      <Suspense fallback={null}><Environment preset="warehouse" /></Suspense>
      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={0.9} blur={2.5} far={0.6} />
      <OrbitControls makeDefault target={target} />
    </>
  );
}

// ---- live layout editor ----
const r4 = (n) => Math.round(n * 10000) / 10000;
const r2 = (n) => Math.round(n * 100) / 100;
const r3 = (n) => Math.round(n * 1000) / 1000;

// Baked layout defaults per config (filled from the editor's "Lock all + copy").
// Browser edits (localStorage) override these; this is the durable repo copy.
const DEFAULT_TF = {
  // config02: { valve: { position:[...], rotation:[...], scale:1 }, ... }
};
function loadOverrides() {
  try { return { ...DEFAULT_TF, ...JSON.parse(localStorage.getItem("valveos_tf") || "{}") }; } catch (e) { return { ...DEFAULT_TF }; }
}
const DEFAULT_ADDL = {
  // config02: [ { id, url, color, showFrom, position, rotation, scale }, ... ]
};
function loadAddl() {
  try { return { ...DEFAULT_ADDL, ...JSON.parse(localStorage.getItem("valveos_addl") || "{}") }; } catch (e) { return { ...DEFAULT_ADDL }; }
}
function buildItems(meshes, ov, addl) {
  const items = [];
  meshes.forEach((m) => {
    const t = ov[m.id] || {};
    items.push({ id: m.id, url: m.url, color: m.color, recenter: m.recenter, insert: m.insert, showFrom: m.showFrom, hideFrom: m.hideFrom, removable: false, position: t.position || m.position, rotation: t.rotation || m.rotation, scale: t.scale ?? m.scale });
    (m.extras || []).forEach((e, j) => {
      const id = m.id + "__x" + j; const et = ov[id] || {};
      items.push({ id, url: e.url, color: e.color, recenter: e.recenter, insert: e.insert, showFrom: m.showFrom, hideFrom: m.hideFrom, removable: false, position: et.position || e.position, rotation: et.rotation || e.rotation, scale: et.scale ?? e.scale });
    });
  });
  (addl || []).forEach((a) => {
    const t = ov[a.id] || {};
    items.push({ id: a.id, url: a.url, color: a.color, recenter: a.recenter, insert: a.insert || [0, 0, 0], showFrom: a.showFrom, hideFrom: a.hideFrom, removable: true, position: t.position || a.position, rotation: t.rotation || a.rotation, scale: t.scale ?? a.scale });
  });
  return items;
}
function useClonedModel(url, color, recenter) {
  const { scene } = useGLTF(url);
  return useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.material = new THREE.MeshStandardMaterial({ color: color || "#8b949e", metalness: 0.35, roughness: 0.4 }); }
    });
    if (recenter !== false) { const box = new THREE.Box3().setFromObject(clone); const c = box.getCenter(new THREE.Vector3()); clone.position.set(-c.x, -box.min.y, -c.z); }
    const g = new THREE.Group(); g.add(clone); return g;
  }, [scene, color, recenter]);
}
function EditPart({ item, selected, mode, onSelect, setPos, setRot, setScale, onDrag }) {
  const model = useClonedModel(item.url, item.color, item.recenter);
  const { camera } = useThree();
  const st = useRef({ on: false, sx: 0, sy: 0, rot0: [0, 0, 0], sc0: 1, plane: new THREE.Plane(), off: new THREE.Vector3(), hit: new THREE.Vector3() });
  const active = mode === "grab" || selected;
  function here() { return new THREE.Vector3(item.position[0], item.position[1], item.position[2]); }
  function down(e) {
    e.stopPropagation();
    onSelect(item.id);
    if (!active) return;
    const st0 = st.current;
    st0.on = true; onDrag(true);
    st0.sx = e.nativeEvent.clientX; st0.sy = e.nativeEvent.clientY;
    st0.rot0 = [item.rotation[0], item.rotation[1], item.rotation[2]]; st0.sc0 = item.scale;
    const n = camera.getWorldDirection(new THREE.Vector3());
    st0.plane.setFromNormalAndCoplanarPoint(n, here());
    if (e.ray.intersectPlane(st0.plane, st0.hit)) st0.off.copy(st0.hit).sub(here());
    try { e.target.setPointerCapture(e.pointerId); } catch (x) {}
  }
  function move(e) {
    const st0 = st.current;
    if (!st0.on) return;
    const dx = e.nativeEvent.clientX - st0.sx;
    const dy = e.nativeEvent.clientY - st0.sy;
    if (mode === "rotate") {
      setRot(item.id, [r2(st0.rot0[0] + dy * 0.6), r2(st0.rot0[1] + dx * 0.6), r2(st0.rot0[2])]);
    } else if (mode === "scale") {
      setScale(item.id, r3(Math.max(0.02, st0.sc0 * (1 - dy * 0.005))));
    } else {
      if (e.ray.intersectPlane(st0.plane, st0.hit)) {
        const p = st0.hit.clone().sub(st0.off);
        setPos(item.id, [r4(p.x), r4(p.y), r4(p.z)]);
      }
    }
  }
  function up(e) { if (st.current.on) { st.current.on = false; onDrag(false); try { e.target.releasePointerCapture(e.pointerId); } catch (x) {} } }
  return (
    <group
      position={item.position}
      rotation={[item.rotation[0] * D2R, item.rotation[1] * D2R, item.rotation[2] * D2R]}
      scale={item.scale}
      onPointerDown={down} onPointerMove={move} onPointerUp={up}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = active ? "grab" : "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "auto"; }}>
      <primitive object={model} />
    </group>
  );
}

function EditScene({ items, target, selected, setSelected, mode, setPos, setRot, setScale }) {
  const [dragging, setDragging] = useState(false);
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 5]} intensity={2.3} castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-6, 3, -4]} intensity={0.7} />
      <directionalLight position={[0, 2, -6]} intensity={0.9} />
      <Suspense fallback={null}>
        {items.map((it) => (
          <EditPart key={it.id} item={it} selected={it.id === selected} mode={mode}
            onSelect={setSelected} setPos={setPos} setRot={setRot} setScale={setScale} onDrag={setDragging} />
        ))}
      </Suspense>
      <Suspense fallback={null}><Environment preset="warehouse" /></Suspense>
      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={0.9} blur={2.5} far={0.6} />
      <OrbitControls makeDefault enabled={!dragging} target={target} />
    </>
  );
}

function EditorPanel({ items, selected, setSelected, mode, setMode, lockAndCopy, resetAll, label, addCopy, deleteSel }) {
  const modes = [["grab", "Move"], ["rotate", "Rotate"], ["scale", "Scale"]];
  const sel = items.find((i) => i.id === selected);
  const canDelete = sel && sel.removable;
  return (
    <div style={panelStyle}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#7ea2ff", marginBottom: 2 }}>EDIT LAYOUT</div>
      <div style={{ fontSize: 10, opacity: 0.5, marginBottom: 12 }}>{label}</div>
      <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 6 }}>Component</div>
      <select value={selected || ""} onChange={(e) => setSelected(e.target.value || null)} style={selectStyle}>
        <option value="">— pick a part —</option>
        {items.map((it) => (<option key={it.id} value={it.id}>{it.id}</option>))}
      </select>
      <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
        {modes.map(([mo, lab]) => (
          <button key={mo} onClick={() => setMode(mo)} style={{ ...miniBtn, ...(mode === mo ? segActive : {}) }}>{lab}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <button onClick={addCopy} disabled={!selected} style={{ ...miniBtn, opacity: selected ? 1 : 0.4 }}>+ Add copy</button>
        <button onClick={deleteSel} disabled={!canDelete} style={{ ...miniBtn, opacity: canDelete ? 1 : 0.4, color: canDelete ? "#ff9b9b" : "#e8ecf1" }}>Delete</button>
      </div>
      <div style={{ fontSize: 11, opacity: 0.55, marginTop: 12, lineHeight: 1.5 }}>
        <b>Move / Rotate / Scale</b>: drag the selected part. <b>Add copy</b> duplicates it (one bolt into four) - drag each copy into place. <b>Delete</b> removes a copy. Orbit on empty space. Per-config.
      </div>
      <button onClick={lockAndCopy} style={{ ...btn, width: "100%", padding: "12px 0", marginTop: 14, fontSize: 15, background: "#2f9e57" }}>Lock all + copy</button>
      <button onClick={resetAll} style={{ ...miniBtn, width: "100%", marginTop: 8 }}>Reset all edits</button>
    </div>
  );
}

const TYPE_COLOR = {
  "3D": "#2f6fed",
  "3D remove": "#c9722f",
  Info: "#6b7686",
  Combine: "#8a5cf6",
  Test: "#3f9668",
};

export default function App() {
  const [configKey, setConfigKey] = useState("config01");
  const [step, setStep] = useState(1); // 1-based golden step number
  const [edit, setEdit] = useState(false);
  const [mode, setMode] = useState("grab");
  const [selected, setSelected] = useState(null);
  const [ovAll, setOvAll] = useState(loadOverrides);
  const [addlAll, setAddlAll] = useState(loadAddl);
  const [toast, setToast] = useState("");

  const config = CONFIGS[configKey];
  const ov = ovAll[configKey] || {};
  const addl = addlAll[configKey] || [];
  const steps = config.steps;
  const total = steps.length;
  const current = steps[step - 1];
  const items = useMemo(() => buildItems(config.meshes, ov, addl), [config, ov, addl]);

  useEffect(() => { try { localStorage.setItem("valveos_tf", JSON.stringify(ovAll)); } catch (e) {} }, [ovAll]);
  useEffect(() => { try { localStorage.setItem("valveos_addl", JSON.stringify(addlAll)); } catch (e) {} }, [addlAll]);

  function pickConfig(k) { setConfigKey(k); setStep(1); setSelected(null); }
  function onChange(id, obj) {
    if (!obj) return;
    const p = obj.position, r = obj.rotation, sc = obj.scale;
    setOvAll((prev) => ({ ...prev, [configKey]: { ...(prev[configKey] || {}), [id]: { position: [r4(p.x), r4(p.y), r4(p.z)], rotation: [r2(r.x / D2R), r2(r.y / D2R), r2(r.z / D2R)], scale: r3(sc.x) } } }));
  }
  function setPos(id, pos) {
    setOvAll((prev) => { const c = prev[configKey] || {}; return { ...prev, [configKey]: { ...c, [id]: { ...(c[id] || {}), position: pos } } }; });
  }
  function setRot(id, rot) {
    setOvAll((prev) => { const c = prev[configKey] || {}; return { ...prev, [configKey]: { ...c, [id]: { ...(c[id] || {}), rotation: rot } } }; });
  }
  function setScale(id, sc) {
    setOvAll((prev) => { const c = prev[configKey] || {}; return { ...prev, [configKey]: { ...c, [id]: { ...(c[id] || {}), scale: sc } } }; });
  }
  function addCopy() {
    const src = items.find((i) => i.id === selected);
    if (!src) return;
    const id = src.id.split("#")[0] + "#" + Date.now().toString(36);
    const inst = { id, url: src.url, color: src.color, recenter: src.recenter, insert: src.insert || [0, 0, 0], showFrom: src.showFrom, hideFrom: src.hideFrom, position: [r4(src.position[0] + 0.03), src.position[1], r4(src.position[2] + 0.03)], rotation: [src.rotation[0], src.rotation[1], src.rotation[2]], scale: src.scale };
    setAddlAll((prev) => ({ ...prev, [configKey]: [...(prev[configKey] || []), inst] }));
    setSelected(id);
  }
  function deleteSel() {
    if (!selected) return;
    setAddlAll((prev) => ({ ...prev, [configKey]: (prev[configKey] || []).filter((a) => a.id !== selected) }));
    setOvAll((prev) => { const c = { ...(prev[configKey] || {}) }; delete c[selected]; return { ...prev, [configKey]: c }; });
    setSelected(null);
  }
  function lockAndCopy() {
    const snippet = JSON.stringify({ config: configKey, tf: ov, addl: addl }, null, 2);
    try { navigator.clipboard.writeText(snippet); } catch (e) {}
    console.log(snippet);
    setEdit(false); setSelected(null);
    setToast("Locked. Layout + added copies copied to clipboard and logged to the console.");
    setTimeout(() => setToast(""), 4500);
  }
  function resetAll() { setOvAll((prev) => ({ ...prev, [configKey]: {} })); setAddlAll((prev) => ({ ...prev, [configKey]: [] })); setSelected(null); }

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#20242b", position: "relative" }}>
      <Canvas key={configKey} shadows camera={{ position: config.camera, fov: 45 }} onPointerMissed={() => edit && setSelected(null)}>
        {edit
          ? <EditScene items={items} target={config.target} selected={selected} setSelected={setSelected} mode={mode} setPos={setPos} setRot={setRot} setScale={setScale} />
          : <Scene items={items} step={step} target={config.target} />}
      </Canvas>

      {/* --- config switcher + edit toggle --- */}
      <div style={switcherStyle}>
        {Object.entries(CONFIGS).map(([k, c]) => (
          <button key={k} style={{ ...segBtn, ...(k === configKey ? segActive : {}) }} onClick={() => pickConfig(k)}>
            {c.label.split(" · ")[0]}
          </button>
        ))}
        <button style={{ ...segBtn, ...(edit ? segActive : {}), borderLeft: "1px solid rgba(255,255,255,0.12)" }} onClick={() => { setEdit((e) => !e); setSelected(null); }}>
          {edit ? "Done" : "Edit"}
        </button>
      </div>

      {edit ? (
        <EditorPanel items={items} selected={selected} setSelected={setSelected} mode={mode} setMode={setMode} lockAndCopy={lockAndCopy} resetAll={resetAll} label={config.label} addCopy={addCopy} deleteSel={deleteSel} />
      ) : (
        <>
          {/* --- step info panel --- */}
          <div style={panelStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#7ea2ff" }}>{config.label}</div>
            <div style={{ fontSize: 10, letterSpacing: 0.5, opacity: 0.45, marginBottom: 12 }}>{config.code}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 13, letterSpacing: 1, opacity: 0.6 }}>STEP {step} / {total}</span>
              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.85 }}>{current.code}</span>
              <span style={{ ...badge, background: TYPE_COLOR[current.type] || "#6b7686" }}>{current.type}</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, margin: "8px 0 14px", lineHeight: 1.25 }}>{current.title}</div>
            <Row label="Tool" value={current.tool} />
            <Row label="Torque" value={current.torque} />
            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>CHECKS</div>
            <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
              {current.checks.map((c) => (<li key={c} style={{ marginBottom: 4 }}>{c}</li>))}
            </ul>
          </div>

          {/* --- prev / next --- */}
          <div style={controlsStyle}>
            <button style={{ ...btn, opacity: step <= 1 ? 0.35 : 1 }} onClick={() => setStep((sv) => Math.max(1, sv - 1))} disabled={step <= 1}>&lsaquo; Prev</button>
            <button style={{ ...btn, opacity: step >= total ? 0.35 : 1 }} onClick={() => setStep((sv) => Math.min(total, sv + 1))} disabled={step >= total}>Next &rsaquo;</button>
          </div>
        </>
      )}

      {toast && <div style={toastStyle}>{toast}</div>}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <span style={{ opacity: 0.6 }}>{label}</span>
      <span style={{ fontWeight: 500, textAlign: "right", maxWidth: 200 }}>{value}</span>
    </div>
  );
}

const panelStyle = {
  position: "absolute", top: 24, left: 24, width: 320, padding: "18px 20px",
  background: "rgba(20,24,30,0.82)", color: "#e8ecf1", borderRadius: 12,
  fontFamily: "system-ui, sans-serif", backdropFilter: "blur(6px)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const badge = {
  fontSize: 10, fontWeight: 700, color: "#fff", padding: "2px 7px",
  borderRadius: 6, textTransform: "uppercase", letterSpacing: 0.5,
};

const switcherStyle = {
  position: "absolute", top: 24, right: 24, display: "flex",
  background: "rgba(20,24,30,0.82)", borderRadius: 10, overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(6px)",
  fontFamily: "system-ui, sans-serif",
};

const segBtn = {
  padding: "10px 16px", fontSize: 13, fontWeight: 600, color: "#e8ecf1",
  background: "transparent", border: "none", cursor: "pointer",
};

const segActive = { background: "#2f6fed", color: "#fff" };

const controlsStyle = {
  position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
  display: "flex", gap: 14,
};

const btn = {
  padding: "14px 30px", fontSize: 18, fontWeight: 600, color: "#fff",
  background: "#2f6fed", border: "none", borderRadius: 10, cursor: "pointer",
  fontFamily: "system-ui, sans-serif",
};

const selectStyle = { width: "100%", padding: "8px", borderRadius: 8, background: "#141820", color: "#e8ecf1", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "system-ui, sans-serif", fontSize: 13 };

const miniBtn = { flex: 1, padding: "8px 6px", fontSize: 12, fontWeight: 600, color: "#e8ecf1", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, cursor: "pointer" };

const toastStyle = { position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", background: "rgba(20,24,30,0.95)", color: "#cfefda", padding: "12px 20px", borderRadius: 10, fontFamily: "system-ui, sans-serif", fontSize: 13, border: "1px solid rgba(255,255,255,0.12)", maxWidth: 440, textAlign: "center" };

MESHES.forEach((m) => {
  useGLTF.preload(m.url);
  (m.extras || []).forEach((e) => useGLTF.preload(e.url));
});
