# Component download pick-list (generic STEP for MVP)

Download in your browser this weekend. No supplier needed. Prefer TraceParts for clean STEP
exports; GrabCAD is faster for finding a whole part but quality varies. Save all into `raw/`.

| Part | Search term | Where | Note |
|---|---|---|---|
| Ball valve | "flanged ball valve" / "2-way ball valve DN15" | TraceParts | Pick one with visible flanges. |
| Actuator | "rack and pinion pneumatic actuator" / "quarter-turn actuator" | GrabCAD or TraceParts | Ridged body reads as an actuator. |
| SOV | "NAMUR solenoid valve" | GrabCAD | Small block on the actuator. |
| Positioner | "valve positioner" (Siemens SIPART, Rotork YT) | GrabCAD | Optional visual centerpiece. |
| Limit switch box | "limit switch box valve" / "APL switch box" | GrabCAD | Domed box on top. |
| AFR / FRL | "filter regulator FRL" | TraceParts | Optional 3rd accessory. |

## Download rules
- Prefer STEP (.stp / .step), AP242 if offered.
- Keep each file under ~20 MB.
- No color is fine; FreeCAD handles it.
- Drop everything into `raw/`.

## Domain note
A positioner and a solenoid do not normally sit on the same valve (positioner = modulating,
SOV = on/off). For one realistic package use SOV + limit switch box + AFR. Mixing in a
positioner is fine only if the demo is meant to show the range of accessories the tool handles.
