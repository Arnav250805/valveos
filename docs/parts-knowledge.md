# ValveOS parts-knowledge database (human mirror)

_Machine source of truth: `ValveOS/data/parts-knowledge.json`. This markdown is a read-by-eye mirror; edit the JSON, then regenerate this._

**Model.** Knowledge attaches to the PART (`partId` / `itemSubCode`), never to a step or a single manual. Configs are thin recipes that reference `partId` and pull tool/torque/check content from here at render time.

**Primary key.** `partId` matches the `STEPS` id in `app/src/App.jsx`; the Rajdeep item sub-code is stored as `itemSubCode`.

**Resolution order (most specific wins).** part -> relationship -> interfaceRule -> categoryDefault.

**Safety rule.** No torque, fastener size, or spec is ever invented. Unconfirmed values are `null` with confidence `placeholder`/`unknown` and listed in Open Questions.

**Populated:** Config 1 = `BV1121-PA1019-TP0026-PN00` (15 mm L&T ball valve package, fail-to-open). _Last updated 2026-07-14._

---

## Parts (Config 1)

| partId | itemSubCode | part | category | OEM / model | status |
|---|---|---|---|---|---|
| valve | BV1121 | Bare ball valve, 15 mm, flanged | valve | L&T L1RF1C-015 | modeled |
| bracket | BK1001 | Mounting bracket (valve-to-actuator) | bracket | Rajdeep (custom) | modeled |
| coupling | BK1001 | Drive coupling / stem adapter | coupling | Rajdeep (custom) | modeled |
| actuator | PA1019 | Actuator, R&P, spring return (fail-to-open) | actuator | Valmet RNP50SR40 | modeled |
| sov | SV1007 | Solenoid valve, NAMUR, 3/2 | sov | Rotex 30318-5-2G+I-24VDC-37 | modeled |
| afr | FR1001 | Air filter regulator, 1/4" BSP + gauge | afr | Shavo SB10-2GM2T/RGK-NB | modeled |
| lsb | LB1002 | Limit switch box (2x SPDT), **integral bracket** | limit-switch-box | Valmet KS2V1A2NGRNN**+BKT** | modeled |

> The LSB includes its mounting bracket (the `+BKT`) and mounts as one unit directly onto the actuator top. There is **no separate riser bracket** (confirmed from shop photo, 2026-07-14). The old `lsbmount` part record has been removed.

### Planned assets (knowledge home exists; not yet modeled)

`gauge` (dial gauge) · `afr-plate` (AFR L-plate) · `air-pipe` (bent 1/4" AFR-to-SOV) · `namur-plate` (rubber SOV adapter + O-rings) · `boltnutset` (reusable bolt/nut, carries torque callout).

---

## Key part rules (confirmed, sourced)

- **valve** — Not split for automation; only lever + nameplate removed. Retain nameplate for tagging. Note ball position (closed) before lever removal. _(fitter decision 2026-07-13)_
- **bracket** — Goes on the valve FIRST, right after lever removal. Must sit flat, no rock. _(A3)_
- **coupling** — Seats on stem flats, square tang up. _(A4)_
- **actuator** — Remove position indicator/top cap before fitting the LSB. Confirm fail-to-open orientation before final torque. _(B1, H1/H2)_
- **sov** — Set the O-ring gate to 3/2 or 5/2 per order. Peel film, seat O-rings on the NAMUR plate. Blank all holes except the middle supply; exhaust points clear. _(D1, D2, F1)_
- **afr** — Bowl/drain down, slots vertical for height. Gauge threaded with PTFE, readable front. Set 4 bar. _(C1, C2, H3)_
- **lsb** — Ships with its bracket integral (the `+BKT`); mounts as one unit directly onto the actuator top, no separate riser. Engage the shaft in the pinion adapter BEFORE nuts are pulled tight (critical). Set cams OPEN/CLOSED. _(shop photo 2026-07-14; B2)_

## Relationships (interface knowledge)

| pair | interface | key rule |
|---|---|---|
| bracket ↔ valve | ISO 5211 | Fits over stem onto stop-plate ears; 2x socket-head. |
| coupling ↔ actuator | pinion drive | Rotate to align tang; never force. |
| lsb ↔ actuator | VDI/VDE 3845 + pinion shaft | LSB's integral bracket bolts direct to actuator top; engage shaft before pulling nuts (critical). |
| sov ↔ actuator | NAMUR (VDMA 24563) | Compress O-rings evenly; supply open, exhaust clear. |
| afr ↔ sov | air train (1/4" tube) | Bent pipe AFR-out to SOV supply; geometry follows AFR height. |

## Interface-class tier (scalability lever, to be populated)

- **ISO 5211** — valve/actuator/bracket mounting flange. Tabulate fastener + bolt pattern per F0x code.
- **NAMUR (VDMA 24563)** — SOV direct mount. Footprint fixed; fasteners to confirm.
- **VDI/VDE 3845** — accessory (LSB / positioner) top mount. Pattern fixed; fasteners to confirm.

## Category defaults

- **actuator-spring-return** — Remove position indicator before top accessories; confirm fail-action before final torque.
- **sov** — Peel film, seat O-rings, blank unused ports.

---

## Open questions (unconfirmed specs — confirm with fitter / OEM)

| ID | Part | Question |
|---|---|---|
| OQ-01 | valve/actuator/bracket | ISO 5211 flange size (F03/F04/F05...) for BV1121 top and PA1019 base? |
| OQ-02 | bracket↔valve | Valve-to-bracket screw size and torque (2x socket-head)? |
| OQ-03 | actuator | Base bolt size and torque (4x, ~20 Nm placeholder)? |
| OQ-04 | actuator | RNP50SR40 operating pressure range + datasheet? |
| OQ-05 | lsb↔actuator | LSB integral-bracket bolt size and torque (4x)? |
| OQ-06 | sov↔actuator | SOV mounting bolt size and torque (2x, ~6 Nm placeholder)? |
| OQ-07 | afr | AFR-to-plate and plate-to-actuator fastener sizes/torques? |
| OQ-09 | lsb | Confirm switch model (Honeywell V15S05?) + LB1002 datasheet. |
| OQ-10 | sov | Confirm electrical entry (1/2" NPT) and 3/2 vs 5/2 for this order. |
| OQ-11 | afr | SB10 regulation range + gauge model. |
| OQ-12 | tools | Real tool sizes (Allen key mm, spanner mm); golden values are placeholders. |
| OQ-13 | coupling | Valve stem flat size + pinion drive size. |

_Resolved: OQ-08 (LSB riser vs custom) — the bracket is the Valmet `+BKT`, shipped integral with the LSB. No separate part._


---

## Config 2 additions (2026-07-14) — 40 mm package, fail-to-close

Ingested from `drawings/40mm-BV1121-PA1019-TP0191-CL00.pdf`. Two NEW part records were
added with their **own** partIds so a 40 mm valve can never inherit 15 mm specs.

**valve40** (itemSubCode **BV1124**) — Bare ball valve, 40 mm, flanged.
L&T L1RF1C-040, ASME Class 150, ASTM A216 WCB body, CF8M/F316 ball, PTFE seat,
body hydro 30 bar / seat 6 bar (ISO 5208), -20 to 180 C. ISO 5211 flange size = null (OQ-15).

**actuator80** (itemSubCode **PA1025**) — Valmet RNP80SR40CA1GD, rack & pinion, spring
return 90 deg, **FAIL-TO-CLOSE** (opposite of Config 1), air 4-6.5 barg, 1/4" NPT.
Base bolt size/torque = null (OQ-17). ISO 5211 size = null (OQ-15).

Reused unchanged (flywheel): bracket + coupling (BK1001), sov (SV1007), afr (FR1001),
lsbmount, lsb (LB1002), tubing (TB1001).

New open questions: OQ-14 (ratify official item code), OQ-15 (ISO 5211 size), OQ-16
(valve40-to-bracket torque), OQ-17 (actuator80 base bolt torque), OQ-18 (BK1001 40 mm
geometry same or resized), OQ-19 (STEP files for the two new parts).

Config recipe: `data/config02.json`. Full ingestion + query log: `docs/config02-ingestion.md`.
