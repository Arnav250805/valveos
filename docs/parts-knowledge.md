# ValveOS parts-knowledge (plain mirror)
_Source: data/parts-knowledge.json. Browser view: docs/parts-knowledge.html. 15 active + 223 catalog. Updated 2026-07-21._

## Active parts
### valve (BV1121) - Bare ball valve, 15 mm, flanged, FULL bore
- category valve / status modeled / OEM L&T L1FF1C-015mm
- interface: ISO 5211 F03 (DN15, Class 150/300) - actuator mount (integral ISO 5211 top flange, M5 threads)
- interface: ASME B16.5 #150 (family spec, confirm for 15 mm) 15 mm / DN15 - process connection: flanged ASME B16.5 #150, FULL bore (per component list); face-to-face ASME B16.10
- fastener: stem nut (refit after lever removal) None x1 @ - [placeholder]
- rule: Valve is NOT split for automation; only the lever handle and nameplate are removed. (fitter decision 2026-07-13 (golden-steplist-config01.md))
- rule: Retain the nameplate; it is re-tied to the finished unit for tagging. (golden-steplist-config01.md A2/H3)
- rule: Note ball position (closed) before removing the lever. (golden-steplist-config01.md A2)
- rule: Materials (component list): body ASTM A216 WCB, stem ASTM A479 Type 316, trim CF8M/F316, seat PTFE; design ISO 17292; ends flanged ASME B16.5 #150. (VAC Standard Component List (RIPPL code / model / make = authoritative))
- provenance: CORRECTED from component list: model is L1FF1C-015mm (FULL bore), not L1RF1C (regular bore). ISO 5211 F03 read off the regular-bore catalogue table - re-confirm for full bore. Materials/design confirmed.

### lever (-) - Valve lever / hand-operating handle (removed during automation)
- category handle / status modeled / OEM L&T (supplied with the BV1121 valve)
- interface: valve stem  - hand operation (removed for automation)
- fastener: lever / stem nut None x1 @ - [placeholder]
- rule: Removed during automation: only the lever and nameplate come off (the valve is not split). Keep the nameplate; refit the stem nut. (golden-steplist-config01.md A2)
- rule: Note the ball position (closed) before removing the lever. (golden-steplist-config01.md A2)
- provenance: removal step confirmed; the lever .glb is a generated placeholder (swap real CAD later)

### bracket (BK1001) - Mounting bracket (valve-to-actuator)
- category bracket / status modeled / OEM Rajdeep Industrial Products BK1001
- interface: ISO 5211 valve top is ISO 5211 F03 (M5); Rajdeep bracket mounts to stop-plate ears (2x M6 per golden A3) - valve stop-plate mount (bracket underside)
- interface: ISO 5211 F05 (M6) - actuator base mount (bracket top)
- fastener: valve-to-bracket screws None x2 @ - [placeholder]
- rule: Bracket goes onto the VALVE first, right after the lever is removed. (fitter decision 2026-07-13 (golden-steplist-config01.md A3))
- rule: Bracket must sit flat with no rock. (golden-steplist-config01.md A3)
- provenance: custom part; actuator-side mount = F05/M6 confirmed (Arnav). Valve-side screw size/torque still open (OQ-02).

### coupling (BK1001) - Drive coupling / stem adapter
- category coupling / status modeled / OEM Rajdeep Industrial Products BK1001 (coupling)
- interface: valve stem flats  - valve stem engagement
- interface: actuator pinion (square/female drive)  - actuator drive engagement
- rule: Coupling seats on the valve stem flats, square tang up. (golden-steplist-config01.md A4)
- provenance: identity confirmed; stem/pinion dimensions unknown

### actuator (PA1019) - Pneumatic actuator, rack & pinion, spring return (fail-to-close / spring-to-close)
- category actuator / status modeled / OEM Neles (Valmet) RNP50SR40CA1GD
- interface: ISO 5211 F03 and F05 (dual drilling) - valve mount (base). Offers dual F03/F05; Rajdeep uses F05 (M6) to the bracket [Arnav 2026-07-17]
- interface: ISO 5211 bi-square drive 14 mm A/F - pinion female drive (to coupling)
- interface: NAMUR (VDMA 24563) 2x M5; 1/4" air port - SOV direct mount
- interface: VDI/VDE 3845  - accessory mount (top, for limit switch box)
- fastener: valve-mount bolts (ISO 5211 base to bracket) M6 (ISO 5211 F05) x4 @ - [size confirmed; torque placeholder]
- fastener: actuator end-cap / body bolts (part #9, service) M6 xNone @ 8 Nm [confirmed (internal service torque; NOT the valve-mount torque)]
- rule: Remove the top cap / position indicator and wipe clean before fitting the limit switch box. (golden-steplist-config01.md B1)
- rule: SR40 = 4.0 barg spring version (matches AFR set 4 bar). Action code C = spring-to-CLOSE, so the package is FAIL-CLOSE: the valve closes on loss of air. Confirmed by Arnav 2026-07-16. Air supply must meet the spring rating and must not exceed 8 barg (max supply); design pressure 10 barg. (Valmet catalogue p4 (pressures) + p28 (order code C) + Arnav 2026-07-16)
- rule: Confirm FAIL-TO-CLOSE (spring-to-close) orientation before final torque: the valve must go CLOSED on air loss. (golden-steplist-config01.md H1/H2; fail-action per Arnav 2026-07-16)
- hookup [air]: Operating media air/nitrogen. SR40 spring rated 4.0 barg (matches AFR set 4 bar). Max supply 8 barg, design 10 barg. Output torque RNP50-SR40 at 4 bar = 9-13 Nm (min-max over stroke). IP66/67, -20..+80 C (temp code G). Source: Valmet catalogue p4, p5. | Component list: full code RNP50SR40CA1GD, pneumatic connection 1/4" NPT, working supply max 6.5 bar(g). Code 'C' = spring-to-close (fail-close), consistent with the fail-action decision.
- provenance: Model RNP50SR40CA1GD confirmed (component list). OEM-confirmed (Valmet catalogue): pressures, spring rating, ISO 5211 flanges F03/F05, 14 mm bi-square drive, NAMUR M5. Fail-action = FAIL-CLOSE (spring-to-close, code C) confirmed by Arnav 2026-07-16. Open: valve-mount torque; F-code resolved: actuator uses F05/M6 to bracket, valve is F03 (Arnav 2026-07-17).

### sov (SV1007) - Solenoid valve (SOV), NAMUR, 3/2 (function per order)
- category sov / status modeled / OEM Rotex 30318-5-2G+I-24VDC-37
- interface: NAMUR (VDMA 24563) NAMUR (2x M5 from actuator face); 1/4" air ports - actuator mount
- fastener: SOV-to-actuator bolts None x2 @ - [placeholder]
- rule: Select 3/2 or 5/2 per customer and set the O-ring gate to the required port before mounting. (golden-steplist-config01.md D1)
- rule: Fit the rubber NAMUR plate with 2 O-rings; peel the protective film first. (golden-steplist-config01.md D2)
- rule: Blank all air holes except the middle (supply); fit the silencer/exhaust so it points clear. (golden-steplist-config01.md F1)
- rule: 3/2 normally-closed direct-acting NAMUR SOV; on de-energise/air-fail it returns (spring). Match the O-ring gate to the ordered function before mounting. (Rotex 30318 datasheet p1)
- hookup [air]: 3/2 direct-acting NAMUR solenoid, normally closed. Operating pressure 0-10 bar. Ports 1/4" (BSP or NPT). Direct-mount to the actuator NAMUR face. Source: Rotex 30318 datasheet.
- hookup [electrical]: 24 VDC coil; cable entry 1/2" NPT. Enclosure per suffix: -16 = weatherproof IP66/IP67 (component-list standard SV1005); -37 = FLAMEPROOF Ex d IIC T4/T6 IP67 (DB's SV1007). Confirm which applies to Config 1 (OQ-16). Source: Rotex 30318 datasheet.
- provenance: Rotex 30318 datasheet confirmed: 3/2 NC NAMUR, 24VDC, 0-10 bar, 1/4" ports, 1/2" NPT cable entry. CODE/CERT open (OQ-16): weatherproof -16 (SV1005) vs flameproof -37 (SV1007).

### afr (FR1001) - Air filter regulator (FRL), 1/4" BSP, with dial gauge
- category afr / status modeled / OEM Shavo SB10-2GM2T/RGK-NB
- interface: custom L-plate mount (afr-plate)  - mounting to actuator side
- interface: 1/4" BSP 1/4" - pneumatic ports (in/out)
- fastener: AFR body to L-plate None x2 @ - [placeholder]
- rule: Bowl / drain points down; mounting slots vertical for height adjustment. (golden-steplist-config01.md C2)
- rule: Thread the dial gauge into the gauge port with PTFE on the thread; gauge readable from the front. (golden-steplist-config01.md C1)
- rule: Set regulator to 4 bar for this build. (fitter decision 2026-07-13 (golden-steplist-config01.md H3))
- rule: PC (polycarbonate) bowl limits: max inlet 10.5 bar, max ambient 50 C. Regulator is the relieving type. (Shavo SB10 datasheet)
- hookup [air]: Ports G 1/4 BSP parallel (F). Filter element 25 micron; transparent polycarbonate bowl; manual drain; RELIEVING regulator. Regulated spring range 10-100 psi (0.70-7.0 bar) - Config 1 set 4 bar. Max inlet 10.5 bar (PC bowl); max ambient 50 C (PC bowl). Flow at 1/4" ~19 scfm, Cv 0.35. Source: Shavo SB10 datasheet + component list.
- provenance: OFFICIAL STEP received + converted (first real-geometry part). Shavo SB10 confirmed: G1/4 BSP, 25 micron, PC bowl, manual drain, relieving, spring range 0.7-7 bar, integral 40 mm dial gauge (Rc1/8, back). Mounting via optional bracket/panel - Config 1 uses a Rajdeep custom L-plate (OQ-07).

### lsb (LB1002) - Limit switch box (2x SPDT) with integral mounting bracket
- category limit-switch-box / status modeled / OEM Valmet KS2V1A2NGRNN+BKT
- interface: VDI/VDE 3845 VDI/VDE 3845 mounting face + NAMUR shaft - mounts directly on the actuator top; unit shaft couples to the actuator (NAMUR) shaft
- interface: NAMUR pinion shaft  - shaft to pinion adapter
- fastener: integral bracket feet to actuator top None x4 @ - [placeholder]
- rule: The LSB ships with its mounting bracket integral (the '+BKT' in KS2V1A2NGRNN+BKT). There is NO separate riser bracket; the box and bracket mount as ONE unit directly onto the actuator top. (shop photo IMG_5045 2026-07-14 (Arnav))
- rule: Engage the LSB shaft in the pinion adapter BEFORE the nuts are pulled tight. (golden-steplist-config01.md B2 (flagged critical))
- rule: Set cams to OPEN / CLOSED (round-2 test step, knowledge lives with the part). (golden-steplist-config01.md (deferred test))
- rule: Model coding: KS = K-series STANDARD housing, KC = K-series COMPACT housing; the '2' = two switch elements. Set the cams to the open/closed limits after mounting. (Neles K-series bulletin p1)
- hookup [electrical]: 2x SPDT mechanical switches (Honeywell V15S05-CZ100A05-01 per component list); IP67; housing epoxy powder-coated die-cast aluminium (LM6); cable entry 1/2" NPT (2 entries); temp -20 to +80 C general. Adjustable colour-coded cams; 90-deg open/closed visual indicator on the dome. Source: Neles K-series bulletin.
- provenance: Neles K-series confirmed: VDI/VDE 3845 + NAMUR shaft, IP67, 2x SPDT Honeywell V15, 1/2" NPT entry, die-cast alu housing, +BKT integral bracket. CODE open (OQ-17): KS2V (standard housing, DB LB1002) vs KC2V (compact housing, list LB1001).

### gauge (-) - Dial pressure gauge (integral to the Shavo AFR)
- category instrument / status planned / OEM Shavo (supplied with the AFR) 40 mm dial pressure gauge, Rc1/8 back connection (integral to Shavo AFR)
- interface: gauge port thread (AFR)  - threads into AFR gauge port
- provenance: Integral to the Shavo AFR (arrives in the AFR STEP). 40 mm dial, Rc1/8 back-connected, 0-150 psi (0-10 bar) recommended range. Not a Marsh part.

### afr-plate (-) - AFR mounting L-plate
- category bracket / status planned / OEM Rajdeep Industrial Products
- provenance: planned asset; not yet modeled or specced

### air-pipe (TB1001 (family)) - Bent air pipe (AFR to SOV)
- category tubing / status planned / OEM  SS304 1/4" tube + fittings
- interface: 1/4" tube fittings 1/4" - AFR out to SOV supply
- provenance: planned asset; geometry tied to AFR height

### namur-plate (-) - Rubber NAMUR adapter plate (SOV) with O-rings
- category seal / status planned / OEM
- interface: NAMUR (VDMA 24563)  - SOV to actuator seal
- provenance: planned asset; may fold into sov.glb

### boltnutset (-) - Reusable bolt + nut set (per bolted joint)
- category fastener / status planned / OEM
- provenance: planned reusable asset; carries torque callout per joint

### mor (MR1002) - Manual override / quarter-turn worm gearbox operator (handwheel declutchable)
- category manual-override / status modeled / OEM QTAPL QTM-250
- interface: square drive 11 x 11 mm - drive square (per part filename 'SQ11X11') - confirm whether input or valve-stem output
- interface: ISO 5211  - mounting flange (assumed; not yet confirmed from drawing)
- fastener: internal gearbox assembly fasteners (housing/cover/handwheel - service, not VAC assembly) M5, M6, M8 present xNone @ - [sizes from CAD tree; torque placeholder]
- provenance: PLACEHOLDER. Model converted from Arnav-supplied SolidWorks 2025 STEP (AP214) on 2026-07-20; 32-part assembly, part-tree names captured. No datasheet yet: OEM model QTM-250 (make QTAPL) read from filename/part names only. Interfaces, ratio, torque figure, mounting standard, and whether the 11x11 square is input or output all UNCONFIRMED. Do not use any spec from this record for assembly until confirmed.

### positioner (PR1001) - Electro-pneumatic positioner (weatherproof)
- category positioner / status library (accessory) / OEM Rotex RTX1000-R-D-2-R0-2G-4R-ST-FD-N (RTX1000R)
- interface: VDI/VDE 3845  - actuator top mount (accessory)
- hookup [electrical]: 4-20 mA input, rotary electro-pneumatic (per component list)
- provenance: library stub from official STEP + component list; used in positioner-controlled configs, not Config 1/2.

## Open questions
- OQ-02 [bracket<->valve]: Valve-to-bracket screw size and torque (2x socket-head)?
- OQ-03 [actuator]: Actuator valve-mount bolt TORQUE. Size CONFIRMED M6 (F05) [Arnav 2026-07-17]; torque not in the Valmet catalogue - set per M6 bolt grade (e.g. 8.8) or Rajdeep standard.
- OQ-05 [lsb<->actuator]: Riser stud size and nut torque (4x M5 placeholder)?
- OQ-06 [sov<->actuator]: SOV NAMUR mount bolt TORQUE. Size confirmed M5 (Valmet p25); torque low per NAMUR - confirm value.
- OQ-07 [afr]: AFR mounting fasteners: the Shavo bracket is optional/panel-mount; Config 1 mounts the AFR on a Rajdeep custom L-plate (afr-plate). Confirm the AFR-to-L-plate and L-plate-to-actuator fastener sizes/torques from the Rajdeep drawing.
- OQ-12 [all tools]: Actual tool sizes (Allen key mm, spanner mm) used on the real build; golden list values are placeholders.
- OQ-13 [coupling]: Coupling: actuator drive confirmed = 14 mm A/F ISO 5211 bi-square (Valmet). Valve STEM square/flat size is NOT in the L&T catalogue dimension tables - get it from the valve GA drawing (drawings/15mm-...pdf) or L&T on request.
- OQ-15 [config-level (Config 2)]: Config 1 is now FAIL-CLOSE. Config 2 was defined as the fail-to-close 'opposite' of Config 1, so the contrast is broken (both fail-close); Config 2's own actuator code RNP80SR40C... is also spring-to-close (C). Decide: flip Config 2 to FAIL-OPEN (code A) to keep a two-config contrast, or accept both fail-close and drop the 'opposite' framing. Affects data/config02.json, docs/config02-ingestion.md, PROJECT-STATUS Config 2 section, and App.jsx toConfig2.
- OQ-18 [mor]: QTM-250 gearbox datasheet needed: gear ratio, rated output torque, mounting standard (ISO 5211 flange size?), and IP/temp rating.
- OQ-19 [mor]: Is the 11x11 mm square the INPUT drive or the valve-stem OUTPUT? Confirm from GA drawing.
- OQ-20 [mor]: Which config(s) use the MOR, and does it mount between valve and actuator, or as a standalone manual operator? Confirm item sub-code.
- OQ-16 [sov]: SOV code + hazardous-area cert: DB uses SV1007 = 30318-...-24VDC-37 (FLAMEPROOF Ex d); the VAC component list standard is SV1005 = 30318-...-24VDC-16 (WEATHERPROOF). Same 3/2 24VDC 30318, different enclosure/cert. Confirm which is Config 1's standard (affects certification, not geometry).
- OQ-17 [lsb]: LSB code/housing: DB uses LB1002 = KS2V1A2NGRNN (KS = STANDARD housing); the VAC component list has LB1001 = KC2V1A3NGRNN+BKT (KC = COMPACT housing). Both are 2-switch NAMUR/VDI-VDE-3845 units - the difference is the housing type. Confirm which is Config 1's standard.

## Component catalog (code / model / make)

### actuator
- PA1001: RNP040DN00DA1GD (Neles (Valmet))
- PA1002: RNP050DN00DA1GD (Neles (Valmet))
- PA1003: RNP063DN00DA1GD (Neles (Valmet))
- PA1004: RNP080DN00DA1GD (Neles (Valmet))
- PA1005: RNP090DN00DA1GD (Neles (Valmet))
- PA1006: RNP100DN00DA1GD (Neles (Valmet))
- PA1007: RNP110DN00DA1GD (Neles (Valmet))
- PA1008: RNP125DN00DA1GD (Neles (Valmet))
- PA1009: RNP150DN00DA1GD (Neles (Valmet))
- PA1010: RNP175DN00DA1GD (Neles (Valmet))
- PA1011: RNP200DN00DA1GD (Neles (Valmet))
- PA1012: RNP250DN00DA1GD (Neles (Valmet))
- PA1013: RNP300DN00DA1GD (Neles (Valmet))
- PA1014: RNP350DN00DA1GD (Neles (Valmet))
- PA1016: RNP40SR40CA1GD (Neles (Valmet))
- PA1022: RNP63SR40CA1GD (Neles (Valmet))
- PA1025: RNP80SR40CA1GD (Neles (Valmet))
- PA1028: RNP90SR40CA1GD (Neles (Valmet))
- PA1031: RNP100SR40CA1GD (Neles (Valmet))
- PA1034: RNP110SR40CA1GD (Neles (Valmet))
- PA1037: RNP125SR40CA1GD (Neles (Valmet))
- PA1040: RNP150SR40CA1GD (Neles (Valmet))
- PA1043: RNP175SR40CA1GD (Neles (Valmet))
- PA1046: RNP200SR40CA1GD (Neles (Valmet))
- PA1049: RNP250SR40CA1GD (Neles (Valmet))
- PA1052: RNP300SR40CA1GD (Neles (Valmet))
- PA1055: RNP350SR40CA1GD (Neles (Valmet))
- PA1113: RNP040DN00DA1GD (Neles (Valmet))
- PA1114: RNP050DN00DA1GD (Neles (Valmet))
- PA1115: RNP063DN00DA1GD (Neles (Valmet))
- PA1116: RNP080DN00DA1GD (Neles (Valmet))
- PA1117: RNP090DN00DA1GD (Neles (Valmet))
- PA1118: RNP100DN00DA1GD (Neles (Valmet))
- PA1119: RNP110DN00DA1GD (Neles (Valmet))
- PA1120: RNP125DN00DA1GD (Neles (Valmet))
- PA1121: RNP150DN00DA1GD (Neles (Valmet))
- PA1122: RNP175DN00DA1GD (Neles (Valmet))
- PA1123: RNP200DN00DA1GD (Neles (Valmet))
- PA1124: RNP250DN00DA1GD (Neles (Valmet))
- PA1125: RNP300DN00DA1GD (Neles (Valmet))
- PA1126: RNP350DN00DA1GD (Neles (Valmet))
- PA1128: RNP40SR40CA1GD (Neles (Valmet))
- PA1131: RNP50SR40CA1GD (Neles (Valmet))
- PA1134: RNP63SR40CA1GD (Neles (Valmet))
- PA1137: RNP80SR40CA1GD (Neles (Valmet))
- PA1140: RNP90SR40CA1GD (Neles (Valmet))
- PA1143: RNP100SR40CA1GD (Neles (Valmet))
- PA1146: RNP110SR40CA1GD (Neles (Valmet))
- PA1149: RNP125SR40CA1GD (Neles (Valmet))
- PA1152: RNP150SR40CA1GD (Neles (Valmet))
- PA1155: RNP175SR40CA1GD (Neles (Valmet))
- PA1158: RNP200SR40CA1GD (Neles (Valmet))
- PA1161: RNP250SR40CA1GD (Neles (Valmet))
- PA1164: RNP300SR40CA1GD (Neles (Valmet))
- PA1167: RNP350SR40CA1GD (Neles (Valmet))
- PA1225: RNP50SR40AA1GD (Neles (Valmet))
- PA1226: RNP63SR40AA1GD (Neles (Valmet))
- PA1227: RNP125SR40AA1GD (Neles (Valmet))
- PA1228: RNP250SR40AA1GD (Neles (Valmet))
- PA1229: RNP40SR40AA1GD (Neles (Valmet))
- PA1230: RNP90SR40AA1GD (Neles (Valmet))

### butterfly-valve-pn10
- BF1001: 1IWE6CL-050mm (L&T)
- BF1002: 1IWE6CL-065mm (L&T)
- BF1003: 1IWE6CL-080mm (L&T)
- BF1004: 1IWE6CL-100mm (L&T)
- BF1005: 1IWE6CL-125mm (L&T)
- BF1006: 1IWE6CL-150mm (L&T)
- BF1007: 1IWE6CL-200mm (L&T)
- BF1008: 1IWE6CL-250mm (L&T)
- BF1009: 1IWE6CL-300mm (L&T)
- BF1010: 1IWE6CG-350mm (L&T)
- BF1011: 1IWE6CG-400mm (L&T)
- BF1012: 1IWE6CG-450mm (L&T)
- BF1013: 1IWE6CG-500mm (L&T)
- BF1014: 1IWE6CG-600mm (L&T)
- BF1015: 1IWEICL-050mm (L&T)
- BF1016: 1IWEICL-065mm (L&T)
- BF1017: 1IWEICL-080mm (L&T)
- BF1018: 1IWEICL-100mm (L&T)
- BF1019: 1IWEICL-125mm (L&T)
- BF1020: 1IWEICL-150mm (L&T)
- BF1021: 1IWEICL-200mm (L&T)
- BF1022: 1IWEICL-250mm (L&T)
- BF1023: 1IWE1CL-300mm (L&T)
- BF1024: 1IWE1CG-350mm (L&T)
- BF1025: 1IWE1CG-400mm (L&T)
- BF1026: 1IWE1CG-450mm (L&T)
- BF1027: 1IWE1CG-500mm (L&T)
- BF1028: 1IWE1CG-600mm (L&T)
- BF1029: 1IWNICL-050mm (L&T)
- BF1030: 1IWNICL-065mm (L&T)
- BF1031: 1IWNICL-080mm (L&T)
- BF1032: 1IWNICL-100mm (L&T)
- BF1033: 1IWNICL-125mm (L&T)
- BF1034: 1IWNICL-150mm (L&T)
- BF1035: 1IWNICL-200mm (L&T)
- BF1036: 1IWNICL-250mm (L&T)
- BF1037: 1IWN1CL-300mm (L&T)
- BF1038: 1IWN1CG-350mm (L&T)
- BF1039: 1IWN1CG-400mm (L&T)
- BF1040: 1IWN1CG-450mm (L&T)
- BF1041: 1IWN1CG-500mm (L&T)
- BF1042: 1IWN1CG-600mm (L&T)

### butterfly-valve-pn16
- BF1043: 2IWNGSL-050MM (L&T)
- BF1044: 2IWNGSL-065MM (L&T)
- BF1045: 2IWNGSL-080MM (L&T)
- BF1046: 2IWNGSL-100MM (L&T)
- BF1047: 2IWNGSL-125MM (L&T)
- BF1048: 2IWNGSL-150MM (L&T)
- BF1049: 2IWNGSL-200MM (L&T)
- BF1050: 2IWNGSL-250MM (L&T)
- BF1051: 2IWNGSL-300MM (L&T)

### electric-actuator
- EA1002: QT 5 (Marsh)
- EA1003: QT 10 (Marsh)

### limit-switch-box
- LB1001: KC2V1A3NGRNN+BKT (Neles (Valmet))

### sov
- SV1001: 51424-6-2G+I-24VDC-16 (Rotex)
- SV1002: 51424-6-2G+I-230V 50Hz-16 (Rotex)
- SV1005: 30318-5-2G+I-24VDC-16 (Rotex)
- SV1006: 30318-5-2G+III-230V 50Hz-16 (Rotex)

### valve-ball-flanged
- BV1101: L2FF1C-015mm (L&T)
- BV1102: L2FF1C-020mm (L&T)
- BV1103: L2FF1C-025mm (L&T)
- BV1104: L2FF1C-040mm (L&T)
- BV1105: L2FF1C-050mm (L&T)
- BV1106: L2FF1C-065mm (L&T)
- BV1107: L2FF1C-080mm (L&T)
- BV1108: L2FF1C-0100mm (L&T)
- BV1109: L2FF1C-0150mm (L&T)
- BV1110: L2FF1C-0200mm (L&T)
- BV1111: L2FF1S-015mm (L&T)
- BV1112: L2FF1S-020mm (L&T)
- BV1113: L2FF1S-025mm (L&T)
- BV1114: L2FF1S-040mm (L&T)
- BV1115: L2FF1S-050mm (L&T)
- BV1116: L2FF1S-065mm (L&T)
- BV1117: L2FF1S-080mm (L&T)
- BV1118: L2FF1S-0100mm (L&T)
- BV1119: L2FF1S-0150mm (L&T)
- BV1120: L2FF1S-0200mm (L&T)
- BV1122: L1RF1C-020mm (L&T)
- BV1123: L1RF1C-025mm (L&T)
- BV1124: L1RF1C-040mm (L&T)
- BV1125: L1RF1C-050mm (L&T)
- BV1126: L1RF1C-065mm (L&T)
- BV1127: L1RF1C-080mm (L&T)
- BV1128: L1RF1C-100mm (L&T)
- BV1129: L1RF1C-150mm (L&T)
- BV1130: L1FF1S-015mm (L&T)
- BV1131: L1RF1S-020mm (L&T)
- BV1132: L1RF1S-025mm (L&T)
- BV1133: L1RF1S-040mm (L&T)
- BV1134: L1RF1S-050mm (L&T)
- BV1135: L1RF1S-065mm (L&T)
- BV1136: L1RF1S-080mm (L&T)
- BV1137: L1RF1S-100mm (L&T)
- BV1138: L1RF1S-150mm (L&T)
- BV1245: L3FF1C-015mm (L&T)
- BV1246: L3RF1C-020mm (L&T)
- BV1247: L3RF1C-025mm (L&T)
- BV1248: L3RF1C-040mm (L&T)
- BV1249: L3RF1C-050mm (L&T)
- BV1250: L3FF1S-015mm (L&T)
- BV1251: L3RF1S-020mm (L&T)
- BV1252: L3RF1S-025mm (L&T)
- BV1253: L3RF1S-040mm (L&T)
- BV1254: L3RF1S-050mm (L&T)
- BV1327: L1FF1CP-015mm (L&T)
- BV1328: L1RF1CP-020mm (L&T)
- BV1329: L1RF1CP-025mm (L&T)
- BV1330: L1RF1CP-040mm (L&T)
- BV1331: L1RF1CP-050mm (L&T)
- BV1332: L1RF1CP-065mm (L&T)
- BV1333: L1RF1CP-080mm (L&T)
- BV1334: L1RF1CP-100mm (L&T)
- BV1335: L1RF1CP-150mm (L&T)
- BV1336: L2FF1CP-015mm (L&T)
- BV1337: L2FF1CP-020mm (L&T)
- BV1338: L2FF1CP-025mm (L&T)
- BV1339: L2FF1CP-040mm (L&T)
- BV1340: L2FF1CP-050mm (L&T)
- BV1341: L2FF1CP-065mm (L&T)
- BV1342: L2FF1CP-080mm (L&T)
- BV1343: L2FF1CP-0100mm (L&T)
- BV1344: L2FF1CP-0150mm (L&T)
- BV1345: L2FF1CP-0200mm (L&T)
- BV1480: L1RF1SP-020mm (L&T)
- BV1481: L1RF1SP-025mm (L&T)
- BV1482: L1RF1SP-040mm (L&T)
- BV1483: L1RF1SP-050mm (L&T)
- BV1484: L1RF1SP-065mm (L&T)
- BV1485: L1RF1SP-080mm (L&T)
- BV1486: L1RF1SP-100mm (L&T)
- BV1487: L1RF1SP-150mm (L&T)

### valve-ball-socketweld
- BV1205: L3FSWC-015mm (L&T)
- BV1206: L3RSWC-020mm (L&T)
- BV1207: L3RSWC-025mm (L&T)
- BV1209: L3RSWC-040mm (L&T)
- BV1210: L3RSWC-050mm (L&T)
- BV1211: L3FSWS-008mm (L&T)
- BV1212: L3FSWS-010mm (L&T)
- BV1213: L3FSWS-015mm (L&T)
- BV1214: L3RSWS-020mm (L&T)
- BV1215: L3RSWS-025mm (L&T)
- BV1217: L3RSWS-040mm (L&T)
- BV1218: L3RSWS-050mm (L&T)
- BV1219: L3FSWC-020mm (L&T)
- BV1220: L3FSWC-025mm (L&T)
- BV1221: L3FSWC-032mm (L&T)
- BV1222: L3FSWC-040mm (L&T)
- BV1223: L3FSWC-050mm (L&T)
- BV1224: L3FSWS-020mm (L&T)
- BV1225: L3FSWS-025mm (L&T)
- BV1226: L3FSWS-032mm (L&T)
- BV1227: L3FSWS-040mm (L&T)
- BV1228: L3FSWS-050mm (L&T)
- BV1528: L3FSWSP-008mm (L&T)
- BV1529: L3FSWSP-010mm (L&T)
- BV1530: L3FSWSP-015mm (L&T)
- BV1531: L3RSWSP-020mm (L&T)
- BV1532: L3RSWSP-025mm (L&T)
- BV1533: L3RSWSP-032mm (L&T)
- BV1534: L3RSWSP-040mm (L&T)
- BV1535: L3RSWSP-050mm (L&T)
