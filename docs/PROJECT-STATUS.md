# ValveOS — project status & handoff (read this first)

_Last updated: 2026-07-17. Single source of truth for any new chat._

## 2026-07-20 — Positioning, ICP & solution framing (business brainstorm)

**Company shape (settled).** ValveOS is a software company. Rajdeep is customer zero, test lab, and case study, not the product. We are not building a software-enabled VAC. The up-market target is component OEMs (valve, actuator, gearbox, pump makers) whose larger, variant-heavy lines are the real prize. VAC is the entry point purely because of immediate floor and technician access.

**Product primitive (settled).** The atomic unit is a part-with-an-interface, not a step and not a config. The parts-knowledge DB (Section 11) is the mechanism and the moat. The automated work instruction is the output customers see and pay for. Instructions are generated from part-level knowledge, not authored per config: fix a torque once on the part, every config using it corrects. A viewer-only competitor can match one config's output. They cannot match that our tenth config is nearly free.

**Tech thesis (sharpened).** Valve automation is a configuration business with known, repeating sequences. Template-replay substitutes for Dirac's auto-sequencing. We skip exactly one subsystem (geometric auto-sequencing), and only because the domain is repetitive. Everything else Dirac does (3D viewer, knowledge pinned to geometry, auto-apply-on-reappear flywheel, operator floor view, feedback-to-engineering loop) we build. Same product vision, one subsystem dropped.
- Up-market scaling answer: parametric family templates. Author a product family's assembly logic once; size, spring, and trim variants inherit via parameter sets that resolve through the knowledge hierarchy. Collapses authoring from roughly one-per-variant to one-per-family (e.g. 300 variants to ~20 templates). This is not information generation. It is authoring-cost collapse plus consistency enforcement.
- Auto-sequencing stays "not yet, not never." Genuinely needed only for true NPI / first-article (novel design, no parent template): a minority of OEM volume, Dirac's turf, not chased early. Defensible line at any scale: we own repeat and variant production via template inheritance; we do not chase novel-NPI sequencing.

**What we actually sell (two paid outcomes, not five features).**
1. Get a build done right by someone who isn't an expert: onboarding and ramp time, variant-changeover error, QC rejects and rework.
2. Prove it was done right: serial-tied traceability.
The 3D animation is the delivery mechanism, not the thing paid for. Changeover value is specifically provable SOP adherence: we replace the fragile laminated SOP with a live, enforced, logged one. (Initial skepticism on changeover was that seasoned operators plus SOPs already prevent errors; the reframe is that the SOP is the thing we are replacing, and its adherence today is unprovable.)

**ICP (defined).** High-mix, configure- or engineer-to-order Indian assembler; medium-to-low volume per variant; wrong build is expensive (field failure, safety, scrapped shipment); dependent on scarce senior tribal knowledge; ideally selling into export or regulated end-markets (oil & gas, pharma, power). Master variable is mix times consequence-of-error, not volume. Rajdeep is a true small instance of this ICP: "we are our own ICP."
- Tier 1 (bullseye): flow control / valve automation & instrumentation; fluid-power and pneumatic/hydraulic skid builders; instrumentation and analyzer-panel builders.
- Tier 2 (strong, larger, slower): actuator and gearbox OEMs (the parametric-template case); pump and compressor package builders; MCC / control-panel / switchgear (knowledge-resolution core applies, less 3D-mechanical).
- Anti-ICP (walk away): high-volume-low-mix producers; low-consequence consumer assembly. 3D instructions there are a vitamin.

**SISP guardrail.** Do not sell 3D instructions on stable, expert-run, error-cheap lines. Painkillers live at the edges: onboarding, changeover, rework, traceability. If a prospect's line is fine, walk, no matter the logo.

**Why now (macro).** Export pressure imposes traceability that domestic sales never did. Labor churn and wage inflation make the "runs on two senior guys" model visibly fragile. Both push our two outcomes from vitamin toward painkiller. We arrive as the pain sharpens; we do not manufacture it.

**Validation (in flight).** ICP fit scorecard built (`valveos-icp-scorecard.html`: weighted gauge, SISP gate, unscored reality-check). Next actions: score Rajdeep plus 2 to 3 Tier-1 names; ask each owner where quality cost and onboarding cost actually land; confirm ICP or re-skew toward the export/regulated axis.

2026-07-17. Single source of truth for any new chat._

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


## Priorities & backlog — updated 2026-07-17 (current plan)

### Recent progress (through Config 2) — treat as the current baseline
- Config 2 (40 mm, fail-to-close) plays in the 3D tool via template replay (`toConfig2` off the golden sequence). Distinct partIds `valve40` / `actuator80` so a 40 mm build never inherits 15 mm specs. Recipe: `data/config02.json`.
- Live layout editor (Move / Rotate / Scale, per-config transforms, copy + persist) is in the app.
- Real STEP valve + lever teardown (A2 lifts the handle); full golden step list (A1..H3, T1..T6) with type badges; colour-coding per component.
- Fail-action corrected project-wide to FAIL-TO-CLOSE (Config 1) on 2026-07-16.
- Parts-knowledge DB is live and being populated from OEM datasheets. OEM-confirmed so far: actuator (Valmet) and valve (L&T) — pressures (8 barg max), spring SR40 = 4 bar, valve top ISO 5211 F03 (M5), actuator-to-bracket F05 (M6), 14 mm bi-square drive. Browser viewer: `data/parts-knowledge.html`. ~11 open questions remain (mostly torques + SOV/LSB/AFR specs).

### Critical path to the investor demo (priority order)
1. **Solidify Config 2 first.** Assign the per-config REAL valve (it is currently a DN100 lever stand-in), and ratify the Config 2 item code (BV1124-PA1025-TP0026 vs the stale filename). Lock Config 2 so it is demo-solid before adding breadth.
2. **Operator / tablet view** — big Next/Prev, check-off, readable on a shop tablet. This is an on-camera surface.
3. **Configurator front door** — dropdowns (valve / actuator / accessories) mapped to item sub-codes, loading the matching config. The "magic" moment.
4. **FLOOR SHOOT (time-boxed — protect it).** Baseline-time a real build, then film a junior technician building from the tablet, log time vs baseline. This footage + the before/after number is the pitch. Shoot it while floor access is comfortable, NOT in the final week.
5. **Investor assets** — floor footage, before/after (old PowerPoint/verbal vs animated 3D), metrics mirroring the Ancra/Spudnik arc.

### Backlog (worth doing, deferred until after the floor shoot)
- **UNIFY the manual and the 3D tool onto ONE generated source.** Today the Config 1 manual is a hand-made PDF (`docs/ValveOS-Config1-Assembly-Manual.pdf`) and the 3D tool is data-driven — two sources for the same instructions. Target: generate BOTH the 3D build and a printable/tablet manual from the golden steps + parts-knowledge, so any config produces both for free. Never hand-author a per-config manual. Build this AFTER the floor shoot.
- **Finish the datasheet pass** for the remaining Config 1 hero parts (Rotex 30318 SOV, Neles/KS2V LSB, Shavo SB10 AFR + Marsh gauge). Leave low-value open questions as placeholders; do not chase completeness.
- **Cloud backend (DB + API) only when earned** — i.e. when the floor tablet needs to WRITE data back (cycle times, sign-offs, serials) or multiple people edit live. Until then, JSON-in-repo + Vercel is correct. Migration later is a swap, not a rewrite (same schema into Postgres JSONB / a document store).
- **Resolve OQ-15** — Config 1 and Config 2 are both fail-to-close now, so the "opposite" contrast is broken; decide whether Config 2 flips to fail-open or the framing is dropped.

### Config 3 (future)
Gearboxes + MORs (Q-Tork). Datasheet parked at `docs/Datasheets/QTork Technical Handbook.pdf`; extract part records only once Config 3's BOM is defined.
