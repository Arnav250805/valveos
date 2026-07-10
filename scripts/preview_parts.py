import trimesh, numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

parts = ["valve", "actuator", "sov", "lsb", "afr", "bracket"]
base = "/sessions/awesome-eager-fermat/mnt/Dirac x VAC/ValveOS/parts/"

fig = plt.figure(figsize=(15, 9))
for i, name in enumerate(parts, 1):
    m = trimesh.load(base + name + ".glb", force="mesh")
    faces = m.faces
    if len(faces) > 4000:
        rng = np.random.default_rng(0)
        faces = faces[rng.choice(len(faces), 4000, replace=False)]
    tris = m.vertices[faces]
    ax = fig.add_subplot(2, 3, i, projection="3d")
    ax.add_collection3d(Poly3DCollection(tris, alpha=1.0, facecolor="#9fb4c7",
                                         edgecolor="#33475b", linewidths=0.05))
    b = m.bounds
    ax.set_xlim(b[0][0], b[1][0]); ax.set_ylim(b[0][1], b[1][1]); ax.set_zlim(b[0][2], b[1][2])
    ax.set_box_aspect((b[1]-b[0]))
    ax.view_init(elev=22, azim=-60)
    sz = [round(float(x)*1000) for x in (b[1]-b[0])]
    ax.set_title(f"{name}  ({sz[0]}x{sz[1]}x{sz[2]} mm)")
    ax.set_axis_off()
plt.tight_layout()
plt.savefig("/sessions/awesome-eager-fermat/mnt/Dirac x VAC/ValveOS/drawings/parts_contact_sheet.png",
            dpi=100, bbox_inches="tight")
print("saved contact sheet")
