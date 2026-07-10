# ValveOS — project status & handoff (read this first)

_Last updated: 2026-07-10. Single source of truth for any new chat._

## One-liner
A working browser 3D assembly viewer for valve automation. It plays an animated,
step-by-step build of a valve package and shows per-step work-instruction data
(tool, torque, checks). Built as the MVP for the Dirac x VAC investor demo.

## What is built and working
- A **Vite + React + three.js** app at `ValveOS/app`.
- An **8-step animated assembly player** for config **BV1121** (15 mm valve package):
  valve → bracket → drive coupling → actuator → SOV → AFR → switch-box mounting → limit switch box.
- **Prev / Next** buttons, a step **info card** (step title, part, tool, torque, checks), orbit/zoom.
- Each part not yet reached is hidden; the active part **slides into place** along an insertion axis.
- All content is currently **placeholder** except the geometry and order.

## How to run it
```
cd "ValveOS/app"
npm run dev          # then open http://localhost:5173
```
Leave that terminal running (it is the dev server). Use a second tab for git.

## Live site (Vercel) — MASTER LINK
**https://valveos-mvp.vercel.app/**  ← the deployed app; open on any device, no terminal needed.

Deploy the latest local version to it with:
```
cd "ValveOS/app"
vercel --prod
```
The URL is stable and always serves the last `vercel --prod` deploy. Vercel project name: `valveos`.
Routine: edit locally → check on localhost → `vercel --prod` to publish to the master link.

## Tech stack & key decisions
- Vite + React (JavaScript), three.js via @react-three/fiber + @react-three/drei.
- The whole scene is defined by the **`STEPS` array at the top of `app/src/App.jsx`**.
  Each entry: `{ id, url, position[x,y,z m], rotation[x,y,z deg], scale, insert[offset], title, tool, torque, checks[] }`.
- Parts are `.glb` files in **`ValveOS/app/public/`**. Units are **metres** (glTF standard).
- The **leva slider panel was removed** on purpose — positions are now hard-baked in `STEPS`.
- Parts were made two ways:
  - Generic STEP files downloaded from TraceParts/GrabCAD, converted to `.glb` with **cascadio** (in the Linux sandbox).
  - Custom parts (bracket, coupling, switch-box mounting) **generated with trimesh** in the sandbox from drawing dims. Scripts in `ValveOS/scripts/`.
- Materials are repainted matte steel in code (the raw parts import black/metallic).

## Known gotchas
- After the laptop sleeps, the reflective environment can drop and the model looks dark/blue — just **reload the page**.
- Rotated parts pivot around their base, so a rotation can swing a part off-centre; counter it with a position offset (there are helper scripts to compute this).
- Commit to git at every working state (`ValveOS` is a git repo).

## File layout
```
ValveOS/
  app/                 the web app (app/src/App.jsx is the whole thing)
  app/public/*.glb     the 3D parts the app loads
  parts/, cad/         source 3D models
  raw/                 downloaded STEP files (gitignored)
  drawings/            source PDFs + reference photos of the real unit
  docs/                this file, the golden step list, supplier emails, pick-list
  scripts/             python part-generation / measurement helpers
```

## Config BV1121 — bill of materials
15 mm L&T L1RF1C valve · Valmet RNP50SR40 actuator (fail-to-open, spring return) ·
Rotex 30318 NAMUR SOV 24 VDC · Valmet KS2V limit switch box · Shavo SB10 AFR · BK1001 bracket + coupling.
(The 3D parts are generic stand-ins for the demo; real STEP files can be swapped in later.)

## Current phase: assembly flow
Draft golden step list is in `docs/assembly-flow-config01.md`. Arnav is writing the
**real, observed** assembly flow by watching one of his fitters build the unit, then handing it over.
Next work: refine that into the final step list, then wire it into the app —
replace placeholder tool/torque/checks with real values, add **Info/test steps** (instruction
cards with no new geometry, e.g. stroke test, hydro test, QC), and add a **reusable bolt + nut set**
placed at the bolted joints with torque callouts.

## Working style
- Start replies with "Arnav,". Be concise. No em-dashes or buzzwords in drafted emails.
- One small, testable step at a time; commit to git at each working state.
- Opus for general work; use Fable 5 for heavy analysis (e.g. reading drawings).
