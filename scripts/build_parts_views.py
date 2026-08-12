#!/usr/bin/env python3
"""
Regenerate the human views of the parts-knowledge database.
Reads   data/parts-knowledge.json   (the machine source of truth)
Writes  docs/parts-knowledge.html   (browser view -- open this one)
        docs/parts-knowledge.md      (plain-text mirror, optional)

Active parts (status != 'catalog') render as rich cards.
Catalog skeletons (status == 'catalog') render as one searchable table.

Run from the ValveOS folder:   python3 scripts/build_parts_views.py
"""
import json, html, os, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "data", "parts-knowledge.json")
HTML = os.path.join(ROOT, "docs", "parts-knowledge.html")
MD   = os.path.join(ROOT, "docs", "parts-knowledge.md")

d = json.load(open(SRC))
meta = d.get("meta", {})
allparts = d.get("parts", {})
parts   = {k: v for k, v in allparts.items() if v.get("status") != "catalog"}
catalog = {k: v for k, v in allparts.items() if v.get("status") == "catalog"}
rels = d.get("relationships", [])
irules = d.get("interfaceRules", [])
cdefaults = d.get("categoryDefaults", [])
oqs = d.get("openQuestions", [])

def e(x): return html.escape("" if x is None else str(x))

def badge(conf):
    c = (conf or "").lower()
    if "confirm" in c and "placeholder" not in c: cls = "ok"
    elif "placeholder" in c: cls = "warn"
    elif "unknown" in c: cls = "muted"
    else: cls = "info"
    return f'<span class="badge {cls}">{e(conf) or "-"}</span>'

def fasteners_html(fs):
    if not fs: return '<div class="empty">none</div>'
    rows = ""
    for f in fs:
        tq = f.get("torqueNm"); tq = f"{tq} Nm" if tq is not None else "&mdash;"
        rows += (f"<tr><td>{e(f.get('role'))}</td><td>{e(f.get('size'))}</td>"
                 f"<td>{e(f.get('count'))}</td><td>{tq}</td><td>{badge(f.get('confidence'))}</td>"
                 f"<td class='src'>{e(f.get('source'))}</td></tr>")
    return ('<table class="sub"><thead><tr><th>role</th><th>size</th><th>count</th>'
            '<th>torque</th><th>confidence</th><th>source</th></tr></thead>'
            f'<tbody>{rows}</tbody></table>')

def part_card(pid, p):
    oem = p.get("oem", {})
    oem_s = " / ".join([x for x in [oem.get("make"), oem.get("model")] if x]) or "&mdash;"
    ds = oem.get("datasheetRef")
    ifaces = "".join(
        f'<li><b>{e(i.get("standard"))}</b>{(" &middot; " + e(i.get("size"))) if i.get("size") else ""}'
        f' &mdash; {e(i.get("role"))}{(" <span class=src>[" + e(i.get("source")) + "]</span>") if i.get("source") else ""}</li>'
        for i in p.get("interfaces", []))
    rules = "".join(
        f'<li>{e(r.get("text"))}<div class="why">why: {e(r.get("why"))} &middot; <span class="src">{e(r.get("source"))}</span></div></li>'
        for r in p.get("rules", []))
    checks = "".join(f'<li>{e(c.get("text"))} <span class="acc">&rarr; {e(c.get("acceptance"))}</span></li>'
                     for c in p.get("checks", []))
    hookups = "".join(f'<li><b>{e(h.get("type"))}</b>: {e(h.get("detail"))}</li>' for h in p.get("hookups", []))
    prov = p.get("provenance", {})
    status = e(p.get("status")); status_cls = "ok" if status == "modeled" else "muted"
    sub = e(p.get("itemSubCode")) or "&mdash;"
    return f'''
    <section class="card" data-search="{e(pid)} {e(p.get('itemSubCode'))} {e(p.get('displayName'))} {e(oem_s)} {e(p.get('category'))}">
      <div class="card-h"><div><span class="pid">{e(pid)}</span> <span class="sub">{sub}</span></div>
        <span class="badge {status_cls}">{status}</span></div>
      <div class="dn">{e(p.get('displayName'))}</div>
      <div class="meta-row"><span>{e(p.get('category'))}</span><span>{oem_s}</span>
        {f'<span class="ds">{e(ds)}</span>' if ds else ''}</div>
      {f'<div class="fld"><div class="lbl">interfaces</div><ul>{ifaces}</ul></div>' if ifaces else ''}
      <div class="fld"><div class="lbl">tools</div><div>{e(", ".join(p.get("tools", []))) or "&mdash;"}</div></div>
      <div class="fld"><div class="lbl">fasteners</div>{fasteners_html(p.get("fasteners", []))}</div>
      {f'<div class="fld"><div class="lbl">rules</div><ul class="rules">{rules}</ul></div>' if rules else ''}
      {f'<div class="fld"><div class="lbl">checks</div><ul>{checks}</ul></div>' if checks else ''}
      {f'<div class="fld"><div class="lbl">hookups</div><ul>{hookups}</ul></div>' if hookups else ''}
      <div class="prov">updated {e(prov.get("lastUpdated"))} &middot; {e(prov.get("overallConfidence"))}</div>
    </section>'''

def rel_card(r):
    pair = " &harr; ".join(r.get("pair", []))
    rules = "".join(f"<li>{e(x.get('text'))} <span class='src'>[{e(x.get('source'))}]</span></li>" for x in r.get("rules", []))
    checks = "".join(f"<li>{e(c.get('text'))} <span class='acc'>&rarr; {e(c.get('acceptance'))}</span></li>" for c in r.get("checks", []))
    return f'''<section class="card rel"><div class="card-h"><span class="pid">{pair}</span>
      <span class="badge info">{e(r.get("interfaceStandard"))}</span></div>
      {f'<div class="fld"><div class="lbl">rules</div><ul class="rules">{rules}</ul></div>' if rules else ''}
      {f'<div class="fld"><div class="lbl">fasteners</div>{fasteners_html(r.get("fasteners", []))}</div>' if r.get("fasteners") else ''}
      {f'<div class="fld"><div class="lbl">checks</div><ul>{checks}</ul></div>' if checks else ''}</section>'''

# catalog table (grouped by category)
cat_rows = ""
for cat in sorted({p.get("category","") for p in catalog.values()}):
    members = sorted([p for p in catalog.values() if p.get("category")==cat], key=lambda p: p["partId"])
    cat_rows += f'<tr class="catgrp"><td colspan="3">{e(cat)} &middot; {len(members)}</td></tr>'
    for p in members:
        o=p.get("oem",{})
        cat_rows += (f'<tr class="catrow" data-s="{e(p["partId"])} {e(o.get("model"))} {e(o.get("make"))} {e(cat)}">'
                     f'<td class="pid">{e(p["partId"])}</td><td>{e(o.get("model"))}</td><td>{e(o.get("make"))}</td></tr>')

oq_rows = "".join(f"<tr><td class='pid'>{e(q.get('id'))}</td><td>{e(q.get('part'))}</td><td>{e(q.get('question'))}</td></tr>" for q in oqs)
parts_html = "".join(part_card(k, v) for k, v in parts.items())
rels_html = "".join(rel_card(r) for r in rels)
irules_html = "".join(f"<li><b>{e(i.get('key'))}</b> &mdash; {e(i.get('appliesTo'))} <span class='src'>[{e(i.get('source'))}]</span></li>" for i in irules)
cdef_html = "".join(f"<li><b>{e(c.get('category'))}</b>: " + "; ".join(e(r.get('text')) for r in c.get('rules', [])) + "</li>" for c in cdefaults)

page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>ValveOS parts-knowledge</title>
<style>
:root{{--bg:#0f1216;--panel:#171b21;--edge:#262c34;--ink:#e8ecf1;--dim:#9aa4b0;--blue:#4b8bff;}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--bg);color:var(--ink);font:14px/1.5 system-ui,-apple-system,sans-serif}}
header{{position:sticky;top:0;background:rgba(15,18,22,.95);backdrop-filter:blur(6px);border-bottom:1px solid var(--edge);padding:14px 22px;z-index:5}}
h1{{font-size:17px;margin:0 0 3px}} .muted-txt{{color:var(--dim);font-size:12px}}
.wrap{{max-width:1080px;margin:0 auto;padding:22px}}
input.q{{width:100%;max-width:380px;margin-top:10px;padding:8px 12px;border-radius:8px;border:1px solid var(--edge);background:#10141a;color:var(--ink);font-size:14px}}
h2{{font-size:13px;letter-spacing:1px;text-transform:uppercase;color:var(--dim);margin:30px 0 12px;border-bottom:1px solid var(--edge);padding-bottom:6px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:14px}}
.card{{background:var(--panel);border:1px solid var(--edge);border-radius:12px;padding:14px 16px}} .card.rel{{background:#14181f}}
.card-h{{display:flex;justify-content:space-between;align-items:center;gap:8px}}
.pid{{font-weight:700;color:var(--blue)}} .sub{{color:var(--dim);font-size:12px;margin-left:4px}}
.dn{{font-weight:600;margin:6px 0 4px}}
.meta-row{{display:flex;flex-wrap:wrap;gap:10px;color:var(--dim);font-size:12px;margin-bottom:8px}} .meta-row .ds{{color:#7fa7e6}}
.fld{{margin:10px 0}} .lbl{{font-size:11px;letter-spacing:.5px;text-transform:uppercase;color:var(--dim);margin-bottom:4px}}
ul{{margin:4px 0;padding-left:18px}} li{{margin-bottom:5px}}
.rules .why{{color:var(--dim);font-size:12px}} .acc{{color:var(--dim)}} .src{{color:#6f7a86;font-size:11px}}
table.sub{{width:100%;border-collapse:collapse;font-size:12px}} table.sub th{{text-align:left;color:var(--dim);border-bottom:1px solid var(--edge);padding:3px 6px}}
table.sub td{{border-bottom:1px solid #20252c;padding:4px 6px;vertical-align:top}}
.badge{{font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;white-space:nowrap}}
.badge.ok{{background:#123a24;color:#5fd396}} .badge.warn{{background:#3d2f10;color:#e8b451}} .badge.muted{{background:#262c34;color:#9aa4b0}} .badge.info{{background:#152742;color:#6ea8ff}}
.prov{{margin-top:10px;padding-top:8px;border-top:1px solid var(--edge);color:var(--dim);font-size:11px}} .empty{{color:var(--dim);font-size:12px}}
table.oq,table.cat{{width:100%;border-collapse:collapse}} table.oq th,table.cat th{{text-align:left;color:var(--dim);border-bottom:1px solid var(--edge);padding:6px 8px}}
table.oq td{{border-bottom:1px solid #20252c;padding:8px;vertical-align:top}} table.oq td.pid{{color:var(--blue);font-weight:700;white-space:nowrap}}
table.cat td{{border-bottom:1px solid #20252c;padding:5px 8px}} table.cat td.pid{{color:var(--blue);font-weight:700}}
tr.catgrp td{{background:#14181f;color:var(--dim);text-transform:uppercase;font-size:11px;letter-spacing:.5px;font-weight:700;padding-top:12px}}
</style></head><body>
<header><h1>ValveOS &middot; parts-knowledge database</h1>
  <div class="muted-txt">{len(parts)} active parts &middot; {len(catalog)} catalog components &middot; keyed by RIPPL code &middot; updated {e(meta.get("lastUpdated",""))}</div>
  <input id="q" class="q" placeholder="filter active parts...">
</header>
<div class="wrap">
  <h2>Active parts ({len(parts)}) &mdash; in a config, datasheet-enriched</h2>
  <div class="grid" id="parts">{parts_html}</div>
  <h2>Relationships ({len(rels)})</h2>
  <div class="grid">{rels_html}</div>
  <h2>Interface rules &middot; Category defaults</h2>
  <div class="card"><div class="fld"><div class="lbl">interface rules</div><ul>{irules_html or "<li class=empty>none</li>"}</ul></div>
  <div class="fld"><div class="lbl">category defaults</div><ul>{cdef_html or "<li class=empty>none</li>"}</ul></div></div>
  <h2>Component catalog ({len(catalog)}) &mdash; every stocked RIPPL code (code / model / make)</h2>
  <input id="qc" class="q" placeholder="search catalog by code, model, make...">
  <table class="cat"><thead><tr><th>RIPPL code</th><th>Model</th><th>Make</th></tr></thead><tbody id="cat">{cat_rows}</tbody></table>
  <h2>Open questions ({len(oqs)})</h2>
  <table class="oq"><thead><tr><th>ID</th><th>part</th><th>question</th></tr></thead><tbody>{oq_rows}</tbody></table>
  <p class="muted-txt" style="margin-top:24px">Generated {datetime.date.today().isoformat()} from data/parts-knowledge.json &middot; regenerate: <code>python3 scripts/build_parts_views.py</code></p>
</div>
<script>
const q=document.getElementById('q'),cards=[...document.querySelectorAll('#parts .card')];
q.addEventListener('input',()=>{{const t=q.value.toLowerCase();cards.forEach(c=>c.style.display=c.dataset.search.toLowerCase().includes(t)?'':'none');}});
const qc=document.getElementById('qc'),rows=[...document.querySelectorAll('#cat tr.catrow')],grps=[...document.querySelectorAll('#cat tr.catgrp')];
qc.addEventListener('input',()=>{{const t=qc.value.toLowerCase();rows.forEach(r=>r.style.display=r.dataset.s.toLowerCase().includes(t)?'':'none');grps.forEach(g=>g.style.display=t?'none':'');}});
</script></body></html>'''
open(HTML, "w").write(page)

# ---- MD mirror ----
def md_part(pid, p):
    oem=p.get("oem",{}); L=[f"### {pid} ({p.get('itemSubCode') or '-'}) - {p.get('displayName')}",
        f"- category {p.get('category')} / status {p.get('status')} / OEM {oem.get('make','')} {oem.get('model','')}".rstrip()]
    for i in p.get("interfaces",[]): L.append(f"- interface: {i.get('standard')} {i.get('size') or ''} - {i.get('role')}")
    for f in p.get("fasteners",[]):
        tq=f"{f.get('torqueNm')} Nm" if f.get('torqueNm') is not None else "-"
        L.append(f"- fastener: {f.get('role')} {f.get('size')} x{f.get('count')} @ {tq} [{f.get('confidence')}]")
    for r in p.get("rules",[]): L.append(f"- rule: {r.get('text')} ({r.get('source')})")
    for h in p.get("hookups",[]): L.append(f"- hookup [{h.get('type')}]: {h.get('detail')}")
    L.append(f"- provenance: {p.get('provenance',{}).get('overallConfidence')}")
    return "\n".join(L)
md=["# ValveOS parts-knowledge (plain mirror)",
    f"_Source: data/parts-knowledge.json. Browser view: docs/parts-knowledge.html. {len(parts)} active + {len(catalog)} catalog. Updated {meta.get('lastUpdated','')}._","","## Active parts"]
md+=[md_part(k,v)+"\n" for k,v in parts.items()]
md.append("## Open questions")
for qq in oqs: md.append(f"- {qq.get('id')} [{qq.get('part')}]: {qq.get('question')}")
md.append("\n## Component catalog (code / model / make)")
for cat in sorted({p.get('category','') for p in catalog.values()}):
    md.append(f"\n### {cat}")
    for p in sorted([p for p in catalog.values() if p.get('category')==cat], key=lambda p:p['partId']):
        o=p.get('oem',{}); md.append(f"- {p['partId']}: {o.get('model')} ({o.get('make')})")
open(MD,"w").write("\n".join(md)+"\n")
print("wrote", HTML); print("wrote", MD)
