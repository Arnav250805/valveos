# ValveOS parts-knowledge (plain mirror)
_Source of truth: data/parts-knowledge.json. Browser view: docs/parts-knowledge.html. Updated 2026-07-16._

## Parts
### valve  (BV1121)  ·  Bare ball valve, 15 mm, flanged
- category: valve · status: modeled · OEM: L&T L1RF1C-015
- datasheet: drawings/15mm-BV1121-PA1019-TP0026-PN00.pdf; docs/Datasheets/L&T-Process-Ball-Valves_New.pdf
- interface: ISO 5211 (F03 (DN15, Class 150/300)) — actuator mount (integral ISO 5211 top flange, M5 threads)  [L&T Process Ball Valves catalogue p9 (single-piece regular-bore dimensions) + p5 (integral ISO 5211 flange)]
- interface: ASME B16.5 #150 (family spec, confirm for 15 mm) (15 mm / DN15) — process connection (flanged); bore 11 mm (regular bore), face-to-face 108 mm (Cl150)  [L&T catalogue p9]
- fastener: stem nut (refit after lever removal) — None x1 @ — [placeholder] (golden-steplist-config01.md A2)
- rule: Valve is NOT split for automation; only the lever handle and nameplate are removed.  (fitter decision 2026-07-13 (golden-steplist-config01.md))
- rule: Retain the nameplate; it is re-tied to the finished unit for tagging.  (golden-steplist-config01.md A2/H3)
- rule: Note ball position (closed) before removing the lever.  (golden-steplist-config01.md A2)
- rule: Design break torque approx 5 Nm at DN15 (value WITHOUT safety factor per the catalogue note). The RNP50-SR40 actuator delivers 9-13 Nm at 4 bar, so it is adequately sized with a safety margin.  (L&T catalogue p7 (valve torque data) vs Valmet catalogue p5)
- check: Valve cycles freely before mounting. -> Full open-to-close by hand, no binding.
- check: Clamped square in vice, bore horizontal. -> Flange faces to the line, valve not skewed.
- provenance: 2026-07-17 — OEM-confirmed (L&T catalogue): ISO 5211 top flange = F03, bore 11 mm RB, face-to-face 108 mm, design torque ~5 Nm. Open: stem square size (not in catalogue tables); process-flange bolt spec.

### lever  (-)  ·  Valve lever / hand-operating handle (removed during automation)
- category: handle · status: modeled · OEM: L&T (supplied with the BV1121 valve)
- interface: valve stem — hand operation (removed for automation)
- fastener: lever / stem nut — None x1 @ — [placeholder] (golden-steplist-config01.md A2)
- rule: Removed during automation: only the lever and nameplate come off (the valve is not split). Keep the nameplate; refit the stem nut.  (golden-steplist-config01.md A2)
- rule: Note the ball position (closed) before removing the lever.  (golden-steplist-config01.md A2)
- check: Nameplate retained; ball position noted; stem nut refitted. -> Nameplate set aside; stem nut back on.
- provenance: 2026-07-14 — removal step confirmed; the lever .glb is a generated placeholder (swap real CAD later)

### bracket  (BK1001)  ·  Mounting bracket (valve-to-actuator)
- category: bracket · status: modeled · OEM: Rajdeep Industrial Products BK1001
- datasheet: Rajdeep shop drawing (custom)
- interface: ISO 5211 (valve top is ISO 5211 F03 (M5); Rajdeep bracket mounts to stop-plate ears (2x M6 per golden A3)) — valve stop-plate mount (bracket underside)
- interface: ISO 5211 (F05 (M6)) — actuator base mount (bracket top)  [Arnav 2026-07-17 (actuator bolts M6 = F05)]
- fastener: valve-to-bracket screws — None x2 @ — [placeholder] (video ground-truth + golden-steplist A3 (2 screws confirmed; size/torque placeholder))
- rule: Bracket goes onto the VALVE first, right after the lever is removed.  (fitter decision 2026-07-13 (golden-steplist-config01.md A3))
- rule: Bracket must sit flat with no rock.  (golden-steplist-config01.md A3)
- check: Bracket flat on the valve pad, no rock. -> No gap or rocking under hand pressure.
- check: ISO 5211 hole pattern up and aligned. -> Actuator base holes line up without forcing.
- provenance: 2026-07-17 — custom part; actuator-side mount = F05/M6 confirmed (Arnav). Valve-side screw size/torque still open (OQ-02).

### coupling  (BK1001)  ·  Drive coupling / stem adapter
- category: coupling · status: modeled · OEM: Rajdeep Industrial Products BK1001 (coupling)
- datasheet: Rajdeep shop drawing (custom)
- interface: valve stem flats — valve stem engagement
- interface: actuator pinion (square/female drive) — actuator drive engagement
- rule: Coupling seats on the valve stem flats, square tang up.  (golden-steplist-config01.md A4)
- check: Coupling seated on stem flats. -> Fully down on the flats, not perched on the stem tip.
- check: Square drive tang pointing up. -> Tang square and clean for pinion entry.
- provenance: 2026-07-14 — identity confirmed; stem/pinion dimensions unknown

### actuator  (PA1019)  ·  Pneumatic actuator, rack & pinion, spring return (fail-to-close / spring-to-close)
- category: actuator · status: modeled · OEM: Valmet (Neles) RNP50SR40
- datasheet: docs/Datasheets/Valmet Actuator Catalogue.pdf (IMO-218EN, Issue 5/2022)
- interface: ISO 5211 (F03 and F05 (dual drilling)) — valve mount (base). Offers dual F03/F05; Rajdeep uses F05 (M6) to the bracket [Arnav 2026-07-17]  [Valmet catalogue p25 (dimensions, RNP50)]
- interface: ISO 5211 bi-square drive (14 mm A/F) — pinion female drive (to coupling)  [Valmet catalogue p25 (N A/F=14) + p28 (shaft-key type D)]
- interface: NAMUR (VDMA 24563) (2x M5; 1/4" air port) — SOV direct mount  [Valmet catalogue p25 (M5x8 deep; port T=1/4")]
- interface: VDI/VDE 3845 — accessory mount (top, for limit switch box)
- fastener: valve-mount bolts (ISO 5211 base to bracket) — M6 (ISO 5211 F05) x4 @ — [size confirmed; torque placeholder] (size confirmed M6/F05 by Arnav 2026-07-17; torque not in Valmet catalogue (set per bolt grade / Rajdeep standard))
- fastener: actuator end-cap / body bolts (part #9, service) — M6 xNone @ 8 Nm [confirmed (internal service torque; NOT the valve-mount torque)] (Valmet catalogue p16 tightening-torque table (RNP40-80 = M6, 8 Nm))
- rule: Remove the top cap / position indicator and wipe clean before fitting the limit switch box.  (golden-steplist-config01.md B1)
- rule: SR40 = 4.0 barg spring version (matches AFR set 4 bar). Action code C = spring-to-CLOSE, so the package is FAIL-CLOSE: the valve closes on loss of air. Confirmed by Arnav 2026-07-16. Air supply must meet the spring rating and must not exceed 8 barg (max supply); design pressure 10 barg.  (Valmet catalogue p4 (pressures) + p28 (order code C) + Arnav 2026-07-16)
- rule: Confirm FAIL-TO-CLOSE (spring-to-close) orientation before final torque: the valve must go CLOSED on air loss.  (golden-steplist-config01.md H1/H2; fail-action per Arnav 2026-07-16)
- check: Actuator square to the valve before final torque. -> No skew; base fully seated on bracket.
- check: Coupling engaged on the stem. -> Pinion drives the stem through full travel.
- hookup [air]: Operating media air/nitrogen. SR40 spring rated 4.0 barg (matches AFR set 4 bar). Max supply 8 barg, design 10 barg. Output torque RNP50-SR40 at 4 bar = 9-13 Nm (min-max over stroke). IP66/67, -20..+80 C (temp code G). Source: Valmet catalogue p4, p5.
- provenance: 2026-07-16 — OEM-confirmed (Valmet catalogue): pressures, spring rating, ISO 5211 flanges F03/F05, 14 mm bi-square drive, NAMUR M5. Fail-action = FAIL-CLOSE (spring-to-close, code C) confirmed by Arnav 2026-07-16. Open: valve-mount torque; F-code resolved: actuator uses F05/M6 to bracket, valve is F03 (Arnav 2026-07-17).

### sov  (SV1007)  ·  Solenoid valve (SOV), NAMUR, 3/2 (function per order)
- category: sov · status: modeled · OEM: Rotex 30318-5-2G+I-24VDC-37
- datasheet: drawings/30318-5-2G+24VDC 230VAC 110AC-16.pdf
- interface: NAMUR (VDMA 24563) — actuator mount
- fastener: SOV-to-actuator bolts — None x2 @ — [placeholder] (golden-steplist F1 (2 bolts; size/torque placeholder))
- rule: Select 3/2 or 5/2 per customer and set the O-ring gate to the required port before mounting.  (golden-steplist-config01.md D1)
- rule: Fit the rubber NAMUR plate with 2 O-rings; peel the protective film first.  (golden-steplist-config01.md D2)
- rule: Blank all air holes except the middle (supply); fit the silencer/exhaust so it points clear.  (golden-steplist-config01.md F1)
- check: Gate matches the ordered function (3/2 vs 5/2). -> Confirmed against the work order.
- check: O-rings seated and compressed evenly; supply hole open; exhaust clear. -> No visible gap; supply port open, exhaust unobstructed.
- hookup [electrical]: 24 VDC coil, flameproof; 1/2" NPT cable entry (per BV1123 BOM family spec, confirm for SV1007).
- hookup [air]: NAMUR-ported to the actuator; supply fed from the AFR via the air train.
- provenance: 2026-07-14 — identity confirmed; electrical entry and fastener/torque to confirm

### afr  (FR1001)  ·  Air filter regulator (FRL), 1/4" BSP, with dial gauge
- category: afr · status: modeled · OEM: Shavo SB10-2GM2T/RGK-NB
- interface: custom L-plate mount (afr-plate) — mounting to actuator side
- interface: 1/4" BSP (1/4") — pneumatic ports (in/out)
- fastener: AFR body to L-plate — None x2 @ — [placeholder] (golden-steplist C2 (2 fasteners; placeholder))
- rule: Bowl / drain points down; mounting slots vertical for height adjustment.  (golden-steplist-config01.md C2)
- rule: Thread the dial gauge into the gauge port with PTFE on the thread; gauge readable from the front.  (golden-steplist-config01.md C1)
- rule: Set regulator to 4 bar for this build.  (fitter decision 2026-07-13 (golden-steplist-config01.md H3))
- check: Bowl down, gauge readable, set pressure 4 bar. -> Gauge reads 4 bar with supply on.
- hookup [air]: 1/4" BSP inlet via push-in supply fitting (PTFE-taped); outlet to SOV via bent pipe. Regulation range per SB10 datasheet to confirm; set 4 bar.
- provenance: 2026-07-14 — identity confirmed; pressure range and fasteners to confirm

### lsb  (LB1002)  ·  Limit switch box (2x SPDT) with integral mounting bracket
- category: limit-switch-box · status: modeled · OEM: Valmet KS2V1A2NGRNN+BKT
- interface: VDI/VDE 3845 — mounts directly to actuator top via its integral bracket
- interface: NAMUR pinion shaft — shaft to pinion adapter
- fastener: integral bracket feet to actuator top — None x4 @ — [placeholder] (shop photo 2026-07-14 + golden-steplist B2 (count/size placeholder))
- rule: The LSB ships with its mounting bracket integral (the '+BKT' in KS2V1A2NGRNN+BKT). There is NO separate riser bracket; the box and bracket mount as ONE unit directly onto the actuator top.  (shop photo IMG_5045 2026-07-14 (Arnav))
- rule: Engage the LSB shaft in the pinion adapter BEFORE the nuts are pulled tight.  (golden-steplist-config01.md B2 (flagged critical))
- rule: Set cams to OPEN / CLOSED (round-2 test step, knowledge lives with the part).  (golden-steplist-config01.md (deferred test))
- check: Cams set OPEN / CLOSED. -> Switches trip at true end positions; dome indicator reads correctly.
- check: Integral bracket seated square on the actuator top (VDI/VDE 3845). -> Both bracket feet flat, shaft engaged in pinion before final tightening.
- hookup [electrical]: 2x SPDT micro-switches (Honeywell V15S05 per BOM family spec); position feedback contacts. Confirm for LB1002.
- provenance: 2026-07-14 — identity confirmed; integral bracket confirmed from shop photo 2026-07-14; switch model and fastener sizes/torque to confirm

### gauge  (-)  ·  Dial pressure gauge (AFR)
- category: instrument · status: planned · OEM:
- interface: gauge port thread (AFR) — threads into AFR gauge port
- provenance: 2026-07-14 — planned asset; not yet modeled or specced

### afr-plate  (-)  ·  AFR mounting L-plate
- category: bracket · status: planned · OEM: Rajdeep Industrial Products
- provenance: 2026-07-14 — planned asset; not yet modeled or specced

### air-pipe  (TB1001 (family))  ·  Bent air pipe (AFR to SOV)
- category: tubing · status: planned · OEM:  SS304 1/4" tube + fittings
- interface: 1/4" tube fittings (1/4") — AFR out to SOV supply
- provenance: 2026-07-14 — planned asset; geometry tied to AFR height

### namur-plate  (-)  ·  Rubber NAMUR adapter plate (SOV) with O-rings
- category: seal · status: planned · OEM:
- interface: NAMUR (VDMA 24563) — SOV to actuator seal
- provenance: 2026-07-14 — planned asset; may fold into sov.glb

### boltnutset  (-)  ·  Reusable bolt + nut set (per bolted joint)
- category: fastener · status: planned · OEM:
- provenance: 2026-07-14 — planned reusable asset; carries torque callout per joint

## Relationships
### bracket <-> valve  (ISO 5211)
- Bracket fits over the stem onto the valve stop-plate ears. (golden-steplist-config01.md A3)

### coupling <-> actuator  (actuator pinion drive (ISO 5211 bi-square, 14 mm A/F))
- Rotate the coupling to align the tang to the pinion; never force it. (golden-steplist-config01.md H1)
- Actuator drive is a 14 mm A/F ISO 5211 bi-square female socket; the coupling must present a matching 14 mm bi-square to the actuator. (Valmet catalogue p25/p28)

### lsb <-> actuator  (VDI/VDE 3845 + NAMUR pinion shaft)
- Engage the LSB shaft in the pinion adapter BEFORE the mounting nuts are pulled tight. (golden-steplist-config01.md B2 (critical))

### sov <-> actuator  (NAMUR (VDMA 24563))
- Compress the O-rings evenly; keep the supply hole open and exhaust clear. (golden-steplist-config01.md F1)
- Actuator NAMUR face: 2x M5 tapped holes and a 1/4" air port; SOV bolts are M5. (Valmet catalogue p25)

### afr <-> sov  (air train (1/4" tube))
- AFR 'in' open (supply), elbow on 'out'; bent metal pipe runs from AFR to the SOV middle (supply) hole. (golden-steplist-config01.md G1)

## Open questions
- OQ-02 [bracket<->valve]: Valve-to-bracket screw size and torque (2x socket-head)?
- OQ-03 [actuator]: Actuator valve-mount bolt TORQUE. Size CONFIRMED M6 (F05) [Arnav 2026-07-17]; torque not in the Valmet catalogue - set per M6 bolt grade (e.g. 8.8) or Rajdeep standard.
- OQ-05 [lsb<->actuator]: Riser stud size and nut torque (4x M5 placeholder)?
- OQ-06 [sov<->actuator]: SOV NAMUR mount bolt TORQUE. Size confirmed M5 (Valmet p25); torque low per NAMUR - confirm value.
- OQ-07 [afr]: AFR-to-L-plate and L-plate-to-actuator fastener sizes/torques (M5/M6 placeholders)?
- OQ-09 [lsb]: Confirm limit switch model (Honeywell V15S05?) and LB1002 datasheet.
- OQ-10 [sov]: Confirm SV1007 electrical entry (1/2" NPT) and the ordered function (3/2 vs 5/2) for this build.
- OQ-11 [afr]: SB10 regulation range and gauge model/spec.
- OQ-12 [all tools]: Actual tool sizes (Allen key mm, spanner mm) used on the real build; golden list values are placeholders.
- OQ-13 [coupling]: Coupling: actuator drive confirmed = 14 mm A/F ISO 5211 bi-square (Valmet). Valve STEM square/flat size is NOT in the L&T catalogue dimension tables - get it from the valve GA drawing (drawings/15mm-...pdf) or L&T on request.
- OQ-15 [config-level (Config 2)]: Config 1 is now FAIL-CLOSE. Config 2 was defined as the fail-to-close 'opposite' of Config 1, so the contrast is broken (both fail-close); Config 2's own actuator code RNP80SR40C... is also spring-to-close (C). Decide: flip Config 2 to FAIL-OPEN (code A) to keep a two-config contrast, or accept both fail-close and drop the 'opposite' framing. Affects data/config02.json, docs/config02-ingestion.md, PROJECT-STATUS Config 2 section, and App.jsx toConfig2.
