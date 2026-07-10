"""
Build an approximation of Rajdeep bracket BR06 (valve-to-actuator mounting bracket)
from the 2D drawing dimensions. MVP visualization only, not a manufacturing model.

Geometry (mm), Z = vertical (valve mounts at bottom, actuator at top):
  - Bottom plate 100 x 60 x 4  -> valve face: center bore D35, 4x D6.5 on 50 sq pattern
  - Top plate    100 x 60 x 4  -> actuator face: center bore D46, 4x D9 on 70x46 pattern
  - Two side walls (4 thick) linking the plates, giving an open-frame box, overall H=70
"""
import trimesh
import numpy as np

trimesh.util.attach_to_log() if False else None

def box(x, y, z, cz):
    b = trimesh.creation.box(extents=[x, y, z])
    b.apply_translation([0, 0, cz])
    return b

def hole(radius, cz, x=0.0, y=0.0, h=12.0):
    c = trimesh.creation.cylinder(radius=radius, height=h, sections=48)
    c.apply_translation([x, y, cz])
    return c

# --- solid body: bottom plate + top plate + 2 side walls ---
bottom = box(100, 60, 4, 2)     # z 0..4
top    = box(100, 60, 4, 68)    # z 66..70
wallL  = box(4, 60, 62, 35)     # x centered at 0 -> move out
wallR  = box(4, 60, 62, 35)
wallL.apply_translation([ 48, 0, 0])
wallR.apply_translation([-48, 0, 0])

body = trimesh.boolean.union([bottom, top, wallL, wallR])

# --- holes ---
cuts = []
# valve center bore D35 through bottom plate
cuts.append(hole(17.5, 2))
# valve 4x D6.5 on 50mm square pattern
for sx in (25, -25):
    for sy in (25, -25):
        cuts.append(hole(3.25, 2, sx, sy))
# actuator center bore D46 through top plate
cuts.append(hole(23.0, 68))
# actuator 4x D9 on 70(x) x 46(y) rectangle
for sx in (35, -35):
    for sy in (23, -23):
        cuts.append(hole(4.5, 68, sx, sy))

bracket = trimesh.boolean.difference([body] + cuts)

# clean up
bracket.update_faces(bracket.nondegenerate_faces())
bracket.remove_unreferenced_vertices()
bracket.merge_vertices()

print("watertight:", bracket.is_watertight)
print("volume mm^3:", round(bracket.volume, 1))
print("bounds:", bracket.bounds.tolist())

out = "/sessions/awesome-eager-fermat/mnt/outputs"
bracket.export(f"{out}/BR06_bracket.glb")
bracket.export(f"{out}/BR06_bracket.stl")
print("exported BR06_bracket.glb and BR06_bracket.stl")
