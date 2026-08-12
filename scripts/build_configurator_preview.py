#!/usr/bin/env python3
"""
Build docs/configurator-preview.html: an interactive demo of the parts-knowledge DB.
Dropdowns are populated straight from the catalog; picking parts assembles a config
recipe (composite RIPPL code) and shows which parts already carry full engineering
knowledge (the flywheel) vs catalog skeletons.

Run from ValveOS/:  python3 scripts/build_configurator_preview.py
"""
import json, os, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB   = os.path.join(ROOT, "data", "parts-knowledge.json")
OUT  = os.path.join(ROOT, "docs", "configurator-preview.html")

d = json.load(open(DB)); parts = d["parts"]

# which categories feed each dropdown
GROUPS = {
    "Bare valve":  ["valve", "valve-ball-flanged", "valve-ball-socketweld", "butterfly-valve-pn10", "butterfly-valve-pn16"],
    "Actuator":    ["actuator", "electric-actuator"],
    "Solenoid (SOV)": ["sov"],
    "Limit switch box": ["limit-switch-box"],
    "Air filter reg (AFR)": ["afr"],
    "Gearbox / MOR": ["gearbox-mor"],
    "Positioner":  ["positioner"],
}

def code_of(p):  return p.get("itemSubCode") or p.get("partId")

# options per dropdown, and the enriched-knowledge facts per code
options, enriched = {}, {}
for label, cats in GROUPS.items():
    opts = []
    for k, p in parts.items():
        if p.get("category") in cats:
            o = p.get("oem", {})
            opts.append({"code": code_of(p), "model": o.get("model", ""), "make": o.get("make", "")})
    opts = sorted({o["code"]: o for o in opts if o["code"]}.values(), key=lambda x: x["code"])
    options[label] = opts

for k, p in parts.items():
    if p.get("status") == "catalog":
        continue
    c = code_of(p)
    if not c:
        continue
    facts = []
    for i in p.get("interfaces", []):
        s = i.get("standard", "") + (f" {i.get('size')}" if i.get("size") else "")
        if s.strip():
            facts.append(s.strip())
    for h in p.get("hookups", []):
        det = (h.get("detail") or "")
        if det:
            facts.append(det[:110] + ("…" if len(det) > 110 else ""))
    enriched[c] = {"name": p.get("displayName", ""), "facts": facts[:4]}

DATA = {"options": options, "enriched": enriched,
        "preset": {"Bare valve": "BV1121", "Actuator": "PA1019", "Solenoid (SOV)": "SV1007",
                   "Limit switch box": "LB1002", "Air filter reg (AFR)": "FR1001"}}

page = """<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>ValveOS configurator preview</title>
<style>
:root{--bg:#0f1216;--panel:#171b21;--edge:#262c34;--ink:#e8ecf1;--dim:#9aa4b0;--blue:#4b8bff;--green:#5fd396;--amber:#e8b451}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,sans-serif}
.wrap{max-width:900px;margin:0 auto;padding:26px}
h1{font-size:20px;margin:0 0 4px}.sub{color:var(--dim);font-size:13px;margin-bottom:22px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.f{display:flex;flex-direction:column;gap:5px}.f label{font-size:12px;color:var(--dim);text-transform:uppercase;letter-spacing:.5px}
select{padding:9px 11px;border-radius:9px;border:1px solid var(--edge);background:#10141a;color:var(--ink);font-size:14px}
.out{margin-top:24px;background:var(--panel);border:1px solid var(--edge);border-radius:14px;padding:18px 20px}
.code{font-size:20px;font-weight:700;color:var(--blue);letter-spacing:.5px;word-break:break-all}
.summary{color:var(--dim);font-size:13px;margin:6px 0 16px}
table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;color:var(--dim);border-bottom:1px solid var(--edge);padding:6px 8px;font-weight:600}
td{border-bottom:1px solid #20252c;padding:8px;vertical-align:top}td.c{color:var(--blue);font-weight:700;white-space:nowrap}
.badge{font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;white-space:nowrap}
.badge.k{background:#123a24;color:var(--green)}.badge.s{background:#3d2f10;color:var(--amber)}
.know{margin-top:18px}.know h3{font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:var(--dim);margin:0 0 8px}
.kcard{background:#12161c;border:1px solid var(--edge);border-left:3px solid var(--green);border-radius:8px;padding:10px 12px;margin-bottom:8px}
.kcard b{color:var(--blue)}.kcard ul{margin:6px 0 0;padding-left:18px}.kcard li{margin-bottom:3px;color:#cdd5df;font-size:12.5px}
.note{color:var(--dim);font-size:12px;margin-top:18px}
</style></head><body><div class="wrap">
<h1>ValveOS configurator &middot; live preview</h1>
<div class="sub">Every dropdown below is populated straight from the parts-knowledge database. Pick parts &rarr; a configuration assembles itself and the DB shows what it already knows about each part.</div>
<div class="grid" id="sel"></div>
<div class="out">
  <div class="code" id="code">&mdash;</div>
  <div class="summary" id="sum"></div>
  <table><thead><tr><th>slot</th><th>RIPPL code</th><th>model</th><th>make</th><th>knowledge</th></tr></thead><tbody id="bom"></tbody></table>
  <div class="know" id="know"></div>
</div>
<div class="note">Green = the DB already carries full engineering knowledge for that part (interfaces, torques, hookups, checks). Amber = catalog skeleton: identity known, specs filled in the first time it is used. That is the flywheel.</div>
</div>
<script>
const DATA = __DATA__;
const sel = document.getElementById('sel'); const slots = Object.keys(DATA.options);
slots.forEach(slot=>{
  const opts = DATA.options[slot];
  const wrap = document.createElement('div'); wrap.className='f';
  const req = ['Bare valve','Actuator'].includes(slot);
  wrap.innerHTML = `<label>${slot}${req?'':' (optional)'}</label>`;
  const s = document.createElement('select'); s.dataset.slot=slot;
  s.innerHTML = `<option value="">${req?'— select —':'— none —'}</option>` +
    opts.map(o=>`<option value="${o.code}">${o.code} — ${o.model||''} (${o.make||''})</option>`).join('');
  if(DATA.preset[slot]) s.value = DATA.preset[slot];
  s.addEventListener('change', render); wrap.appendChild(s); sel.appendChild(wrap);
});
function render(){
  const chosen=[]; document.querySelectorAll('#sel select').forEach(s=>{ if(s.value) chosen.push({slot:s.dataset.slot,code:s.value,
      opt:DATA.options[s.dataset.slot].find(o=>o.code===s.value)}); });
  document.getElementById('code').textContent = chosen.length? chosen.map(c=>c.code).join('-') : '—';
  const known = chosen.filter(c=>DATA.enriched[c.code]).length;
  document.getElementById('sum').textContent = chosen.length? `${chosen.length} parts · ${known} already carry full engineering knowledge · ${chosen.length-known} catalog skeletons` : 'Pick a valve and actuator to begin.';
  document.getElementById('bom').innerHTML = chosen.map(c=>{
    const k = !!DATA.enriched[c.code];
    return `<tr><td>${c.slot}</td><td class="c">${c.code}</td><td>${c.opt.model||''}</td><td>${c.opt.make||''}</td>
      <td><span class="badge ${k?'k':'s'}">${k?'full knowledge':'catalog skeleton'}</span></td></tr>`;
  }).join('');
  const kd = chosen.filter(c=>DATA.enriched[c.code]);
  document.getElementById('know').innerHTML = kd.length? '<h3>What the database knows about this build</h3>' + kd.map(c=>{
    const e=DATA.enriched[c.code];
    return `<div class="kcard"><b>${c.code}</b> — ${e.name}<ul>${e.facts.map(f=>`<li>${f}</li>`).join('')}</ul></div>`;
  }).join('') : '';
}
render();
</script></body></html>"""
page = page.replace("__DATA__", json.dumps(DATA))
open(OUT, "w").write(page)
print("wrote", OUT, "|", sum(len(v) for v in options.values()), "options across", len(options), "slots;", len(enriched), "enriched parts")
