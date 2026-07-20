# Golden step list (FINAL v1) — Config BV1121-PA1019-TP0026-PN00
### Lego-manual structure: build sub-assemblies independently, then combine

**15 mm L&T ball valve automation package. Fail-to-close, spring return.**
Merged from the QC team's written flow, the Granola meeting notes, and the video-observations
file. Where sources conflicted, the real .mov was treated as ground truth.

**Purpose:** this is the master for a Lego-manual style work instruction for Config 1.
Each sub-assembly is built and shown on its own, then joined one connection at a time.

_Decisions locked with Arnav (2026-07-13):_
1. Valve disassembly follows the video: only the lever handle + nameplate come off (valve is NOT split; ignore the "8 bolts" line in Granola).
2. Mounting bracket goes onto the VALVE first, right after the lever is removed.
3. Valve-to-bracket fasteners follow the video: 2 socket-head screws.
4. Testing (stroke, cam, function, hydro, seat leakage, QC) is OUT of round 1.
5. Fastener sizes/counts and torque are COMMON-SENSE PLACEHOLDERS for V1, to be fine-tuned later. Torque tool never appears in the real build; a real torque-callout feature is TBD (see bottom).
6. The air train (gauge + bent AFR-to-SOV pipe) is IN. AFR set pressure = 4 bar.
7. Show each sub-assembly independently, then combine, for the clearest Lego-manual representation.
8. (2026-07-14) The limit switch box ships with its mounting bracket integral (Valmet KS2V...+BKT). There is NO separate riser bracket; the LSB mounts as ONE unit directly onto the actuator top. `lsbmount` is merged into `lsb`.

Legend: **3D** = adds/removes a part · **Info** = card only · **Combine** = joins two sub-assemblies.
All fastener sizes and torque = PLACEHOLDER.

---

## Build tree (overview)
```
Sub-assembly A:  Valve + bracket + coupling
Sub-assembly B:  Actuator + limit switch box (LSB)
Sub-assembly C:  AFR + dial gauge (on L-plate)
Sub-assembly D:  SOV (+ rubber NAMUR plate + O-rings)

Combine 1:  C  ->  B            (AFR set onto actuator+LSB)
Combine 2:  D  ->  B+C          (SOV onto actuator+LSB+AFR)
Combine 3:  air pipe            (connect AFR to SOV)
Combine 4:  (B+C+D)  ->  A      (dressed actuator onto valve+bracket)
Finish:     final bolt-up, tag, air-supply fitting
```

---

## Sub-assembly A — Valve + bracket (valve view)
| # | Type | Operation | Part(s) | Fastener (placeholder) | Tool | Torque (ph) | Checks |
|---|------|-----------|---------|------------------------|------|-------------|--------|
| A1 | 3D | Check open/close; clamp valve in vice, X-Y, flanges to the line | valve | — | bench vice | — | valve cycles freely; clamped square; bore horizontal |
| A2 | 3D (remove) | Remove lever handle + nameplate (keep nameplate); refit stem nut | handle off | 1 lever nut/bolt; stem nut | ring spanner | — | nameplate retained for tagging; note ball position (closed) |
| A3 | 3D | Fit mounting bracket over stem onto stop-plate ears | bracket | 2x M6 socket-head screws | Allen key 5 mm | ~10 Nm | bracket flat, no rock; ISO 5211 pattern up |
| A4 | 3D | Drop drive coupling/adapter onto stem | coupling | none (press fit) | hand | — | coupling seated on stem flats; square tang up |

## Sub-assembly B — Actuator + limit switch box (actuator view)
| # | Type | Operation | Part(s) | Fastener (placeholder) | Tool | Torque (ph) | Checks |
|---|------|-----------|---------|------------------------|------|-------------|--------|
| B1 | 3D (remove) | Remove actuator top cap / position indicator; wipe clean | actuator; indicator off | — | screwdriver | — | NAMUR pinion drive exposed |
| B2 | 3D | Fit the limit-switch box (with its integral bracket) onto the actuator top; engage shaft | lsb | 4x bolts/studs (ph) | hand + spanner | ~5 Nm (ph) | LSB shaft engaged in pinion adapter BEFORE nuts pulled; integral bracket square on actuator top |

## Sub-assembly C — AFR + dial gauge (bench)
| # | Type | Operation | Part(s) | Fastener (placeholder) | Tool | Torque (ph) | Checks |
|---|------|-----------|---------|------------------------|------|-------------|--------|
| C1 | 3D | Thread dial gauge into the AFR gauge port | afr + gauge [gauge NEW] | gauge threaded | hand | — | PTFE on thread; gauge readable from front |
| C2 | 3D | Bolt AFR body to its L-plate | afr-plate [NEW] | 2x M5 nuts/bolts | spanner | ~6 Nm | bowl points down; slots vertical for height adjust |

## Sub-assembly D — SOV (bench)
| # | Type | Operation | Part(s) | Fastener (placeholder) | Tool | Torque (ph) | Checks |
|---|------|-----------|---------|------------------------|------|-------------|--------|
| D1 | 3D | Select 3/2 or 5/2 per customer; set the O-ring gate to the required port | sov | — | — | — | gate matches ordered function |
| D2 | 3D | Fit rubber NAMUR plate + 2 O-rings; align O-rings to SOV | namur-plate [NEW or in sov.glb] | — | hand | — | O-rings seated; protective film peeled |

## Combine 1 — AFR set onto actuator+LSB
| # | Type | Operation | Part(s) | Fastener (placeholder) | Tool | Torque (ph) | Checks |
|---|------|-----------|---------|------------------------|------|-------------|--------|
| E1 | Combine | Bolt the AFR L-plate to the actuator side face | C -> B | 2x M6 hex into top threading | open-end spanner | ~8 Nm | plate square; AFR height set so tube run will line up |

## Combine 2 — SOV onto actuator+LSB+AFR
| # | Type | Operation | Part(s) | Fastener (placeholder) | Tool | Torque (ph) | Checks |
|---|------|-----------|---------|------------------------|------|-------------|--------|
| F1 | Combine | Offer SOV (with NAMUR plate) to the actuator NAMUR face; bolt through the O-ring holes; blank all air holes except the middle (supply); fit silencer | D -> B+C | 2x M5 long Allen bolts; threaded blanking nuts | ball-end Allen key | ~6 Nm | O-rings compressed evenly; supply hole open; exhaust points clear |

## Combine 3 — Air train (AFR to SOV)
| # | Type | Operation | Part(s) | Fastener (placeholder) | Tool | Torque (ph) | Checks |
|---|------|-----------|---------|------------------------|------|-------------|--------|
| G1 | 3D | AFR "in" hole open (supply), elbow on "out"; fit bent metal pipe from AFR to the SOV middle hole | air-pipe [NEW] | 1/4 connectors both ends; PTFE tape | open-end spanner | — | pipe geometry matches AFR height; nuts not cross-threaded |

## Combine 4 — Dressed actuator onto valve+bracket
| # | Type | Operation | Part(s) | Fastener (placeholder) | Tool | Torque (ph) | Checks |
|---|------|-----------|---------|------------------------|------|-------------|--------|
| H1 | Combine (group) | Lower the fully dressed actuator as ONE unit onto the bracket; engage stem-to-pinion drive | (B+C+D) -> A | — | hand | — | coupling tang aligned to pinion (rotate coupling, never force); fail-action orientation correct |
| H2 | 3D | Final bolt-up: actuator base to bracket, then tighten bracket-to-valve | bolt/nut set | 4x M6 base + 2x M6 valve; washers | Allen key + spanner | base ~20 Nm, valve ~10 Nm | cross-tighten base; actuator square before final torque |
| H3 | 3D | Re-tie salvaged nameplate tag; fit air-supply push-in fitting to AFR inlet; set regulator to 4 bar | tag + supply fitting | — | wire; hand | — | spec tag on unit; supply fitting PTFE-taped; AFR set 4 bar |

## Deferred to round 2 (NOT built now)
Stroke / end-stop set - LSB cam set - function test (24 VDC, cycle, no leaks) -
body hydro 30 bar (ISO 5208) - seat leakage 6 bar - final QC.

---

## App mapping notes
- Four sub-assemblies (A, B, C, D) are each built and shown on their own view/stage. Combine steps (E, F, G, H) then bring them together. This is the Lego-manual flow.
- The headline animation is H1: the fully dressed actuator (B+C+D) descends onto the valve+bracket (A) as ONE group. The app currently reveals parts independently, so combine steps need a group transform (each sub-assembly's parts share a bench-to-mate offset). Main engineering piece.
- Every bolted joint (A3, B2, C2, E1, F1, H2) carries the reusable bolt/nut set + a torque callout.

## New 3D assets needed (Fable 5 track)
Existing .glb: valve, bracket, coupling, actuator, lsb, sov, afr. (lsbmount.glb is retained as the LSB's integral-bracket mesh, folded into the lsb step, not a separate part.)
To model: **afr-plate** (L-plate), **gauge** (dial gauge), **air-pipe** (bent 1/4" tube),
**namur-plate** (rubber SOV adapter, or fold into sov.glb), **bolt/nut set** (one reusable pair).

## The torque-callout feature (flagged important, TBD)
Real builds are feel-tightened; no torque wrench. A per-joint torque callout that travels with
each fastener across configs is core to the value story. V1 shows believable placeholders.
Design task: decide the source of truth for torque per part-number (OEM spec vs Rajdeep standard)
and how the callout renders in the operator view.
