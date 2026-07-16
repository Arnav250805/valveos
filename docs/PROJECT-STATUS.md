# ValveOS — project status & handoff (read this first)

_Last updated: 2026-07-14. Single source of truth for any new chat._

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
15 mm L&T L1RF1C valve · Valmet RNP50SR40 actuator (fail-to-close, spring return) ·
Rotex 30318 NAMUR SOV 24 VDC · Valmet KS2V limit switch box · Shavo SB10 AFR · BK1001 bracket + coupling.
(The 3D parts are generic stand-ins for the demo; real STEP files can be swapped in later.)

## Config BV1124 (Config 2) — bill of materials
40 mm L&T L1RF1C valve (BV1124) · Valmet RNP80SR40CA1GD actuator (PA1025, FAIL-TO-CLOSE) ·
Rotex 30318 NAMUR SOV 24 VDC (SV1007) · Valmet KS2V limit switch box (LB1002) ·
Shavo SB10 AFR (FR1001) · BK1001 bracket + coupling · SS304 tubing (TB1001).
Fail-action of Config 1 corrected to FAIL-TO-CLOSE on 2026-07-16; the 'OPPOSITE to Config 1' framing below now NEEDS REVIEW (Config 2 is also fail-to-close). Source drawings already in
repo: drawings/40mm-BV1121-PA1019-TP0191-CL00.pdf, drawings/RNP080DN00DA1GD.pdf (actuator).

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

## Parts-knowledge database (standing rule)
There is ONE canonical parts-knowledge database:
- machine source of truth: `ValveOS/data/parts-knowledge.json`
- read-by-eye viewer: `ValveOS/data/parts-knowledge.html` (open in a browser)

It stores engineering knowledge keyed to the PART (`partId` = the app's `STEPS` id;
Rajdeep sub-code stored as `itemSubCode`), NEVER to a step or a single manual. Configs
are thin recipes of partIds + which interfaces mate; they pull tool/torque/check content
from this database at render time.

Rules:
- Any chat that analyzes a new drawing, datasheet, config, or part must capture the reusable
  part-level facts (interfaces, tools, fasteners, checks, hookups, confirmed specs + source)
  into this database. Do not leave knowledge trapped in a chat or a config's step list.
  Reuse existing part records; never duplicate a part.
- Populate per part and per interface, not per assembly. Knowledge resolves most-specific-first:
  part -> relationship -> interfaceRule (ISO 5211 / NAMUR / VDI-VDE 3845) -> categoryDefault.
- SAFETY (absolute): never invent a torque, fastener size, or spec. Unconfirmed = `null`,
  confidence `placeholder`/`unknown`, and add it to `openQuestions`. A wrong torque on a
  pressure valve is a real hazard.
- The database is commanded from the dedicated parts-knowledge chat. Reconcile all edits there.
  End every session that touches it with: what changed + the current open-questions list.

Status 2026-07-14: Config 1 (BV1121-PA1019-TP0026-PN00) populated first pass. 8 parts, 5
relationships, interfaceRules + categoryDefaults seeded, 13 open questions (fastener sizes,
torques, ISO 5211 flange size, a few model/datasheet confirmations) awaiting fitter/OEM input.

Status 2026-07-14 (Config 2): ingested drawing 40mm-BV1121-PA1019-TP0191-CL00.pdf.
Config 2 = 40 mm L&T ball valve package, FAIL-TO-CLOSE, actuator Valmet RNP80SR40.
Two NEW parts added with their OWN partIds (kept distinct from Config 1 on purpose - a
40 mm valve must never inherit 15 mm specs): valve40 (BV1124) and actuator80 (PA1025).
Accessories reuse Config 1 knowledge (bracket/coupling BK1001, sov SV1007, afr FR1001,
lsbmount, lsb LB1002, tubing TB1001). Config recipe: data/config02.json. Query/friction
log: docs/config02-ingestion.md. Now 14 parts, 9 relationships, 18 open questions.
OPEN DECISION OQ-14: ratify official Config 2 item code (drawing body BV1124-PA1025-TP0026
vs stale filename BV1121-PA1019-TP0191). Not yet wired into the app (still single-config;
next step = config switcher + placeholder .glb for valve40 / actuator80).

## Update 2026-07-14 (evening) - real valve, full step list, live editor
- **Real STEP valve + lever removal.** Config's valve is now converted from a real STEP
  file (ball valve with lever). The lever was isolated geometrically (cascadio fused it
  into one mesh) and co-registered, so step A2 lifts the actual handle off. Assets:
  app/public/valve_bv.glb + lever_bv.glb. Conversion/split scripts run in the sandbox.
- **Full golden step list.** The player now shows every step from
  docs/golden-steplist-config01.md (A1..H3 + round-2 tests T1..T6), not the old 8, with a
  type badge (3D / 3D remove / Info / Combine / Test) per card. Steps C1/C2 and D1/D2 order
  corrected per Arnav.
- **Colour-coding.** Each major component has its own colour; sub-parts are a lighter
  shade of the same hue. New sub-part placeholder meshes: lever, cap, gauge, lplate,
  namurplate, airpipe, boltset (trimesh, in app/public + parts).
- **Upper assembly orientation** rigidly turned 90 deg so the actuator rack runs parallel
  to the valve bore; bracket + coupling auto-seated on the measured stem top.
- **LIVE LAYOUT EDITOR (new feature).** Top-right "Edit" toggle. Modes: Move (grab + drag),
  Rotate (drag to spin/tilt), Scale (drag to resize). Click a part or pick from the
  dropdown. "Lock all + copy" copies the full transform set to clipboard + console and
  persists to localStorage; "Reset all edits" reverts. Edits are PER-CONFIG (Config 2 has
  its own layout). Durable defaults bake into DEFAULT_TF in app/src/App.jsx.
- **Authoring aid:** an offline renderer (outputs/render_app.py etc.) reproduces the app's
  exact transform pipeline so layout can be verified without the browser.
- NOTE: Config's valve is currently the DN100 lever valve (stand-in to prove the mechanic);
  per-config real valves still to be assigned. Gauge/air-pipe placement approximate.

