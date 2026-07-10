import trimesh, numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection

m = trimesh.load("/sessions/awesome-eager-fermat/mnt/outputs/BR06_bracket.glb", force="mesh")
tris = m.vertices[m.faces]

views = [(25, -60, "Isometric"), (89, -90, "Top (actuator face)"), (2, -90, "Front")]
fig = plt.figure(figsize=(15, 5))
for i, (el, az, title) in enumerate(views, 1):
    ax = fig.add_subplot(1, 3, i, projection="3d")
    pc = Poly3DCollection(tris, alpha=1.0, facecolor="#9fb4c7", edgecolor="#33475b", linewidths=0.15)
    ax.add_collection3d(pc)
    b = m.bounds
    ax.set_xlim(b[0][0], b[1][0]); ax.set_ylim(b[0][1], b[1][1]); ax.set_zlim(b[0][2], b[1][2])
    ax.set_box_aspect((b[1][0]-b[0][0], b[1][1]-b[0][1], b[1][2]-b[0][2]))
    ax.view_init(elev=el, azim=az)
    ax.set_title(title); ax.set_axis_off()
plt.tight_layout()
plt.savefig("/sessions/awesome-eager-fermat/mnt/outputs/BR06_bracket_preview.png", dpi=110, bbox_inches="tight")
print("saved preview")
