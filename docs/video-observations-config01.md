# Video observations — Config BV1121 real assembly (Ball valve Assembly Flow.MOV)

**Source:** shop-floor video, 7 min 34 s, 4K 60 fps, filmed at the bench vice. Analysed silent (no audio).
**Extraction:** coarse pass at 1 frame / 4 s (full timeline), dense zoomed passes on every joint/label/gauge, then 2 s fine-grain passes on the fiddly stretches.
**Config:** BV1121-PA1019-TP0026-PN00, 15 mm L&T ball valve package, fail-to-close, spring return.

## Identified parts & markings (read off the video)

| Part | What the camera shows |
|------|----------------------|
| Bare valve BV1121 | "LTV" (L&T Valves) cast on body; blue L&T spec plate riveted to the lever handle (SIZE DN.., SEAL PTFE, CLASS.., BODY.., BALL SS, STEM.., S.No., CAT..); stainless stop-plate stack under the stem nut |
| Actuator PA1019 | Silver rack & pinion body, blue end caps embossed "CAUTION SPRING OR AIR PRESSURE"; green "QC PASSED WA8" sticker; yellow CAUTION label with the stroke-adjustment diagram; NAMUR pinion top with grey drive adapter; ships with a yellow/black plastic position indicator that gets removed; VDI/VDE 3845 tapped holes on top; twin G1/4 air ports + 4-hole NAMUR pattern on the side face |
| SOV SV1007 | ROTEX AUTOMATION LIMITED; body label P802000081, BATCH NO.A11670/25C0227, MFG 10/2025; base label S-241-QC-16-11, 11/2025; black NAMUR adapter plate with O-rings on the underside; slotted screw on the underside (override/exhaust — [confirm]); silver hex nipple/silencer fitted to side port; blue push-in elbow already on the coil-top port on the bench |
| LSB LB1002 | Black housing, "4R" cast on corner; chrome dome beacon showing CLOSED; red slotted plastic cable-entry plugs; QC PASSED sticker initialled "RA"; black formed-steel riser bracket; Valmet box on the bench |
| AFR FR1001 | Shavo; label "FILTER REGULATOR SB10-2G-M2-RGK-NBX…, 1/4" BSP, INSPECTED"; clear bowl w/ WARNING label, white filter element visible; black slotted L-mounting plate |
| Gauge | Shavo dual scale 0–150 psi / 0–10 kg/cm², black body; threads into AFR gauge port |
| Tubing | Pre-bent rigid SS ¼" tube (~180° bend) with compression nuts, AFR outlet → SOV; PTFE tape on threaded fittings; blue ¼" push-in fitting for the supply into the AFR inlet; blue PU tube is the shop air line |
| Fixture/tools seen | 150 mm bench vice (Aries Steel); 12-pt ring spanner, open-end spanners, long-arm Allen key, long ball-end Allen key, slotted screwdrivers (green handle), wire for the tag. **No torque wrench appears at any point** |

## Detailed step-by-step breakdown

### Step 1 — Clamp valve, remove lever handle (0:00–0:12, ~12 s)
Valve arrives with the lever handle still fitted. It is clamped in the bench vice by one flange, stem up, bore horizontal. The fitter backs off the stem nut, lifts away the lever handle complete with its orange-sleeved grip and the blue L&T spec nameplate riveted to it, and sets it on the bench. At 0:04–0:08 he pauses to read/show the nameplate.
- Hardware removed: handle, handle nut. The nameplate stays with the handle until step 12, where it is salvaged and wire-tied to the finished unit.
- Watch-outs: don't lose the nameplate; it is the valve's only spec/traceability plate. Note which position the ball is in when the handle comes off.
- App: good candidate for an Info + 3D "remove" step (reverse slide-out animation).

### Step 2 — Re-dress the stem (0:12–0:26, ~14 s)
The stainless stop-plate stack (plate with two ears, which later receives the bracket screws) stays on the valve. The stem nut is refitted over it and pulled down tight with a 12-point ring spanner (~17 mm [confirm]) at 0:20–0:22. A small brass/yellow bolt sits in the left stop-plate ear. Stem is left in a known position (closed) so the coupling and actuator go on in the correct orientation.
- Watch-outs: if the stem nut is left loose after handle removal, the coupling will have free play; ball position must be known before step 4.

### Step 3 — Fit mounting bracket BK1001 (0:28–0:48, ~20 s)
The black powder-coated U-bracket goes over the stem, base slots landing on the stop-plate ears. Two black socket-head screws are dropped through the base slots into the ears — one each side, left first then right — and run down finger-tight only (0:38–0:42). The slots give side-to-side alignment; the large top bore with its ISO 5211 hole pattern faces up.
- Fasteners: 2× black socket-head screws observed. Draft said 4 bolts — [confirm whether 2 more are hidden].
- Watch-outs: bracket must sit flat, no rock, before the coupling goes in; final tightening deliberately deferred to step 8.

### Step 4 — Drop in drive coupling (0:48–0:58, ~10 s)
The zinc-plated cylindrical coupling is lowered through the bracket's top bore onto the stem: female end over the stem flats, square tang pointing up for the actuator pinion. Seated by hand with a wiggle; no hammer, no visible set screw. A slotted screwdriver appears near the assembly at ~0:56 but its purpose is unclear (possible grub screw or just staging) — [confirm].
- Watch-outs: coupling must fully seat on the stem flats; a half-engaged coupling here is invisible after the actuator is on.

### Step 5 — Bench-dress the actuator (1:00–2:20, ~80 s) — biggest deviation from the draft
The actuator is dressed as a sub-assembly on the bench BEFORE it ever meets the valve:
1. **1:00–1:04** — pry the factory yellow/black position indicator off the pinion top with a slotted screwdriver; set aside. This exposes the NAMUR slot / grey drive adapter.
2. **1:04–1:10** — wipe the body clean with a cloth.
3. **1:12–1:20** — unpack the LSB (Valmet box on bench), inspect it.
4. **1:24–1:36** — thread 4 studs into the actuator-top VDI/VDE 3845 holes by hand until finger-tight.
5. **1:40–1:52** — place the black formed-steel riser bracket over the studs, lower the LSB onto it, rotating it so the LSB shaft slot engages the grey adapter on the pinion top.
6. **1:52–2:02** — run the 4 nuts down onto the studs; snug by hand, then spanner.
7. **2:04–2:18** — bolt the black slotted L-plate (AFR bracket) to the actuator side/end face with a hex bolt (open-end spanner at 2:14). Meanwhile the Rotex SOV waits on the bench with a blue push-in elbow already fitted.
- Watch-outs: LSB shaft/slot must engage before the nuts are pulled down (a cocked LSB reads wrong at both ends); indicator removal is a mandatory pre-step people forget; keep the indicator if the customer wants it refitted on the LSB.
- App: model as 3–4 separate 3D steps on an actuator-only view, or one grouped "actuator sub-assembly" step.

### Step 6 — Mate actuator sub-assembly to valve (2:24–3:00, ~36 s)
Carried two-handed to the vice (2:24–2:32). At 2:36 the fitter deliberately turns the underside to the camera: female star drive in the pinion bore + ISO 5211 bolt circle — then aligns it over the coupling's square tang and lowers it until the actuator base sits on the bracket top (2:40–2:56). At 2:58 he finger-checks coupling engagement through the bracket's side window.
- Watch-outs: this is where fail-action orientation is locked in (spring-return: air ports must face the intended side); if the coupling tang and pinion drive don't line up, rotate the coupling, never force it.

### Step 7 — Start all base fasteners, hand-tight (3:00–4:08, ~68 s)
The longest fiddly stretch. With the unit tilted and re-clamped in the vice several times: 4 hex bolts are fed up through the bracket top flange into the actuator base holes and started by feel (3:02–3:34, working blind under the flange); washers and bolts are added at the bracket-to-valve slots (3:44–4:00). Everything stays loose so the whole stack can still float for alignment.
- Fasteners: 4× hex bolts actuator-to-bracket [confirm count — partly hidden]; bracket-valve screws from step 3 plus washers.
- Watch-outs: do not tighten anything until every fastener is started; the assembly is intentionally floppy here.

### Step 8 — Square up and final-tighten (4:12–4:44, ~32 s)
Long-arm Allen key on the bracket-to-valve socket screws (4:12–4:16), then tightening at the actuator base/coupling window (4:20–4:32). The unit is lifted out of the vice, checked, and re-seated (4:36–4:44). All joints are feel-tightened — no torque tool, no marked values.
- Watch-outs: tighten only after the actuator sits square on the bracket; cross-tighten the base bolts.

### Step 9 — Mount the SOV (4:48–5:22, ~34 s)
At 4:50 the SOV underside is shown to camera: black NAMUR adapter plate with O-rings, two through-holes, Rotex base label. It is offered horizontally onto the actuator's NAMUR side face (4:54–4:56) and fixed with 2 socket screws driven with a long ball-end Allen key (4:58–5:04), second screw plus washer inserted by hand at 5:02. At 5:12 a slotted screwdriver touches the underside centre screw (manual override or exhaust plug — [confirm]). At 5:14–5:22 small silver fittings (hex nipple / silencer) are threaded into the SOV side port by hand, spanner nearby.
- Watch-outs: O-rings/adapter plate must be seated and any protective film peeled (seen at 5:08) or it leaks; port orientation is fixed by the NAMUR pattern, but the exhaust fitting must point clear.

### Step 10 — Mount the AFR (5:24–5:56, ~32 s)
The Shavo AFR is inspected (5:32–5:40, second worker fetches parts), then mounted vertically — bowl down, label out — onto the slotted L-plate fitted back in step 5.7, clamped through the plate (panel-nut style, big hex visible; spanner). Position on the slots is adjusted so the AFR lines up with the SOV port level.
- Watch-outs: bowl must point down (drain/condensate); the slotted plate exists exactly so the tube run can be lined up — set height before tightening.

### Step 11 — Gauge + AFR→SOV tube (5:58–6:56, ~58 s)
1. **5:58–6:02** — unscrew the blanking cap from the AFR gauge port.
2. **6:08–6:20** — thread in the Shavo gauge by hand (dual scale 0–150 psi / 0–10 kg/cm²); face set readable from the front.
3. **6:10–6:32** — connect the pre-bent rigid SS ¼" tube (~180° bend, compression nuts both ends, PTFE tape on threads) from the AFR outlet elbow up and over to the SOV inlet; nuts started by hand.
4. **6:36–6:56** — spanner-tighten both tube nuts (open-end spanner; several passes, SOV end then AFR end).
- Correction to my first-pass note: this is rigid pre-bent tube (TB1001-style ¼" SS tube + fittings), NOT a braided hose. Tubing is therefore present on the real unit even though the draft deferred it.
- Watch-outs: tube is pre-bent to a fixed geometry — AFR height (step 10) must match or the nuts cross-thread; gauge needle stays at 0 throughout (never pressurised on camera).

### Step 12 — Salvage & tie the spec tag (7:00–7:16, ~16 s)
The L&T nameplate removed with the handle in step 1 is wired through its hole and tied to the valve/bracket. This is the unit's spec/traceability tag (size, class, seat, body, ball, stem, serial).
- Watch-outs: skipping this loses the valve's identity plate — it's the real-world equivalent of the draft's "ID tag" in step 14.

### Step 13 — Air-supply prep, video ends (7:16–7:34, ~18 s)
A blue ¼" push-in fitting, threads PTFE-taped, is screwed into the AFR inlet (7:16–7:24). The blue PU shop-air line lies ready; the fitter points out the actuator/air routing to the camera (7:28–7:32). The recording ends before air-up.
- NOT captured on camera: stroke/end-stop setting, limit-switch cam setting, energise + function test, hydro test, seat leakage test, final QC. These need a second video or written capture.

## Observed step durations (baseline metric, one fitter + helper)

valve prep 26 s · bracket + coupling 30 s · actuator bench dressing 80 s · mate to valve 36 s · start fasteners 68 s · final tighten 32 s · SOV 34 s · AFR 32 s · gauge + tube 58 s · tag 16 s · air prep 18 s — **camera total ≈ 7.5 min, tests excluded.**

## Discrepancies vs `assembly-flow-config01.md` (draft golden list)

1. **Step order differs materially.** Real: valve prep → bracket → coupling → [bench: indicator off, studs, riser, LSB, AFR bracket onto actuator] → mate → all fasteners hand-tight → tighten → SOV → AFR → gauge+tube → tag → air. Draft mounts the LSB last (steps 8–9); reality mounts it on the actuator on the bench, before the actuator meets the valve. Draft's open question on the order of steps 6–9 is answered: SOV after actuator, AFR after SOV, LSB first-on-bench.
2. **Handle removal, stem-nut re-tighten, indicator removal and nameplate salvage are missing from the draft** — four real actions with real failure modes.
3. **Draft step 5 (stroke/end-stop setting) never appears on camera.** [ask fitter whether it's done at all on this size]
4. **Draft steps 10–14 (cam setting, function test, hydro, seat leakage, final QC) are not in the video** — filming stops at air-line prep.
5. **Bracket-to-valve fasteners: 2 observed, draft says 4.** [confirm]
6. **Tubing is NOT skipped on the real unit:** pre-bent rigid SS ¼" tube AFR→SOV + blue push-in supply fitting. The draft deferred tubing entirely; the real unit's air train is a visually prominent feature.
7. **No torque control anywhere.** Every joint is feel-tightened with Allen keys/spanners. The draft's [confirm] Nm fields may have no shop answer — capture tool sizes instead.
8. **Kitting (draft step 0) not shown** — parts arrive loose; no formal item-code check on camera.
9. **Two-stage fastening pattern** (start everything hand-tight → align → tighten all) is a real technique the draft's one-line steps 2–4 don't express; worth two distinct app steps.

## Open items for Arnav / the fitter

- Bracket-valve fastener count (2 vs 4); all Allen/spanner sizes; any grub screw on the coupling.
- Identity of the SOV underside slotted screw (override vs exhaust) and final orientation convention for the silencer.
- Whether stroke/end stops are set on this actuator size, and when cams are set in the LSB.
- AFR set pressure for this package (spec 4–6 bar) — gauge never pressurised on camera.
- Second video or written notes for: function test, hydro (30 bar, ISO 5208), seat leakage (6 bar air), final QC.
- A narration pass/transcript would resolve most [confirm] items — video was analysed without audio.
