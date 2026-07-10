# Master prompt for the new "assembly flow" chat

Paste everything below into the new chat.

---

Arnav here, continuing the Dirac x VAC project. We've already built a working browser 3D
assembly viewer; now I want to focus on the assembly flow and the work-instruction content.

Before doing anything else, read these files in my selected folder to get full context, then
tell me in a few lines what the current app does so I know you're oriented:
- `ValveOS/docs/PROJECT-STATUS.md` (current status, tech stack, gotchas, file layout)
- `ValveOS/docs/assembly-flow-config01.md` (the draft golden step list)
- `ValveOS/app/src/App.jsx` (the app — the `STEPS` array drives the animated build)

Current state in one line: a Vite + React + three.js app at `ValveOS/app` plays an 8-step
animated assembly of config BV1121 (15 mm valve package); parts are `.glb` files in
`ValveOS/app/public`; positions are baked into the `STEPS` array in `App.jsx`; git is committed.

What I'm going to do: I'll watch one of my assembly men build the unit and write a full,
real assembly-flow document myself, then give it to you.

What I want you to do:
1. Get up to speed from the files above and confirm you understand the app structure.
2. Help me turn my observed assembly-flow document into the finalized golden step list.
3. Then wire it into the app, one small testable step at a time:
   - replace placeholder tool/torque/checks with my real values,
   - add support for Info/test steps (instruction cards with no new part: stroke test, hydro
     test, seat leakage, QC),
   - add a reusable bolt + nut set placed at the bolted joints, with the torque callout per step.

Rules: start every reply with "Arnav,". Be concise, no em-dashes or buzzwords in any email you
draft. Have me commit to git at each working state. The dev server runs with `npm run dev` in
`ValveOS/app`.

---
