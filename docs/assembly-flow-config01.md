# Golden step list — Config BV1121-PA1019-TP0026-PN00

**15 mm ball valve automation package. Fail-to-open, spring return.**
L&T L1RF1C-015mm valve · Valmet RNP50SR40 actuator · Rotex 30318 NAMUR SOV (24 VDC) ·
Valmet KS2V limit switch box · Shavo SB10 AFR · BK1001 bracket + coupling.

> This is a domain-informed **draft** to review with your best fitter, not final.
> Anything in **[confirm]** must be filled from the real job: actual torque, tool sizes, exact sequence.
> Do NOT trust the torque figures until your fitter or the OEM spec confirms them.

Legend: **3D** = step adds a part in the app animation · **Info** = instruction/test step with no new part.

| # | Type | Operation | Part / hardware added | Tool | Torque | Checks | Notes |
|---|------|-----------|----------------------|------|--------|--------|-------|
| 0 | Info | Kitting & verify | All parts per item code | — | — | Item code matches GA drawing; all parts present; correct valve size & actuator model | Confirm fail action = fail-to-open before starting |
| 1 | 3D | Mount & prep bare valve | Valve BV1121 | Bench vice | — | Valve clamped square; stem clean; ports oriented to line | Set valve to a known position for coupling |
| 2 | 3D | Fit mounting bracket | Bracket BK1001 + **4× bolts** | Allen key **[confirm mm]** | **[confirm]** Nm | Bracket seated flat on valve ISO 5211 pad; holes aligned; no rock | ISO 5211 interface |
| 3 | 3D | Fit drive coupling | Coupling + **grub screw** | Allen key **[confirm mm]** | **[confirm]** Nm | Coupling square on stem; flats/keyway engaged; grub screw tight | Links valve stem to actuator pinion |
| 4 | 3D | Mount actuator | Actuator PA1019 + **4× bolts** | Spanner **[confirm mm]** | **[confirm]** Nm | Actuator oriented for fail-to-open (spring return); coupling engaged in pinion; body square to bracket | Air ports accessible |
| 5 | Info | Set stroke / end stops | — | Screwdriver / Allen | — | Full 90° open and close; mechanical stops set; confirms fail position on air loss | VAC-standard stroke setting |
| 6 | 3D | Fit solenoid valve (SOV) | SOV SV1007 + **2× NAMUR screws + gasket** | Allen key **[confirm mm]** | **[confirm]** Nm | NAMUR gasket seated; ports 1-supply / 2-4 to actuator correct; ½" NPT cable entry clear | 3/2 NAMUR, 24 VDC |
| 7 | 3D | Fit air filter regulator | AFR FR1001 + mounting + **¼" tube** | Spanner **[confirm mm]** | — | Bowl drain points down; gauge readable; set 4–6 bar; tube run neat | ¼" BSP, 0.7–7 bar |
| 8 | 3D | Fit switch-box mounting | LSB adaptor + posts + **screws** | Allen key **[confirm mm]** | **[confirm]** Nm | Posts square to actuator top; stub coupling aligned to pinion | VDI/VDE 3845 interface |
| 9 | 3D | Fit limit switch box | LSB LB1002 + **screws** | Screwdriver | — | Box seated on posts; shaft coupled to pinion; cable entries positioned | 2× SPDT Honeywell V15S05 |
| 10 | Info | Set limit switches | — | Screwdriver | — | Cams set at OPEN and CLOSED; both SPDT switch cleanly; indication correct | Calibrate to actual stroke |
| 11 | Info | Air hookup & function test | — | — | 4–6.5 bar | Energise 24 VDC; cycle open/close; SOV functions; LSB indicates both ends; no air leaks at fittings | ¼" NPT air |
| 12 | Info | Body hydrostatic test | — | Test rig | 30 bar water | Hold per ISO 5208; no shell leakage | From GA drawing |
| 13 | Info | Seat leakage test | — | Test rig | 6 bar air | Seat leakage within ISO 5208 class | From GA drawing |
| 14 | Info | Final QC & tag | Indicator, ID tag | — | — | Red/yellow indicator fitted; item-code tag; PO reference; docs complete | Ready to ship |

## Notes for the fitter conversation
- Confirm the **real order** of steps 6–9 (some fitters fit the SOV after the LSB, or the AFR last).
- Capture the **actual tool size and torque** for every bolted joint (bracket, actuator, SOV, LSB posts).
- Note any **step that is easy to get wrong** (e.g. SOV port orientation, coupling engagement) so we can flag it as a caution in the app.
- Time each step during a real build so we get the **baseline metric** for the before/after story.

## How this maps to the app
- Every **3D** row is a part the animation already reveals; we'll swap the placeholder tool/torque/checks for the confirmed values.
- Every **Info** row becomes an instruction card with no new geometry (the app will show the step text, tool, and checks only).
- Fasteners (bolts/nuts) will be shown as a small reusable set placed at the joint for that step, with the torque callout.
