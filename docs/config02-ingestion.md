# ValveOS - Config 2 Ingestion

Source drawing: `40mm-BV1121-PA1019-TP0191-CL00.pdf` (Rajdeep, Rev 0, dated 15-05-2026)
Ingested: 2026-07-14

This is the ValveOS drawing-ingest output. Section A is what the software pulled
automatically with zero human input. Section B is the friction: every query it still
needs a human to answer. The product goal is to shrink Section B toward zero over time
by capturing each answer once into the parts-knowledge database.

---

## A. Auto-extracted (no friction)

### Config identity
- Rajdeep item code (Arnav-confirmed canonical): **BV1121-PA1019-TP0191-CL00**
- Note: the drawing BODY item-code cell reads BV1124-PA1025-TP0026-CL00 (which matches
  the physical 40 mm / RNP80 parts). Arnav confirmed the filename/number-block code is
  canonical instead. See Q1 and the new Q7 collision flag.
- Valve size: 40 mm
- Actuator model: RNP80SR40CA1GD (Neles / Valmet)
- Fail-safe: **Fail to Close** (SP sub-code CL00, spring return 90 deg)
- PO: P0/P067/2026-27/71

### GA dimensions (mm, for FreeCAD placement)
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| 165 | 125 | 38 | 37 | 382 | 208 | 159 |

### BOM
| # | Part | Sub-code | Model / spec | Status |
|---|------|----------|--------------|--------|
| 1 | Bare valve | BV1124 | L&T L1RF1C-040mm, 2-way 1-pc floating ball, ASTM A216 WCB body, ASTM A351 CF8M / A182 F316 ball, PTFE seat, flanged ASME B16.5 #150, ISO 17292, Class 150, -20 to 180 C | NEW part |
| 2 | Actuator | PA1025 | Valmet RNP80SR40CA1GD, pneumatic rack & pinion, spring return 90 deg, 4-6.5 barg, 1/4" NPT, alu anodized, fail to close | NEW part |
| 3 | SOV | SV1007 | Rotex 30318-5-2G+I-24VDC-37, 3/2-way NAMUR, flameproof, 24VDC, 8W, 1/2" NPT, 0-10 barg | reuse (Config 1) |
| 4 | Limit switch box | LB1002 | Valmet KS2V1A2NGRNN+BKT, rotary, 2x Honeywell V15S05-CZ100A05-01 SPDT, VDI/VDE 3845, 2x 1/2" NPT, die-cast alu | reuse (Config 1) |
| 5 | AFR | FR1001 | Shavo SB10-2GM2T/RGK-NB, 1/4" BSP, polycarbonate bowl, manual drain | reuse (Config 1) |
| 6 | Bracket & coupling | BK1001 | MS powder coated + galvanized hardware (Rajdeep design) | reuse code - SEE Q2 |
| 7 | Tubing & fittings | TB1001 | SS304 1/2" single tubing + fittings | reuse (Config 1) |

### Testing (from drawing)
- Body hydro: 30 bar, water (ISO 5208)
- Seat leakage: 6 bar, air
- Plus VAC-standard: stroke setting, SOV function test, limit-switch calibration

### Interfaces (drive template replay)
- Actuator-to-valve mounting: ISO 5211 (size TBC - see Q3)
- SOV-to-actuator: NAMUR
- LSB-to-actuator: VDI/VDE 3845
- These three interface rules already exist in parts-knowledge from Config 1, so tool/
  torque/check content resolves automatically for parts 3, 4 and the mating relationships.

---

## B. Query / friction log

Legend: [BLOCKER] must answer to build - [ONE-TIME] answer once, then encoded forever -
[SAFETY] never fabricated, held null until a cited source confirms.

### Q1 - Config identity conflict  [BLOCKER] [ONE-TIME]
The drawing body item code is **BV1124-PA1025-TP0026-CL00**, but the filename and the
drawing-number block both read **BV1121-PA1019-TP0191-CL00** - and BV1121-PA1019 are
Config 1's 15 mm codes. The title block also still reads "L1RF1C-015mm+RNP50SR40...",
another Config 1 leftover. Looks like this drawing was saved from the Config 1 template
and the number block / filename were not updated.
RESOLVED (2026-07-14): Arnav confirmed canonical = **BV1121-PA1019-TP0191-CL00**
(the filename/number-block code). See Q7 for the data-integrity consequence.
Friction-removal note: once ValveOS owns the item-code as the single source of truth,
this class of copy-paste mismatch disappears - the code is generated, not typed.

### Q2 - Bracket & coupling reuse  [BLOCKER] [SAFETY]
TP0026 carries bracket code BK1001, identical to Config 1. But Config 1 is a 15 mm valve
on an RNP50; this is a 40 mm valve on an RNP80. A 15 mm bracket and coupling cannot
physically fit the 40 mm stack (different stem, different ISO 5211 flange). Either BK1001
resolves to a size-specific physical bracket, or the code was copied from Config 1 by
mistake.
RESOLVED (2026-07-14): Arnav confirmed BK1001 is correct for this build.
Friction-removal note: interface-standard accessories (NAMUR SOV, VDI/VDE 3845 LSB, AFR)
reuse cleanly across sizes; bracket reuse here is confirmed valid by the domain expert.

### Q3 - ISO 5211 mounting flange size  [ONE-TIME] [SAFETY]
Drawing does not state the ISO 5211 flange (F05/F07/F10...) for the BV1124 valve top or
the PA1025 actuator. This drives bracket geometry, coupling bore, and the interface rule.
Question: what is the ISO 5211 flange size for this pairing?
RESOLVED (2026-07-14): held null, added to openQuestions until OEM datasheet confirms.

### Q4 - 3D source for the 2 new parts  [BLOCKER]
Parts 3-7 reuse Config 1 geometry. The two new parts need 3D:
- L&T L1RF1C-040mm valve (BV1124)
- Valmet RNP80SR40CA1GD actuator (PA1025)
Question: do you have STEP files for these, or should I stand up scaled placeholders?
RESOLVED (2026-07-14): use scaled placeholders now; swap real STEP in later.

### Q5 - Fastener torques for the new stack  [SAFETY]
Valve-to-bracket bolts, bracket-to-actuator bolts, and coupling grub-screw torques are
not on the drawing. Per the safety rule these stay null / placeholder in
parts-knowledge until a cited fitter or OEM value is confirmed. Not a build blocker;
flagged so no value is ever invented on a pressure valve.

### Q6 - Dimension legend  [ONE-TIME]
A-G are given as numbers only. Assuming the same GA convention as Config 1 for FreeCAD
placement. Confirm if the letter-to-feature mapping differs on this drawing.

### Q7 - partId collision (raised by the Q1 answer)  [BLOCKER] [SAFETY]
Canonical code is now BV1121-PA1019-TP0191-CL00. But partIds BV1121 and PA1019 already
exist in parts-knowledge as Config 1's 15 mm valve and RNP50 actuator. This drawing is a
40 mm valve on an RNP80. If Config 2 reuses partId BV1121/PA1019, the flywheel will
resolve 15 mm torque / flange / test specs onto a 40 mm pressure valve - a real hazard.
Question (open): to keep item code BV1121-PA1019-TP0191-CL00 while staying safe, do we
(a) create distinct partIds for the 40 mm valve and RNP80 actuator (e.g. BV1124/PA1025
from the drawing body) and let the config recipe map the item code to them, or
(b) treat BV1121/PA1019 as size-agnostic families with size as an attribute?
Status: HELD. Not writing either part into parts-knowledge until this is resolved, so no
wrong spec can bleed across configs.

---

## C. Parts-knowledge deltas

Reused (flywheel - no new capture, content auto-applies): SV1007, LB1002, FR1001, TB1001.
Confirmed reused: BK1001 bracket + coupling (Q2 resolved).
New records HELD pending Q7 (partId collision must be resolved before writing):
- 40 mm L&T L1RF1C-040mm ball valve  (drawing-body subcode BV1124; canonical item code
  uses BV1121 - do not merge into the existing 15 mm BV1121 record)
- Valmet RNP80SR40CA1GD actuator, fail-to-close (drawing-body subcode PA1025; canonical
  item code uses PA1019 - do not merge into the existing RNP50 PA1019 record)
Open questions carried in: partId collision (Q7), ISO 5211 flange size (Q3), stack
torques (Q5), dimension legend (Q6).

## D. Friction scorecard for this drawing
- Fields auto-extracted: ~40 (full BOM, specs, materials, tests, dimensions)
- Parts reused from Config 1 knowledge: 5 of 7 (SV1007, LB1002, FR1001, TB1001, BK1001)
- Human queries raised: 7 - resolved live: Q1, Q2, Q3, Q4; still open: Q5, Q6, Q7
- The two hardest queries (Q1, Q7) both trace to ONE root cause: the drawing carries two
  different item codes for the same physical assembly. Every downstream ambiguity flows
  from that. When ValveOS generates the item code from the selected parts instead of it
  being typed onto a drawing, Q1 and Q7 cannot occur - that is the friction removed.
- Net human touch to build Config 2: 1 real decision (Q7) + supply 2 STEP files later.
  Everything else was auto-filled or reused.
