# ValveOS (working name)

Model-based work-instruction platform for valve automation assembly.
Customer zero: Rajdeep Industrial Products Pvt Ltd, Pune.
First build target: **15mm BV1121-PA1019-TP0026-PN00** (spring-return, fail-to-close).

## Folder structure

| Folder | What lives here |
|---|---|
| `raw/` | Downloaded STEP files (.stp/.step) from TraceParts/GrabCAD, before conversion. |
| `parts/` | Converted per-part 3D models (.glb). One file per component. |
| `cad/` | Editable CAD source (STL, FreeCAD files). Bracket STL for FreeCAD assembly is here. |
| `assemblies/` | Assembled configuration models, e.g. `config01_assembly.glb`. |
| `data/` | Step-sequence JSON, e.g. `config01_steps.json`. |
| `drawings/` | Source 2D PDF drawings + reference renders. |
| `docs/` | Supplier emails, download pick-list, notes. |
| `scripts/` | Helper scripts (bracket generator, preview render). |
| `app/` | The Vite + React + three.js web app (added later). |

## Status
- [x] Config #1 BOM defined (valve, actuator, SOV, LSB, AFR, bracket).
- [x] BR06 bracket built as 3D (parts/BR06_bracket.glb, cad/BR06_bracket.stl). Demo-grade approximation from 2D dims.
- [ ] Download generic STEP files for the other components (see docs/).
- [ ] Assemble in FreeCAD, export config01_assembly.glb.
- [ ] Scaffold the web app.

## Components (15mm BV1121)
| Part | Model | 3D status |
|---|---|---|
| Bare valve | L&T L1RF1C-015mm | download generic flanged ball valve |
| Actuator | Valmet RNP50SR40CA1GD | download generic rack-and-pinion actuator |
| SOV | Rotex 30318-5-2G | download generic NAMUR solenoid valve |
| Limit switch box | Valmet KS2V1A2NGRNN | download generic limit switch box |
| AFR | Shavo SB10-2GM2T | download generic filter regulator |
| Bracket + coupling | Rajdeep BK1001 (using BR06 stand-in) | DONE (approximation) |

GA stack-up dims for FreeCAD placement: A=108, B=90, C=13, D=11, E=332, F=175, G=156 mm.
